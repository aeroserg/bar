import { useState, useEffect } from "react"

const HOST = location.protocol + '//' + location.host

export default function MainPage() {

    const [mainPageData, setMainPageData] = useState({
        main_page:{
            title:'',
            description: '',
        }
     })
    useEffect(() =>{
        fetch(`${HOST}/api/main_page/`)
        .then(response => response.json())
        .then(data => {
            setMainPageData(data);
         
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);


    return (
        <section className="l__main_section">
            <div className="container-xl">
                <div className="main__text">
                    <h1>{mainPageData.main_page.title}</h1>
                    <div className="text__description">
                        <p className="primary_text"> {mainPageData.main_page.description}</p>
                    </div>
                </div> 
                <div className="btn__wrapper ">
                    <a className="btn__call_to_action" id="main_sect_btn" href="#booking">Забронировать</a>
                </div> 
            </div>
        </section>   
    )
}