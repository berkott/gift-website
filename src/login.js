import './login.css';
import React from 'react';
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import firebase from "firebase";
import { withRouter } from 'react-router-dom';

class Login extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
            error: false,
            errorMessage: null,
            loading: false
        };
    }

    // componentWillUnmount() {
    //     this.setState = (state,callback)=>{
    //         return;
    //     };
    // }

    render() {
        let alert = "";
        if (this.state.error) {
            alert = (<Alert variant="danger">
                        Please try again | Error: {this.state.errorMessage}
                    </Alert>);
        }

        let button = (<Button variant="primary" onClick={() => this.login()}>
                            Submit
                        </Button>);
        if (this.state.loading) {
            button = (<Button variant="primary" disabled={true}>
                        Loading...
                    </Button>);
        }

        return (
            <Container className="centered-box">
                {alert}
                <Card>
                    <Card.Body>
                        <Card.Title>Login</Card.Title>
                        <Card.Text>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={(event) => this.setState({email: event.target.value})}/>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                                </Form.Group>

                                {button}
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    login() {
        this.setState({loading: true});

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((user) => {
                this.props.db.collection("users").doc(user.user.uid).get().then((doc) => {
                    this.setState({loading: false});
                    if (doc.exists) {
                        this.props.history.push('/' + doc.data().occasion);
                        // window.location.assign();
                    } else {
                        console.log("No such document!");
                    }
                }).catch((err) => {
                    this.setState({error: true, errorMessage: err.message, loading: false});
                });
            }).catch((err) => {
                this.setState({error: true, errorMessage: err.message, loading: false});
            });
    }
}

export default withRouter(Login);
