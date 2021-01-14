import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import MainPage from "./pages/MainPage";
import UpdatePage from "./pages/UpdatePage";
import AddUserPage from "./pages/AddUserPage";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path='/' exact>
                        <MainPage />
                    </Route>
                    <Route path='/update/:id'>
                        <UpdatePage />
                    </Route>
                    <Route path='/add_user/:id'>
                        <AddUserPage />
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
