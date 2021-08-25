import axios from 'axios';
import jwt from 'jsonwebtoken';
import chefsito from '../../assets/img/chef-receta-2.svg';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import './styles/loginStyles.scss';

type User = {
    email: string,
    password: string
}

const defaultUser: User = {
    email: "",
    password: ""
}

export const Login = () => {
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

    const handleChangeUser = (ev: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, [ev.target.name]: ev.target.value })

    const handleSubmitUser = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        try {
            const { email, password } = user;

            if (!email || !password) {
                toast.error('Upss... Se te ha olvidado rellenar los campos')
                return;
            }

            const { data } = await axios.post('https://recetario-app-edmv.herokuapp.com/users/signin', user);
            window.localStorage.setItem('rttoken', data.data.token);
            toast.success('Inicio de sesión exitosa');
            setUser(defaultUser);
            window.location.reload();
            history.push('/')
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <>
            <div className="w-100 d-flex content-wrapper">
                <section className="">
                    <div>
                        <h1>Recetar<span>.io</span></h1>
                        <p>"Ser cocinero es un gran honor. Llamarse "chef", una pequeña huachafería" <span>- Gastón Acurio</span></p>
                    </div>
                </section>

                <section className="p-4 d-flex flex-column justify-content-center">
                    <form className="p-4 shadow" onSubmit={handleSubmitUser}>
                        <h3 className="text-center">Inicia sesión</h3>
                        <div className="mb-3">
                            <label className="form-label">Correo:</label>
                            <input
                                className="form-control"
                                placeholder="Eg. ericdemian.m@hotmail.com..."
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChangeUser}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Contraseña:</label>
                            <input
                                className="form-control" placeholder="*******************"
                                type="password"
                                name="password"
                                value={user.password}
                                onChange={handleChangeUser}
                            />
                        </div>
                        <button type="submit" className="primary-button w-100 mb-3">Inicia sesión</button>

                        <div className="mb-3 d-flex justify-content-end w-100 create-section">
                            <span onClick={() => history.push('/register')}>Crear una cuenta</span>
                        </div>
                    </form>

                    <img className="abs-img" src={chefsito} alt="img-absolute" />

                </section>
            </div>
        </>
    )
}
