import { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
  } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Header(){
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <header>
            <Navbar color="faded" className="bg-hero" light fixed="top" expand="md">
                <NavbarBrand href="/">
                    <div className="cardbox"></div>
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="me-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar className="ms-auto mb-2 mb-lg-0">
                        <NavItem>
                            <Link className="nav-link" to="/">Our Services</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/">Why Us</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/">Testimonials</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to="/">FAQ</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="btn btn-success" to="/">Register</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </header>
    )
}