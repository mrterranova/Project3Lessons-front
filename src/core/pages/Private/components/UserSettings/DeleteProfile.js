import React, { useState, useEffect} from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../../../../../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const UserNotes = ({ history }) => {
    const [values, setValues] = useState({
        showHideEdit: false, 
        _id : "", 
        name: ""
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
                const { role, _id, name, email, notes } = response.data;
                setValues({ ...values, _id, role, name, email, notes });
            })
            .catch(error => {
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { _id } = values;

    const AreYouSure = () => {
        return(
            <div>
            <div>Are you sure you want to leave?</div>
            <p>Once you leave, your account will be deleted along with any information pertaining to your account.</p>
            <p>Administrators to Words of Glory do not save any data from users. Therefore, you will be unable to retrieve previous notes or bookmarks you made. If you wish to save any notes or bookmarks, please do so before removing yourself from Words of Glory. You will not be able to save notes or bookmarks without being a user, but you are always welcome to visit any of the lessons.</p>
            <p> If you are certain that you no longer wish to be a part of Words of Glory then click the button below.</p>
            <p>Thank you for your visit! We hope that you will return either way.</p>
            <button onClick={RemoveUser()}>Yes, please remove me.</button>
            </div>
        )
    }

    const RemoveUser = () => {
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API}/user/delete`+ _id,
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
            .then(response => {
                    toast.success('You no longer have a profile.');
                });
    }

    return (
        <div>
<div onClick={()=>AreYouSure()}>Click here</div>
<ToastContainer />
</div>
    );
};

export default UserNotes;
