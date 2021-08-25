import axios from "axios";
import jwt from 'jsonwebtoken';
import logo from '../../assets/img/chefsito.png';
import leerReceta from '../../assets/img/leer-receta.svg'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import './styles/verRecetaStyles.scss';
type Recipe = {
    _id: string,
    title: string,
    description: string,
    categoryId: string,
    ingredients: any[],
    procedure: string,
    authorId: string
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
const defaultRecipe: Recipe = {
    _id: "",
    title: "",
    description: "",
    categoryId: "",
    ingredients: [],
    procedure: "",
    authorId: ""
}

export const VerReceta = () => {
    const params: any = useParams();
    const [recipe, setRecipe] = useState(defaultRecipe);
    const [categories, setCategories] = useState<any[]>([]);

    const [total, setTotal] = useState({});
    const [user, setUser] = useState(defaultUser);

    useEffect(() => {
        const getRecipeById = async () => {
            try {
                const { data } = await axios.get(`https://recetario-app-edmv.herokuapp.com/recipes/${params.id}`);
                setRecipe(data.data.recipe);
            } catch (error) {
                console.error(error);
            }
        }
        getRecipeById()
        return () => {
            setRecipe(defaultRecipe)
        }
    }, []);

    useEffect(() => {
        const getTotal = async () => {
            try {
                if (!recipe._id) {
                    return;
                }

                const { data } = await axios.get('https://recetario-app-edmv.herokuapp.com/measures');
                let totalHashMap: any = {};
                data.data.measures.forEach((measure: any) => {
                    totalHashMap = {
                        ...totalHashMap,
                        [measure.measureType]: {
                            total: 0
                        }
                    }
                })
                recipe.ingredients.forEach((ingredient: any) => {
                    for (const key in totalHashMap) {
                        if (key === ingredient.ingredientMeasure) {
                            totalHashMap[key].total += (ingredient.ingredientQuantity * ingredient.quantity)
                        }
                    }
                })
                setTotal(totalHashMap);
            } catch (error) {
                console.error(error);
            }
        }
        getTotal()
        return () => {
            setTotal({})
        }
    }, [recipe])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios.get('https://recetario-app-edmv.herokuapp.com/categories');
                setCategories(data.data.categories)
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        getCategories()
        return () => {
            setCategories([])
        }
    }, [])

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
                setUser(data.data.user);
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        getUser()
        return () => {
            setUser(defaultUser)
        }
    }, [])

    return (
        <div className="container container-fluid ver-receta-container">
            <div className="row">
                <div className="col-12 wrapper-section">
                    <section className="bg-primary-color pt-5 shadow">
                        <div className="w-100 p-4 shadow ver-receta">
                            <div className="img-receta-wrapper">
                                <img src={logo} alt="logo-pagina" />
                                <p className="fw-bold text-primary-color">{!user.firstName ? null : user.firstName + ' ' + user.lastName}</p>
                            </div>
                            <div className="receta-wrapper mt-3">
                                <section className="p-2 p-md-4">
                                    <div className="d-flex mb-3 w-100 flex-wrap">
                                        <h3 className="fw-bold">Nombre receta:</h3>
                                        <p>{!recipe.title ? null : recipe.title}</p>
                                    </div>

                                    <div className="d-flex mb-3 w-100 flex-wrap">
                                        <h3 className="fw-bold">Descripción de la receta:</h3>
                                        <p>{!recipe.description ? null : recipe.description}</p>
                                    </div>

                                    <div className="d-flex mb-3 w-100 flex-wrap">
                                        <h3 className="fw-bold">Procedimiento:</h3>
                                        <p>{!recipe.procedure ? null : recipe.procedure}</p>
                                    </div>

                                    <div className="d-flex mb-3 w-100 flex-wrap">
                                        <h3 className="fw-bold">Categoria:</h3>
                                        <p>
                                            {
                                                categories.length <= 0 || !recipe.categoryId ?
                                                    null
                                                    :
                                                    categories.find((category: any) => category._id === recipe.categoryId).title

                                            }
                                        </p>
                                    </div>
                                </section>

                                <section className="p-2 p-md-4">
                                    <div className="d-flex flex-column mb-3 w-100 flex-wrap">
                                        <h3 className="fw-bold">Ingredients:</h3>
                                        <ul>
                                            {
                                                recipe.ingredients.length <= 0
                                                    ?
                                                    null
                                                    :
                                                    recipe.ingredients.map((ingredient: any) => <li className="" key={ingredient._id}><span>{ingredient.ingredientName} {ingredient.ingredientQuantity} {ingredient.ingredientMeasure} </span> <span className="fw-bold text-primary-color"> x{ingredient.quantity}</span></li>)
                                            }
                                        </ul>
                                        <p className="fw-bold">Total Peso:</p>
                                        <p>
                                            {
                                                Object.keys(total).length <= 0 ?
                                                    null
                                                    :
                                                    Object.entries(total).map(([key, value]: any, idx: number) => {
                                                        if (value.total > 0) {
                                                            return ` ${value.total} ${key} -`
                                                        }
                                                    })
                                            }
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </section>


                </div>

            </div>

            <img className="d-none d-md-block img-abs-receta" src={leerReceta} alt="leer-receta" />
        </div >
    )
}
