import Head from '../elements/Head'
import useSWR from 'swr'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const fetcher = async (body) => {
  const headers = {
    'Content-type': 'application/json'
  }
  const getToken = await fetch(process.env.NEXT_PUBLIC_API, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query: body
    })
  })

  return getToken.json()
}

const GET_ADMIN_TOKENS = ({ token }) => `
  mutation{
    authAdminLayersWithOtp(input:{
      token:"${token}"
    }){
      refreshToken
      accessToken
    }
  }
`

const GET_PARENT_TOKENS = ({ token }) => `
  mutation{
    authParentLayersWithOtp(input:{
      token:"${token}"
    }){
      refreshToken
      accessToken
    }
  }
`

const OtpAdminProcess = ({ token }) => {
  const router = useRouter()
  const { data } = useSWR(GET_ADMIN_TOKENS({ token }), fetcher)
  useEffect(() => {
    if (data && data.data && data.data.authAdminLayersWithOtp) {
      console.log(data)
      localStorage.setItem(
        'refreshToken',
        data.data.authAdminLayersWithOtp.refreshToken
      )
      localStorage.setItem(
        'accessToken',
        data.data.authAdminLayersWithOtp.accessToken
      )
      router.push('/app/admin')
    }
  }, [data])

  return (
    <div className='m-4 p-4 shadow'>
      <Head title='Aguarde' />
      <h1 className='font-bold text-2xl'>Aguarde...</h1>
    </div>
  )
}

const OtpParentProcess = ({ token }) => {
  const router = useRouter()
  const { data } = useSWR(GET_PARENT_TOKENS({ token }), fetcher)
  useEffect(() => {
    if (data && data.data && data.data.authParentLayersWithOtp) {
      localStorage.setItem(
        'refreshToken',
        data.data.authParentLayersWithOtp.refreshToken
      )
      localStorage.setItem(
        'accessToken',
        data.data.authParentLayersWithOtp.accessToken
      )
      router.push('/app/parents')
    }
  }, [data])

  return (
    <div className='m-4 p-4 shadow'>
      <Head title='Aguarde' />
      <h1 className='font-bold text-2xl'>Aguarde...</h1>
    </div>
  )
}

const Otp = () => {
  const router = useRouter()
  if (Object.keys(router.query).length === 0) {
    return (
      <>
        <Head title='Aguarde' />
        Carregando...
      </>
    )
  }
  if (router.query.role === 'admin') {
    return (
      <>
        <Head title='Aguarde' />
        <OtpAdminProcess token={router.query.token} />
      </>
    )
  }
  return (
    <>
      <Head title='Aguarde' />
      <OtpParentProcess token={router.query.token} />
    </>
  )
}
export default Otp
