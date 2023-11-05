// import { useState } from 'react'
// import { useEffect } from 'react';
import useScript from './hooks/useScript';
import './bootstrap.css'
import './slick.css'
import './App.css'

import Header from './assets/header'
import AboutUs from './assets/aboutUs'
import MainMenu from './assets/mainMenu'
import WhyUs from './assets/whyUs'

function App() {
  useScript('slick.min.js');
  useScript('main.js');
  // const [count, setCount] = useState(0)
  return (
    <>
    <Header />
    <section className="l__main_section">
        <div className="container-xl">
            <div className="main__text">
                <h1>Ирландия в самом центре Москвы</h1>
                <div className="text__description">
                    <p className="primary_text"> Аутентичные блюда, приготовленные
                        из самых свежих ингредиентов 
                        и удивительная ирландская атмосфера</p>
                </div>
            </div> 
            <div className="btn__wrapper">
                <a className="btn__call_to_action" id="main_sect_btn" href="#booking">Забронировать</a>
            </div> 
        </div>
    </section>   
    <main className="l-sections">
      <AboutUs />
      <MainMenu />
      <WhyUs />
    </main>
    </>
  )
}

export default App
