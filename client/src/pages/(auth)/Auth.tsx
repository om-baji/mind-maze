import { LoginForm } from '@/components/login-form'
import { useAuthCtx } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import React from 'react'
import { toast } from 'sonner'

const Auth : React.FC = () => {

  const isSignedIn = useAuthCtx()
  const navigate = useNavigate();

  if(isSignedIn) {
    navigate("/home");
    toast("Already signed in!")
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <LoginForm />
    </div>
  )
}

export default Auth
