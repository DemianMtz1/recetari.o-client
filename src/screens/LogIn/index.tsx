import './styles/loginStyles.scss';

export const Login = () => {
    return (
        <>
            <div className="login-section p-3">
                <form>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="example@gmail.com..." />
                    </div>

                    <div className="form-group mt-3">
                        <label>Contraseña</label>
                        <input type="password" placeholder="************" />
                    </div>

                    <button className="btn btn-dark w-100 mt-2">Iniciar sesión</button>
                </form>
            </div>
        </>
    )
}
