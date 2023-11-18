import useApiData from '../hooks/useApiData';

function Interior() {
    const apiUrl = 'http://localhost:8000/api/interior/';
    const initialData = {
        "interior": []
    };
     const interiorData = useApiData(apiUrl, initialData);
    console.log(interiorData)
    return (
        <section className="l-section">
            <h2 className="k__medium">Интерьер</h2>
            <div className="container-xl">
                <div className="b__interier_wrapper">
                    <div className="b__interier_description col-12 col-lg-5">
                        <div className="b__interier_title">Наша атмосфера</div>
                        <div className="b__interier_text">
                            {interiorData.interior.description}
                        </div>
                    </div>
                    <div className="b__interier_photo col-12 col-lg-7">
                   
                    {interiorData.interior.length !== 0 ? interiorData.interior.interior_imgs.map((item, index) => (
                        <div key={index} id={index} className="b_interier_item" >
                            <div className="b__itemPhoto">
                                <img src={item.photo} alt={item.photo_description} />
                            </div>
                            <div className="b__itemPhoto_description left_side">
                                {item.photo_description}
                            </div>
                        </div>
                    )) : " "}
                    </div>
                </div>
            </div>
        </section>
    ) 
}
export default Interior