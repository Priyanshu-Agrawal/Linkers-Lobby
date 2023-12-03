import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Profile from './pages/Profile/Profile';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ServiceProviderDetails from "./pages/ServiceProviderDetails/ServiceProviderDetails";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />}/>
					<Route path="/register" element={<Register />}/>
					<Route path="/login" element={<Login />}/>
					<Route path="/services" element={<Services />}/>
					<Route path="/profile" element={<Profile />}/>
					<Route path="/service-provider/:id" element={<ServiceProviderDetails />}/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
