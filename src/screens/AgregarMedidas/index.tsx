import axios from "axios";
import jwt from 'jsonwebtoken';
import leerReceta from '../../assets/img/chef-measures.svg';
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

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

type Measure = {
    measureType: string
}

const defaultMeasure: Measure = {
    measureType: ""
}
export const AgregarMedidas = () => {
    const [user, setUser] = useState(defaultUser);
    const [measure, setMeasure] = useState(defaultMeasure);
    const history = useHistory();

    useEffect(() => {
        const getUser = async () => {
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
                if (data.data.user.role !== 'admin') {
                    history.push('/');
                    toast.error('Ruta protegida, no cuentas con los permisos...')
                    return;
                }
                setUser(data.data.user);
            } catch (error: any) {
                toast.error(error.response.data.message)
            }
        }
        getUser()
        return () => {
            setUser(defaultUser)
        }
    }, []);

    const handleChangeTitle = (ev: React.ChangeEvent<HTMLInputElement>) => setMeasure({ ...measure, [ev.target.name]: ev.target.value })

    const handleSubmitCategory = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            const token = window.localStorage.getItem('rttoken') || "";
            if (!measure.measureType) {
                toast.error('Upsss... Olvidaste nombrar a tu categoria');
                return;
            }

            if (user.role !== 'admin') {
                history.push('/');
                toast.error('Ruta protegida, no cuentas con los permisos...')
                return;
            }
            const options = {
                headers: {
                    authorization: token
                }
            }
            await axios.post('https://recetario-app-edmv.herokuapp.com/measures', measure, options);
            toast.success('Categoria agregada de manera satisfactoria :D');
            setMeasure(defaultMeasure);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="container container-fluid ver-receta-container">
            <div className="row">
                <div className="col-12 wrapper-section">
                    <section className="bg-primary-color pt-4 shadow">
                        <div className="w-100 p-4 shadow ver-receta shadow">
                            <form onSubmit={handleSubmitCategory}>
                                <h3 className="mb-3 fw-bold text-center">Agrega las medidas</h3>
                                <div className="mb-3">
                                    <label className="text-muted mb-2">Nombre de la medida metrica:</label>
                                    <input
                                        className="mt-2"
                                        placeholder="E.g. Cucharadas..."
                                        type="text"
                                        name="measureType"
                                        value={measure.measureType}
                                        onChange={handleChangeTitle}
                                    />
                                </div>

                                <button className="primary-button w-100">Agregar medidas</button>
                            </form>
                        </div>
                    </section>


                </div>

            </div>

            <img className="d-none d-md-block img-abs-receta" src={leerReceta} alt="leer-receta" />
        </div >
    )
}
