import { FaWhatsapp, FaInstagram, FaLinkedinIn } from "react-icons/fa"

function Footer(){
{/* Footer */}
return(
<div className="flex flex-row justify-between items-end w-full p-3 font-semibold text-white text-sm bg-blue-800">
          <div>
          <span>Projeto React</span>
          </div>
          <div className='flex flex-row items-center gap-2.5'>
            <a target='_blank' href="https://wa.me/86994258329">
            <FaWhatsapp className='text-white w-5 h-5 min-w-5 min-h-5 hover:text-gray-300'/>
            </a>
            <a target='_blank' href="https://www.instagram.com/ramon_rrc/">
            <FaInstagram className='text-white w-5 h-5 min-w-5 min-h-5 hover:text-gray-300'/>
            </a>
            <a target='_blank' href="https://www.linkedin.com/in/ramon-rodrigues-48459721b/">
            <FaLinkedinIn className='text-white w-5 h-5 min-w-5 min-h-5 hover:text-gray-300'/>
            </a>
          </div>
        </div>
)
}

export default Footer