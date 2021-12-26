import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openCollapse: false
        }
    }

    render() {
        return (
            <Navbar expand="sm" className="shadow mb-5 bg-white rounded">
                <NavbarBrand>
                    <Link to="/">
                        <img alt="..." width="50px" src="https://cdn.dribbble.com/users/1303634/screenshots/4736402/icon-3.jpg" />
                    </Link>
                </NavbarBrand>
                <Collapse isOpen={this.state.openCollapse} navbar>
                    <Nav>
                        <NavItem>
                            <Link to="/" className="nav-link">
                                Books
                            </Link>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/" className="nav-link">
                                Nav2
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/" className="nav-link">
                                About
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default NavbarComponent;