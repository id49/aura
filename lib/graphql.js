import { useState } from 'react'
import useSWR from 'swr'
import jwtDecode from 'jwt-decode'

const requestMethod = async (body, accessToken = null, useHeaders = true) => {
  let headers = {}

  if (useHeaders) {
    headers['Content-type'] = 'application/json'
  }

  if (accessToken) {
    headers['authorization'] = 'Bearer ' + accessToken
  }

  const getToken = await fetch(process.env.NEXT_PUBLIC_API, {
    headers,
    method: 'POST',
    body
  })

  return getToken.json()
}

const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken')
  const data = jwtDecode(refreshToken)
  const role = data.scope.indexOf('admin') >= 0 ? 'Admin' : 'Parent'
  console.log('graphql', { data }, { role })
  const getAccessToken = {
    query: `
      mutation getAccessToken($refreshToken: String!){
        accessToken: genAccessToken${role}(refreshToken: $refreshToken)
      }
    `,
    variables: {
      refreshToken
    }
  }

  return await requestMethod(JSON.stringify(getAccessToken))
}

const fetcher = async (query) => {
  const accessToken = localStorage.getItem('accessToken')
  const getToken = await requestMethod(query, accessToken)

  if (
    !(
      getToken.errors &&
      getToken.errors[0] &&
      getToken.errors[0].message === 'Forbidden resource'
    )
  ) {
    return getToken.data
  }

  const newAccessToken = await getNewAccessToken()
  if (newAccessToken.data) {
    const newAccessTokenData = newAccessToken.data.accessToken
    localStorage.setItem('accessToken', newAccessTokenData)

    const getNewToken = await requestMethod(query, newAccessTokenData)

    if (!getNewToken.errors) {
      return getNewToken.data
    }
  }

  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  window.location = '/'
  return null
}

const pureFetcher = async (query) => {
  return requestMethod(query)
}

const useQuery = (
  queryStr,
  { autoRevalidate = true, refreshInterval = 0 } = {}
) => {
  const query = {
    query: queryStr
  }
  const options = {}
  if (!autoRevalidate) {
    options.revalidateOnFocus = false
    options.revalidateOnMount = true
    options.revalidateOnReconnect = false
    options.refreshWhenOffline = false
    options.refreshWhenHidden = false
    options.refreshInterval = 0
  }
  if (refreshInterval > 0) {
    options.refreshInterval = refreshInterval
  }
  const { data, revalidate } = useSWR(JSON.stringify(query), fetcher, options)
  return { data: data, loaded: true, revalidate }
}

const useMutation = (query) => {
  const [data, setData] = useState(null)
  const mutate = async (variables) => {
    const mutation = {
      query,
      variables
    }
    try {
      const returnedData = await fetcher(JSON.stringify(mutation))
      setData(returnedData)
      return returnedData
    } catch (err) {}
  }
  return [data, mutate]
}

const uploader = async (formData) => {
  const accessToken = localStorage.getItem('accessToken')
  const getToken = await requestMethod(formData, accessToken, false)

  if (
    !(
      getToken.errors &&
      getToken.errors[0] &&
      getToken.errors[0].message === 'Forbidden resource'
    )
  ) {
    return getToken.data
  }

  const newAccessToken = await getNewAccessToken()
  if (newAccessToken.data) {
    const newAccessTokenData = newAccessToken.data.accessToken
    localStorage.setItem('accessToken', newAccessTokenData)

    const getNewToken = await requestMethod(formData, newAccessTokenData, false)

    if (!getNewToken.errors) {
      return getNewToken.data
    }
  }

  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  window.location = '/'
  return null
}

const useUpload = (query) => {
  const [data, setData] = useState(null)
  const mutate = async (variables) => {
    const mutation = {
      query,
      variables: {
        ...variables,
        file: null
      }
    }
    const map = {
      0: ['variables.file']
    }
    const formData = new FormData()
    formData.append('operations', JSON.stringify(mutation))
    formData.append('map', JSON.stringify(map))
    formData.append(0, variables.file)

    try {
      const returnedData = await uploader(formData)
      setData(returnedData)
      return returnedData
    } catch (err) {
      console.log(err)
    }
  }
  return [data, mutate]
}

export { useQuery, useMutation, fetcher, pureFetcher, useUpload }
