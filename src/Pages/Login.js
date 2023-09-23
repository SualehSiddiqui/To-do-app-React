import './index.css';
import { useState } from "react";
import Swal from "sweetalert2";
import { Button, Form, Input, Space } from 'antd';
import { app, auth, signInWithEmailAndPassword } from "./firebase.js"
import React from 'react';
import { NavLink } from 'react-router-dom';


const LoginPage = ({setUserLogin,s}) => {

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    // const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const checkAccount = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("Login user", user.uid);
                localStorage.setItem("user", JSON.stringify(user));
                setUserLogin(true)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Something went wrong...',
                    text: errorMessage,
                })
            });
    }
    const onFormLayoutChange = ({ layout }) => {
        setFormLayout(layout);
    };
    return (
        <div className="main-div">
            <div className='login-div'>
                <h1 className='txt'>Login Page</h1>
                <Form
                    layout={formLayout}
                    form={form}
                    initialValues={{
                        layout: formLayout,
                    }}
                    onValuesChange={onFormLayoutChange}
                    style={{
                        maxWidth: formLayout === 'inline' ? 'none' : 600,
                    }}
                >
                    <Form.Item label="Email:" className='txt'>
                        <Input
                            placeholder="Enter your email"
                            type='email'
                            name='email'
                            value={email}
                            required
                            className='form-input txt'
                            onChange={(e) => {
                                setEmail(`${e.target.value}`)
                            }}
                        />
                    </Form.Item>
                    <Form.Item label="Password:" className='txt'>
                        <Input.Password
                            placeholder='Enter your password'
                            className='form-input txt'
                            value={password}
                            onChange={(e) => {
                                setPassword(`${e.target.value}`)
                            }}
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button type="default" className='login-btn txt' onClick={checkAccount}>Login</Button>
                    </Form.Item>
                    <span className='footer-txt'>Don't have an account?...<NavLink to="/sign" >Signin</NavLink></span>
                </Form>

            </div>
        </div>

    );
};
export default LoginPage;