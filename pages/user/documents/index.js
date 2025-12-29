import Documents from '@/components/user/Documents'
import ImageUpload from '@/components/user/ImageUpload'
import WelcomeBar from '@/components/user/WelcomeBar'
import User from '@/pages/layouts/user'
import React from 'react'

const Index = () => {
  return (
    <>
      <WelcomeBar/>
      <ImageUpload/>
      <Documents/>
    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
    return (<User>{page}</User>)
  }