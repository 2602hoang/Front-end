import { createContext, useEffect, useState } from 'react'
import axios from 'axios';
// import { URL } from './url';
import { toast } from 'react-toastify';
import { URL } from './url';


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

	const [userToken, setUserToken] = useState("demo");
	const [errorLogin, setErrorLogin] = useState(null);
	// const [ban, setban] = useState([]);
	useEffect(() => {
		LoadUserVerified();
		addToken(localStorage.getItem('userToken'));
	}, []);
	
	const LoadUserVerified = async () => {
		if ( localStorage.getItem('userToken')) {
			setUserToken( localStorage.getItem('userToken'));
			addToken( localStorage.getItem('userToken'));
		}
		else setUserToken(null);
		// alert('thông xin sai mất rồi ,đăng nhập thất bại😓😓😓')
		// 	setErrorLogin('Thông tin không chính xác');
		// 	setTimeout(() =>{
		// 				setErrorLogin('');
		// 			}, 10000)

		
	}
	const Register = async({email,password})=>{
			try {
				const response = await axios.post(`http://localhost:5000/api/v1/auth/regiter/`, 
				{
				email: email,
				password: password,
			  } )
			  if (response.data.mes ==="ok") {
				
				alert('chào mừng bạn đến với bếp ,đăng ky thành công🤗🤗🤗')
				localStorage.setItem('userToken',response.data.token);
				setUserToken(response.data.token);
				addToken(response.data.token);
				window.location.reload(false);
			}
				
			} catch (error) {
				// setErrorLogin('Thông tin không chính xác');
			
			alert('thông xin sai mất rồi ,đăng nhập thất bại😓😓😓')
				
			}
	}
	
	const Login = async ({email,password}) => {		
		try {
			const response = await axios.post(`http://localhost:5000/api/v1/auth/login/`, 
			{
				email: email,
				password: password,
			  } )
			
			if (response.data.mes ==="ok") {
				setErrorLogin('Đăng nhập thành công');
				alert('chào mừng bạn đến với bếp ,đăng nhập thành công🤗🤗🤗')
				console.log(response.data.token)
				localStorage.setItem('userToken',response.data.token);
				setUserToken(response.data.token);
				addToken(response.data.token);
				window.location.reload(false);
			}
			
		} catch (error) {
			setErrorLogin('Thông tin không chính xác');
			
			alert('thông xin sai mất rồi ,đăng nhập thất bại😓😓😓')
			
		}

		// await localStorage.setItem('userToken',email);
		// 		setUserToken(email);
		// 		addToken(email);
		// 		window.location.reload(false);
	}
	
	const Logout = async () =>{
		 localStorage.removeItem('userToken');
		setUserToken(null);
	}
	
	const addToken=(token)=>{
		if (token) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		} else {
			delete axios.defaults.headers.common['Authorization']
		}
	}

	return (
		<AuthContext.Provider value={{
			userToken, setUserToken, Login, Logout, errorLogin,setErrorLogin,Register
		}}>
			{children}
		</AuthContext.Provider>
	)
}

