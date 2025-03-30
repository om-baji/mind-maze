import AuthForm from '@/components/form-comp/auth-form';
import { useAuth } from '@/context/AuthContext';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Auth: React.FC = () => {

  const { isSignedIn } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/home");
      toast("Already signed in!")
    }
  }, [isSignedIn, navigate])

  return (
    <div className='flex justify-center items-center h-screen'>
      <AuthForm />
    </div>
  )
}

export default Auth
