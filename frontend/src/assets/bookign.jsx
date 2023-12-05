// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect, useState } from 'react';
import Loader from './modals'

export default function Booking() {

    const [data, setData] = useState({
        dates:[ {
            month: 1,
            days: [
                {
                    date: '2023-11-25',
                    time_ranges: [
                        {
                            time: "Выберете ",
                            is_available: false
                        },
                        {
                            time: "дату,",
                            is_available: false
                        },
                        {
                            time: "чтобы",
                            is_available: false
                        },
                        {
                            time: "увидеть",
                            is_available: false
                        },
                        {
                            time: "доступное",
                            is_available: false
                        },
                        {
                            time: "время",
                            is_available: false
                        }
                    ]
                }
            ]
        }
    ]
    })
  
    
    function handleDayClick(event, index) {
        event.preventDefault();
        document.querySelector('.c_checked') ?  document.querySelector('.c_checked')?.classList.remove('c_checked'): undefined;
        setCurrDay(index)
        setCurrentDayData({
            ...currentMonthData.days[index]
        })
        event.target.classList.add('c_checked');
    }
    function handleTimeClick(event) {
        event.preventDefault();
        document.querySelector('.m_checked') ?  document.querySelector('.m_checked')?.classList.remove('m_checked'): undefined;
        event.target.classList.add('m_checked');
    }
    function handleNewMonthData() {
        setCurrentMonthData({
            ...data.dates[currentMonth]
        });
        setCurrDay(0);
    }
    // const [userName, setUserName] = useState('');

    async function handleSubmit(event){
        event.preventDefault();
        let dataToSend;
        let res = await fetch("http://localhost/api/add_reservation/", {
            method: "POST",
            body: JSON.stringify(dataToSend),
            headers: {
              'Content-Type': 'application/json',
            }
          });
          let data = await res.json();
          if(data.success) {
             alert('Заявка на броирование сделана. Скоро мы позвоним вам, чтобы уточнить детали.')
            
          } else if(!data) {
              alert('Что-то пошло не так, попытайтесь позже или позвоните нам!');
          }
    }
    useEffect(() => {
        let ignore = false;
        fetch('http://localhost/api/get_reservation/')
        .then(response => response.json())
        .then(data => {
           if (!ignore) setData(data);
           if (!ignore) setCurrentMonthData(data.dates[0]);
           if (!ignore) setCurrMonth(0);
           if (!ignore) setCurrDay(0);
           if (!ignore) setCurrentDayData({ ...currentMonthData.days[currentDay]});
        })
       return () => {ignore = true}
    },[])
   
    const [currentMonth,setCurrMonth] = useState(0);
   
    const firstDayOfMonth = data.dates[currentMonth] ? new Date(data.dates[currentMonth].days[0].date).getDay() : undefined;
    const currentFullMonth = data.dates[currentMonth] ? new Date(data.dates[currentMonth].days[0].date).toLocaleString('default', { month: 'long' }) : undefined; 
    const [currentMonthData, setCurrentMonthData] = useState({
        ...data.dates[0]
    })

    const [currentDay, setCurrDay] = useState(0) 
    const [currentDayData, setCurrentDayData] = useState({
        ...currentMonthData.days[0]
    })
    console.log(currentMonthData.month)
    console.log(currentMonthData)


    return (
        <section className="l-section" id="booking">
        <h2 className="k__large">Бронирование</h2>
        <div className="container-xl">
            <div className="b__booking_wrapper">
                <div className="b__booking_title">
                    Онлайн-бронирование
                </div>
                <form className="b__from_booking" id="form_booking" onSubmit={handleSubmit}>
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
                                <div onClick={() => {setCurrMonth((currentMonth - 1) < 0 ? (data.dates.length - 1) : currentMonth - 1 ); handleNewMonthData()}} className="prev_btn">
                                    <svg width="52" height="15" viewBox="0 0 52 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.13906 6.88005C0.748535 7.27058 0.748535 7.90374 1.13906 8.29426L7.50302 14.6582C7.89354 15.0488 8.52671 15.0488 8.91723 14.6582C9.30776 14.2677 9.30776 13.6345 8.91723 13.244L3.26038 7.58716L8.91723 1.9303C9.30776 1.53978 9.30776 0.906615 8.91723 0.51609C8.52671 0.125566 7.89354 0.125566 7.50302 0.51609L1.13906 6.88005ZM51.4615 6.58716L1.84616 6.58716V8.58716L51.4615 8.58716V6.58716Z" fill="black"/>
                                        </svg>
                                        
                                </div>
                                <div className="b_month">{currentFullMonth}</div>
                                <div onClick={() => {setCurrMonth((currentMonth + 1) % data.dates.length === 0 ? 0 : currentMonth + 1 ); handleNewMonthData()}} className="next_btn">
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
                                {currentMonthData.days ? currentMonthData.days.map((item, index) => (
                                        <div key={index } onClick={item.is_vacant ? (e) => handleDayClick(e,index) : undefined} className={`day_num ${item.is_vacant ? 'c_available' : ''}`} style={index === 0 ? {gridColumn: firstDayOfMonth} : {}}>{new Date(item.date).getDate()}</div>
                                )) : <><Loader /></>}
                                </div>
                            </div>
                        </div>
                        <div className="b__timeRanges col-lg-6 offset-lg-1 col-12">
                            <div className="b__form_rowTitle">Время</div>
                            <div className="b__timeRanges_container">
                                {currentDayData.time_ranges ? currentDayData.time_ranges.map((item,index) => (
                                    <div onClick={item.is_available ? (e) => handleTimeClick(e) : undefined} key={index} className={`time ${item.is_available ? 'm_available' : ''}`}>{item.time}</div>
                                )) : <><Loader /></>}
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
