import React, { useState, useEffect, Fragment } from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../../../../../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import { List, ListNote } from "../../../../components/List";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



const UserNotes = ({ history }) => {
    const [values, setValues] = useState({
        bookmarks: [],
        showHideEdit: false

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
                const { role, name, email, bookmarks } = response.data;
                setValues({ ...values, role, name, email, bookmarks });
                console.log(bookmarks)
            })
            .catch(error => {
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { name, bookmarks } = values;

    //show notes in form
    const handleEditBookmarks = (l, c, d, i) => {
        return (
            <Fragment>
                <div>
                <Link className="nav-link bookmark-link" to={'/lesson/'+ l}>Click to go to lesson...</Link>
                    <div className="bookmark-category">{c}</div>
                    <div className="bookmark-date">{convertDate(d)}</div>
                    <hr />
                    <div><button className="bookmark-delete-btn" onClick={()=> RemoveBookmark(i)}>Delete Bookmark</button></div>
                </div>
            </Fragment>
        )
    }

    //convert to date
    const convertDate = (date) => {
        let arr1 = date.split("T")
        let arr2 = arr1[0].split("-")
        let dateyear = arr2[2] + ", " + arr2[0];
        switch (arr2[1]) {
            case '01': return "Jan. " + dateyear;
                break;
            case '02': return "Feb. " + dateyear;
                break;
            case '03': return "March " + dateyear;
                break;
            case '04': return "Apr. " + dateyear;
                break;
            case '05': return "May " + dateyear;
                break;
            case '06': return "June " + dateyear;
                break;
            case '07': return "July " + dateyear;
                break;
            case '08': return "Aug. " + dateyear;
                break;
            case '09': return "Sept. " + dateyear;
                break;
            case '10': return "Oct. " + dateyear;
                break;
            case '11': return "Nov. " + dateyear;
                break;
            case '12': return "Dec. " + dateyear;
                break;
        }

    }


    const RemoveBookmark = (Bookmark_id) => {
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API}/bookmarks/`+ Bookmark_id,
            headers: {
                Authorization: 'Bearer '+ token
            }
        })
            .then(response => {
                let bookmarkArr = values.bookmarks.filter( mark => mark._id !== Bookmark_id )
                console.log(bookmarkArr)
                 setValues({ bookmarks: bookmarkArr})
                    toast.success('Bookmark was Removed!');
                });
    }

    return (
        <div className="container" style={{overflow: 'auto'}}>
            <h3 id="note-name-header"> {name}'s Bookmarks </h3>
            {bookmarks.length ? (
                <List>
                    {bookmarks.map(bookmark => (
                        <ListNote key={bookmark._id}>
                            {handleEditBookmarks(bookmark.Lesson_id, <div>{bookmark.lesson_title}</div>, bookmark.date, bookmark._id)}
                        </ListNote>
                    ))}
                </List>
            ) : (
                    <h6>You have no bookmarks saved to your profile.</h6>
                )}

        </div>
    );
};

export default UserNotes;
