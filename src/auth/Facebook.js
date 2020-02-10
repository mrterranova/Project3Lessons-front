import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import axios from 'axios';

const Facebook = ({ informParent = f => f }) => {
    const responseFacebook = response => {
        console.log(response);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/facebook-login`,
            data: { userID: response.userID, accessToken: response.accessToken }
        })
            .then(response => {
                console.log('Facebook login success', response);
                informParent(response);
            })
            .catch(error => {
                console.log('Facebook login error', error.response);
            });
    };
    return (
        <div className="pb-3">
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                callback={responseFacebook}
                render={renderProps => (
                    <button onClick={renderProps.onClick} className="btn btn-default">
                        <img id="facebook-logo" src={"/images/facebook-logo.png"} alt="facebook-login"></img>
                    </button>
                )}
            />
        </div>
    );
};

export default Facebook;