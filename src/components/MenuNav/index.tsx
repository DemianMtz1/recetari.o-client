import {
    Link,
} from 'react-router-dom';

export const MenuNav = (props: any) => {

    if (props.isMobile) {
        return (
            <>
                <li><Link to="/crear-recetas">Agrega receta</Link></li>
                <li><Link to="/tus-recetas">Tus recetas</Link></li>
                {
                    props.user.role === 'admin' ?
                        <>
                            <li><Link to="/admin/categorias">Categorias</Link></li>
                            <li><Link to="/admin/medidas">Medidas</Link></li>
                        </>
                        :
                        null
                }
                <li onClick={props.handleLogOut}>Cerrar Sesión</li>
            </>
        )
    }


    return (
        <>
            <li><Link to="/crear-recetas">Agrega receta</Link></li>
            <li><Link to="/tus-recetas">Tus recetas</Link></li>
            {
                props.user.role === 'admin' ?
                    <>
                        <li><Link to="/admin/categorias">Categorias</Link></li>
                        <li><Link to="/admin/medidas">Medidas</Link></li>
                    </>
                    :
                    null
            }
            <button type="button" className="primary-button" onClick={props.handleLogOut}>Cerrar Sesión</button>
        </>
    )

}
