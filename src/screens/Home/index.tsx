import axios from 'axios';
import jwt from 'jsonwebtoken';

import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import chefsito from '../../assets/img/chef-receta.svg';
import ceviche from '../../assets/img/chefsito.png';
import './styles/homeStyles.scss';

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

export const Home = () => {

    const history = useHistory();
    const [user, setUser] = useState(defaultUser);

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
                console.error(error.response.data.message);
            }
        }
        getProfile()
    }, [])

    const handleGettingStart = () => {
        if(user.email){
            history.push('/crear-recetas')
            return;
        }
        history.push('/log-in');
    }


    return (
        <>
            <div className="container container-fluid">
                <div className="row pb-5">
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center text-header-wrapper">
                        <h1>Bienvenidos a Recetar.io</h1>
                        <p>Aplicación desarrollada para las personas que quieren guardar sus recetas.</p>
                        <button type="button" className=" primary-button" onClick={handleGettingStart}>Empecemos!</button>
                    </div>
                    <div className="col-12 col-md-7 mt-4">
                        <div className="img-header-wrapper">
                            <img src={ceviche} alt="chefsito" />
                        </div>
                    </div>
                </div>

                <div className="row py-5 mt-5">
                    <div className="d-none d-md-block col-12 col-md-6 ">
                        <div className="img-header-wrapper">
                            <img src={chefsito} alt="chefsito-1" />
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center flex-column text-section">
                        <h2>Recetario Online</h2>
                        <p>Construye tu propio libro culinario de manera completamente gratuita.</p>
                    </div>
                    <div className="col-12 d-md-none">
                        <div className="img-header-wrapper">
                            <img src={chefsito} alt="chefsito-1" />
                        </div>
                    </div>
                </div>

                <div className="row py-5 mt-5">
                    <div className="col-12 text-section">
                        <h2 className="text-center">¿Que se puede hacer?</h2>
                    </div>
                    <div className="col-12 col-md-4 mt-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">Agrega tus recetas</h5>
                                <p className="card-text">Al tener una cuenta en Recetar.io podras crear de manera gratuita la cantidad de recetas que necesites y sin ningun tipo de limitante.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Mide el peso de tus ingredientes</h5>
                                <p className="card-text">Al agregar un ingrediente en tu receta se podra medir el peso de cada uno de estos dependiendo de la medida que se utilizo(gr, litros, ml, etc...)).</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Modifica y elimina tus recetas</h5>
                                <p className="card-text">Si tu receta cambio o simplemente ya no la necesitas podras editarla y elimnarla en cualquier momento.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
