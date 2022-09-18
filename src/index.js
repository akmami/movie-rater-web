import React, { createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from './components/auth';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

export const TokenContext = createContext(null);

function Router () {

  //const [token, setToken] = useState(""); 

  return (  
    <React.StrictMode>  
      {/*<TokenContext.Provider value={{token, setToken}}> */}
      <CookiesProvider>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Auth/>} exact></Route>
            <Route path="/movies" element={<App/>} exact></Route>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
      {/*</TokenContext.Provider>*/}
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Router />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
