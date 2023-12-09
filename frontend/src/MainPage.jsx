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

export default function App() {

  return (
    <>
    {useScript('jquery.min.js')}
  
    <Header />
    <section className="l__main_section">
        <div className="container-xl">
            <div className="main__text">
                <h1>Ирландия в самом центре Москвы</h1>
                <div className="text__description">
                    <p className="primary_text"> Аутентичные блюда, приготовленные
                        из самых свежих ингредиентов 
                        и удивительная атмосфера</p>
                </div>
            </div> 
            <div className="btn__wrapper ">
                <a className="btn__call_to_action" id="main_sect_btn" href="#booking">Забронировать</a>
            </div> 
        </div>
    </section>   
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


