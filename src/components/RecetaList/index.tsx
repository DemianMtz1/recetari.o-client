import { useHistory } from "react-router-dom";

export const RecetaList = (props: any) => {
    const history = useHistory()
    const { recipe, categories, handleDeleteRecipe } = props;

    const showCategory = (categories: any[], recipe: any) => {
        const filteredCategories: any = categories.find((category) => category._id === recipe.categoryId)
        return " " + filteredCategories.title;
    }

    return (
        <div className="list-group-item" >
            <div className="d-flex w-100 justify-content-between">
                <h5 className="fw-bold mb-1">{recipe.title}</h5>
                <div className="d-flex">
                    <span className="fas fa-edit px-3 text-secondary pointer" onClick={() => history.push(`/editar-receta/${recipe._id}`)}></span>
                    <span className="fas fa-times-circle text-danger pointer" onClick={() => handleDeleteRecipe(recipe._id)}></span>
                </div>
            </div>
            <p className="mb-1 fst-italic">{recipe.description}</p>
            <p className="fw-bold">Categoria: </p>
            <small className="text-muted">{showCategory(categories, recipe)}</small>
            <div className="w-100">
                <button className="my-3 primary-button" onClick={() => history.push(`/ver-receta/${recipe._id}`)}>
                    Ver mas...
                </button>
            </div>
        </div>
    )
}
