import React, { useState } from 'react';
import Layout from "../core/components/NavigationBar/index";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const UpdatePassword = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        btnText: 'Update Password'
    })

    const { email, btnText } = values

    const handleChange = (name) => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleSubmitForm = event => {
        event.preventDefault();
        setValues({ ...values, btnText: "Submitting" })
            axios({
                method: "PUT",
                url: process.env.REACT_APP_API + '/update-password',
                data: {email}
            }).then(response => {
                console.log("Reset Completed", response)
                
                toast.success(response.data.message)
                setValues({...values, btnText: "Completed Update"})

            }).catch(error => {
                console.log('Error in reset password request', error.response.data)
                setValues({ ...values, btnText: 'Update Password' });
                toast.error(error.response.data.error)
            })
    }


    const updatePasswordForm = () => (
        <form>
            <div className="form-group" >
                <label className="text-muted">Email: </label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
            </div>
            <div>
                <button className="btn btn-warning" onClick={handleSubmitForm} type="submit">{btnText}</button>
            </div>
        </form>
    )

    return (
        <Layout>
            <ToastContainer />
            <h1>Reseting Password</h1>
            {updatePasswordForm()}
        </Layout>
    )
}

export default UpdatePassword;