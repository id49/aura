import React from 'react'

import Head from '../../elements/Head'
import AvatarProfile from '../../components/Profile/Avatar'
import CardProfile from '../../components/Profile/CardProfile'
import FormProfile from '../../components/Profile/FormProfile'
import FormSecurity from '../../components/Profile/FormSecurity'
import Copyright from '../../components/Copyright'

const Support = () => {
  return (
    <>
      <Head title='Suporte' />
      <div className='container px-2 md:px-6 py-2 mx-auto'>
        <div className='container max-w-5xl mx-auto flex flex-col md:flex-row gap-2 bg-white rounded-lg mb-10'>
          Support
        </div>
        <Copyright />
      </div>
    </>
  )
}

export default Support
