import './christmas.css';
import React from 'react';
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import christmasBackground from "./christmasBackground.jpg";
import christmasConfetti from "./christmasConfetti.png";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

class Christmas extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            message: "",
            src: "",
            loading: true,
            error: false,
            errorMessage: ""
        }
    }

    componentDidMount() {
        try {
            let userUID = firebase.auth().currentUser.uid;

            // console.log(userUID);

            this.props.db.collection("users").doc(userUID).get().then((doc) => {
                if (doc.exists) {
                    this.setState({message: doc.data().message, loading: false});
                    // console.log(doc.data().message);
                } else {
                    console.log("No such document!");
                }
                this.setState({loading: false});
            }).catch((err) => {
                this.setState({error: true, errorMessage: err.message, loading: false});
            });

            firebase.storage().ref(userUID + '/image.jpg').getDownloadURL().then((url) => {
                this.setState({src: url, loading: false});
                // console.log(url);
            }).catch((err) => {
                this.setState({error: true, errorMessage: err.message, loading: false});
            });
        } catch {
            console.error("Delete last word of URL");
            this.setState({error: true, errorMessage: "Delete the last word in the URL and login.", loading: false});
        }
    }

    render() {
        let alert = "";
        if (this.state.error) {
            alert = (<Alert variant="danger">
                Please try again | Error: {this.state.errorMessage}
            </Alert>);
        }

        let loading = "";
        if (this.state.loading) {
            loading = (<Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>)
        }

        let fallingConfetti = [];
        for (let i = 0; i < 15; i++) {
            let top = Math.floor(Math.random() * 100) + 10;
            fallingConfetti.push(<Image src={christmasConfetti} style={
                {
                    top: (-top) + "%",
                    left: (Math.floor(Math.random() * 100)) + "%",
                    transform: "rotate(" + (Math.floor(Math.random() * 100) - 50) + "deg)",
                    animationDuration: ((top+30)/35) + "s"
                }
            } className="falling-image"/>)
        }

        return (
            <Container className="centered-box">
                {fallingConfetti}
                {alert}
                <Image src={christmasBackground} className="background-image"/>
                <div className="letter-card-div">
                    <Card body className="letter-card">
                        {loading}
                        <div dangerouslySetInnerHTML={{__html: this.state.message}}/>
                        <br/>
                        <Image src={this.state.src} className="letter-image"/>
                    </Card>
                </div>
            </Container>
        );
    }
}

export default Christmas;
