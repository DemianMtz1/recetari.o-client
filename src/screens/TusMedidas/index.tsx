import axios from 'axios';
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import chefsitoMirar from '../../assets/img/chef-categorias.svg';

type Measure = {
    _id: string,
    measureType: string
}

export const TusMedidas = () => {
    const history = useHistory();
    const [measures, setMeasures] = useState([]);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        const getMeasures = async () => {
            try {
                const { data } = await axios.get('https://recetario-app-edmv.herokuapp.com/measures');
                setMeasures(data.data.measures)
            } catch (error: any) {
                toast.error(error.response.data.message);
            }
        }
        getMeasures()
        return () => {
            setMeasures([])
        }
    }, [isDeleted]);

    const handleDeleteMeasures = async (id: string) => {
        try {
            const token = window.localStorage.getItem('rttoken');
            const options = {
                headers: {
                    authorization: token
                }
            }
            const { data } = await axios.delete(`https://recetario-app-edmv.herokuapp.com/measures/${id}`, options);
            toast.success('Medida eliminada correctamente :D');
            setIsDeleted(true);
            setIsDeleted(false);
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    }

    const ListData = (props: any) => {
        return (
            <div className="list-group-item" >
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="fw-bold mb-1">{props.measure.measureType}</h5>
                    <div className="d-flex">
                        <span className="fas fa-times-circle text-danger pointer" onClick={() => props.handleDeleteMeasures(props.measure._id)}></span>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container container-fluid">
            <div className="row pb-5">
                <div className="col-12 col-md-5 d-flex flex-column justify-content-center text-header-wrapper">
                    <h1>Tus medidas</h1>
                    <p>En esta seccion podras encontrar todas las medidas que haz agregado como adminsitrador.</p>
                </div>
                <div className="col-12 col-md-7 mt-4">
                    <div className="img-header-wrapper">
                        <img src={chefsitoMirar} alt="chefsito" className="w-50" />
                    </div>
                </div>
            </div>


            <div className="row">
                <div className="col-12 text-white">
                    <div className="w-100 bg-primary-color p-2 px-3 rounded">
                        <div className="w-100 d-flex justify-content-between align-items-center">
                            <h4>Tus medidas</h4>
                            <span className="icon-sm text-white fas fa-plus-circle pointer" onClick={() => history.push('/admin/crear-medidas')}></span>
                        </div>
                    </div>
                    <div className="w-100 list-group text-dark mt-3">
                        {
                            measures.length === 0 ?
                                null
                                :
                                measures.map((measure: Measure) => <ListData measure={measure} handleDeleteMeasures={handleDeleteMeasures} />)
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
