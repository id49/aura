import React from 'react'
import { Button, HelperText, Card, CardBody } from '@learn49/aura-ui'
import Link from 'next/link'

// import Loading from '../../../../components/Loading'
import Waiting from '../../../../components/Waiting'

import Head from '../../../../elements/Head'
import Title from '../../../../elements/Title'

import { useMutation, useQuery } from '../../../../lib/graphql'

const GET_API_DATA = `
  query {
    getAccountApi {
      apiKey
      apiSecret
    }
  }
`

// const CREATE_ADMIN = `
//   mutation panelCreateAdmin($name: String!, $email: String!, $password: String!) {
//     panelCreateAdmin(input: {
//       name: $name,
//       email: $email,
//       password: $password
//     }) {
//       name
//     }
//   }
// `

const Text = () => {
  const { data } = useQuery(GET_API_DATA)
  // const [, create] = useMutation(CREATE_ADMIN)

  return (
    <>
      <Head title='Api - Aluno.Tv' />
      <div className='flex flex-col md:flex-row justify-between mt-4'>
        <Title text='Api de Integração:' />
      </div>
      {!data && <Waiting />}
      {data && data.getAccountApi && (
        <>
          <HelperText className='text-gray-500 mt-2'>
            O Aluno.tv permite ser integrado a sistemas já existentes através de
            sua API. <br />
            Para acessar nossa API é necessário utilizar-se de duas chaves de
            segurança: a Api-key e a Api-secret.
          </HelperText>
          <div className='mb-8 mt-6'>
            <div className='sm:px-4 py-3 mb-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800'>
              <Card className='flex h-48'>
                <img
                  className='object-cover w-1/3 hidden lg:block'
                  src='/img/implementacionApi.png'
                />
                <CardBody className='self-center'>
                  <p className='mb-4 font-semibold text-gray-600 dark:text-gray-300 uppercase'>
                    Suas Chaves de Acesso
                  </p>
                  <p className='text-gray-600 dark:text-gray-400 mb-4 flex flex-col'>
                    <strong className='mr-2'>Api-key:</strong>
                    <span className='text-sm sm:text-base'>
                      {data.getAccountApi.apiKey ?? 'Nenhuma Chave Criada'}
                    </span>
                  </p>
                  <p className='text-gray-600 dark:text-gray-400 flex flex-col'>
                    <strong className='mr-2'>Api-secret:</strong>
                    <span className='text-sm sm:text-base'>
                      {data.getAccountApi.apiSecret ?? 'Nenhuma Senha Criada'}
                    </span>
                  </p>
                </CardBody>
              </Card>
              <Card className='mt-3 bg-red-100 dark:bg-red-300'>
                <CardBody>
                  <p className='mb-1 font-semibold text-red-600'>Atenção</p>
                  <p className='text-red-600'>
                    Mantenha suas chaves de acesso protegidas. Elas são tão
                    importantes quanto seu nome de usuário e senha de
                    administrador.
                  </p>
                </CardBody>
              </Card>
              <div className='flex flex-col md:flex-row gap-4 mt-4 px-1 mb-2'>
                <Button className='px-14' size='large' disabled={true}>
                  Gerar Novas Chaves
                </Button>
                <Link href='/app/admin/configs'>
                  <Button className='px-10' size='large' layout='outline'>
                    Cancelar
                  </Button>
                </Link>
              </div>
              <HelperText className='text-gray-500'>
                * Quando gerar novas chaves, elas devem ser atualizadas nos
                sistemas que fazem uso da API.
              </HelperText>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Text
