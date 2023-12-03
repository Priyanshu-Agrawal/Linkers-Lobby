import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NavBar from "../../components/NavBar";
import './Services.css';
import {useNavigate} from "react-router-dom";
import COLORS from "../../Constants/COLORS";


const Services = () => {
	const navigate = useNavigate();
	const [serviceProviders, setServiceProviders] = useState([]);
	
	useEffect(() => {
		const fetchServiceProviders = async () => {
			try {
				const response = await axios.get('http://localhost:8000/api/service-providers');
				const providersWithDetails = await Promise.all(
					response.data.map(async (provider) => {
						const reviewPromises = provider.reviews.map(async (review) => {
							const reviewData = await axios.get(`http://localhost:8000/api/reviews/${review}`);
							return reviewData.data;
						});
						
						const [reviews, user, categories, servicesBooked] = await Promise.all([
							Promise.all(reviewPromises),
							axios.get(`http://localhost:8000/api/users/${provider.userId}`),
							axios.get(`http://localhost:8000/api/categories/${provider.category}`),
							axios.get(`http://localhost:8000/api/bookings/${provider.servicesBooked[0]}`),
						]);
						
						return {
							...provider,
							reviews: reviews.map(review => review.data),
							user: user.data,
							category: categories.data,
							servicesBooked: servicesBooked.data,
						};
					})
				);
				
				setServiceProviders(providersWithDetails);
			} catch (error) {
				console.error('Error fetching service providers:', error);
			}
		};
		fetchServiceProviders().then();
	}, []);
	
	return (
		<div className={"page"}>
		<NavBar/>
		<div className={"page-content"}>
			<div className="page-header-container">
				<div>
					<h3 >List of Service Providers</h3>
					<div className="search-container">
						<input className="search-bar" type="text" placeholder="Search by name or category"/>
						<button className="search-button">
							<svg width="20" height="20" fill="none" stroke={COLORS.Text} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24">
								<path d="M10.5 19a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"></path>
								<path d="M13.328 7.172A3.988 3.988 0 0 0 10.5 6a3.988 3.988 0 0 0-2.828 1.172"></path>
								<path d="m16.61 16.611 4.244 4.243"></path>
							</svg>
						</button>
					</div>
				</div>
			</div>
			<div className="service-card-container">
				{serviceProviders.map((provider) => (
					<div key={provider._id} className="card">
						<div className="card-top-panel">
							<div className="card-user-profile">
								{/*get random profile pic from internet*/}
								<img src={`https://picsum.photos/seed/${provider.user.username}/200`} alt="user-profile"/>
							</div>
							<h3 className="card-provider-title">{provider.name}</h3>
							<p className="card-category">{provider.category.name}</p>
						</div>
						<div className="card-body">
							<h4 className="text-services">Services</h4>
							<div className="services-list-container">
								{provider.services.map((service) => (
									<span className="services-list-item" key={service._id}>{service.name}</span>
								))}
							</div>
							<p className="text-pricing">Pricing: {provider.pricing}</p>
						</div>
						<button className="card-button" onClick={() => navigate(`/service-provider/${provider._id}`) } >Book Now</button>
					</div>
				))}
			</div>
		</div>
		</div>
	);
};

export default Services;
