import React, { useState } from 'react';
import DefaultLayout from '../Layouts/default';
import Header from '../components/Header/header';
import useRouter from '../hooks/useRouter';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { RouteContext } from '../types/router.types';
import SerraImg from '../../public/img/Serra.jpeg'

interface LoginProps {
  context: RouteContext;
}

const Login: React.FC<LoginProps> = ({ context }) => {
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('password');
  const [error] = useState('');

  const { navigate } = useRouter();
const handleLogin = () => {
  const user = {
    name: 'Ramon',
    email: 'ramon@email.com'
  };

  localStorage.setItem('user', JSON.stringify(user));
  navigate('/');
};

  return (
    <div className='bg-blue-800'>

        <Header />
    <DefaultLayout>
    <div className="flex justify-center items-center min-h-screen px-4 bg-[url('/img/Mirante_Museu.jpeg')] bg-cover bg-center bg-no-repeat relative">
        {/* Lado Esquerdo */}
      <div className='relative flex-1 max-w-md w-full h-full'>
            <span className='absolute lg:flex hidden bottom-4 left-1/4 right-2/3 text-white text-nowrap text-lg font-playfair font-semibold z-10'>Torne suas ideias realidade.</span>
            <img
            src={SerraImg}
            alt="Pedra Furada"
            className="w-full min-w-full sm:h-[302px] min-h-[302px] max-h-[302px] lg:h-[502px] lg:min-h-[502px] object-cover rounded-l-lg shadow-lg"
            />
      </div>

        {/* Lado Direito */}
      <div className="max-w-md w-full bg-white rounded-lg lg:rounded-r-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-blue-200 rounded-full mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Login
          </h1>
          <p className="text-gray-600 mt-2">Entre com suas credenciais</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            Entrar
            <FaLongArrowAltRight className='w-5 h-5 min-w-5 min-h-5 inline-block ml-2'/>
          </button>
        </form>

        {/* Link para voltar */}
        <div className="mt-6 text-center">
          <button
            onClick={() => context.navigate('/')}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Voltar para a página inicial
          </button>
        </div>
      </div>
    </div>
      </DefaultLayout>
      </div>
  );
};

export default Login;