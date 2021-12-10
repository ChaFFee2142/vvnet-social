import { React, useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AuthPage from "./pages/Auth.js"
import AboutPage from "./pages/About.js"
import UsersPage from "./pages/Users.js"
import ProfilePage from "./pages/ProfilePage";
import Feed from "./pages/FeedPage";
import RegistrationPage from "./pages/Register";
import { AuthContext } from "./context/AuthContext.js";

export const useRoutes = (isSignedIn, userId) => {

    if (isSignedIn) {
        return (
            <Switch>
                <Route path="/about">
                    <AboutPage />
                </Route>
                <Route path="/users">
                    <UsersPage />
                </Route>
                <Route path='/profile/:id'>
                    <ProfilePage />
                </Route>
                <Route path='/feed'>
                    <Feed />
                </Route>
                <Redirect to={`/profile/${userId}`} />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth">
                <AuthPage />
            </Route>
            <Route path="/register">
                <RegistrationPage />
            </Route>
            <Redirect to="/auth" />
        </Switch>
    )

}