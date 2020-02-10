import React, { useState, useEffect, Fragment, useCallback } from 'react';
// import Layout from '../core/Layout';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../../../../../auth/helpers';
import 'react-toastify/dist/ReactToastify.min.css';
import { List, ListNote } from "../../../../components/List";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Accordion, Card, Button } from 'react-bootstrap'



const UserNotes = ({ history }) => {
    const [values, setValues] = useState({
        notes: [],
        title: "",
        category: "",
        body: "",
        _id: "",
        isBookmarked: false,
    });



    const token = getCookie('token');

    
    const handleChange = (name) => event => {
        setValues({ ...values, title: title, category: category, body: body, [name]: event.target.value })
    }
    
    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/user/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            const { role, name, email, notes, _id } = response.data;
            setValues({ ...values, role, name, email, notes, _id });
        })
        .catch(error => {
            if (error.response.status === 401) {
                signout(() => {
                    history.push('/');
                });
            }
        });
    };

    useEffect(() => {
        loadProfile();
    }, [loadProfile]);
    
    const { name, notes, title, body, category, _id } = values;

    //show notes in form
    const handleEditNotes = (noteTitle, noteCategory, noteBody, noteLink, noteDate, noteId) => {
        handleChange(noteTitle, noteBody, noteCategory);
        return (
            <Fragment>
                <div>
                    <form>
                        <input placeholder={"Title: " + noteTitle} onChange={handleChange('title')} type="text" name="title" className="form-control" id="title"></input>
                        <Link className="nav-link" to={'/lesson/' + noteLink}>Click to go to lesson...</Link>
                        <input placeholder={"Category: " + noteCategory} onChange={handleChange('category')} name="category" type="text" className="form-control" id="category"></input>
                        <textarea className='note-textbox' onChange={handleChange('body')} id="bodyNotes" name="body">{noteBody}</textarea>
                        <div className='date' style={{paddingBottom: "50px"}}>Created on: {convertDate(noteDate)}</div>
                        <button className="btn btn-info" onClick={() => handleSubmitEdit(noteId, noteLink)} type="submit" style={{float:'left', marginTop:'-30px'}}>Submit Edit</button>
                        <button type="button" className="btn btn-danger deleteNote-btn" onClick={() => RemoveNote(noteId)} style={{float:'right', marginTop:'-30px'}}>Delete Note</button>
                    </form>
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
            default: return "Sorry no date associated"
        }

    }

    const RemoveNote = (Note_id) => {
        axios({
            method: 'DELETE',
            url: `${process.env.REACT_APP_API}/notes/` + Note_id,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                console.log('Note was deleted', response);
               let noteArr = values.notes.filter( note => note._id !== Note_id )
               console.log(noteArr)
                setValues({ notes: noteArr})
            });
    }

    const handleSubmitEdit = (Note_id, lessonLink) => {
        axios({
            method: "PUT",
            url: process.env.REACT_APP_API + '/notes/' + Note_id,
            headers: {
                Authorization: 'Bearer ' + token
            },
            data: { title: title, category: category, body: body, Lesson_id: lessonLink, User_id: _id }
        }).then(response => {
            console.log(title, body, category)
            toast.success(`You have updated notes!`)
        })
    }

    return (
        <div className="container">
            <h3 id="note-name-header"> {name}'s Notes </h3>
            {notes.length ? (

                <List>
                    {notes.map(note => (
                        <Accordion>
                            <Card style={{width:'66rem'}}>
                                <Card.Header style={{height:'6rem'}}>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        <h3 className="note-title">{note.title}</h3>
                                        <p className="note-category" >{note.category}</p>
                                        <p className="note-date" >{convertDate(note.date)}</p>
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <ListNote key={note._id}>
                                        {
                                            handleEditNotes(note.title, note.category, note.body, note.Lesson_id, note.date, note._id)
                                        }
                                    </ListNote>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    ))}
                </List>
                ) : (
                    <h3>You have no notes saved to your portfolio.</h3>
                )}

        </div>
    );
};

export default UserNotes;
