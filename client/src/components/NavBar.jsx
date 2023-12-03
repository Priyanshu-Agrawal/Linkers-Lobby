// NavBar.js
import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Navbar.module.css';
import LogOut from "../Constants/Icons/LogOut";
import Cookies from 'js-cookie';

const NavBar = () => {
	const userString= localStorage.getItem('user');
	const profileSubMenu = () => {
		const handleLogOut = () => {
			Cookies.remove('token');
			localStorage.removeItem('user');
			window.location ="/login";
		};
		if (!Cookies.get('token')|| !userString) {
			if(window.location.pathname === "/login"){
				return (
					<>
						<Link to={"/register"} className={styles["nav-link"]}>
							Register
						</Link>
					</>
				)
			}else {
				return (
					<>
						<Link to={"/login"} className={styles["nav-link"]}>
							Log in
						</Link>
					</>
				)
			}
		} else {
			const user = JSON.parse(userString);
			return (
				<>
					<Link to="/profile" className={styles["nav-link"]}>
						{user?.profile?.name}
					</Link>
					<span onClick={handleLogOut} className={styles["nav-link"]}>
						<LogOut/>
					</span>
				</>
			)
		}
	}
	
	return (
		<div className={styles["navbar"]}>
			<Link to="/" className={styles["nav-brand"]}>
				Linker's Lobby
			</Link>
			<nav>
				<Link to="/" className={styles["nav-link"]}>
					Home
				</Link>
				<Link to="/services" className={styles["nav-link"]}>
					Get Service
				</Link>
				{profileSubMenu()}
			</nav>
		</div>
	);
};

export default NavBar;
