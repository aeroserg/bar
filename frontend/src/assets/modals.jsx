// eslint-disable-next-line no-unused-vars
import React from 'react';

export default function Loader() {
    return (
        <section >
        <div className="modals">
            <div style={{zIndex:"10000", textAlign: "center", paddingTop: "20%"}} className="modal b__modal" id="loader">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" id="loaderSVG">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ffffff" strokeWidth="10">
                      <animate attributeName="stroke-dasharray" from="0 251.2" to="251.2 0" dur="1.5s" repeatCount="indefinite"></animate>
                      <animate attributeName="stroke-dashoffset" from="0" to="-251.2" dur="1.5s" repeatCount="indefinite"></animate>
                    </circle>
                      
                  </svg>
            </div>
        </div>
    </section>
    )
}

