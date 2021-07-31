import ceviche from '../../assets/img/chefsito.png';
import chefsito from '../../assets/img/chef-receta.svg';

import './styles/homeStyles.scss';

export const Home = () => {
    return (
        <>
            <div className="container container-fluid">
                <div className="row pb-5">
                    <div className="col-12 col-md-5 d-flex flex-column justify-content-center text-header-wrapper">
                        <h1>Bienvenidos a Recetar.io</h1>
                        <p>Aplicación desarrollada para las personas que quieren guardar sus recetas.</p>
                        <button type="button" className=" primary-button">Empecemos!</button>
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
                        <h2>Lorem ipsum bla bla</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sapiente neque dolorem quis in ducimus aliquam blanditiis, nisi fugiat consequatur quod at perspiciatis error perferendis. Necessitatibus voluptatibus consequuntur repudiandae recusandae.</p>
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
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Visualiza tus recetas guardadas</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mt-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title font-weight-bold">Elimina recetas que no necesites</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
