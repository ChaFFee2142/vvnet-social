//**************************** IMPORTS ******************************************/
import { BrowserRouter as Router } from "react-router-dom"
import './App.css';
import 'antd/dist/antd.css'
import { NavBar } from "./components/NavBar/NavBar";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "./hooks/auth.hook";
import { useRoutes } from "./routes";
import { AuthContext } from "./context/AuthContext";

//****************************** MAIN APP ***************************************/

function App() {
    const { login, logout, userId, token, isLoading} = useAuth()
    const isSignedIn = !!token
    const routes = useRoutes(isSignedIn, userId)
    console.log ("App render")
    return (
        <AuthContext.Provider value={{
            login, logout, userId, token, isSignedIn
        }}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <NavBar />
                    </header>
                    <div className="pageBody">
                    {(isLoading)
                        ? <h3>Loading</h3>
                        : routes
                        }
                    </div>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
