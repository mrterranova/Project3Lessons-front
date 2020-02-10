import React, { useState, useEffect } from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../../../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '../../components/NavigationBar/index';
import './style.css';
import Settings from './components/UserSettings/Modal'
import Container from './components/ProfileContainer'

const Private = ({ history }) => {
    const [values, setValues] = useState({
        name: "", 
        email:""
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

    const {name } = values;

    return (
        <Layout>
            <Settings />
            <div className="col-md-6 offset-md-3">
                <h1 className="pt-5 text-center">Welcome Back, {name}!</h1>
                <p className="lead text-center"></p>
            </div>
            <Container />
        </Layout>
    );
};

export default Private;
