import {useFormik} from 'formik';
import * as Yup from 'yup';
import NavBar from "../../components/NavBar";
import {Link} from "react-router-dom";
import "./Register.css";
import axios from "axios";
import Cookies from "js-cookie";

const validationSchema = Yup.object({
	username: Yup.string()
		.required('Username is required')
		.min(5, 'Username must be at least 5 characters'),
	email: Yup.string()
		.required('Email is required')
		.email('Email is invalid')
		.matches(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/, 'Email is invalid'),
	password: Yup.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters'),
	confirmPassword: Yup.string()
		.required('Confirm Password is required')
		.oneOf([Yup.ref('password'), null], 'Passwords must match'),
	fullName: Yup.string()
		.required('Full Name is required'),
	contactNumber: Yup.string()
		.required('Contact Number is required')
		.matches(/^[0-9]{10}$/, 'Contact Number is invalid'),
	address: Yup.string()
		.required('Address is required'),
	eula: Yup.boolean()
		.oneOf([true], 'You must accept the terms and conditions')
});

const Register = () => {
	if(localStorage.getItem('user')) {
		window.location = '/';
    }else{
		localStorage.removeItem('user');
		Cookies.remove('token');
	}

	const formik = useFormik({
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
			fullName: '',
			contactNumber: '',
			address: '',
			eula: false
		},
		validationSchema,
		onSubmit: (values) => {
			const newUser = {
				"username": values.username,
				"email": values.email,
				"password": values.password,
				"profile": {
					"name": values.fullName,
					"phone": values.contactNumber,
					"location": {
						"type": "Point",
						"coordinates": [72.8774268, 19.0760]  // Mumbai coordinates
					}
				}
			}
			
			axios.post('http://localhost:8000/api/register', newUser).then((res) => {
				console.log(res);
				if(res.data.success) {
					localStorage.setItem('user', JSON.stringify(res.data.user));
					Cookies.set('token', res.data.token);
					window.location = '/';
				}
			}).catch((err) => {
				console.log(err);
			})
			
		},
	});
	
	return (
		<div className="register-page page">
			<NavBar/>
			<div className="form-container">
				<div className="form-card">
					<div className="form-card-header">
						<h1 className="title">Register</h1>
						<Link className="title-clickable" to="/login">Already a user?</Link>
					</div>
					<form onSubmit={formik.handleSubmit}>
						<div className="form-card-body">
							<div className="left form-body-section">
								<h3>General Information</h3>
								<div className="form-group">
									<input className={`form-input ${formik.touched.username && formik.errors.username ? "error" : ''}`} type="text" placeholder="Username" name="username" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.username}/>
									<input className={`form-input ${formik.touched.email && formik.errors.email ? 'error' : ''}`} type="email" placeholder="Email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
									<input className={`form-input ${formik.touched.password && formik.errors.password ? 'error' : ''}`} type="password" placeholder="Password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
									<input className={`form-input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}`} type="password" placeholder="Confirm Password" name="confirmPassword" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.confirmPassword}/>
								</div>
							</div>
							<div className="right form-body-section">
								<h3>Personal Information</h3>
								<div className="form-group">
									<input className={`form-input ${formik.touched.fullName && formik.errors.fullName ? 'error' : ''}`} type="text" placeholder="Full Name" name="fullName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullName}/>
									<input className={`form-input ${formik.touched.contactNumber && formik.errors.contactNumber ? 'error' : ''}`}
										type="tel" placeholder="Phone No." name="contactNumber"
										onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.contactNumber} />
									<textarea className={`form-input address ${formik.touched.address && formik.errors.address ? 'error' : ''}`} placeholder="Address" name="address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
								</div>
							</div>
							<div className="form-group eula">
								<div>
									<input className={`eula-checkbox ${formik.touched.eula && formik.errors.eula ? 'error' : ''}`} type="checkbox"  name="eula"  id="eula"  onChange={formik.handleChange} onBlur={formik.handleBlur} checked={formik.values.eula} />
									<label htmlFor="eula">I agree to the <Link className="btn-EULA" to="#">Terms and Conditions</Link> of Linker's Lobby</label>
								</div>
							</div>
							<input className="form-input btn-submit" type="submit" value="Register"/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;