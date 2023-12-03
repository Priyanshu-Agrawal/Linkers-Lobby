import NavBar from "../../components/NavBar";
import "./Login.css";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from 'js-cookie';

const Login = () => {
	if(localStorage.getItem('user') && Cookies.get('token')) {
		window.location = '/';
	}else{
		localStorage.removeItem('user');
		Cookies.remove('token');
	}
	
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.required('Email is required'),
			password: Yup.string()
				.required('Password is required')
		}),
		onSubmit: (values) => {
			const user = {
				"email": values.email,
				"password": values.password
			}
			
			axios.post('http://localhost:8000/api/login', user)
				.then((response) => {
					console.log(response);
					if(response.status === 200 && response) {
						/*storing token in secured cookie*/
// document.cookie = `token=${response.data.token}; path=/; expires=${new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30)}`;
// 						window.location = '/';
						const { user, token } = response.data;
						Cookies.set('token', token, { secure: true, sameSite: 'none', expires: 7 , path: '/'}); // Adjust the options as needed
						localStorage.setItem('user', JSON.stringify(user));
						window.location = '/';
					}
					// localStorage.setItem('token', response.data.token);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	});
	
	return (
		<div className="login-page page">
			<NavBar/>
			<>
				<div className="form-container">
					<form onSubmit={formik.handleSubmit}>
						<div className="form-card">
							<div className="form-card-header">
								<h1 className="title">Login</h1>
								<Link className="title-clickable" to="/register">New User?</Link>
							</div>
							<div className="form-card-body">
								<div className="form-body-section">
									<div className="form-group">
										<input className={`form-input ${formik.touched.email && formik.errors.email ? 'error' : ''}`} type="email" placeholder="Email" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} required={true}/>
										<input className={`form-input ${formik.touched.password && formik.errors.password ? 'error' : ''}`} type="password" placeholder="Password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} required={true}/>
									</div>
								</div>
								<input className="form-input btn-submit" type="submit" value="Login"/>
							</div>
						</div>
					</form>
				</div>
			</>
		</div>
	);
}

export default Login;