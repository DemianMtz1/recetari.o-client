import axios from 'axios';
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import chefsitoMirar from '../../assets/img/chef-receta-3.svg';
import { RecetaList } from '../../components/RecetaList';
import './styles/tusRecetasStyles.scss';
type Recipe = {
    authorId: string,
    title: string,
    description: string,
    categoryId: string,
    ingredients: any[],
    procedure: string
}

export const TusRecetas = () => {
    const history = useHistory();
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [categories, setCategories] = useState<any>();
    const [hasRemoved, setHasRemoved] = useState<boolean>(false);

    useEffect(() => {
        const getRecipes = async () => {
            try {
                const token = window.localStorage.getItem('rttoken');
                if (!token) {
                    history.push('/log-in')
                    return;
                }
                const tokenDecoded: any = jwt.decode(token);

                const { data } = await axios.get('https://recetario-app-edmv.herokuapp.com/recipes');

                setRecipes(data.data.recipes.filter((recipe: Recipe) => recipe.authorId === tokenDecoded.id))
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

        getRecipes()
        return () => {
            setRecipes([])
        }
    }, [hasRemoved]);

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
    }, []);

    const handleDeleteRecipe = async (id:string) => {
        try {
            const token = window.localStorage.getItem('rttoken');
            const options = {
                headers: {
                    authorization: token
                }
            }
            const { data } = await axios.delete(`https://recetario-app-edmv.herokuapp.com/recipes/${id}`, options);
            setHasRemoved(true);
            setHasRemoved(false);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    } 
    
    return (
        <div className="container container-fluid">
            <div className="row pb-5">
                <div className="col-12 col-md-5 d-flex flex-column justify-content-center text-header-wrapper">
                    <h1>Tus recetas</h1>
                    <p>En esta seccion podras encontrar todas las recetas que haz agregado.</p>
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
                            <h4>Tus recetas</h4>
                            <span className="icon-sm text-white fas fa-plus-circle pointer" onClick={()=>history.push('/crear-recetas')}></span>
                        </div>
                    </div>
                    <div className="w-100 list-group text-dark mt-3">
                        {
                            !recipes || !categories ?
                                null
                                :
                                recipes.map((recipe: any) => <RecetaList key={recipe._id} recipe={recipe} categories={categories} handleDeleteRecipe={handleDeleteRecipe} />)
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
