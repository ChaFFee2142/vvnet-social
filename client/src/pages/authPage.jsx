import React from 'react'
import logo from '../logo.svg'
import '../App.css'

const authPage = () => {


    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <p>
                        Authorization page
                    </p>
                    <img src={logo} className="App-logo" alt="logo" />
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
        </div>
    )
}

export default authPage