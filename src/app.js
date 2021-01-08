import './login.css';
import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Birthday from "./occasions/birthday/birthday";
import Christmas from "./occasions/christmas/christmas";
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
                        <Route exact path="/gift-website/">
                            <Login db={this.db} history={history}/>
                        </Route>
                        <Route path="/gift-website/christmas">
                            <Christmas db={this.db}/>
                        </Route>
                        <Route path="/gift-website/birthday">
                            <Birthday db={this.db}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
