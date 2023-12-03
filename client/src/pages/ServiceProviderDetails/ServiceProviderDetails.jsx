import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import NavBar from "../../components/NavBar";
import './ServiceProviderDetails.css';
import SmartPhone from "../../Constants/Icons/SmartPhone";
import MapPin from "../../Constants/Icons/MapPin";
import axios from "axios";
import Cookies from "js-cookie";


const ServiceProviderDetails = () => {
	if(!localStorage.getItem('user') || !Cookies.get('token')){
		window.location = "/login";
	}
	const [details, setDetails] = useState();
	const {id} = useParams();
	useEffect(() => {
		const fetchServiceProviderDetails = async () =>{
			try {
				const response = await axios.get(`http://localhost:8000/api/service-providers/${id}`);
				const [user,category, reviews] = await Promise.all([
					axios.get(`http://localhost:8000/api/users/${response.data.userId}`),
					axios.get(`http://localhost:8000/api/categories/${response.data.category}`),
					Promise.all(response.data.reviews.map(async (review) => {
						const reviewData = await axios.get(`http://localhost:8000/api/reviews/${review}`);
						return reviewData.data;
					}))
				]);
				
				const details = {
					...response.data,
					user: user.data,
					category: category.data,
					reviews: reviews.map(review => review.data),
				};
				
				setDetails(details);
				console.log(details);
				
			} catch (error) {
				console.error(error);
			}
		}
		
		fetchServiceProviderDetails().then();
		
		
	}, [id]);
	
	return (
		<div className="page serviceProviderDetail">
			<NavBar/>
			{!details ?
				<div>Loading...</div>
				: (
				<div className="page-content">
				<div className={"top-section"}>
					<div className={"left"}>
						<div>
							<img src="https://picsum.photos/200" alt="profile"/>
						</div>
					</div>
					<div className={"right"}>
						<div className={"hero"}>
							<h1>{details.name}</h1>
							<p>{details.category.name}</p>
						</div>
						<div className={"details"}>
							<p className={"address"}>
								<span><MapPin size="1.5rem"/></span>
								<span>{details.location.coordinates.join(", ")}</span>
							</p>
							<p className={"phone"}>
								<span><SmartPhone size="1.5rem"/></span>
								<span>{details.phone}</span>
							</p>
						</div>
					</div>
				</div>
				<div className={"services-section"}>
					<h2>Services</h2>
					<div className={"services-card-deck"}>
						{details.services.map((service, index )=> (
							<div className={"service-card"} key={index}>
								<p className={"card-header"}>{service.name}</p>
								<p className={"card-body"}>{service.description}</p>
								<p className={"card-footer"}><span>{service.price}</span></p>
							</div>
						)
						)}
					</div>
					<button className={"book-now-btn"}>Book Now</button>
				</div>
				<div className={"portfolio-section"}>
					<h2>Portfolio</h2>
					<div className={"portfolio-card-deck"}>
						{details.portfolio.map((image, index) => (
							<div className={"portfolio-card"} key={index}>
								<img src={image} alt="portfolio"/>
							</div>
						))}
					</div>
				</div>
				<div className={"review-section"}>
					<h2>Reviews</h2>
					<div className={"reviews-cards-container"}>
						{details.reviews.map((review, index) => (
							<div className="review-card" key={index}>
								<div className="review-card-header">
									<div className="review-card-user-profile">
										<img src="https://picsum.photos/60" alt="user-profile"/>
									</div>
									<div className="review-card-header-right">
										<div className="review-card-user-info">
											<p className="review-card-user-name">{review.user.username}</p>
											<p className="review-card-user-rating">{review.rating}</p>
										</div>
										<p className="review-card-user-review-title">{review.title}</p>
									</div>
								</div>
								<div className="review-card-body">
									<p className="review-card-user-review">{review.description}</p>
								</div>

							</div>
						
						))}
						<div className="review-card">
							<div className="review-card-header">
								<div className="review-card-user-profile">
									<img src="https://picsum.photos/60" alt="user-profile"/>
								</div>
								<div className="review-card-header-right">
									<div className="review-card-user-info">
										<p className="review-card-user-name">User Name</p>
										<p className="review-card-user-rating">Rating</p>
									</div>
									<p className="review-card-user-review-title">Review Title</p>
								</div>
							</div>
							<div className="review-card-body">
								<p className="review-card-user-review">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus at lectus suscipit, consequat libero eu, vehicula massa. Ut</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			)}
		</div>
	);
}

export default ServiceProviderDetails;