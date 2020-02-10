import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../../../auth/helpers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../style.css'


const Settings = ({ history }) => {
    const [values, setValues] = useState({
        role: '',
        name: '',
        email: '',
        password: '',
        btnText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE', response);
                const { role, name, email } = response.data;
                setValues({ ...values, role, name, email });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { role, name, email, password, btnText } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, btnText: 'Updating' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/user/update`,
            headers: {
                Authorization: 'Bearer '+ token
            },
            data: { name, password }
        })
            .then(response => {
                console.log('Profile is updated', response);
                updateUser(response, () => {
                    setValues({ ...values, btnText: 'Updated' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('Error updating profile', error.response.data.error);
                setValues({ ...values, btnText: 'Update' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>
            <div className="form-group">
            <label className="text-muted  settings-label">Role:</label>
                <input defaultValue={role} type="text" className="form-control settings-form" disabled />
            </div>
            <div className="form-group">
                <label className="text-muted  settings-label">Name:</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control settings-form" />
            </div>

            <div className="form-group">
                <label className="text-muted  settings-label">Email:</label>
                <input defaultValue={email} type="email" className="form-control settings-form" disabled />
            </div>

            <div className="form-group">
                <label className="text-muted settings-label">Password:</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control settings-form" />
            </div>

            <div className="settings-submit-btn">
                <button className="btn btn-warning settings-submit" onClick={clickSubmit}>
                    {btnText}
                </button>
            </div>
        </form>
    );

    return (
            <div className="col-md-6 offset-md-3">
                {updateForm()}
            </div>
    );
};

export default Settings;