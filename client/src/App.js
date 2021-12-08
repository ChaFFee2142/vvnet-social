import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    Redirect
} from "react-router-dom"
import './App.css';
import AuthPage from "./pages/Auth.js"
import AboutPage from "./pages/About.js"
import UsersPage from "./pages/Users.js"
import ProfilePage from "./pages/ProfilePage";
import Feed from "./pages/FeedPage";
import RegistrationPage from "./pages/Register";
import 'antd/dist/antd.css'
import logo from './VVnet1.png'
import NavBar from "./components/NavBar/NavBar.jsx";
import {useEffect, useState} from "react";
import axios from "axios"


function App() {
    const [isSignedIn, setIsSignedIn] = useState((!!localStorage.getItem("token")))
    const [currentUser, setCurrentUser] = useState(
        !!localStorage.getItem("currentUser")
            ? localStorage.getItem("currentUser")
            : ''
    )
    const [currentUserID, setCurrentUserID] = useState("")

    useEffect(async () => {
        try {
            await axios.get("/api/tokenCheck", {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
                .then((response) => {
                    setIsSignedIn(true)

                    localStorage.setItem("currentUserID", response.data.user_id)
                    console.log(response)
                    setCurrentUser(localStorage.getItem("currentUser"))
                    setCurrentUserID(localStorage.getItem("currentUserID"))
                })
                .catch((e) => {
                    console.log(e);
                    setIsSignedIn(false)
                    setCurrentUserID('')
                })
        } catch (e) {
            console.log(e)
            setIsSignedIn(false)
            setCurrentUserID('')
        }
    }, [])

    useEffect(()=>{
        console.log(currentUser)
    },[currentUser])

    return (

        <div className="App">
            <header className="App-header">
                <NavBar isSignedIn={isSignedIn} currentUser={currentUser}/>
                <h3>{isSignedIn}</h3>
            </header>
            <div className="pageBody">
                {(isSignedIn)
                    ? (<Switch>
                        <Route path="/about">
                            <AboutPage/>
                        </Route>
                        <Route path="/users">
                            <UsersPage/>
                        </Route>
                        <Route path='/profile/:id'>
                            <ProfilePage/>
                        </Route>
                        <Route path='/feed'>
                            <Feed/>
                        </Route>
                        <Redirect to={`/profile/${currentUserID}`}/>
                    </Switch>)
                    : (<Switch>
                        <Route path="/auth">
                            <AuthPage isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn}
                            currentUserID={currentUserID} setCurrentUserID={setCurrentUserID}
                            currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                        </Route>
                        <Route path="/register">
                            <RegistrationPage/>
                        </Route>
                        <Redirect to="/auth"/>
                    </Switch>)}
            </div>
        </div>

    );
}

export default App;
