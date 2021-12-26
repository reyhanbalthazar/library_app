import axios from 'axios';
import React from 'react';
import { Button, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
import { API_URL } from '../helper'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show"
        }
    }

    handleInput = (value, propState) => {
        console.log(value, propState)
        this.setState({ [propState]: value })
    }

    btRegis = () => {
        if (this.username.value === "") {
            alert("Username empty")
        } else if (this.email.value === "") {
            alert("email empty")
        } else if (this.password.value === "") {
            alert("password empty")
        } else if (this.confPassword.value === "") {
            alert("confirmation password emtry")
        } else {
            if (this.password.value === this.confPassword.value) {
                if (this.email.value.includes("@")) {
                    axios.post(`${API_URL}/dataUser`, {
                        username: this.username.value,
                        email: this.email.value,
                        password: this.password.value,
                        role: "user",
                        status: "Active",
                        book: []
                    }).then((response)=> {
                        alert("register success ✔")
                    }).catch((error)=> {
                        console.log(error)
                    })
                } else {
                    alert("email didnt contain @")
                }
            } else {
                alert("password didnt match")
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
            <div>
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

                    </div>
                    <div className="col-3">

                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage;