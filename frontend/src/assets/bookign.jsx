// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect, useState } from 'react';


export default function Booking() {

    const [data, setData] = useState({
        dates:[]
    })
    useEffect(() => {
        fetch('http://localhost/api/get_reservation/')
        .then(response => response.json())
        .then(data => {
            setData(data);
        })
    },[])

    const [currentMonth, setCurrentMonth] = useState({
        
    })


    return (
        <section className="l-section" id="booking">
        <h2 className="k__large">Бронирование</h2>
        <div className="container-xl">
            <div className="b__booking_wrapper">
                <div className="b__booking_title">
                    Онлайн-бронирование
                </div>
                <form className="b__from_booking" id="form_booking">
                    <div className="b__form_rowTitle">Контакнтная информация</div>
                    <div className="f__input_wrapper">
                        <input type="text" name="user_name" id="user_name" className="f__user_name" placeholder="Имя" />
                        <input type="text" name="user_phone" id="user_phone" className="f__user_phone" placeholder="Телефон" />
                        <input type="text" name="user_quantity" id="user_quantity" className="f__user_quantity" placeholder="Кол-во гостей" />
                    </div>
               
                <div className="b__dateForSlide_container">
                    <div className="b__dateForSlide_item ">
                        <div className="b__calendar col-lg-5 col-12">
                            <div className="b__form_rowTitle">Дата</div>
                            <div className="b__monthTitle_wrapper">
                                <div className="prev_btn">
                                    <svg width="52" height="15" viewBox="0 0 52 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.13906 6.88005C0.748535 7.27058 0.748535 7.90374 1.13906 8.29426L7.50302 14.6582C7.89354 15.0488 8.52671 15.0488 8.91723 14.6582C9.30776 14.2677 9.30776 13.6345 8.91723 13.244L3.26038 7.58716L8.91723 1.9303C9.30776 1.53978 9.30776 0.906615 8.91723 0.51609C8.52671 0.125566 7.89354 0.125566 7.50302 0.51609L1.13906 6.88005ZM51.4615 6.58716L1.84616 6.58716V8.58716L51.4615 8.58716V6.58716Z" fill="black"/>
                                        </svg>
                                        
                                </div>
                                <div className="b_month">Август</div>
                                <div className="next_btn">
                                    <svg width="52" height="15" viewBox="0 0 52 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M51.0146 8.29426C51.4052 7.90374 51.4052 7.27058 51.0146 6.88005L44.6507 0.51609C44.2601 0.125566 43.627 0.125566 43.2365 0.51609C42.8459 0.906615 42.8459 1.53978 43.2365 1.9303L48.8933 7.58716L43.2365 13.244C42.8459 13.6345 42.8459 14.2677 43.2365 14.6582C43.627 15.0488 44.2601 15.0488 44.6507 14.6582L51.0146 8.29426ZM0.692139 8.58716H50.3075V6.58716H0.692139V8.58716Z" fill="black"/>
                                        </svg>                                    
                                </div>
                            </div>
                            <div className="calendar">
                                <div className="weekdays">
                                    <div className="day_name">ПН</div>
                                    <div className="day_name">ВТ</div>
                                    <div className="day_name">СР</div>
                                    <div className="day_name">ЧТ</div>
                                    <div className="day_name">ПТ</div>
                                    <div className="day_name">СБ</div>
                                    <div className="day_name">ВС</div>
                                </div>
                                <div className="days">
                                    <div className="day_num c_available" style={{gridColumn: "4"}}>1</div>
                                    <div className="day_num" >2</div>
                                    <div className="day_num">3</div>
                                    <div className="day_num" >4</div>
                                    <div className="day_num" >5</div>
                                    <div className="day_num">6</div>
                                    <div className="day_num">7</div>
                                    <div className="day_num c_available">8</div>
                                    <div className="day_num">9</div>
                                    <div className="day_num">10</div>
                                    <div className="day_num c_available">11</div>
                                    <div className="day_num">12</div>
                                    <div className="day_num">13</div>
                                    <div className="day_num">14</div>
                                    <div className="day_num">15</div>
                                    <div className="day_num c_available">16</div>
                                    <div className="day_num">17</div>
                                    <div className="day_num">18</div>
                                    <div className="day_num">19</div>
                                    <div className="day_num">20</div>
                                    <div className="day_num">21</div>
                                    <div className="day_num">22</div>
                                    <div className="day_num">23</div>
                                    <div className="day_num">24</div>
                                    <div className="day_num">25</div>
                                    <div className="day_num">26</div>
                                    <div className="day_num">27</div>
                                    <div className="day_num">28</div>
                                    <div className="day_num">29</div>
                                    <div className="day_num">30</div>
                                    <div className="day_num">31</div>
                                </div>
                            </div>
                        </div>
                        <div className="b__timeRanges col-lg-6 offset-lg-1 col-12">
                            <div className="b__form_rowTitle">Время</div>
                            <div className="b__timeRanges_container">
                                <div className="time">12:00</div>
                                <div className="time m_available">12:30</div>
                                <div className="time">13:00</div>
                                <div className="time">13:30</div>
                                <div className="time m_available">14:00</div>
                                <div className="time">14:30</div>
                                <div className="time">15:00</div>
                                <div className="time">15:30</div>
                                <div className="time m_available">16:00</div>
                                <div className="time">16:30</div>
                                <div className="time">17:00</div>
                                <div className="time">17:30</div>
                                <div className="time">18:00</div>
                                <div className="time">18:30</div>
                                <div className="time m_available">19:00</div>
                                <div className="time">19:30</div>
                                <div className="time">20:00</div>
                                <div className="time m_available">20:30</div>
                                <div className="time">21:00</div>
                                <div className="time">21:30</div>
                                <div className="time m_available">22:00</div>
                                <div className="time">22:30</div>
                                <div className="time">23:00</div>
                                <div className="time ">23:30</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn__wrapper booking">
                        <button type="submit">Забронировать</button>
                    </div>
                    <div className="b__form_inscription col-md-5 col-12">
                        Вы также можете забронировать стол, позвонив по номиеру <a href="tel:+7-999-999-99-99">+7-999-999-99-99</a> 
                    </div>
                </form>
                
                </div>
                <div className="b__booking_footerDescription">
                    <p>Наш администратор перезвонит вам, и вы сможете передать ему все свои пожелания.</p>

                        <p>Пожалуйста, сохраните сообщение с подтверждением бронирования ресторана на вашем телефоне.</p>
                        
                      <p>Пожалуйста, если вы опаздываете, сообщите нам об этом по номеру телефона бара. Если вы
                        опоздаете более чем на 20 минут, мы не сможем гарантировать вам столик.</p>
                   </div>
            </div>

    </section>
    )
}
