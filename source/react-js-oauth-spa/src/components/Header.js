import React, { useContext } from 'react'
import { TokenContext } from '../hooks/useOAuth';

export const Header = () => {
    const [, idToken] = useContext(TokenContext);

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    const userName = idToken ? parseJwt(idToken).upn : "";
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg mb-2" style={{ backgroundColor: "#e3f2fd" }}>
            <div className='container'>
                <a className="navbar-brand mr-auto" href="/">
                    Мой статичный сайт
                </a>
                
                <div style={{ color: "white" }}>
                    {userName}
                </div>
            </div>
        </nav>
    )
}