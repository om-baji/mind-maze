import { SignupForm } from '@/components/signup-form'
import { useAuthCtx } from '@/context/AuthContext'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AuthSignup : React.FC = () => {

  const isSignedIn = useAuthCtx()
  const navigate = useNavigate();

  if(isSignedIn) {
    navigate("/home");
    toast("Already signed in!")
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <SignupForm />
    </div>
  )
}

export default AuthSignup
