import React from 'react';
import useApiData from '../hooks/useApiData';


function WorkingHours() {

    const apiUrl = 'http://localhost/api/working_hours/';
    const initialData = {
        working_hours: {
            monday: {
                start: '',
                end: '',
                is_vacation: false
            },
            tuesday: {
                start: '',
                end: '',
                is_vacation: false
            },
            wednesday: {
                start: '',
                end: '',
                is_vacation: false
            },
            thursday: {
                start: '',
                end: '',
                is_vacation: false
            },
            friday: {
                start: '',
                end: '',
                is_vacation: false
            },
            saturday: {
                start: '',
                end: '',
                is_vacation: false
            },
            sunday: {
                start: '',
                end: '',
                is_vacation: false
            }
        }
    }
     const working_hours = useApiData(apiUrl, initialData);
    return (
        <section className="l-section"  id="workingHours">
        <h2 className="k__large">Время работы</h2>
        <div className="container-xl">
            <div className="b__workingHours_wrapper">
                <div className="b__bgc_img">
                    <img src="img/bg_img.png" alt="" />
                </div>
                <div className="b__timetable_wrapper">
                    <div className="b__time_item">
                        <div className="b__time_day">
                            Пн
                        </div>
                        <div className="b__workingHour">
                            {working_hours.working_hours.monday.is_vacation === false ? working_hours.working_hours.monday.start.substring(0,5) : 'Выходной'}
                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                            Вт
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.tuesday.is_vacation === false ? working_hours.working_hours.tuesday.start.substring(0,5) : 'Выходной'}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                            Ср
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.wednesday.is_vacation === false ? working_hours.working_hours.wednesday.start.substring(0,5) : 'Выходной'}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                            Чт
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.thursday.is_vacation === false ? working_hours.working_hours.thursday.start.substring(0,5) : 'Выходной'}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                            Пт
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.friday.is_vacation === false ? working_hours.working_hours.friday.start.substring(0,5) : 'Выходной'}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                            Сб
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.saturday.is_vacation === false ? working_hours.working_hours.saturday.start.substring(0,5) : 'Выходной'}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                            Вс
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.sunday.is_vacation === false ? working_hours.working_hours.sunday.start.substring(0,5) : 'Выходной'}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default WorkingHours