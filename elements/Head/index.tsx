import React from 'react'
import Head from 'next/head'
import { NextSeo } from 'next-seo'

interface Props {
  title: string
}

const CustomHead = ({ title }: Props) => (
  <>
    <NextSeo title={title} description={title} defaultTitle={title} />
    <Head>
      <title>{title} - Learn49</title>
      <meta charSet='utf-8' />
      <meta httpEquiv='Content-Language' content='pt' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
  </>
)

export default CustomHead
