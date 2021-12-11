import axios from 'axios'
import { React, useCallback, useState, useEffect } from 'react'


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem("userData", JSON.stringify({
            userId: id, token: jwtToken
        }))
        console.log("login hook func")
        setIsLoading(false)
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem("userData")
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("userData"))
        if (data && data.token) {
            try{
                axios.get("/api/tokenCheck", {
                    headers:
                    {
                        "x-access-token": data.token
                }})
                .then(()=>{
                    login(data.token, data.userId)
                })
                .catch(()=>{
                    logout()
                })
            }catch(e){
                logout()
            }
            
        }
        console.log("login dependent useEffect")
        setIsLoading(false)
    }, [login])

    // useEffect(async ()=>{
    //     const data = JSON.parse(localStorage.getItem("userData"))
    //     if (data && data.token){
    //         await axios.get('/api/tokenCheck', {headers:{
    //             "x-access-token": data.token
    //         }})
    //         .then(()=>{
    //             console.log("token checked -- valid")
    //         })
            
    //         .catch((e)=>{
    //             logout()
    //             console.log("token checked -- invalid")
    //         })
    //     }

    // },[])

    return { login, logout, token, userId, isLoading}
}

