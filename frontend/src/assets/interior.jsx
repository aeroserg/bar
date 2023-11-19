import useApiData from '../hooks/useApiData';
import $ from 'jquery';

function Interior() {
    let photoCount = $('.b__itemPhoto').length;
    function updatePhotoLayer() {
        let photoId = $(this).closest('.b_interier_item').attr('id');
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
        console.log(photoCount)
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

    const apiUrl = 'http://localhost/api/interior/';
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
                        <div key={index} id={index} className="b_interier_item" onMouseOver={updatePhotoLayer}>
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