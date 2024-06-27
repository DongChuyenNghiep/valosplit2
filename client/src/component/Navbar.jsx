import "bootstrap/dist/css/bootstrap.min.css";

import Logo from "../image/LogoDCN.png"
import React from 'react';  
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import '../css/valorant.css'
import '../css/index.css'

    const Navbar = () => {
        const { currentUser } = useSelector(state => state.user);
        return (
            <nav className="navbar navbar-expand-lg fixed-top nav1">
                <div className="container-fluid">
                    <a className="navbar-brand disabled" style={{ filter: 'brightness(100%)' }}>
                        <img src={Logo} alt="Bootstrap" height={70}></img>
                    </a>
                    <button className="navbar-toggler color-expand" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav1" aria-controls="navbarNav" aria-expanded="false"
                        aria-label="Toggle navigation">&#9776;</button>
                    <div className="collapse navbar-collapse" id="navbarNav1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                            <ul className="navbar-nav justify-content-center" style={{ width: '114.5%' }}>
                                <Link to="/"><li style={{margin:'0px 15px'}} className="nav-item">
                                    Home
                                </li></Link>
                                <Link to="/swissstage"><li style={{margin:'0px 15px'}} className="nav-item">
                                    Các trận đấu
                                </li></Link>
                                <Link to="/allteam"><li style={{margin:'0px 15px'}} className="nav-item">Các đội tham dự</li></Link>
                                <Link to="/stat"><li style={{margin:'0px 15px'}} className="nav-item">Stat</li></Link>
                                <Link to="/calendar"><li style={{margin:'0px 15px'}} className="nav-item">Lịch thi đấu</li></Link>
                                <Link to="/rule"><li style={{margin:'0px 15px'}} className="nav-item">Rule</li></Link>
                            </ul>
                        </div>
                        <div>
                            <Link to='/profile'>
                                {currentUser ? (
                                    <img style={{ width: '50px', borderRadius: '50%',marginRight:'110px' }} className="nav-item" src={`https://drive.google.com/thumbnail?id=${currentUser.profilePicture}`} />
                                ) : (
                                    <li style={{listStyle:'none',marginRight:'110px'}} className="nav-item">
                                        Đăng Nhập
                                    </li>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    export default Navbar;
