import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavItem, Label, NavbarText, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Image from 'react-bootstrap/Image'
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions/userAction";

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <Navbar style={{ backgroundColor: "darkgrey"}} light expand="md" fixed="top" >
                <NavbarBrand>
                    <Link to="/">
                        <Image alt="..." width="50px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREStAIJwirPfpVbaQy49IvQaCZ6li_BR2TvA&usqp=CAU" />
                    </Link>
                </NavbarBrand>
                <Collapse navbar>
                    <Nav className="me-auto" >
                        <NavItem>
                            <Link to="/" className="nav-link" style={{ color: "#2d3436" }}>
                                Books
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/" className="nav-link" style={{ color: "#2d3436" }}>
                                Nav2
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/aboutus" className="nav-link" style={{ color: "#2d3436" }}>
                                About us
                            </Link>
                        </NavItem>
                    </Nav>
                    {
                        this.props.username
                            ?
                            <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                <DropdownToggle caret nav size="sm" className="d-flex align-items-center" style={{ color: "#2d3436" }}>
                                    Hello, {this.props.username}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => {
                                        localStorage.removeItem("data");
                                        this.props.logoutAction();
                                    }}>
                                        LOGOUT
                                    </DropdownItem>
                                </DropdownMenu>

                            </UncontrolledDropdown>
                            :
                            <Nav>
                                <Link to="/login" style={{marginRight:"10px"}}>
                                    <Button style={{width:"100px"}}>Login</Button>
                                </Link>
                                <Link to="/register">
                                    <Button style={{width:"100px"}} >Register</Button>
                                </Link>
                            </Nav>
                    }
                </Collapse>
            </Navbar>
        )
    }
}

const mapToProps = (state) => {
    return {
        username: state.userReducer.username,
        role: state.userReducer.role
    }
}

export default connect(mapToProps, { logoutAction })(NavbarComponent);