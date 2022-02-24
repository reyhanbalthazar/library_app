import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavItem, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Image from 'react-bootstrap/Image'
import { connect } from "react-redux";
import { logoutAction } from "../redux/actions/userAction";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import library_book from '../library_book.png' 

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModalLogin: false,
            openModalRegister: false
        }
    }

    render() {
        return (
            <div>
                <ModalLogin
                    openModalLogin={this.state.openModalLogin}
                    openModalRegister={() => this.setState({ openModalRegister: !this.state.openModalRegister })}
                    toggleModalLogin={() => this.setState({ openModalLogin: !this.state.openModalLogin })}
                />
                <ModalRegister
                    openModalRegister={this.state.openModalRegister}
                    openModalLogin={() => this.setState({ openModalLogin: !this.state.openModalLogin })}
                    toggleModalRegister={() => this.setState({ openModalRegister: !this.state.openModalRegister })}
                />
                <Navbar className="shadow p-2 mb-5 container" style={{ backgroundColor: "#F7F8FA", maxWidth: "89vw", borderRadius: 20, fontWeight:"bolder" }}  expand="md" fixed="top" >
                    <NavbarBrand>
                        <Link to="/">
                            <Image alt="..." width="50px" src={library_book} />
                        </Link>
                    </NavbarBrand>
                    <Collapse navbar>
                        {
                            this.props.role === "user"
                                ?
                                <>
                                    <Nav className="me-auto">

                                    </Nav>
                                    <Nav style={{ fontWeight: "bold" }}>
                                        <NavItem>
                                            <Link to="/bookslist" className="nav-link" style={{ color: "#2d3436" }}>
                                                Books
                                            </Link>
                                        </NavItem>
                                        <NavItem>
                                            <Link to="/aboutus" className="nav-link" style={{ color: "#2d3436" }}>
                                                About us
                                            </Link>
                                        </NavItem>
                                    </Nav>
                                    <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                        <DropdownToggle caret nav size="sm" className="d-flex align-items-center" style={{ color: "#2d3436" }}>
                                            Hello, {this.props.username}
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                <Link to="/rentedlist" className="nav-link" style={{ color: "#2d3436" }}>
                                                    Rented List
                                                </Link>
                                            </DropdownItem>
                                            <div style={{ borderTopWidth: 2 }}>
                                                <DropdownItem onClick={() => {
                                                    localStorage.removeItem("data");
                                                    this.props.logoutAction();
                                                }}
                                                    style={{ borderTop: "1px solid" }}
                                                >
                                                    LOGOUT
                                                </DropdownItem>
                                            </div>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </>
                                :
                                this.props.role === "admin" ?
                                    <>

                                        <Nav className="me-auto">

                                        </Nav>
                                        <Nav>
                                            <NavItem>
                                                <Link to="/bookslist" className="nav-link" style={{ color: "#2d3436" }}>
                                                    Books
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link to="/bookmanagement" className="nav-link" style={{ color: "#2d3436" }}>
                                                    Book Management
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link to="/booksonrent" className="nav-link" style={{ color: "#2d3436" }}>
                                                    Book On Rent
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link to="/aboutus" className="nav-link" style={{ color: "#2d3436" }}>
                                                    About us
                                                </Link>
                                            </NavItem>
                                        </Nav>
                                        <UncontrolledDropdown style={{ marginLeft: "auto" }}>
                                            <DropdownToggle caret nav size="sm" className="d-flex align-items-center" style={{ color: "#2d3436" }}>
                                                Hello, {this.props.username}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <div>
                                                    <DropdownItem onClick={() => {
                                                        localStorage.removeItem("data");
                                                        this.props.logoutAction();
                                                    }}
                                                        style={{ borderTop: "1px solid" }}
                                                    >
                                                        LOGOUT
                                                    </DropdownItem>
                                                </div>
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </>
                                    :
                                    <>
                                        <Nav className="me-auto">

                                        </Nav>
                                        <Nav className="me-auto" >
                                            <NavItem>
                                                <Link to="/bookslist" className="nav-link" style={{ color: "#2d3436" }}>
                                                    Books
                                                </Link>
                                            </NavItem>
                                            <NavItem>
                                                <Link to="/aboutus" className="nav-link" style={{ color: "#2d3436" }}>
                                                    About us
                                                </Link>
                                            </NavItem>
                                        </Nav>
                                        <Nav>
                                            <div style={{ marginRight: "10px" }}>
                                                <Button color="primary" style={{ width: "100px", borderRadius:45 }} onClick={() => this.setState({ openModalLogin: !this.state.openModalLogin })}>Login</Button>
                                            </div>
                                            <div>
                                                <Button outline color="primary" style={{ width: "100px", borderRadius:45 }} onClick={() => this.setState({ openModalRegister: !this.state.openModalRegister })}>Register</Button>
                                            </div>
                                        </Nav>
                                    </>
                        }
                    </Collapse>
                </Navbar>
            </div>
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