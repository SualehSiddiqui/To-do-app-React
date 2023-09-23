import React from 'react';
import './index.css';
import { useState } from "react";
import Swal from "sweetalert2";
import { Button, Form, Input, Space } from 'antd';
import { app, auth, db, createUserWithEmailAndPassword, doc, setDoc } from "./firebase.js";
import { NavLink } from 'react-router-dom';

const SignPage = ({setUserLogin}) => {
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState('vertical');
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const createAccount = () => {
        // console.log("name", name, "email", email, "password", password)
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    name: name,
                    email: email,
                });
                localStorage.setItem("user", JSON.stringify(user));
                setUserLogin("/todo")
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("errorMessage",)
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
                <h1 className='txt'>Signin Page</h1>
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
                    <Form.Item label="Name:" className='txt'>
                        <Input
                            placeholder="Enter your Name"
                            type='name' name='name'
                            required
                            value={name}
                            className='form-input txt'
                            onChange={(e) => {
                                setName(`${e.target.value}`)
                            }}
                        />
                    </Form.Item>
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
                            required
                            value={password}
                            className='form-input txt'
                            onChange={(e) => {
                                setPassword(`${e.target.value}`)
                            }}
                        />
                    </Form.Item>
                    <Form.Item >
                        <Button type="default" className='login-btn txt' onClick={createAccount}>Signin</Button>
                    </Form.Item>
                    <span className='footer-txt'>Already have an account?...<NavLink to="/" >Login</NavLink></span>
                </Form>

            </div>
        </div>

    );
};
export default SignPage;