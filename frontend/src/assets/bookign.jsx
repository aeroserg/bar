/**
 * @var mockData Object
 * @var currentDayIndex Number
 * @var currentMonthIndex Number
 * @var currentDayData Object
 * @var monthData Object
 */

import { useEffect, useState, useReducer } from 'react';
import Loader from './modals'
import axios from "axios";
import Cookies from 'universal-cookie';
import useApiData from '../hooks/useApiData';
import { reducer } from '../reducer';
let firstAvailableDay;
const HOST = location.protocol + '//' + location.host
export default function Booking() {
    const apiUrl = `${HOST}/api/contacts/`;
    const initialData = {
        "contacts": {}
    };
     const contacts = useApiData(apiUrl, initialData);

    const now = new Date();
    const cookies = new Cookies();
    const csrftoken = cookies.get('csrftoken') || 'P85fgk6I9W4Wf2LpZjGCGQAXef89IiP6';

    // set uo mockdata from api, requseting server for data just 1 time, so no dependences in the useEffect array
    const [mockData, setData] = useState([])
    const [addData, setAddData] = useState({
        title: '',
        description: '',
        inscription: '',
        dates: {}
    })
    const [firstDayWeekIndex, setFirstDayWeekIndex] = useState(1)
    useEffect(() => {
        ( async () => {
            try {
                const { data } = await axios(`${HOST}/api/get_reservation/`);
                setData(data.dates)  
                setAddData(data)           
              } catch (err) {
                console.error(err);
              }
        })()
    },[])

   
    const [state, dispatch] = useReducer(reducer, {message: '', message_res_id: 1})
    const [stateModalMessageOpen, setOpenClosModal] = useReducer(reducer, { isShown: false})
    function handleMessageShown(success) {
        switch (success) {
            case true:
                dispatch({
                    type: 'success'
                });
                setOpenClosModal({
                    type: 'open'
                });
                break;
            case false:
                dispatch({
                    type: 'unsuccess'
                });
                setOpenClosModal({
                    type: 'open'
                });
                break;
        }
    }

const [userName, setUserName] = useState('')
const [userPhone, setUserPhone] = useState('')
const [userQuantity, setQuantity] = useState('')

const [isLoading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        document.querySelector('body').classList.add('block')
        setLoading(true);
        const isMinuteLeft = cookies.get('isMinuteLeft') !== undefined ? cookies.get('isMinuteLeft') : true;
        const date = document.querySelector('.c_checked') ? document.querySelector('.c_checked').id : false;
        const time = document.querySelector('.m_checked') ? document.querySelector('.m_checked').id : false;
        !time ? alert('Необходимо выбрать время!') : false;
  
        if (time && isMinuteLeft) {
            let dataToSend = {
                    date: date,
                    time: time,
                    name: userName,
                    phone: userPhone,
                    guest_quantity: userQuantity
                }
            
                let res = await fetch(`${HOST}/api/add_reservation/`, {
                  method: "POST",
                  
                  body: JSON.stringify(dataToSend),
                  headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,
                  }
                });
                let data = await res.json();
                if(data.success) {
                    document.querySelector('body').classList.remove('block')
                    setLoading(false);
                    handleMessageShown(true)
                    // alert('Мы успешно забронировали за вами столик!\nСкоро наш менеджер свяжется с вами для уточнения деталей.')
                    document.cookie = "isMinuteLeft=false; max-age=60";
                    setUserName('')
                    setUserPhone('')
                    setQuantity('')
                } else if(!data.success) {
                    document.querySelector('body').classList.remove('block')
                    setLoading(false);
                    handleMessageShown(false)
                  
                    // alert('Что-то пошло не так! Обращаем внимание, что если вы находитесь в режиме инкогнито, заброировать место не получится. Попытайтесь позже или позвоните нам по телефону');
                    setUserName('')
                    setUserPhone('')
                    setQuantity('')
                }
             
        } else if (time && !isMinuteLeft) {
            setLoading(false);
            document.querySelector('body').classList.remove('block')
            alert('Вы уже забронировали место, следующее бронирование откроется уже меньше чем через минуту')
            setUserName('')
            setUserPhone('')
            setQuantity('')
        }
        
    }

    //setting state for 1 month
    const [monthData, setMonthData] = useState({
        month: now.getMonth() + 1,
        days: [
            {
                date: `${now.getFullYear()}-${now.getMonth()+1}-01`,
                is_vacant: false,
                time_ranges: [
                    {
                        time: "",
                        is_available: false
                    },
                    {
                        time: "",
                        is_available: false
                    }
                   
                ]
            }
        ]
    })
    
    // setting month index for array (from 0 to 2)
    const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
    const [monthName, setMonthName] = useState(now.toLocaleString('default', { month: 'long' }))
    // useEffect for listening to general data update to set up 1 month data
    const [currentSelectedDayIndex, setCurrentSelectedDayIndex] = useState(0)
    useEffect(() => {
        setMonthData(mockData ? {...mockData[0]} : [])
        setFirstDayWeekIndex(monthData ? monthData.days ? new Date(monthData.days[0].date).getDay() : new Date(mockData[0].days[0].date).getDay() : 1)
        setCurrentSelectedDayIndex(0)
    },[mockData])
    useEffect(() => {
        setCurrentDayData(monthData ? monthData.days ? monthData.days[0] : {
            date: `${now.getFullYear()}-${now.getMonth()+1}-01`,
            is_vacant: true,
            time_ranges: [
                {
                    time: "",
                    is_available: false
                }
               
            ]
        } : {
            date: `${now.getFullYear()}-${now.getMonth()+1}-01`,
            is_vacant: true,
            time_ranges: [
                {
                    time: "",
                    is_available: false
                }
               
            ]
        } )
        setMonthName(monthData.days ? new Date(monthData.days[0].date).toLocaleString('defautl', { month: 'long' }) : now.toLocaleString('default', { month: 'long' }));
        setFirstDayWeekIndex(monthData.days ? new Date(monthData.days[0].date).getDay() : 1);
    }, [monthData])
   
    // //when user clicks on arrows - were setting month data and dayIndex to starting position 0
    useEffect(() => {
        setMonthData(mockData.length ? {...mockData[currentMonthIndex]}: []);  
      
        setCurrentSelectedDayIndex(0);
        setCurrentDayData(monthData.days[0])
    },[currentMonthIndex])
   
    const [currentDayData, setCurrentDayData] = useState( {
        date: `${now.getFullYear()}-${now.getMonth()+1}-01`,
        is_vacant: true,
        time_ranges: [
            {
                time: "",
                is_available: false
            },
            {
                time: "",
                is_available: false
            }
           
        ]
    } )

    //when user clicks on any date (day) - listen for currentDayIndex change and change set up data (time ranges) for particular day
    useEffect(() => {
        setCurrentDayData(monthData.days[currentSelectedDayIndex])
    }, [currentSelectedDayIndex])

    useEffect(() => {
        if (monthData.days){
        for (let i = 0; i < monthData.days.length; i++){
                    if(monthData.days[i].is_vacant){
                   
                    firstAvailableDay = i;
                    break;
                } else {
                    continue;
                }
            }
        }
        firstAvailableDay !== undefined ? setCurrentSelectedDayIndex(firstAvailableDay) : false;
    }, [monthData])

    const [selectedDay, setSelectedDay] = useState(0) //eslint-disable-line
    const [selectedTime,setSelectedTime] = useState(0)
    return (
        <section className="l-section" id="booking">
        <h2 className="k__large">Бронирование</h2>
        <div className="container-xl">
            <div className="b__booking_wrapper">
                <div className="b__booking_title">
                    Онлайн-бронирование
                </div>
                <form className="b__from_booking" id="form_booking" onSubmit={(e) => {handleSubmit(e)}}>
                    <div className="b__form_rowTitle">Контакнтная информация</div>
                    <div className="f__input_wrapper">
                        <input required type="text" name="user_name" id="user_name" className="f__user_name" placeholder="Имя" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                        <input required type="number" name="user_phone" id="user_phone" className="f__user_phone" placeholder="Телефон" value={userPhone} onChange={(e) => {setUserPhone(e.target.value)}}/>
                        <input required type="number" min={0} max={20} name="user_quantity" id="user_quantity" className="f__user_quantity" placeholder="Кол-во гостей" value={userQuantity} onChange={(e) => {setQuantity(e.target.value)}}/>
                    </div>
               
                <div className="b__dateForSlide_container">
              
                    <div className="b__dateForSlide_item ">
                        <div className="b__calendar col-lg-5 col-12">
                            <div className="b__form_rowTitle">Дата</div>
                            <div className="b__monthTitle_wrapper">
                               { mockData.length > 1 && <div className="prev_btn">
                                    <svg key={0}  onClick={() => {currentMonthIndex - 1 < 0 ? setCurrentMonthIndex(2) : setCurrentMonthIndex(currentMonthIndex => ((currentMonthIndex - 1) % 3));
         
                                    }} width="52" height="15" viewBox="0 0 52 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.13906 6.88005C0.748535 7.27058 0.748535 7.90374 1.13906 8.29426L7.50302 14.6582C7.89354 15.0488 8.52671 15.0488 8.91723 14.6582C9.30776 14.2677 9.30776 13.6345 8.91723 13.244L3.26038 7.58716L8.91723 1.9303C9.30776 1.53978 9.30776 0.906615 8.91723 0.51609C8.52671 0.125566 7.89354 0.125566 7.50302 0.51609L1.13906 6.88005ZM51.4615 6.58716L1.84616 6.58716V8.58716L51.4615 8.58716V6.58716Z" fill="black"/>
                                        </svg>
                                        
                                </div> }    
                                <div className="b_month" style={{textTransform: 'capitalize'}}>{monthName}</div>
                                { mockData.length > 1 &&  <div  className="next_btn">
                                    <svg key={1} onClick={() => {setCurrentMonthIndex(currentMonthIndex => ((currentMonthIndex + 1) % 3));
                                   
                                    }} width="52" height="15" viewBox="0 0 52 15" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                        <path d="M51.0146 8.29426C51.4052 7.90374 51.4052 7.27058 51.0146 6.88005L44.6507 0.51609C44.2601 0.125566 43.627 0.125566 43.2365 0.51609C42.8459 0.906615 42.8459 1.53978 43.2365 1.9303L48.8933 7.58716L43.2365 13.244C42.8459 13.6345 42.8459 14.2677 43.2365 14.6582C43.627 15.0488 44.2601 15.0488 44.6507 14.6582L51.0146 8.29426ZM0.692139 8.58716H50.3075V6.58716H0.692139V8.58716Z" fill="black"/>
                                        </svg>
                                </div>}
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
                                {monthData.days !== undefined ? <div className="days">
                                    {monthData.days.length && (monthData.days.map((item, index) => (
                                            <div id={`${item.date}`} key={index} onClick={item.is_vacant ? () => {setCurrentSelectedDayIndex(index); setSelectedDay(index)}: undefined} className={`day_num ${item.is_vacant ? 'c_available' : ''} ${ currentSelectedDayIndex === index ? 'c_checked': ''}`} style={index === 0? {gridColumn: firstDayWeekIndex || 7} : {}}>{item.date !== "" ? new Date(item.date).getDate() : index+1}</div>
                                    )) || '')}
                                </div>  : <><Loader /></>}
                            </div>
                        </div>
                        <div className="b__timeRanges col-lg-6 offset-lg-1 col-12">
                            <div className="b__form_rowTitle">Время</div>
                            <div className="b__timeRanges_container">
                                {currentDayData.time_ranges.length && currentDayData.time_ranges.map((item,index) => (
                                    <div id={`${item.time}`}  onClick={!item.is_available ? () => setSelectedTime(index): undefined} key={index} className={`time ${!item.is_available ? 'm_available' : ''} ${selectedTime == index && !item.is_available ? 'm_checked': ''}`}>{item.time}</div>
                                ))}
                            </div>
                        </div>
                    </div>
              
                  


                </div>
                <div className="btn__wrapper booking">
                        <button type="submit">Забронировать</button>
                    </div>
                    <div className="b__form_inscription col-md-5 col-12">
                        {addData.inscription}  
                    </div>
                </form>
                
                </div>
                <div className="b__booking_footerDescription">
                    <p><strong>{addData.title} </strong></p>

                        <p>{addData.description} </p>
                   </div>
            </div>
        <div className="modals">

            {/* message */}
            <div className="container-xl">
            
                <div className={stateModalMessageOpen.isShown ? "modal d-block b__modal" : "modal b__modal"} id="booking_message" >
                    <div className="body_modal" 
                              style={{ backgroundColor: state.message_res_id ? '#ffffff' : '#FF883E' }}
                    >
                        <div className="b_modal_message" >
                            {state.message}
                        </div>
                        <div className="modal_close" onClick={() => {
                             // @ts-ignore
                             setOpenClosModal({
                                type: 'close'
                            });
                            location.reload()
                        }}></div>
                    </div>
                </div>
           
             {/* loader for email send */}
                <div style={{zIndex:"10000", textAlign: "center", paddingTop: "20%", width: '100%', margin: '0 auto', gridColumn: 'auto / span 7'}} className={isLoading ? 'modal d-block ': 'modal'} id="loader">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" id="loaderSVG">
                        <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeWidth="10">
                        <animate attributeName="stroke-dasharray" from="0 251.2" to="251.2 0" dur="1.5s" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-dashoffset" from="0" to="-251.2" dur="1.5s" repeatCount="indefinite"></animate>
                        </circle>
                    </svg>

                </div>
            </div>
        </div>
    </section>
    )
}


