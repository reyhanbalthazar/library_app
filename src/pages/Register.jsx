import axios from 'axios';
import React from 'react';
import { Button, FormGroup, Input, InputGroup, InputGroupText, Label, Alert } from 'reactstrap';
import { API_URL } from '../helper'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show",
            emptyAlertIsOpen: false,
            emailAlertIsOpen: false,
            passwordAlertIsOpen: false,
            registerAlertIsOpen: false
        }
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }

    btRegis = () => {
        if (this.username.value === "" || this.email.value === "" || this.password.value === "" || this.confPassword.value === "") {
            this.setState({ emptyAlertIsOpen: true }, () => {
                window.setTimeout(() => {
                    this.setState({ emptyAlertIsOpen: false })
                }, 1000)
            })
            // alert("Username email password and conf password can't empty")
        } else {
            if (this.password.value === this.confPassword.value) {
                if (this.email.value.includes("@")) {
                    axios.post(`${API_URL}/datauser/regis`, {
                        username: this.username.value,
                        email: this.email.value,
                        password: this.password.value,
                        role: "user",
                        status: "Active",
                        book: []
                    }).then((response) => {
                        this.setState({ registerAlertIsOpen: true }, () => {
                            window.setTimeout(() => {
                                this.setState({ registerAlertIsOpen: false })
                                // window.location = 'http://localhost:3000/login';
                                alert("Register Berhasil")
                            }, 2000)
                        })
                    }).catch((error) => {
                        console.log(error)
                    })
                } else {
                    this.setState({ emailAlertIsOpen: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ emailAlertIsOpen: false })
                        }, 1000)
                    })
                    // alert("email didnt contain @")
                }
            } else {
                this.setState({ passwordAlertIsOpen: true }, () => {
                    window.setTimeout(() => {
                        this.setState({ passwordAlertIsOpen: false })
                    }, 1000)
                })
                // alert("password didnt match")
            }
        }
    }

    showHidePassword = () => {
        if (this.state.passType === "password") {
            this.setState({
                passType: "text",
                passText: "Hide"
            })
        } else if (this.state.passType === "text") {
            this.setState({
                passType: "password",
                passText: "Show"
            })
        }
    }

    render() {
        return (
            <div style={{ marginTop: "100px" }}>
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6 p-5">
                        <FormGroup style={{ textAlign: "center" }}>
                            <Label style={{ fontWeight: "bold" }}>USERNAME</Label>
                            <Input id="textUsername" innerRef={(element) => this.username = element} />
                        </FormGroup>
                        <FormGroup style={{ textAlign: "center" }}>
                            <Label style={{ fontWeight: "bold" }}>EMAIL</Label>
                            <Input id="textEmail" innerRef={(element) => this.email = element} />
                        </FormGroup>
                        <FormGroup style={{ textAlign: "center" }}>
                            <Label style={{ fontWeight: "bold" }}>PASSWORD</Label>
                            <InputGroup style={{ textAlign: "center" }}>
                                <Input type={this.state.passType} id="textPassword" innerRef={(element) => this.password = element} />
                                <InputGroupText style={{ cursor: "pointer", width: "70px" }} onClick={this.showHidePassword}>
                                    {this.state.passText}
                                </InputGroupText>
                            </InputGroup>
                            <Label style={{ fontWeight: "bold" }}>CONFIRM PASSWORD</Label>
                            <InputGroup style={{ textAlign: "center" }}>
                                <Input type={this.state.passType} id="confTextPassword" innerRef={(element) => this.confPassword = element} />
                                <InputGroupText style={{ cursor: "pointer", width: "70px" }} onClick={this.showHidePassword}>
                                    {this.state.passText}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup style={{ textAlign: "center" }}>
                            <Button color="primary" style={{ width: "200px" }} onClick={this.btRegis}>REGISTER</Button>
                        </FormGroup>
                        <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                            <Alert
                                color="danger"
                                style={{ width: "500px" }}
                                isOpen={this.state.emptyAlertIsOpen}
                            >
                                USERNAME, EMAIL, PASSWORD & CONFIRMATION PASSWORD CANNOT BE EMPTY
                            </Alert>
                            <Alert
                                color="danger"
                                style={{ width: "500px" }}
                                isOpen={this.state.emailAlertIsOpen}
                            >
                                EMAIL INCORRECT, EMAIL MUST CONTAIN @
                            </Alert>
                            <Alert
                                color="danger"
                                style={{ width: "500px" }}
                                isOpen={this.state.passwordAlertIsOpen}
                            >
                                PASSWORD DID NOT MATCH
                            </Alert>
                            <Alert
                                color="success"
                                style={{ width: "500px" }}
                                isOpen={this.state.registerAlertIsOpen}
                            >
                                REGISTER SUCCESS, NOW DIRECTING TO LOGIN PAGE
                            </Alert>
                        </div>

                    </div>
                    <div className="col-3">

                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage;