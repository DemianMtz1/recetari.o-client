import axios from "axios";
import jwt from 'jsonwebtoken';
import chefsito from '../../assets/img/chef-receta-4.svg';

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import './styles/registerStyles.scss';

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
    role: "user"
}



export const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        const validateToken = () => {
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
            history.push('/')
        }
        validateToken()
    }, [])

    const handleChangeUser = (ev: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, [ev.target.name]: ev.currentTarget.value })


    const handleSubmitUser = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            const { firstName, lastName, avatar, email, username, password, role } = user;

            if (!firstName || !lastName || !avatar || !email || !username || !password || !role) {
                toast.error('Upss... No se pueden enviar campos vacios.');
                return;
            }

            const { data } = await axios.post('https://recetario-app-edmv.herokuapp.com/users/signup', user);
            toast.success('Cuenta registrada!');
            window.localStorage.setItem('rttoken', data.data.token);
            setUser(defaultUser);
            history.push('/');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className="w-100 d-flex content-register">
                <section className="">
                    <div>
                        <h1>Recetar<span>.io</span></h1>
                        <p>"Ser cocinero es un gran honor. Llamarse "chef", una pequeña huachafería"<span> - Gastón Acurio</span></p>
                    </div>
                </section>
                <section className="p-4 d-flex flex-column justify-content-center">
                    <form className="p-4 shadow" onSubmit={handleSubmitUser}>
                        <h3 className="text-center mb-4">Crea tu cuenta</h3>
                        <div className="mb-4">
                            <label className="form-label">Primer nombre:</label>
                            <input
                                className="form-control"
                                placeholder="Eg. Clarence..."
                                type="text"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleChangeUser}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Apellido paterno:</label>
                            <input
                                className="form-control"
                                placeholder="Eg. Smith..."
                                type="text"
                                name="lastName"
                                value={user.lastName}
                                onChange={handleChangeUser}
                            />

                        </div>

                        <div className="mb-4">
                            <label className="form-label">Foto de perfil:</label>
                            <input
                                className="form-control"
                                placeholder="Eg. https://googleimages.com/image-123..."
                                type="text"
                                name="avatar"
                                value={user.avatar}
                                onChange={handleChangeUser}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Email:</label>
                            <input
                                className="form-control"
                                placeholder="Eg. toron65.m@hotmail.com..."
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChangeUser}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Nombre de usuario:</label>
                            <input
                                className="form-control"
                                placeholder="Eg. ChefHernan122..."
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleChangeUser}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Password:</label>
                            <input
                                className="form-control"
                                placeholder="Como minimo 6 caracteres"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChangeUser}
                            />
                        </div>

                        <button type="submit" className="primary-button w-100 mb-4">Registrarse</button>

                        <div className="mb-4 d-flex justify-content-end w-100 create-section">
                            <span onClick={() => history.push('/log-in')}>Ya tengo cuenta.</span>
                        </div>
                    </form>
                    <img src={chefsito} alt="chefsito-img" className="abs-img" />
                </section>
            </div>
        </>
    )
}
