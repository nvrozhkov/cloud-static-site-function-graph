import React, { useContext } from 'react'

export const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg mb-2" style={{ backgroundColor: "#e3f2fd" }}>
            <div className='container'>
                <a className="navbar-brand mr-auto" href="/">
                    Мой статичный сайт
                </a>
            </div>
        </nav>
    )
}