// pages/Home/Home.jsx

import React from 'react';
import './Home.css';
import NavBar from "../../components/NavBar";

const Home = () => {
	return (
		<div className="root">
			<NavBar/>
			<div className="container">
				<div className="container-left">
					<h1 className="header">Welcome to the Service Provider App</h1>
					<p className="text">This is a web application that allows users to book services from service
						providers.</p>
					<p className="text">This application is built using the MERN stack.</p>
				</div>
				<div className="container-right">
					<img src="https://picsum.photos/seed/picsum/200" alt="home-page"/>
				</div>
			</div>
		</div>
	);
};

export default Home;
