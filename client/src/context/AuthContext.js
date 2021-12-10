import { createContext } from "react";

function emptyF() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: emptyF,
    logout: emptyF,
    isSignedIn: false

})