import React, { useState, useEffect } from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import { isAuth, getCookie } from '../../../auth/helpers';
import './style.css'


const UserBookmark = ({ history }) => {
    const [values, setValues] = useState({
        UserId: "",
        LessonId: "",
        BookmarkId: "", 
        isBookmarked: false
    });

    const token = getCookie('token');

    
    const loadProfile = () => {
        //grabbing the URL from the window
        const URLarray = window.document.URL.split("/")
        const URLarrVar = URLarray[URLarray.length - 1]
        const URL_id = URLarrVar.split("?")
        
        //GET the correct logged user
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                //set all the values of the user
                if (response.data.notes.length === 0) {
                    //if the user has notes identify if there is a bookmark that belong to this lesson
                } else {
                    response.data.bookmarks.map(bookmark => {
                        if (bookmark.Lesson_id === URL_id[0]) {
                            setValues({ ...values, BookmarkId:bookmark._id, isBookmarked: true })
                            
                        }
                    })
                }
                
            })
        };
        
        useEffect(() => {
            loadProfile();
        }, []);


    const { BookmarkId, isBookmarked } = values;

    //handle all edits to the bookmark as a POST
    const postBookmark = () => {
        const URLarray = window.document.URL.split("/")
        const URLarrVar = URLarray[URLarray.length - 1]
        const URL_id = URLarrVar.split("?")
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const userId = response.data._id
                axios({
                    method: 'GET',
                    url:process.env.REACT_APP_API+'/lesson/'+URL_id
                }).then( res => {
                    const lessonTitle = res.data.title
                    axios({
                        method: "POST",
                        url: process.env.REACT_APP_API + '/user/bookmarks/' + URL_id[0],
                        headers: {
                            Authorization: 'Bearer ' + token
                        },
                        data: { User_id: userId, lesson_title: lessonTitle}
                    }).then(response => {
                        setValues({ isBookmarked: true})

                    })
                })
            })
    }

    const deleteBookmark = () => {
            axios({
                method: 'DELETE',
                url: `${process.env.REACT_APP_API}/bookmarks/` + BookmarkId,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then(response => {
                    setValues({ isBookmarked: false})
                });
    }

    function Image() {
        if (isBookmarked) {
            return <img src={'/images/bookmark-ribbon.png'} id="bookmark-lesson" alt="bookmark"/>
        } else {
            return ""
        }
    }

    function BookmarkButton() {
        if (isBookmarked) {
            return ""
        } else {
            return <div id="btn-bookmark" onClick={()=>postBookmark()}>Bookmark</div>
        }
    }

    function RemoveBookmark() {
        if (isBookmarked) {
            return <button id="btn-removeBookmark" onClick={()=>deleteBookmark()}>Remove</button>
        } else {
            return ""
        }
    }


    // what the user is viewing
    return (
        <div>
            <BookmarkButton />
            <RemoveBookmark />
                <div id="bookmark-container">
            <Image />
            </div>
        </div>
    );
};

export default UserBookmark;