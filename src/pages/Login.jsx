import React from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions/userAction';
import { Alert, Button, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';
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
            isLoggedIn: false   
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

    btLogin = () => {
        this.props.loginAction(this.emailLogin.value, this.passwordLogin.value)
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
        if (this.props.iduser) {
            alert("login success")
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
        iduser: state.userReducer.id,
        email:state.userReducer.email
    }
}

export default connect(mapToProps, { loginAction })(LoginPage);