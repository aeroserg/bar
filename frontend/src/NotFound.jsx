import Header from './assets/header'
function NotFound() {
    return (
        <>
            <Header mainColor={'black'}/>
            <div style={{position: 'fixed', top: '30%', left:'30%', fontSize: '22px'}}>
                Страниц не найдена:(
            </div>
        </>
    )
}
export default NotFound