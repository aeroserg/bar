import useScript from './hooks/useScript';
import './bootstrap.css'
import './slick.css'
import './App.css'

import Header from './assets/header'
import AboutUs from './assets/aboutUs'
import MainMenu from './assets/mainMenu'
import WhyUs from './assets/whyUs'
import Footer from './assets/footer'
import Booking from './assets/bookign'
import Interior from './assets/interior'
import WorkingHours from './assets/workingHours'
import Contacts from './assets/Contacts'
import MainPage from './assets/mainPage';

export default function App() {

  return (
    <>
    {useScript('jquery.min.js')}
  
    <Header />
    <MainPage />
    <main className="l-sections">
      <AboutUs />
      <MainMenu />
      <WhyUs />
      <Interior />
      <WorkingHours />
      <Booking />
      <Contacts />
    </main>
    <Footer />
    {useScript('main.js')} 
    </>
  )
}


