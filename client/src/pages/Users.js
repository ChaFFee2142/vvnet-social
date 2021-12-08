import {useEffect} from 'react';
import '../App.css';
import axios from "axios"

function UsersPage() {


    useEffect(async () => {
        document.title = 'Users'
        try{
            axios.get("/api/tokenCheck", {
                headers: {
                    "x-access-token": localStorage.getItem("token")
                }
            })
                .then((response)=>{
                    alert(response.data.message)
                })
                .catch((e)=>{console.log(e)})
        } catch (e) {
            console.log(e)
        }
    },[])


    return (
        <div>
            <h1>Users page</h1>
        </div>
    )
}

export default UsersPage