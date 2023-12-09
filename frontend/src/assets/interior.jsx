import { useState, useEffect } from "react"
import $ from 'jquery';
const HOST = location.protocol + '//' + location.host

function Interior() {
     const [interiorData, setData] = useState({
        interior:{
            description:'',
            interior_imgs: []
        }
     })
     const [photoCount, setCount] = useState(0)
     const [currentPhoto, setNewPhoto] = useState(0)
    useEffect(() =>{
        fetch(`${HOST}/api/api/interior/`)
        .then(response => response.json())
        .then(data => {
          setData(data);
          setCount(data.interior.interior_imgs.length)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }, []);

    function downgradePhoto(){
        setNewPhoto(currentPhoto - 1 < 0 ? (interiorData.interior.interior_imgs.length - 1) : currentPhoto - 1)
    }
    function updatePhoto(){
        setNewPhoto(currentPhoto + 1 > (interiorData.interior.interior_imgs.length - 1) ? 0 : currentPhoto + 1)
    }
  
     function updatePhotoLayer(event) {
        if (typeof window !== 'undefined' && window.outerWidth >= 992){
            let photoId = $(event.target).closest('.b_interier_item').attr('id');
            var defaultArr = [];
            var someVar = parseInt(photoId);
            var isExtremum = false;
            for (let i = 0; i < photoCount; i++) {
                defaultArr.push(i)
            }
            for (let i = photoCount; i >= parseInt(photoId); i--) {
                defaultArr[someVar] = i;
                someVar++
            }
            for (let j = 0; j < photoCount; j++) {
                if(j == photoCount - 1 && !isExtremum){
                    $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description center_side';
                } else if (isExtremum){
                    $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description right_side';
                } else {
                    if(defaultArr[j] < defaultArr[j+1]){
                        $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description left_side';
                    }
                    else if (defaultArr[j] > defaultArr[j+1] && !isExtremum) {
                        $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description center_side';
                        isExtremum = true;
                    } 
                    else {
                        $(`#${j} .b__itemPhoto_description`)[0].classList.value = 'b__itemPhoto_description right_side';
                    }
                }
                $(`#${j} img`).css("z-index", `${defaultArr[j]}`)
            }
        }
    }
    return (
        <section className="l-section"  id="interior">
            <h2 className="k__medium">Интерьер</h2>
            <div className="container-xl">
                <div className="b__interier_wrapper">
                    <div className="b__interier_description col-lg-5 col-12">
                        <div className="b__interier_title">Наша атмосфера</div>
                        <div className="b__interier_text">
                            {interiorData.interior.description}
                        </div>
                    </div>
                    <div className="b__interier_photo col-lg-7 col-12 d-none d-lg-flex">
                        
                        {interiorData.interior.length !== 0 ? interiorData.interior.interior_imgs.map((item, index) => (
                            <div key={index+1} id={index} className="b_interier_item" onMouseOver={(event) => (updatePhotoLayer(event))}>
                                <div className="b__itemPhoto">
                                    <img src={item.photo} alt={item.photo_description} />
                                </div>
                                <div className="b__itemPhoto_description left_side">
                                    {item.photo_description}
                                </div>
                            </div>
                        )) : " "}
                    </div>

                    {/* for mobile (less than 992) */}
                    <div className="b__interier_photo d-block d-lg-none">
                       
                        <div className="b__itemPhoto">
                            <img src= {interiorData.interior.interior_imgs.length !== 0 ? interiorData.interior.interior_imgs[currentPhoto].photo : null} alt={interiorData.interior.interior_imgs.length !== 0 ? interiorData.interior.interior_imgs[currentPhoto].photo_description : null} />
                        </div>
                            <div className="b__arrows_wrapper">
                                <div className="prev_btn d-lg-none d-block">
                                    <svg onClick={downgradePhoto} width="75" height="25" viewBox="0 0 52 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.13906 6.88005C0.748535 7.27058 0.748535 7.90374 1.13906 8.29426L7.50302 14.6582C7.89354 15.0488 8.52671 15.0488 8.91723 14.6582C9.30776 14.2677 9.30776 13.6345 8.91723 13.244L3.26038 7.58716L8.91723 1.9303C9.30776 1.53978 9.30776 0.906615 8.91723 0.51609C8.52671 0.125566 7.89354 0.125566 7.50302 0.51609L1.13906 6.88005ZM51.4615 6.58716L1.84616 6.58716V8.58716L51.4615 8.58716V6.58716Z" fill="black"/>
                                    </svg>
                                </div>
                                <div className="next_btn d-lg-none d-block">
                                    <svg onClick={updatePhoto} width="75" height="25" viewBox="0 0 52 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M51.0146 8.29426C51.4052 7.90374 51.4052 7.27058 51.0146 6.88005L44.6507 0.51609C44.2601 0.125566 43.627 0.125566 43.2365 0.51609C42.8459 0.906615 42.8459 1.53978 43.2365 1.9303L48.8933 7.58716L43.2365 13.244C42.8459 13.6345 42.8459 14.2677 43.2365 14.6582C43.627 15.0488 44.2601 15.0488 44.6507 14.6582L51.0146 8.29426ZM0.692139 8.58716H50.3075V6.58716H0.692139V8.58716Z" fill="black"/>
                                    </svg>                                    
                                </div>
                            </div>
                        
                    </div>
                    {/* for mobile (less than 992)  end*/}

                </div>
            </div>
        </section>
    ) 

}
export default Interior