import {
    Switch,
    Route
} from 'react-router-dom';
import { AgregaReceta } from '../../screens/AgregaReceta';
import { EditarReceta } from '../../screens/EditarReceta';
import { Home } from '../../screens/Home';
import { Login } from '../../screens/LogIn';
import { Register } from '../../screens/Register';
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
        </Switch>
    )
}
