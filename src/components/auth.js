import '../App.css';
import React, {useState, useEffect} from "react";
import { API } from "../api-service";
//import { TokenContext } from '..';
import { useCookies } from 'react-cookie';

function Auth() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginView, setIsLoginView] = useState(true);
    
   //const {token, setToken} = useContext(TokenContext);
    const [token, setToken] = useCookies(['mr-token']); // domain-name

    useEffect( () => {
        if(token['mr-token']) window.location.href = "/movies";
    }, [token])
    
    const loginClicked = () => {
        API.loginUser({username, password})
        .then( response => setToken('mr-token', response) )
        .catch( error => console.log(error) )
    }

    const registerClicked = () => {
        API.registerUser({username, password})
        .then( response => loginClicked() )
        .catch( error => console.log(error) )
    }

    const isDisabled = username.length === 0 || password.length === 0;

    return (
        <div className="App">
            <div className="center">
                <header className="App-header">
                    { isLoginView ? <h1>Login</h1> : <h2>Register</h2>}
                </header>
                <label htmlFor="username">Username</label><br/>
                <input id="username" type="text" placeholder="username" value={username} 
                            onChange={ evt => setUsername(evt.target.value)}
                /><br/>
                <label htmlFor="password">Password</label><br/>
                <input id="password" type="password" placeholder="password" value={password} 
                            onChange={ evt => setPassword(evt.target.value)}
                /><br/>
                { isLoginView ? 
                    <button onClick={loginClicked} disabled={isDisabled}>Login</button>  : 
                    <button onClick={registerClicked} disabled={isDisabled}>Register</button> 
                }   
                { isLoginView ? 
                    <p className="footer" onClick={ ()=> setIsLoginView(false)}>You don't have an account? Register here!</p> : 
                    <p className="footer" onClick={ ()=> setIsLoginView(true)}>You already have an account? Login here!</p>
                }
            </div>
        </div>
    )
}

export default Auth;