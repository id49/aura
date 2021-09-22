import React from 'react'
import Head from 'next/head'

interface Props {
  title: string
}

const CustomHead = ({ title }: Props) => (
  <Head>
    <title>{title} - Aluno.Tv</title>
    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
  </Head>
)

export default CustomHead
