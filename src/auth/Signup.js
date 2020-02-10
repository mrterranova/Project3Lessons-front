import React, { useState } from 'react';
import  { Redirect } from 'react-router-dom';
import Layout from "../core/components/NavigationBar/index";
import axios from 'axios';
import { isAuth } from './helpers'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const Signup = () => {
    const [values, setValues] = useState({
        name: 'Michal',
        email: 'michalterranova@mail.com',
        password: '123456',
        btnText: 'Submit'
    })

    const { name, email, password, btnText } = values

    const handleChange = (name, email, password) => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmitForm = event => {
        event.preventDefault();
        setValues({ ...values, btnText: "Submitting" })
            axios({
                method: "POST",
                url: process.env.REACT_APP_API + '/signup',
                data: { name, email, password }
            }).then(response => {
                console.log("Signup Succeeded", response)
                setValues({ ...values, name: '', email: '', password: '', btnText: "Success" });
                toast.success(response.data.message)
            }).catch(error => {
                console.log('Error in Signup', error.response.data)
                setValues({ ...values, btnText: 'Submit' });
                toast.error(error.response.data.error)
            })
    }


    const signupForm = () => (
        <form>
            <div className="form-group" >
                <label className="text-muted">Name: </label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control" />
            </div>
            <div className="form-group" >
                <label className="text-muted">Email: </label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div className="form-group" >
                <label className="text-muted">Password: </label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
            </div>
            <div>
                <button className="btn btn-warning" onClick={handleSubmitForm} type="submit">{btnText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null}
            <h1> Signup </h1>
            {signupForm()}
        </Layout>
    )
}

export default Signup