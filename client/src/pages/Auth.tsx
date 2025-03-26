import AuthForm from '@/components/form-comp/auth-form'
// import { useAuthCtx } from '@/context/AuthContext';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth: React.FC = () => {

  // const { isAuth } = useAuthCtx()
  const navigate = useNavigate();

  // if (isAuth) {
  //   navigate("/home");
  //   toast("Already signed in!")
  // }

  return (
    <div className='flex justify-center items-center h-screen'>
      <AuthForm />
    </div>
  )
}

export default Auth
