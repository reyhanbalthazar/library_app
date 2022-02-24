import React from 'react';
import { Button, Input, Modal, ModalBody, ModalHeader, InputGroup, InputGroupText, Label } from 'reactstrap';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdAlternateEmail } from "react-icons/md";
import { FcGoogle } from 'react-icons/fc';
import { FiUser } from "react-icons/fi";
import axios from 'axios';
import { API_URL } from '../helper';

class ModalRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show"
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

    btRegis = () => {
        if (this.username.value === "" || this.email.value === "" || this.password.value === "" || this.confPassword.value === "") {
            alert("Username email password and conf password can't empty")
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
                        this.props.toggleModalRegister()
                    }).catch((error) => {
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

    render() {
        return (
            <div>
                <Modal isOpen={this.props.openModalRegister} toggle={this.props.toggleModalRegister}>
                    <ModalHeader toggle={this.props.toggleModalRegister} style={{ borderBottomColor: "transparent" }}>
                        <Label style={{ fontWeight: "bolder" }}>Register</Label>
                    </ModalHeader>
                    <ModalBody style={{ marginBottom: "20px" }}>
                        <div>
                            <InputGroup >
                                <InputGroupText style={{ backgroundColor: "transparent", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightColor: "transparent", borderWidth:"2px" }}>
                                    <FiUser color='blue' />
                                </InputGroupText>
                                <Input innerRef={(element) => this.username = element} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftColor: "transparent", borderWidth:"2px" }} placeholder="Username" />
                            </InputGroup>
                        </div>
                        <div style={{ marginTop: "2vh" }}>
                            <InputGroup >
                                <InputGroupText style={{ backgroundColor: "transparent", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightColor: "transparent", borderWidth:"2px" }}>
                                    <MdAlternateEmail color='blue' />
                                </InputGroupText>
                                <Input innerRef={(element) => this.email = element} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftColor: "transparent", borderWidth:"2px" }} placeholder="Email" />
                            </InputGroup>
                        </div>
                        <div style={{ marginTop: "2vh" }}>
                            <InputGroup>
                                <InputGroupText onClick={this.showHidePassword} style={{ backgroundColor: "transparent", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightColor: "transparent", borderWidth:"2px" }}>
                                    {
                                        this.state.passText === 'Show'
                                            ?
                                            <FaLock color='blue' />
                                            :
                                            <FaLockOpen color='blue' />
                                    }
                                </InputGroupText>
                                <Input type={this.state.passType} innerRef={(element) => this.password = element} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftColor: "transparent", borderWidth:"2px" }} placeholder="Password" />
                            </InputGroup>
                        </div>
                        <div style={{ marginTop: "2vh" }}>
                            <InputGroup>
                                <InputGroupText onClick={this.showHidePassword} style={{ backgroundColor: "transparent", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightColor: "transparent", borderWidth:"2px" }}>
                                    {
                                        this.state.passText === 'Show'
                                            ?
                                            <FaLock color='blue' />
                                            :
                                            <FaLockOpen color='blue' />
                                    }
                                </InputGroupText>
                                <Input type={this.state.passType} innerRef={(element) => this.confPassword = element} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftColor: "transparent", borderWidth:"2px" }} placeholder="Confirm password" />
                            </InputGroup>
                        </div>
                        <div style={{ marginTop: "2vh", textAlign: "center" }}>
                            <Button style={{ width: "100%", borderRadius: 10, border: "none", fontWeight: "bolder", padding: "10px" }} color='primary' onClick={this.btRegis}>SIGN UP</Button>
                            <Label className='text-muted' style={{ marginTop: "1vh" }}>or sign in with</Label>
                            <Button style={{ width: "100%", borderRadius: 10, border: "none", fontWeight: "bolder", padding: "10px", marginTop: "1vh", color: "gray", backgroundColor: "#F2F5FF" }} onClick={this.btLogin}><FcGoogle /> GOOGLE</Button>
                            <Label className='text-muted'>Already a member? <a href='#' onClick={() => { this.props.openModalLogin(); this.props.toggleModalRegister() }}>Sign in</a></Label>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalRegister;