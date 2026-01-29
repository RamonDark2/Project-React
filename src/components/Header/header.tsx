import { useState, useEffect } from 'react'
import useRouter from '../../hooks/useRouter'
import AvatarSignIn from '../AvatarSignin/AvatarSignin'


function Header(){

  const [user, setUser] = useState<any | null>(null)
  const { navigate } = useRouter()

  useEffect(() => {
  const syncUser = () => {
    const userString = localStorage.getItem('user');
    setUser(userString ? JSON.parse(userString) : null);
  };

  syncUser();
  window.addEventListener('storage', syncUser);

  return () => window.removeEventListener('storage', syncUser);
}, []);

  
  return(
<div className="flex md:flex-row flex-col justify-center gap-4 md:justify-between w-full px-8 p-4 font-semibold text-gray-950">

          <div className='flex flex-row gap-2 justify-between'>
            <span className="font-playfair font-semibold text-white text-2xl flex items-center">Serra da Capivara</span>
            <div className='md:hidden flex'>
             <AvatarSignIn
              user={user}
              onLogin={() => navigate('/login')}
              onLogout={() => {setUser(null) 
              localStorage.clear() 
              navigate('/')}}
              onProfile={() => navigate('/profile')}
              onSettings={() => navigate('/settings')}
            />
            </div>
          </div>

          <div className='flex justify-center items-center space-x-6 lg:space-x-10 md:pr-[8.5rem] text-white text-base'>
            <a target='_blank' href='https://www.instagram.com/ramon_rrc/' className='hover:bg-opacity-20 px-2 rounded-full hover:bg-gray-50 text-nowrap'>Instagram</a>
            <a href='/' className='px-2 rounded-full hover:bg-gray-50 hover:bg-opacity-20 text-nowrap'>Sobre mim</a>
            <a target='_blank' href='https://www.linkedin.com/in/ramon-rodrigues-48459721b/' className='hover:bg-opacity-20 px-2 rounded-full hover:bg-gray-50 text-nowrap'>Linkedin</a>
          </div>
          <div className='md:flex md:flex-row gap-2.5 hidden'>
            <AvatarSignIn
              user={user}
              onLogin={() => navigate('/login')}
              onLogout={() => {setUser(null) 
              localStorage.clear() 
              navigate('/')}}
              onProfile={() => navigate('/profile')}
              onSettings={() => navigate('/settings')}
            />
          </div>
        </div>
)
}

export default Header