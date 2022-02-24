import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/userAction';
import { Alert, Button, FormGroup, Input, InputGroup, InputGroupText, Label} from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../helper';
import { Navigate } from 'react-router-dom';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passType: "password",
            passText: "Show",
            dataUser: [],
            isLoggedIn: false,
            alertEmptyIsOpen: false,
            alertNotFoundIsOpen: false,
            loginAlertIsOpen:false
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get(`${API_URL}/dataUser`)
            .then((response) => {
                console.log("GET DATA LOGIN", response.data)
                this.setState({ dataUser: response.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    btLogin = async () => {
        try {
            let res = await this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
            if (this.emailLogin.value === "" || this.passwordLogin.value === "") {
                this.setState({ alertEmptyIsOpen: true }, () => {
                    window.setTimeout(() => {
                        this.setState({ alertEmptyIsOpen: false })
                    }, 1000)
                })
            } else {
                if (res) {
                    this.setState({ loginAlertIsOpen: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ loginAlertIsOpen: false })
                            // window.location = '/';
                        }, 1000)
                    })
                } else {
                    this.setState({ alertNotFoundIsOpen: true }, () => {
                        window.setTimeout(() => {
                            this.setState({ alertNotFoundIsOpen: false })
                        }, 1000)
                    })
                }
            }
        } catch (error) {
            console.log(error)
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
        if (this.props.username) {
            return <Navigate to="/" />
        }
        return (
            <div style={{ marginTop: "100px" }}>
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col-6 p-5">
                        <FormGroup style={{ textAlign: "center" }}>
                            <Label style={{ fontWeight: "bold" }}>EMAIL</Label>
                            <Input innerRef={(element) => this.emailLogin = element} />
                        </FormGroup>
                        <FormGroup style={{ textAlign: "center" }}>
                            <Label style={{ fontWeight: "bold" }}>PASSWORD</Label>
                            <InputGroup style={{ textAlign: "center" }}>
                                <Input type={this.state.passType} innerRef={(element) => this.passwordLogin = element} />
                                <InputGroupText style={{ cursor: "pointer", width: "70px" }} onClick={this.showHidePassword}>
                                    {this.state.passText}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup style={{ textAlign: "center" }}>
                            <Button onClick={this.btLogin} color="primary" style={{ width: "200px" }}>LOGIN</Button>
                        </FormGroup>
                        <div style={{ textAlign: "center", display:"flex", justifyContent:"center" }}>
                            <Alert
                                color="danger"
                                isOpen={this.state.alertEmptyIsOpen}
                                style={{ width: "500px" }}
                            >
                                EMAIL AND PASSWORD CANNOT EMPTY
                            </Alert>
                            <Alert
                                color="danger"
                                isOpen={this.state.alertNotFoundIsOpen}
                                style={{ width: "500px" }}
                            >
                                ACCOUNT NOT FOUND, PLEASE REGISTER
                            </Alert>
                            <Alert
                                color="success"
                                isOpen={this.state.loginAlertIsOpen}
                                style={{ width: "500px" }}
                            >
                                LOGIN SUCCESS, NOW DIRECTING TO HOMEPAGE
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

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        email: state.userReducer.email
    }
}

export default connect(mapToProps, { loginAction })(LoginPage);