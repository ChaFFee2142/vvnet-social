import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import '../App.css';
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
const jwt = require("jsonwebtoken")


function AuthPage(props) {
    const [label, setLabel] = useState("Waiting for the connection...")
    const [isLoaded, setIsLoaded] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = useContext(AuthContext)

    useEffect(() => {
        document.title = 'VVNet'
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
            axios.post('/api/auth/login', { "email": email, "password": password })
                .then((response) => {
                    const { user_id, token } = response.data
                    if (response.status === 200) {
                        auth.login(token, user_id)
                        console.log(response.data)
                    }
                })
        } catch (e) {
            console.log(e)
        }
    };

    const emailChange = async (props) => {
        setEmail(props.target.value)
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
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input onChange={props => emailChange(props)}
                        prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
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
                        prefix={<LockOutlined className="site-form-item-icon" />}
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
            <p style={{ marginBottom: 0, marginTop: 70 + 'px' }}>Checking connection to backend</p>
            <p style={{ marginTop: 0 }} className={`output${isLoaded ? "-loaded" : ""}`}>{label}</p>
        </div>
    )
}

export default AuthPage