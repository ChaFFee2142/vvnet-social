import { useEffect } from 'react';
import '../App.css';

function AboutPage(){

    useEffect(()=>{
        document.title = 'About'
    })

    return(
        <div>
            <h1>About page</h1>
        </div>
    )
}

export default AboutPage