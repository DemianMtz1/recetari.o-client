import {
    Switch,
    Route
} from 'react-router-dom';
import { AgregarCategorias } from '../../screens/AgregarCategorias';
import { AgregaReceta } from '../../screens/AgregaReceta';
import { AgregarMedidas } from '../../screens/AgregarMedidas';
import { EditarReceta } from '../../screens/EditarReceta';
import { Home } from '../../screens/Home';
import { Login } from '../../screens/LogIn';
import { Register } from '../../screens/Register';
import { TusCategorias } from '../../screens/TusCategorias';
import { TusMedidas } from '../../screens/TusMedidas';
import { TusRecetas } from '../../screens/TusRecetas';
import { VerReceta } from '../../screens/VerReceta';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/log-in" exact>
                <Login />
            </Route>
            <Route path="/register" exact>
                <Register />
            </Route>
            <Route path="/crear-recetas" exact>
                <AgregaReceta />
            </Route>
            <Route path="/tus-recetas" exact>
                <TusRecetas />
            </Route>
            <Route path="/ver-receta/:id" exact>
                <VerReceta />
            </Route>
            <Route path="/editar-receta/:id" exact>
                <EditarReceta />
            </Route>
            <Route path="/admin/categorias" exact>
                <TusCategorias />
            </Route>
            <Route path="/admin/crear-categoria" exact >
                <AgregarCategorias />
            </Route>
            <Route path="/admin/medidas" exact>
                <TusMedidas />
            </Route>
            <Route path="/admin/crear-medidas" exact>
                <AgregarMedidas />
            </Route>
        </Switch>
    )
}
