import {useEffect} from 'react'


const FeedPage = () => {
    useEffect(()=>{
        document.title = 'Feed'
    })

    return(
        <div>
            <h1>Feed page</h1>
        </div>
    )
}

export default FeedPage

