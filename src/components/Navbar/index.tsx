import { useState } from 'react';
import {
    Link, useLocation
} from 'react-router-dom';
import './styles/navbarStyles.scss';

interface Visibility {
    isVisible: boolean
}

const Navbar = () => {
    const location = useLocation();

    const [visibility, setVisibility] = useState<Visibility>({
        isVisible: false
    })


    return (
        <>
            {
                location.pathname === '/log-in' || location.pathname === '/register' ?
                    null 
                    :
                    <nav className="w-100 p-4 d-flex justify-content-between align-items-center custom-nav">
                        <h1>Recetar<span>.io</span></h1>
                        <span className="icon fas fa-bars d-md-none" onClick={() => setVisibility({ isVisible: !visibility.isVisible })}></span>
                        {
                            visibility.isVisible && (
                                <ul className="nav-menu p-4 d-md-none">
                                    <div className="align-self-end">
                                        <span className="icon-sm fas fa-times text-white" onClick={() => setVisibility({ isVisible: !visibility.isVisible })} ></span>
                                    </div>
                                    <li><Link to="/tus-recetas" className="text-white">Inicia Sesion</Link></li>
                                    <li><Link to="/tus-recetas" className="text-white">Registrate</Link></li>
                                </ul>
                            )
                        }
                        <ul className="d-none d-md-flex">
                            <li><Link to="/log-in">Inicia sesion</Link></li>
                            <button type="button" className="primary-button">Registrate!</button>
                        </ul>
                    </nav>
            }
        </>
    )
}

export default Navbar
