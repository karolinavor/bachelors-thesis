import React from 'react'
import { Link } from 'react-router-dom'
import { RoutesList } from '../router/Router'

export default function File() {
    return (
        <section>
            <Link to={RoutesList.dashboard.url + RoutesList.course.url}>Zpet na predmet</Link>
            <h1>File Detail</h1>
            <div className='flex justify-between'>
                <div>
                    Nahled
                </div>
                <div className='flex'>
                    <div>Autor</div>
                    <div>Datum nahrani</div>
                    <div>Format</div>
                    <div>Velikost</div>
                    <div>Pocet likes/dislikes</div>
                    <div>Pocet stazeni</div>
                </div>
            </div>
            <button>
                Download
            </button>
            <div>
                Komentare
            </div>
        </section>
    )
}