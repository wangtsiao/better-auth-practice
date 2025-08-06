import SignUpForm from '@/components/sign-up-form'
import ReturnButton from '@/components/return-button'
import React from 'react'


const page = () => {
  return (
    <div className='max-w-screen-lg container mx-auto px-8 py-16 space-y-8'>
      <div className="space-y-8">
        <ReturnButton href='/' label='home'/>
        <h1 className='text-3xl font-bold'>Create an account</h1>
      </div>
      <SignUpForm />

    </div>
  )
}

export default page
