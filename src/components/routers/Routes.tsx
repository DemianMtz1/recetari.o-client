import {
    Switch,
    Route
} from 'react-router-dom';
import { Home } from '../../screens/Home';
import { Login } from '../../screens/LogIn';

export const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <Home />
            </Route>
            <Route path="/log-in" exact>
                <Login />
            </Route>
            <Route path="/crear-recetas" exact>
                Crear recetas
            </Route>
            <Route path="/tus-recetas" exact>
                Tus recetas
            </Route>
            <Route path="/receta/:id" exact>
                Receta by id
            </Route>
        </Switch>
    )
}
