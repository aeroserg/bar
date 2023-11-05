function AboutUs() {
    return (
        <section className="l-section" id="aboutUs">
            <div className="b__img fixed_img">
                <img src="img/glass_of_whiskey.png" alt="" />
            </div>
            <h2 className="k__small">О нас</h2>
            <div className="container-xl">
            
                <div className="b__content">
                    <div className="b__quote">
                        <blockquote>
                            Думай-как ирландец, делай-как три бокала назад
                        </blockquote>
                        <div className="b__undertext">
                            <p>Ирландская народная мудрость</p>
                        </div>
                    </div>
                    <div className="b__imgs">
                        <img src="img/bg_img.png" alt="" />
                    </div>
                </div>
                <div className="btn__wrapper text-center mt-10">
                    <a className="btn__call_to_action" id="about_us_btn" href="#booking">Забронировать</a>
                </div>
            </div>
        </section>
    )
}

export default AboutUs