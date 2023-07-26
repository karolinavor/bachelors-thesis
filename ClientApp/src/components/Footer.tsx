import React from 'react'

export default function Footer() {

    return (
        <footer className="Footer">
            <div className="Footer-left">
                <div>
                    <a className="Link" href="mailto:vorlka00@upol.cz">vorlka00@upol.cz</a>
                </div>
            </div>
            <div className="Footer-right">&copy; {new Date().getFullYear()} Copyright</div>
        </footer>
    )
}