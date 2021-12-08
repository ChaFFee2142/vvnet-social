import {useEffect, useState} from 'react';
import '../App.css';
import {useParams} from 'react-router-dom'
import axios from "axios"
import Spinner from "react-bootstrap/Spinner"


function ProfilePage(props){
    const [username, setUsername] = useState(null)
    const [profilePicture, setProfilePicture] = useState('')
    const [followers, setFollowers] = useState(null)
    const [following, setFollowing] = useState(null)

    const {id} = useParams()
    useEffect(async ()=>{
        document.title = 'My profile'
        try{
            await axios.get(`/api/users/${id}`, {
                headers:{
                    "x-access-token": localStorage.getItem("token")
                }
            })
                .then((response)=>{
                    setTimeout(() => {                    // Simulating long response
                        console.log(response)
                        setUsername(response.data.username)
                        setProfilePicture(response.data.profilePicture)
                        setFollowers (response.data.followers)
                        setFollowing(response.data.following)
                        console.log(username)
                    }, 1000)

                })
                .catch((e)=>{
                    console.log(e)
                })
        }catch (e) {
            console.log(e)
        }
    },[])

    return(
        username ?
            (<div>
                <h1>{username}</h1>
            </div>)
            : (
                <Spinner animation="border" />
            )

    )
}

export default ProfilePage