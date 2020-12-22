import './login.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Christmas from "./occasions/christmas";
import Login from "./login";
import firebase from "firebase";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class App extends React.Component{
    constructor(props) {
        super(props);

        this.db = firebase.firestore();
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Login db={this.db} history={history}/>
                        </Route>
                        <Route path="/christmas">
                            <Christmas db={this.db}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
