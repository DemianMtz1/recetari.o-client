export const IngredientList = (prop: any) => {
    const { ingredient, handleRemoveIngredient } = prop;

    return (
        <>
            <li key={ingredient.NOOID} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                    <p className="fw-bold m-0 mb-2">{`${ingredient.ingredientName} x${ingredient.quantity}`}</p>
                    <p className="text-muted m-0">{`${ingredient.ingredientQuantity} ${ingredient.ingredientMeasure}`}</p>
                </div>
                <span className="fas fa-times icon-sm" onClick={() => handleRemoveIngredient(ingredient)}>
                </span>
            </li>
        </>
    )
}
