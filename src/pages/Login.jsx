import React from 'react';
import { Button, FormGroup, Input, InputGroup, InputGroupText, Label } from 'reactstrap';

class LoginPage extends React.Component {
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
        } else if (this.state.passType === "text"){
            this.setState({
                passType:"password",
                passText:"Show"
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
                            <Label style={{ fontWeight: "bold" }}>EMAIL</Label>
                            <Input />
                        </FormGroup>
                        <FormGroup style={{ textAlign: "center" }}>
                            <Label style={{ fontWeight: "bold" }}>PASSWORD</Label>
                            <InputGroup style={{textAlign:"center"}}>
                                <Input type={this.state.passType} />
                                <InputGroupText style={{ cursor: "pointer", width:"70px" }} onClick={this.showHidePassword}>
                                    {this.state.passText}
                                </InputGroupText>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup style={{ textAlign: "center" }}>
                            <Button color="primary" style={{width:"200px"}}>LOGIN</Button>
                        </FormGroup>

                    </div>
                    <div className="col-3">

                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;