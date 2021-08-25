import { useEffect, useState } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';
import { IngredientList } from '../../components/IngredientList';
import './styles/agReceta.scss';

type Recipe = {
    authorId: string,
    title: string,
    description: string,
    categoryId: string,
    ingredients: any[],
    procedure: string
}

type Ingredient = {
    NOOID: string,
    ingredientName: string,
    quantity: number,
    ingredientQuantity: number,
    ingredientMeasure: string
}

const defaultRecipe: Recipe = {
    authorId: "",
    title: "",
    description: "",
    categoryId: "",
    ingredients: [],
    procedure: ""
}

const defaultIngredient: Ingredient = {
    NOOID: "",
    ingredientName: "",
    quantity: 0,
    ingredientQuantity: 0,
    ingredientMeasure: ""
}

export const AgregaReceta = () => {
    const [categories, setCategories] = useState<any>();
    const [measures, setMeasures] = useState<any>();
    const [ingredients, setIngredients] = useState<any[]>([]);

    const [recipe, setRecipe] = useState(defaultRecipe);
    const [ingredient, setIngredient] = useState(defaultIngredient);
    const [total, setTotal] = useState({});

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
        const getMeasures = async () => {
            try {
                const { data } = await axios.get('https://recetario-app-edmv.herokuapp.com/measures');
                setMeasures(data.data.measures)
            } catch (error) {
                toast.error(error.response.data.message);
            }
        }
        getMeasures()
        return () => {
            setMeasures([])
        }
    }, [ingredients]);

    useEffect(() => {
        const getTotal = () => {
            if (!measures || !ingredients) {
                return;
            }
            let totalHashMap: any = {};
            measures.forEach((measure: any) => {
                totalHashMap = {
                    ...totalHashMap,
                    [measure.measureType]: {
                        total: 0
                    }
                }
            })
            ingredients.forEach((ingredient: any) => {
                for (const key in totalHashMap) {
                    if (key === ingredient.ingredientMeasure) {
                        totalHashMap[key].total += (ingredient.ingredientQuantity * ingredient.quantity)
                    }
                }
            })
            setTotal(totalHashMap)
        }
        getTotal();
        return () => {
            setTotal({})
        }
    }, [measures, ingredients])

    const handleChangeRecipe = (ev: React.ChangeEvent<HTMLInputElement>) => setRecipe({ ...recipe, [ev.target.name]: ev.target.value })

    const handleChangeIngredient = (ev: React.ChangeEvent<HTMLInputElement>) => setIngredient({ ...ingredient, [ev.target.name]: ev.target.value })

    const handleSubmitRecipe = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {

            const token = window.localStorage.getItem('rttoken') || "";
            const options = {
                headers: {
                    authorization: token
                }
            }
            const user: any = jwt.decode(token);

            if (!recipe.categoryId || !recipe.description || !recipe.procedure || !recipe.title) {
                console.log(recipe);
                toast.error("Upss... Se te olvido llenar los campos.");
                return
            }
            if (ingredients.length <= 0) {
                toast.error("Upss... Se te ha olvidado agregarle ingredientes a tu receta.");
                return
            }

            const newRecipe = {
                ...recipe,
                ingredients: ingredients,
                authorId: user.id
            }

            const { data } = await axios.post('https://recetario-app-edmv.herokuapp.com/recipes', newRecipe, options);
            setRecipe(defaultRecipe);
            console.log(data);
            toast.success("La receta se agrego de manera exitosa.");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleSubmitIngredient = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        try {
            if (!ingredient.ingredientMeasure || !ingredient.ingredientName || !ingredient.ingredientQuantity || !ingredient.quantity) {
                toast.error("Upss... Se te olvido llenar los campos.");
                return
            }
            const today = new Date().getTime();
            const newIngredient: Ingredient = {
                ...ingredient,
                NOOID: today.toLocaleString()
            }
            setIngredients([...ingredients, newIngredient]);
            setIngredient(defaultIngredient);
            toast.success('Ingrediente añadido correctamente.')
        } catch (error) {
            toast.error(error.message);
        }
    }

    const handleRemoveIngredient = (ingredient: Ingredient) => {
        const filteredIngredients = ingredients.filter((ingredientFiltered: Ingredient) => ingredientFiltered.NOOID !== ingredient.NOOID);
        setIngredients(filteredIngredients);
    }

    return (
        <div className="container container-fluid content-agrega">
            <div className="row d-flex justify-content-center ">
                <div className="col-12 col-md-8 mb-4">
                    <form className="peso-content w-100 p-4 shadow" onSubmit={handleSubmitRecipe}>
                        <h3 className="mb-3 fw-bold">Receta</h3>
                        <div className="mb-3">
                            <label>Nombre de la receta:</label>
                            <input
                                className="mt-2"
                                placeholder="E.g. Pollo asado rico"
                                type="text"
                                name="title"
                                onChange={handleChangeRecipe}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Descripción:</label>
                            <input
                                className="mt-2"
                                placeholder="E.g. Receta de pollo asado..."
                                type="text"
                                name="description"
                                onChange={handleChangeRecipe}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="w-100">Categoria:</label>
                            <select className="w-100" name="categoryId" value={recipe.categoryId} onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => setRecipe({ ...recipe, [ev.target.name]: ev.target.value })}>
                                {
                                    !recipe.categoryId ? (<option value="">-- Selecciona una categoria --</option>) : null
                                }
                                {
                                    !categories ? null : categories.map((category: any) => <option key={category._id} value={category._id}>{category.title}</option>)
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Procedimiento:</label>
                            <textarea
                                className="mt-2"
                                placeholder="Eg. Se necesitara mover 10 tipos de pollos..."
                                name="procedure"
                                value={recipe.procedure}
                                onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => setRecipe({ ...recipe, [ev.target.name]: ev.target.value })}
                            />
                        </div>
                        <button className="primary-button">Agregar receta</button>
                    </form>
                </div>

                <div className="col-12 col-md-4 mb-3">
                    <form className="peso-content shadow p-4" onSubmit={handleSubmitIngredient}>
                        <div className="mb-3">
                            <h3 className="fw-bold mb-3">Ingredientes:</h3>
                            <label>Nombre del ingrediente:</label>
                            <input
                                className="my-2"
                                placeholder="Eg. Ojos de pez..."
                                type="text"
                                name="ingredientName"
                                value={ingredient.ingredientName}
                                onChange={handleChangeIngredient}
                            />

                            <label>Cantidad:</label>
                            <input
                                className="my-2"
                                placeholder="Eg. 2"
                                type="number"
                                name="quantity"
                                value={ingredient.quantity}
                                onChange={handleChangeIngredient}
                            />
                            <div className="d-flex w-100 align-items-end my-3">
                                <label className="w-25">Peso:</label>
                                <div className="w-50 d-flex align-items-end">
                                    <input
                                        className="w-50"
                                        placeholder="Eg. 25"
                                        type="number"
                                        name="ingredientQuantity"
                                        value={ingredient.ingredientQuantity}
                                        onChange={handleChangeIngredient}
                                    />
                                    <select className="w-50" name="ingredientMeasure" onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => setIngredient({ ...ingredient, [ev.target.name]: ev.target.value })}>
                                        {
                                            !ingredient.ingredientMeasure ? (<option defaultChecked={true} value="">-- Selecciona una categoria --</option>) : null
                                        }
                                        {
                                            !measures ? null : measures.map((measure: any) => <option defaultChecked={true} key={measure._id} value={measure.measureType}>{measure.measureType}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex w-100 justify-content-between">
                            <button className="secondary-button">Añadir ingrediente</button>
                        </div>
                    </form>
                </div>

                <div className="col-12">
                    <div className="total-ingredientes p-4 shadow">
                        <h3 className="fw-bold">Total:
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
                        </h3>

                        <ul className="list-group mt-4">
                            {
                                ingredients.map((ingredient: Ingredient, idx) => <IngredientList key={idx} ingredient={ingredient} handleRemoveIngredient={handleRemoveIngredient} />)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
