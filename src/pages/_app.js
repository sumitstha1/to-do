import '@/styles/globals.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar'

export default function App({ Component, pageProps }) {
  return <>
  <Navbar/>
  <Component {...pageProps} />

  <ToastContainer/>
  </>
}
