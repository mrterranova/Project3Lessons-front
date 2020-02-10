import React, { useState, useEffect } from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.min.css';
import { getCookie, isAuth } from '../../../auth/helpers';
import { Card, Accordion } from 'react-bootstrap'


const UserNotes = ({ history }) => {
    const [values, setValues] = useState({
        title: "",
        category: "",
        body: "",
        UserId: "",
        LessonId: "",
        NoteId: "",
        showHideEdit: false
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const handleChange = (name) => event => {
        setValues({ ...values, title: title, category: category, body: body, bookcategory: bookcategory, [name]: event.target.value })
    }

    const loadProfile = () => {
        //grabbing the URL from the window
        const URLarray = window.document.URL.split("/")
        const URLarrVar = URLarray[URLarray.length - 1]
        const URL_id = URLarrVar.split("?")

        //GET the correct logged user
        if (token){
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                //set all the values of the user
                if (response.data.notes.length === 0) {
                    //if the user has notes identify if there are notes that belong to this lesson
                } else {
                    response.data.notes.map(note => {
                        if (note.Lesson_id === URL_id[0]) {

                            setValues({ ...values, NoteId: note._id, title: note.title, category: note.category, body: note.body })
                            //notes that do not belong to this lesson are reported in console.
                        }
                    })
                }
            })
    };
}

    const { NoteId, title, category, body, bookcategory } = values;

    //handle all edits to the notes as a POST
    const handleSubmitEdit = () => {
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
                    method: "POST",
                    url: process.env.REACT_APP_API + '/user/note/' + URL_id[0],
                    headers: {
                        Authorization: 'Bearer ' + token
                    },
                    data: { Lesson_id: URL_id[0], title: title, category: category, body: body, User_id: userId, _id: NoteId }
                }).then(response => {
                })
            })
    }

    //form for handling the note changes
    const takeNotes = (noteBody) => {

        return (
        <form>
                    <input placeholder={"Title: " + title} onChange={handleChange('title')} type="text" name="title" className="form-control" id="title"></input>
                    <input placeholder={"Category: " + category} onChange={handleChange('category')} name="category" type="text" className="form-control" id="category"></input>
                    <textarea className='note-textbox' onChange={handleChange('body')} id="bodyNotes" name="body" placeholder={noteBody.body}></textarea>
                    <br />
                    <button className="btn btn-warning" onClick={() => handleSubmitEdit()} type="submit">Save Changes</button>
        </form>
        )
    }
    // what the user is viewing
    return (
<Accordion defaultActiveKey="0" style={{ width: '24rem'}}>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="0">
      View Notes
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
        <div>
            <h4>{title}</h4>
    <p><i>Self-Categorized Topic:  {category}</i></p>
            <p>{body}</p>
        </div>
      </Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card>
    <Accordion.Toggle as={Card.Header} eventKey="1">
      Take Notes
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
          {takeNotes({ body })}
        </Card.Body>
    </Accordion.Collapse>
  </Card>
</Accordion>
    );
};

export default UserNotes;