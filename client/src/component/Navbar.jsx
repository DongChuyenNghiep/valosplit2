import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import Logo from "../image/LogoDCN.png";
import React from 'react';  
import { useSelector } from "react-redux";
import '../css/valorant.css';
import '../css/index.css';

const Navbar1 = () => {
    const { currentUser } = useSelector(state => state.user);
    return (
        <Navbar bg="light" expand="lg" fixed="top" className="nav1">
            <Container fluid>
                <Navbar.Brand href="/" className="disabled" style={{ filter: 'brightness(100%)' }}>
                    <img src={Logo} alt="Bootstrap" height={70} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav1" />
                <Navbar.Collapse id="navbarNav1">
                    <Nav className="navbar-nav w-100 justify-content-center">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/swissstage">
                            <Nav.Link>Các trận đấu</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/allteam">
                            <Nav.Link>Các đội tham dự</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/stat">
                            <Nav.Link>Stat</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/rule">
                            <Nav.Link>Rule</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav className="ml-auto">
                        <LinkContainer to='/profile'>
                            <Nav.Link>
                                {currentUser ? (
                                    <img style={{ width: '50px', borderRadius: '50%' }} src={`https://drive.google.com/thumbnail?id=${currentUser.profilePicture}`} alt="Profile" />
                                ) : (
                                    'Đăng Nhập'
                                )}
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbar1;
