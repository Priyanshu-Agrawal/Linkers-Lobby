import NavBar from "../../components/NavBar";
import {useEffect, useState} from "react";
import "./Profile.css";

const Profile = () => {
	const [user, setUser] = useState({});
	
	useEffect(() => {
		const fetchUser = async () => {
			const user = localStorage.getItem("user");
			setUser(JSON.parse(user));
		};
		fetchUser();
	}, []);
	
	return (
		<div className={"page"}>
			<NavBar/>
			<div className={"page-content"}>
				<h1>Welcome {user?.profile?.name}</h1>
			</div>
		</div>
	);
}

export default Profile;