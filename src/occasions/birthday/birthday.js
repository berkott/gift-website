import './birthday.css';
import React from 'react';
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Alert from "react-bootstrap/Alert";
import birthdayBackground from "./birthdayBackground.jpg";
import birthdayConfetti from "./birthdayConfetti.png";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

class Birthday extends React.Component{
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

        let risingBalloons = [];
        for (let i = 0; i < 40; i++) {
            let bottom = Math.floor(Math.random() * 100) + 10;
            risingBalloons.push(<Image src={birthdayConfetti} style={
                {
                    top: (bottom+window.innerHeight) + "%",
                    left: (Math.floor(Math.random() * 100)) + "%",
                    transform: "rotate(" + (Math.floor(Math.random() * 100) - 50) + "deg)",
                    animationDuration: ((bottom+30)/5) + "s"
                }
            } className="rising-image"/>)
        }

        return (
            <Container className="centered-box">
                {risingBalloons}
                {alert}
                <Image src={birthdayBackground} className="background-image"/>
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

export default Birthday;
