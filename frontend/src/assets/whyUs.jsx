import { useState, useEffect} from "react";

const HOST = location.protocol + '//' + location.host


const [whyUsData, setWhyUsData] = useState({
    why_us: {
        description1: '',
        description2: '',
        description3: '',
        description4: ''
    }
})

useEffect(() =>{
    fetch(`${HOST}/api/why_us/`)
    .then(response => response.json())
    .then(data => {
        setWhyUsData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}, []);

function WhyUs() {
    return (
        <section className="l-section"  id="whyUs">
        <h2 className="k__medium">Почему мы?</h2>
        <div className="container-xl">
            <div className="b__adv_grid">
                <div className="b__adv_item">
                    <div className="b__item_img">
                        <img src="img/dining.svg" alt="" />
                    </div>
                    <div className="b__item_text">
                       {whyUsData.why_us.description1}
                    </div>
                </div>
                <div className="b__adv_item">
                    <div className="b__item_img">
                        <img src="img/person.svg" alt="" />
                    </div>
                    <div className="b__item_text ">
                        {whyUsData.why_us.description2}
                    </div>
                </div>
                <div className="b__adv_item">
                    <div className="b__item_img">
                        <img src="img/chair.svg" alt="" />
                    </div>
                    <div className="b__item_text">
                        {whyUsData.why_us.description3}
                    </div>
                </div>
                <div className="b__adv_item">
                    <div className="b__item_img">
                        <img src="img/nightlife.svg" alt="" />
                    </div>
                    <div className="b__item_text">
                        {whyUsData.why_us.description4}
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default WhyUs;