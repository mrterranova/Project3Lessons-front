import React, { Component, Fragment} from "react";
import axios from 'axios';
// import { Link } from 'react-router-dom';
import Layout from '../../components/NavigationBar/index';
import './style.css'
import UserLesson from './UserLesson'
import Bookmarked from './UserBookmark'
import { isAuth } from '../../../auth/helpers';
import { Button, Modal } from "react-bootstrap";


class Lesson extends Component {

  state = {
    lesson: "",
    show: false,
    scriptures: "", 
    verses: "",
  };


  componentDidMount() {
    this.loadLesson();
    this.getVerse();
    this.convertFromHTML();
  }

  loadLesson = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/lesson/` + this.props.match.params.id,
    })
      .then(res => {
        this.setState({ lesson: res.data, scriptures: res.data.scriptures })
      })
  };


convertFromHTML=() => {
  return <div dangerouslySetInnerHTML={ {__html: this.state.lesson.body}} />;
}
 


  handleModal() {
    if (this.state.show === false) {
      this.setState({ show: true })
      this.getVerse()
    }
    if (this.state.show === true) {
      this.setState({ show: false })
    }
  }
  
  getVerse() {
    const scriptureString = this.state.scriptures
    const scriptureArray = scriptureString.split(",")
    let promiseArr = scriptureArray.map(verse =>
      axios({
        method: 'GET',
        url: `https://bible-api.com/` + verse
      }).then(res => {
        return (
          <Fragment>
          <div classname="verse-reference" key={res.data.text}><strong>
            {res.data.reference}</strong></div>
            <div classname="verse-text"><i>{res.data.text}</i></div>
            <br/>
          </Fragment>
        )
        })
    )
    Promise.all(promiseArr).then(values => {
      this.setState({ verses: values})
    })
  }

  render() {
    
    return (
      <div>
        {isAuth() && (
          <Bookmarked />
            )}
        <Layout />
            <button id="btn-scriptures" onClick={() => { this.handleModal() }}>Scriptures</button>
        <h2 className="title-lesson">{this.state.lesson.title}</h2>
        <div className="main"></div>
        <div className="backLessonNav"></div>
        <div className="lessonNav">
          <div>
            <Modal show={this.state.show}>
              <Modal.Header>
                <div className="settings-title">
                  <h2 >
                    Scriptures
                        </h2>
                </div>
              </Modal.Header>
              <Modal.Body>
                <div>
                  {this.state.verses}
                </div>
              </Modal.Body>
              <div className='settings-modal-close'>
                <Button className="btn btn-info" onClick={() => { this.handleModal() }}>Close</Button>
              </div>
              <Modal.Footer>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <div className="lessonDisplay">{this.convertFromHTML()}</div>
        {isAuth() && (
        <UserLesson />
            )}
      </div>
    );
  }
}

export default Lesson;