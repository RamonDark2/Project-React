import DefaultLayout from '../../Layouts/default'
import Header from '../../components/Header/header'
import { FaLongArrowAltDown, FaLongArrowAltRight } from 'react-icons/fa'

function App() {
  return (
    <DefaultLayout>
      {/* Seção da imagem de fundo que cobre tudo */}
      <div className="relative min-h-[140vh]">
        {/* Imagem de fundo */}
        <div 
          className="absolute inset-0 w-full h-full border-b border-[#FBD784] shadow-[#244a5e] shadow-2xl"
          style={{
            backgroundImage: 'url("/img/Plano_de_Fundo.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0
          }}
        />
        
        {/* Conteúdo sobreposto (Header + Texto) */}
        <div className="relative z-10">
          {/* Header sem background */}
          <Header />
          
          {/* Conteúdo principal */}
          <div className="flex justify-center items-center min-h-[85vh] max-w-xs lg:max-w-2xl mx-auto font-playfair">
            <div className='flex flex-col text-white'>
              <span className='flex flex-row gap-2 text-lg lg:text-xl my-4 font-normal text-[#FBD784] pl-2'>
                <div className='border-b border-2 border-[#FBD784]'></div>A Hiking Guide
              </span>
              <span className='text-2xl lg:text-6xl text-nowrap'>Be Prepared For The</span>
              <span className='text-2xl lg:text-6xl text-nowrap'>Mountains And Beyound!</span>
              <p className='flex flex-row items-center text-xs mt-10'>
                Role para baixo <FaLongArrowAltDown/>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo */}
      <div className="relative w-full min-h-[200vh] bg-[#0B1D26] p-8">
        
        {/* Seção 1 - Container com max-width */}
        <div className="flex flex-col lg:flex lg:flex-row gap-10 lg:gap-20 max-w-7xl mx-auto pt-20">
          <div className='flex flex-col mt-[15%] max-w-xl text-white font-playfair'>
            <span className='flex flex-row gap-2 text-xl my-4 font-normal text-[#FBD784] pl-2'>
              <div className='border-b border-2 border-[#FBD784]'></div>
              Get Started
            </span>
            <span className="text-6xl">What level of hiker</span>
            <span className="text-6xl">are you?</span>
            <span className="text-sm text-wrap mt-3 lg:mt-6">
              Determining what level of hiker you are can be an important tool when planning future hikes. 
              This hiking level guide will help you plan hikes according to different hike ratings set by 
              various websites like All Trails and Modern Hiker. What type of hiker are you – novice, 
              moderate, advanced moderate, expert, or expert backpacker? 
            </span>
            <p className='flex flex-row items-center gap-2 text-xs mt-10 text-[#FBD784]'>
              Ler mais <FaLongArrowAltRight className='w-4 h-4 mt-1'/>
            </p>
          </div>
          
          {/* Imagem da Gruta - Posicionada à direita */}
          <div className="sm:w-full md:w-1/2 md:mt-0 ">
            <img 
              className='w-[500px] h-[70vh] object-cover shadow-[#152630] shadow-md' 
              src="/img/Gruta.jpeg" 
              alt="Gruta" 
            />
          </div>
        </div>

        {/* Seção 2 */}
        <div className="max-w-7xl mx-auto">
          <div className="w-full flex flex-col-reverse justify-center items-center lg:flex-row gap-10 lg:gap-20 text-white font-playfair mt-40">

            {/* IMAGEM (ESQUERDA) */}
            <div className="w-full lg:w-2/5">
              <img
                src="/img/Mirante_Museu.jpeg"
                alt="Mirante Museu"
                className="w-[500px] h-[70vh] object-cover shadow-[#152630] shadow-md"
              />
            </div>

            {/* TEXTO (DIREITA) */}
            <div className=" max-w-xl flex flex-col justify-center">
              <span className="flex items-center gap-2 text-xl my-4 font-normal text-[#FBD784]">
                <span className="w-12 border-b-2 border-[#FBD784]" />
                Hiking Essentials
              </span>

              <span className="text-6xl">Picking the right</span>
              <span className="text-6xl">Hiking Gear!</span>

              <span className="text-sm mt-3 lg:mt-6">
                The nice thing about beginning hiking is that you don't really need any special gear, 
                you can probably get started with things you already have. Let's start with clothing. 
                A typical mistake hiking beginners make is wearing jeans and regular clothes.
              </span>

              <p className="flex items-center gap-2 text-xs mt-10 text-[#FBD784] cursor-pointer">
                Ler mais <FaLongArrowAltRight className="w-4 h-4 mt-1" />
              </p>
            </div>

          </div>
        </div>

      </div>
    </DefaultLayout>
  )
}

export default App