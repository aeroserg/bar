import useApiData from '../hooks/useApiData';

const HOST = location.protocol + '//' + location.host

function WorkingHours() {

    const apiUrl = `${HOST}/api/working_hours/`;
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
                    <img src="img/mayak_interior.png" alt="" />
                </div>
                <div className="b__timetable_wrapper">
                    <div className="b__time_item">
                        <div className="b__time_day">
                            <span className='d-md-inline d-none'>Пн</span> <span className='d-inline d-md-none'>Понедельник</span>
                        </div>
                        <div className="b__workingHour">
                            {working_hours.working_hours.monday.is_vacation === false ? working_hours.working_hours.monday.start.substring(0,5) : 'Выходной'} - {working_hours.working_hours.monday.is_vacation === false ? working_hours.working_hours.monday.end.substring(0,5) : ''}
                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                        <span className='d-md-inline d-none'>Вт</span><span className='d-inline d-md-none'>Вторник</span>
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.tuesday.is_vacation === false ? working_hours.working_hours.tuesday.start.substring(0,5) : 'Выходной'} - {working_hours.working_hours.tuesday.is_vacation === false ? working_hours.working_hours.tuesday.end.substring(0,5) : ''}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                        <span className='d-md-inline d-none'>Ср</span><span className='d-inline d-md-none'>Среда</span>
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.wednesday.is_vacation === false ? working_hours.working_hours.wednesday.start.substring(0,5) : 'Выходной'} - {working_hours.working_hours.wednesday.is_vacation === false ? working_hours.working_hours.wednesday.end.substring(0,5) : ''}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                        <span className='d-md-inline d-none'>Чт</span><span className='d-inline d-md-none'>Четверг</span>
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.thursday.is_vacation === false ? working_hours.working_hours.thursday.start.substring(0,5) : 'Выходной'} - {working_hours.working_hours.thursday.is_vacation === false ? working_hours.working_hours.thursday.end.substring(0,5) : ''}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                        <span className='d-md-inline d-none'>Пт</span><span className='d-inline d-md-none'>Пятница</span>
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.friday.is_vacation === false ? working_hours.working_hours.friday.start.substring(0,5) : 'Выходной'} - {working_hours.working_hours.friday.is_vacation === false ? working_hours.working_hours.friday.end.substring(0,5) : ''}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                        <span className='d-md-inline d-none'>Сб</span><span className='d-inline d-md-none'>Суббота</span>
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.saturday.is_vacation === false ? working_hours.working_hours.saturday.start.substring(0,5) : 'Выходной'} - {working_hours.working_hours.saturday.is_vacation === false ? working_hours.working_hours.saturday.end.substring(0,5) : ''}

                        </div>
                    </div>
                    <div className="b__time_item">
                        <div className="b__time_day">
                        <span className='d-md-inline d-none'>Вс</span><span className='d-inline d-md-none'>Воскресенье</span>
                        </div>
                        <div className="b__workingHour">
                        {working_hours.working_hours.sunday.is_vacation === false ? working_hours.working_hours.sunday.start.substring(0,5) : 'Выходной'} - {working_hours.working_hours.sunday.is_vacation === false ? working_hours.working_hours.sunday.end.substring(0,5) : ''}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    )
}

export default WorkingHours