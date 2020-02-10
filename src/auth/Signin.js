import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from "../core/components/NavigationBar/index";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import { authenticate, isAuth } from './helpers';
import Google from './Google'
import Facebook from './Facebook'
import '../core/components/Login/style.css'
import { Link } from 'react-router-dom';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        btnText: 'Submit'
    })

    const { email, password, btnText } = values

    const handleChange = (name) => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log({ email })
    }

    const informParent = response => {
        authenticate(response, () => {
            isAuth() && isAuth().role === 'admin' ? history.push('/admin-dash') : history.push('/private');
        });
    };

    const handleSubmitForm = event => {
        event.preventDefault();
        setValues({ ...values, btnText: "Submitting" })
        axios({
            method: "POST",
            url: process.env.REACT_APP_API + '/signin',
            data: { email, password }
        }).then(response => {
            console.log("Signed in!", response)

            authenticate(response, () => {
                setValues({ ...values, name: '', email: '', password: '', btnText: "Signed In" });
            })

            isAuth() && isAuth().role === 'admin' ? history.push('/admin-dash') : history.push('/private');

            //save user, token in cookie
            setValues({ ...values, name: '', email: '', password: '', btnText: "Signed In" });
            toast.success(`Hello ${response.data.user.name}. Welcome back!`)
        }).catch(error => {
            console.log('Error in Signup', error.response.data)
            setValues({ ...values, btnText: 'Submit' });
            toast.error(error.response.data.error)
        })
    }


    const signinForm = () => (
        <form>
                <div className="form-group row" >
                    <div className="col-sm-3"></div>
                    <div className="col-md-6">
                        <label className="text-muted login-email-label">Email: </label>
                        <input className="login-email-field form-control" onChange={handleChange('email')} value={email} type="email" />
                    </div>
                </div>
                <div className="form-group row" >
                    <div className="col-sm-3"></div>
                    <div className="col-md-6">
                        <label className="text-muted login-password-label">Password: </label>
                        <br />
                        <input className="login-password-field form-control" onChange={handleChange('password')} value={password} type="password" />
                    </div>
                </div>
                <div>
                    <div className="form-group row" >
                        <div className="col-sm-3"></div>
                        <button className="btn btn-default btn-tab" onClick={handleSubmitForm} type="submit">{btnText}</button>
                    </div>
            </div>
        </form>
    )

    return (
        <Layout>
            <ToastContainer />
            {isAuth() ? <Redirect to="/" /> : null}
            <h1 className="Signin-pg">Login</h1>
            {signinForm()}
            <div className="forgot-password-link">
                <Link to="/auth/password/update" className="nav-link">...click here if you forgot your password</Link>
                </div>
            <div>
                <h4 className="Signin-secondary-auth">Or you can signin with...</h4>
                <div className="social-media-comtainer row">
                    <div className="col-md-3"></div>
                    <div className="social-media-container-2 col-md-6">
                <Google  informParent={informParent} />
                </div>
                </div>
                <div className="social-media-comtainer row">
                    <div className="col-md-3"></div>
                    <div className="social-media-container-2 col-md-6">
                <Facebook informParent={ informParent} />
                </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signin;