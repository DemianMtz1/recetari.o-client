import axios from 'axios';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';
import {
    Link, useHistory, useLocation
} from 'react-router-dom';
import { MenuNav } from '../MenuNav';
import './styles/navbarStyles.scss';

interface Visibility {
    isVisible: boolean
}

type User = {
    firstName: string,
    lastName: string,
    avatar: string,
    email: string,
    username: string,
    password: string,
    role: string
}

const defaultUser: User = {
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    username: "",
    password: "",
    role: ""
}
const Navbar = () => {
    const location = useLocation();
    const history = useHistory();

    const [user, setUser] = useState(defaultUser);
    const [visibility, setVisibility] = useState<Visibility>({
        isVisible: false
    });

    const handleLogOut = () => {
        window.localStorage.removeItem('rttoken');
        history.push('/');
        window.location.reload();
    }



    useEffect(() => {
        const getProfile = async () => {
            try {
                const token = window.localStorage.getItem('rttoken');
                if (!token) {
                    return;
                }
                const today: Date = new Date();
                const tokenDecoded: any = jwt.decode(token);

                if (tokenDecoded.exp * 1000 < today.getTime()) {
                    window.localStorage.removeItem('rttoken');
                    return;
                }

                const options = {
                    headers: {
                        authorization: window.localStorage.getItem('rttoken')
                    }
                }
                const { data } = await axios.get('https://recetario-app-edmv.herokuapp.com/users/profile', options);

                setUser(data.data.user);
            } catch (error) {
                console.error(error);
            }
        }
        getProfile()
    }, []);

    return (
        <>
            {
                location.pathname === '/log-in' || location.pathname === '/register' ?
                    <nav className="w-100 p-3 d-flex justify-content-between  custom-nav fixed-pos">
                        <h1 onClick={() => history.push('/')}>Recetar<span>.io</span></h1>
                        <span className="icon fas fa-bars d-md-none" onClick={() => setVisibility({ isVisible: !visibility.isVisible })}></span>
                        {
                            visibility.isVisible && (
                                <ul className="nav-menu p-4 d-md-none">
                                    <div className="align-self-end">
                                        <span className="icon-sm fas fa-times text-white" onClick={() => setVisibility({ isVisible: !visibility.isVisible })} ></span>
                                    </div>
                                    {
                                        user.email ?
                                            <MenuNav
                                                isMobile={true}
                                                handleLogOut={handleLogOut}
                                            />
                                            :
                                            <>
                                                <li><Link to="/log-in">Inicia sesion</Link></li>
                                                <button type="button" className="primary-button" onClick={() => history.push('/register')}>Registrate!</button>
                                            </>
                                    }
                                </ul>
                            )
                        }
                        <ul className="d-none d-md-flex">
                            {
                                user.email ?
                                    <MenuNav
                                        handleLogOut={handleLogOut}
                                    />
                                    :
                                    <>
                                        <li><Link to="/log-in">Inicia sesion</Link></li>
                                        <button type="button" className="primary-button" onClick={() => history.push('/register')}>Registrate!</button>
                                    </>
                            }
                        </ul>
                    </nav>
                    :
                    <nav className='w-100 p-3 d-flex justify-content-between  custom-nav'>
                        <h1 onClick={() => history.push('/')}>Recetar<span>.io</span></h1>
                        <span className="icon fas fa-bars d-md-none" onClick={() => setVisibility({ isVisible: !visibility.isVisible })}></span>
                        {
                            visibility.isVisible && (
                                <ul className="nav-menu p-4 d-md-none">
                                    <div className="align-self-end">
                                        <span className="icon-sm fas fa-times text-white" onClick={() => setVisibility({ isVisible: !visibility.isVisible })} ></span>
                                    </div>
                                    {
                                        user.email ?
                                            <MenuNav
                                                isMobile={true}
                                                handleLogOut={handleLogOut}
                                            />
                                            :
                                            <>
                                                <li><Link to="/log-in">Inicia sesion</Link></li>
                                                <button type="button" className="primary-button" onClick={() => history.push('/register')}>Registrate!</button>
                                            </>
                                    }
                                </ul>
                            )
                        }
                        <ul className="d-none d-md-flex">
                            {
                                user.email ?
                                    <MenuNav
                                        handleLogOut={handleLogOut}
                                    />
                                    :
                                    <>
                                        <li><Link to="/log-in">Inicia sesion</Link></li>
                                        <button type="button" className="primary-button" onClick={() => history.push('/register')}>Registrate!</button>
                                    </>
                            }
                        </ul>
                    </nav>
            }
        </>
    )
}

export default Navbar