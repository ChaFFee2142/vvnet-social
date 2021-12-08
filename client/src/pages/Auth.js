import axios from 'axios';
import {useEffect, useState} from 'react';
import '../App.css';
import {Form, Input, Button, Checkbox} from 'antd'
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import {booleanLiteralTypeAnnotation} from '@babel/types';
import {NavLink, useHistory, Redirect} from 'react-router-dom'

const jwt = require("jsonwebtoken")


function AuthPage(props) {
    const [label, setLabel] = useState("Waiting for the connection...")
    const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')


    useEffect(() => {
        console.log("COMPONENT UPDATE")
        console.log(userName + ' ' + password)
        document.title = 'VVNet'
        console.log(props.isSignedIn)
        try {
            axios.get('/api/check')
                .then((response) => {
                    setTimeout(() => {                    // Simulating long response
                        setLabel(response.data)
                        setIsLoaded(true)
                    }, 1000)
                })
        } catch {
            console.log('No response from backend')
            setLabel('No response from backend')
        }
    }, [])


    const clickHandler = (event) => {
        event.preventDefault()
        console.log(event)
        try {
            axios.post('/api/auth/login', {"email": userName, "password": password})
                .then((response) => {
                    console.log(response)
                    const {user_id} = response.data
                    console.log(user_id)
                    console.log(response.status)
                    if (response.status === 200) {
                        props.setIsSignedIn(true)
                        props.setCurrentUserID(user_id)
                        // props.setCurrentUser(response.data)
                        localStorage.setItem("user", response.data)
                        localStorage.setItem("token", response.data.token)
                        // history.push('/profile/'+user_id)
                    }
                })
        } catch (e) {
            console.log(e)
        }
    };


    const usernameChange = async (props) => {
        setUsername(props.target.value)
    }

    const passwordChange = async (props) => {
        setPassword(props.target.value)
    }


    return (
        <div className='LoginPage'>
            <h1>Authentication</h1>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                //onFinish={event => loginHandler(event)}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input onChange={props => usernameChange(props)}
                           prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        onChange={passwordChange}
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Link className="login-form-forgot" to="/password-recovery">
                        Forgot password
                    </Link>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType='button' className="login-form-button"
                            onClick={(e) => clickHandler(e)}>
                        Log in
                    </Button>
                    Or <Link to='register'>register now!</Link>
                </Form.Item>
            </Form>


            <p style={{marginBottom: 0, marginTop: 70 + 'px'}}>Checking connection to backend</p>
            <p style={{marginTop: 0}} className={`output${isLoaded ? "-loaded" : ""}`}>{label}</p>
        </div>
    )


}

export default AuthPage