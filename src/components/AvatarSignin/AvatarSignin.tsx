import { useState, useRef, useEffect } from 'react'
import { FaUser, FaCog, FaSignOutAlt, FaChevronDown, FaSignInAlt } from 'react-icons/fa'

interface User {
  name: string
  email: string
  avatarUrl?: string
}

interface AvatarSignInProps {
  user?: User | null
  onLogin?: () => void
  onLogout?: () => void
  onSettings?: () => void
  onProfile?: () => void
}

function AvatarSignIn({ 
  user,
  onLogin,
  onLogout,
  onSettings,
  onProfile
}: AvatarSignInProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fecha o dropdown quando clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Pega as iniciais do nome para o avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Se o usuário NÃO estiver logado, mostra botão de login
  if (!user) {
    return (
      <button
        onClick={onLogin}
        className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <FaSignInAlt className="w-4 h-4" />
        <span className="font-medium text-sm">Entrar</span>
      </button>
    )
  }

  // Se o usuário ESTIVER logado, mostra o avatar com dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botão do Avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-700/50 transition-all duration-200 border border-transparent hover:border-gray-600"
      >
        {/* Avatar */}
        <div className="relative">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover border-2 border-indigo-500 ring-2 ring-indigo-500/20"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm border-2 border-indigo-500 ring-2 ring-indigo-500/20">
              {getInitials(user.name)}
            </div>
          )}
          {/* Indicador online */}
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
        </div>

        {/* Nome e seta (esconde em mobile) */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-medium text-white">{user.name}</span>
          <FaChevronDown 
            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-fade-in">
          {/* Informações do Usuário */}
          <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
            <div className="flex items-center gap-3">
              {/* Avatar no dropdown */}
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(user.name)}
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {/* Perfil */}
            {onProfile && (
              <button
                onClick={() => {
                  setIsOpen(false)
                  onProfile()
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <FaUser className="w-4 h-4" />
                <span className="font-medium">Meu Perfil</span>
              </button>
            )}

            {/* Configurações */}
            {onSettings && (
              <button
                onClick={() => {
                  setIsOpen(false)
                  onSettings()
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
              >
                <FaCog className="w-4 h-4" />
                <span className="font-medium">Configurações</span>
              </button>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Logout */}
          {onLogout && (
            <button
              onClick={() => {
                setIsOpen(false)
                onLogout()
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span className="font-medium">Sair</span>
            </button>
          )}
        </div>
      )}

      {/* Adiciona animação de fade-in */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default AvatarSignIn