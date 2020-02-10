import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from '../../../auth/helpers';
import './style.css';

const Layout = ({ children, match, history }) => {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#000' };
        } else {
            return { color: '#aaa' };
        }
    };

    const nav = () => (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link to="/" className="nav-link" style={isActive('/')}>Main</Link>
            </li>

            <li className="nav-item">
                <Link to="/lessons/all" className="nav-link" style={isActive('/lessons/all')}>Library</Link>
            </li>


            <div className="navbar-btns nav-comp-logs">
            {!isAuth() &&
                (<Fragment>
                    <li className="nav-item">
                        <Link to="/signin" className="nav-link" style={isActive('/signin')}>
                            Login
                        </Link>
                    </li>
                </Fragment>
                )}
            </div>

            <div className="navbar-btns nav-comp-logs">
            {!isAuth() &&
                (<Fragment>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link" style={isActive('/signup')}>
                            Signup
                        </Link>
                    </li>
                </Fragment>
                )}
            </div>
            


            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/admin-dash')} to="/admin-dash">
                        {isAuth().name}
                    </Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'user' && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/private')} to="/private">
                        Profile
                    </Link>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item" style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <span
                        className="nav-link" style={{ cursor: 'pointer', color: '#aaa'}} 
                        onClick={() => {
                            signout(() => {
                                history.push('/');
                            });
                        }}>
                        Logout
                    </span>
                </li>
            )}
        </ul>
    );

    return (
        <Fragment>
            {nav()}
            <div className="contain">{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);