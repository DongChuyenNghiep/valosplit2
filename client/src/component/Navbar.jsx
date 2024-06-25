import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../image/LogoDCN.png"
import React from 'react';
import { Link } from "react-router-dom";
import '../css/valorant.css'
import '../css/index.css'


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg fixed-top nav1">
            <div className="container-fluid">
                <a className="navbar-brand disabled" style={{ filter: 'brightness(100%)' }}>
                    <img src={Logo} alt="Bootstrap" height={70}></img>
                </a>
                <button className="navbar-toggler color-expand" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav1" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">&#9776;</button>
                <div className="collapse navbar-collapse" id="navbarNav1" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <ul className="navbar-nav w-100 justify-content-center">
                        <li className="nav-item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/swissstage">Các trận đấu</Link>
                        </li>
                        <li className="nav-item"><Link to="/allteam">Các đội tham dự</Link></li>
                        <li className="nav-item"><Link to="/stat">Stat</Link></li>
                        <li className="nav-item"><Link to="/calendar">Lịch thi đấu</Link></li>
                        <li className="nav-item"><Link to="/rule">Rule</Link></li>
                        <li className="nav-item"><Link to='/signin'>Đăng Nhập</Link></li>
                    </ul>
                    
                        
     
                </div>
            </div>
        </nav>



    );
}
export default Navbar;