import { useState, useEffect } from "react"
import styled from 'styled-components'
const HOST = location.protocol + '//' + location.host

export default function MainPage() {

    const [mainPageData, setMainPageData] = useState({
        main_page:{
            title:'',
            description: '',
            photo: '',
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

    const MainSection = styled.section`

        background-image: url(${mainPageData.main_page.photo});
        background-color: #f7e7c4;
        background-attachment: fixed;
        background-position: top center;
        background-clip: border-box;
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
        min-height: 750px;
        padding: 9rem 0;
    
    `

    return (
        <MainSection>
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
        </MainSection>  
    )
}