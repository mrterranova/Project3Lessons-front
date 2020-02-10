import React from 'react';
import axios from 'axios';
import GoogleLogin from 'react-google-login'

const Google = ({ informParent = f => f }) => {
    const responseGoogle = (response) => {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API + '/google-login',
            data: { idToken: response.tokenId }
        }).then(res => {
            console.log('Google login success', res)
            //inform Signin component
            informParent(res)
        }).catch(err => {
            console.log('Google login error', err)
        })
    }

    return (
        <div className="pb-4">
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                    <button className="btn btn-default" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <img id="google-login" src="/images/google_logo.png" alt="google_login" />
                    </button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />

        </div>
    )
}

export default Google