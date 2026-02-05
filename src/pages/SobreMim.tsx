import React from 'react';
import Header from '../components/Header/header';
import DefaultLayout from '../Layouts/default';
import { LuLayoutDashboard } from "react-icons/lu";
import { MdContacts, MdOutlineComputer } from "react-icons/md";
import { TbApi } from "react-icons/tb";
import { IoLogoVue, IoBusiness } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa6";
import { AiFillBank } from "react-icons/ai";
import { SiTypescript, SiJavascript, SiTailwindcss, SiHtml5, SiAltiumdesigner, } from "react-icons/si";
import { FaLinkedinIn, FaCss3, FaGit, FaReact } from "react-icons/fa";

const SobreMim: React.FC = () => {
const skills = [
    { name: 'Vue.js', icon: <IoLogoVue className="w-8 h-8" />, color: 'from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-600' },
    { name: 'React', icon: <FaReact className="w-8 h-8" />, color: 'from-blue-500/20 to-blue-600/20 border-blue-500/50 text-blue-600' },
    { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8" />, color: 'from-blue-500/20 to-blue-600/20 border-blue-500/50 text-blue-600' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8" />, color: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/50 text-cyan-600' },
    { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8" />, color: 'from-yellow-500/20 to-amber-500/20 border-yellow-500/50 text-yellow-600' },
    { name: 'HTML5', icon: <SiHtml5 className="w-8 h-8" />, color: 'from-orange-500/20 to-red-500/20 border-orange-500/50 text-orange-600' },
    { name: 'CSS3', icon: <FaCss3 className="w-8 h-8" />, color: 'from-purple-500/20 to-violet-500/20 border-purple-500/50 text-purple-600' },
    { name: 'Front-End', icon: <MdOutlineComputer className="w-8 h-8" />, color: 'from-indigo-500/20 to-blue-500/20 border-indigo-500/50 text-indigo-600' },
    { name: 'UI/UX', icon: <SiAltiumdesigner className="w-8 h-8" />, color: 'from-rose-500/20 to-pink-500/20 border-rose-500/50 text-rose-600' },
    { name: 'Dashboards', icon: <LuLayoutDashboard className="w-8 h-8" />, color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/50 text-teal-600' },
    { name: 'APIs REST', icon: <TbApi className="w-8 h-8" />, color: 'from-emerald-500/20 to-green-500/20 border-emerald-500/50 text-emerald-600' },
    { name: 'Git', icon: <FaGit className="w-8 h-8" />, color: 'from-red-500/20 to-orange-500/20 border-red-500/50 text-red-600' },
  ];

  return (
    <div className='bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900'>
      <Header />
      <DefaultLayout>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
          {/* Background Image */}
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              backgroundImage: 'url(/img/Banner_Linkedin.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Photo & Name */}
              <div className="text-center md:text-left">
                <div className="relative inline-block mb-8">
                  <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl mx-auto md:mx-0">
                    <img 
                      src="/img/FotoPerfil_Linkedin.png" 
                      alt="Ramon Rodrigues"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 right-6  bg-green-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-white text-2xl">✓</span>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                  Ramon Rodrigues
                </h1>
                <p className="text-2xl text-blue-200 mb-6">
                  Desenvolvedor Front-End
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="mailto:Jalbertramon1@gmail.com"
                    className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <MdContacts className="inline w-6 h-6 min-w-5 min-h-5 mr-2" /> Contato
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/ramon-rodrigues-48459721b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <FaLinkedinIn className="inline w-6 h-6 min-w-5 min-h-5 mr-2" />     LinkedIn
                  </a>
                </div>
              </div>

              {/* Right Column - Summary */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Resumo Profissional
                </h2>
                <p className="text-blue-100 leading-relaxed">
                  Desenvolvedor Front-End com experiência em desenvolvimento de aplicações web 
                  para sistemas governamentais e plataformas de gestão interna. Atuação em projetos 
                  oficiais para a Prefeitura de Teresina – PI, com foco em usabilidade, performance, 
                  segurança da informação e análise de dados administrativos. Forte domínio de <strong>Vue.js</strong>, <strong>React.js</strong>, 
                  TypeScript, JavaScript e Tailwind CSS.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Competências Técnicas
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, SobreMim) => (
                <div 
                  key={SobreMim}
                  className={`relative bg-gradient-to-br ${skill.color} backdrop-blur-sm rounded-xl p-6 text-center
                    hover:scale-105 transition-all duration-300 border animate-float group cursor-pointer`}
                  style={{ animationDelay: `${SobreMim * 0.1}s` }}
                >
                  <div className={`mb-3 flex justify-center ${skill.color.split(' ').pop()}`}>
                    {skill.icon}
                  </div>
                  <div className={`font-semibold ${skill.color.split(' ').pop()}`}>{skill.name}</div>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.2)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
              Experiência Profissional
            </h2>
            
            <div className="bg-white rounded-xl lg:rounded-2xl p-8 shadow-xl border lg:border-l-8 border-blue-600">
              <div className="lg:flex lg:flex-row flex flex-col items-center justify-center lg:items-start gap-6">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
                  P
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Prodater – Soluções em Tecnologia da Informação
                  </h3>
                  <p className="text-lg text-blue-600 font-semibold mb-2">
                    Desenvolvedor Front-End
                  </p>
                  <p className="text-gray-600 mb-6">
                    Teresina – PI | Atual
                  </p>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Atuação no desenvolvimento de sistemas web para a Prefeitura de Teresina e 
                    projetos internos de gestão administrativa.
                  </p>
                  
                  <ul className="space-y-3">
                    {[
                      'Experiência prática em desenvolvimento de aplicações web utilizando React, TypeScript, JavaScript e Tailwind CSS',
                      'Desenvolvimento de aplicações web utilizando Vue.js, TypeScript, JavaScript e Tailwind CSS',
                      'Criação de interfaces responsivas e acessíveis',
                      'Implementação de dashboards administrativos para análise de dados',
                      'Controle de usuários, permissões e vigência de vínculos',
                      'Integração com APIs REST e sistemas internos',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 text-xl mt-1">✓</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
       <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Projetos Relevantes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-400">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6">
                <IoBusiness className='w-10 h-10 min-w-10 min-h-10'/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Portal da Empregabilidade
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Plataforma para cadastro de empresas (CNPJ/MEI) e cidadãos, divulgação de vagas 
                de emprego e produtos, com painel administrativo para análise de usuários ativos 
                e encaminhamentos para vagas.
              </p>
              <p onClick={() => window.open('https://emprega.teresina.pi.gov.br/', '_blank')} className="text-blue-600 font-semibold hover:underline text-lg cursor-pointer mt-auto flex justify-end">Ver site</p>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-400">
              <div className="bg-green-600 text-white w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6">
                <FaGraduationCap className='w-10 h-10 min-w-10 min-h-10'/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Certificado Escolar Digital
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sistema oficial para emissão e download de certificados de conclusão e históricos 
                escolares de alunos que concluíram o Ensino Médio nos últimos 4 anos.
              </p>
              <span className="self-start bg-green-600 text-white text-sm px-3 py-1 rounded-full font-semibold mb-6">
                Prefeitura de Teresina
              </span>
              <p onClick={() => window.open('https://ced.teresina.pi.gov.br/sobre', '_blank')} className="text-blue-600 font-semibold hover:underline text-lg cursor-pointer mt-auto flex justify-end">Ver site</p>
            </div>

            {/* Project 3 */}
            <div className="flex flex-col bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-400">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-xl flex items-center justify-center text-3xl mb-6">
                <AiFillBank className='w-10 h-10 min-w-10 min-h-10'/>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Orçamento Popular
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sistema de gestão interna para entidades de bairro, com cadastro e aprovação de 
                entidades, vinculação de pessoas, controle de vigência, agendamento de assembleias, 
                envio de atas e votações.
              </p>
              <span className="self-start bg-yellow-500 text-white text-sm px-3 py-1 rounded-full font-semibold mb-6">
                Em andamento
              </span>
              <p onClick={() => window.location.href =('/')} className="text-blue-600 font-semibold hover:underline text-lg cursor-pointer mt-auto flex justify-end">Ver site</p>
            </div>
          </div>
        </div>
      </section>

        {/* Contact Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
          <div className="max-w-full mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Vamos trabalhar juntos?
            </h2>
            <p className="text-xl text-blue-200 mb-10">
              Estou disponível para novos projetos e oportunidades
            </p>
            
            <div className="flex flex-wrap gap-6 justify-center">
              <a 
                href="mailto:Jalbertramon1@gmail.com"
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-3"
              >
                <span className="text-2xl"><MdContacts className="w-6 h-6 min-w-5 min-h-5"/></span>
                Jalbertramon1@gmail.com
              </a>
              <a 
                href="https://www.linkedin.com/in/ramon-rodrigues-48459721b/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center gap-3"
              >
                <span className="text-2xl"><FaLinkedinIn className="w-6 h-6 min-w-5 min-h-5"/></span>
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-8 px-4">
          <div className="max-w-full mx-auto text-center">
            <p>© 2026 Ramon Rodrigues. Desenvolvedor Front-End.</p>
          </div>
        </footer>
      </DefaultLayout>
    </div>
  );
};

export default SobreMim;