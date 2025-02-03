// pages/_app.js
import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Header />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  )
}

export default MyApp
