import React from "react";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import './style.css'


export default function Navbar() {
    return (
        <div >
            <nav className="navbar navbar-expand-lg">
                <NavLink className="navbar-brand" to="/" style={{ width: "200px" }}>
                    <img alt="mongodb" style={{ "width": 100 + '%' }} src="https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png"></img>
                </NavLink>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/create">Create Record</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/equipment">Equipment</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/equipment/create"> Create Equipment</NavLink>
                    </li>
                </ul>

            </nav>
        </div>
    );
}