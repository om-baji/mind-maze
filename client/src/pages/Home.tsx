import Navbar from '@/components/Navbar';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div>
      <Navbar>
      <div className='flex justify-center items-center h-screen'>
        This is a dashboard
      </div>
      </Navbar>
    </div>
  )
}

export default Home;
