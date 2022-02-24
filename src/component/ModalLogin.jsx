import React from 'react';
import { Button, Input, Modal, ModalBody, ModalHeader, InputGroup, InputGroupText, Label } from 'reactstrap';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import { MdAlternateEmail } from "react-icons/md";
import { FcGoogle } from 'react-icons/fc';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/userAction';


class ModalLogin extends React.Component {
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

    btLogin = async () => {
        try {
            let res = await this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
            if (this.emailLogin.value === "" || this.passwordLogin.value === "") {
                alert("email or password can't be empty")
            } else {
                if (res) {
                    window.setTimeout(() => {
                        this.props.toggleModalLogin()
                    }, 1000)
                } else {
                    this.setState({ alertNotFoundIsOpen: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ alertNotFoundIsOpen: false })
                        }, 1000)
                    })
                    alert("account didn't found")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.openModalLogin} toggle={this.props.toggleModalLogin} style={{borderRadius:40}}>
                    <ModalHeader toggle={this.props.toggleModalLogin} style={{ borderBottomColor: "transparent" }}>
                        <Label style={{ fontWeight: "bolder" }}>Sign In</Label>
                    </ModalHeader>
                    <ModalBody style={{ marginBottom: "20px" }}>
                        <div>
                            <InputGroup >
                                <InputGroupText style={{ backgroundColor: "transparent", borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderRightColor: "transparent", borderWidth:"2px" }}>
                                    <MdAlternateEmail color='blue' />
                                </InputGroupText>
                                <Input innerRef={(element) => this.emailLogin = element} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftColor: "transparent", borderWidth:"2px" }} placeholder="Email" />
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
                                <Input type={this.state.passType} innerRef={(element) => this.passwordLogin = element} style={{ borderTopRightRadius: 10, borderBottomRightRadius: 10, borderLeftColor: "transparent", borderWidth:"2px" }} placeholder="Password" />
                            </InputGroup>
                        </div>
                        <div style={{ marginTop: "2vh", textAlign: "center" }}>
                            <Button style={{ width: "100%", borderRadius: 10, border: "none", fontWeight: "bolder", padding: "10px" }} color='primary' onClick={this.btLogin}>SIGN IN</Button>
                            <Label style={{ marginTop: "1vh" }}>or sign in with</Label>
                            <Button style={{ width: "100%", borderRadius: 10, border: "none", fontWeight: "bolder", padding: "10px", marginTop: "1vh", color: "black", backgroundColor: "#F2F5FF" }} onClick={this.btLogin}><FcGoogle /> GOOGLE</Button>
                            <Label style={{ marginTop: "1vh" }}>Don't have an account yet? <a href='#' onClick={() => { this.props.openModalRegister(); this.props.toggleModalLogin() }}>Sign Up</a></Label>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        email: state.userReducer.email
    }
}

export default connect(mapToProps, { loginAction })(ModalLogin);