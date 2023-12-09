import { useEffect, useState } from "react";
import Footer from './assets/footer';
import Header from './assets/header'
import useScript from "./hooks/useScript";
import useApiData from "./hooks/useApiData";
import './bootstrap.css'
import './App.css'
const HOST = location.protocol + '//' + location.host

export default function MenuPage() {
    const [data, setData] = useState({
        menu:[]
    })
    useEffect(() => {
        fetch(`${HOST}/api/menu/`)
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
    },[])
    const menuLinkData = useApiData(`${HOST}/api/download_menu/`, {menu_pdf_path: ''})

    return (
        <>
        {useScript('../jquery.min.js')}
        <Header mainColor={'black'}/>
        <section style={{backgroundColor: "#F7E7C4"}} className="l-section pt-12" id='menu'>
            <h2 className="k__small">Меню</h2>
            <div className="container-xl">

                <div className="b__menu_wrapper">
                    <div className="b__menu_innerGrid">
                    {data.menu.lenght !== 0 ? data.menu.map((item, index) => (
                        <>
                        <div className="b__menu_card" style={((index + 1) % 6 === 0) || ((index + 1) % 7 === 0) || (index === 0) ? { gridColumn: "auto / span 4" } : {}} key={index}>
                            <div className="b__card_img">
                                <img src={item.photo} alt={item.name} />
                            </div>
                            <div className="b__card_description">
                                <div className="b__card_name">
                                    {item.name}
                                </div>
                                <div className="b__card_price">
                                    {item.price}р.
                                </div>
                            </div>
                        </div>
                        {index === 0 ? <div className="b__menu_card text-center">
                                <div className="b__card_img mb-5">
                                    Вы можете посмотреть меню здесь или скачать PDF по кнопке ниже
                                </div>
                                <a className="btn__call_to_action sec-page" target="_blank" rel="noreferrer" id="download_menu" href={menuLinkData.menu_pdf_path}>Скачать меню</a>
                        </div> : ''}
            
                        </>
                    )) : <></>}
                    </div>
                </div>
            
            </div>
        </section>
    <Footer />
    {useScript('../main.js')} 
    </>
    )

}
