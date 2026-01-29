import Footer from '../components/Footer/footer'

function DefaultLayout({ children }: { children: React.ReactNode }){
  return(
    <div className="flex flex-col min-h-screen">
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default DefaultLayout