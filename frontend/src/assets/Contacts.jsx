// eslint-disable-next-line no-unused-vars
import React from 'react';
import useApiData from '../hooks/useApiData';

export default function Contacts() {
    const apiUrl = 'http://localhost/api/contacts/';
    const initialData = {
        "contacts": {}
    };
     const contacts = useApiData(apiUrl, initialData);
    console.log(contacts)
    return (
        <section className="l-section">
        <h2 className="k__medium">Контакты</h2>
        <div className="container">
            <div className="b__contacts_wrapper">
                <div className="b__map_wrapper">
                    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Ad6896d75c51a79573a3863ba9047c90f57db4f0e291c5bdddcfefef0e0c9c7cb&amp;source=constructor" width="100%" height="623" frameBorder="0"></iframe>
                </div>
                <div className="b__footer_contacts">
                    <div className="b__contatcs_title">Наши контакты</div>
                   {contacts.contacts.address ? <div className="b__contacts_address">{contacts.contacts.address}</div>  : <></>}

                   {contacts.contacts.work_time ?  <div className="b__contacts_workTime">{contacts.contacts.work_time}</div> : <></>}

                   {contacts.contacts.phone ?<div className="b__contacts_phone"><a href={`tel:${contacts.contacts.phone}`}>{contacts.contacts.phone}</a></div> : <></>}
                </div>
            </div>
          
        </div>
    </section>
    )
}
