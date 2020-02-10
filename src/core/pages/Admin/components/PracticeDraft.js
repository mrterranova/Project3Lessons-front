import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Accordion, Card } from 'react-bootstrap';
import Axios from 'axios';
import { isAuth, getCookie } from '../../../../auth/helpers';
import { ToastContainer, toast } from 'react-toastify';



class PracticeDraft extends Component {

  constructor(props) {
    super(props);

    this.state = {
      values: '', 
      title: '',
      body: '',
      keyTerms: '',
      scriptures:'', 
      editor:'',  
      token: getCookie('token'), 
      authorized: isAuth()._id
    };
    const content = window.localStorage.getItem('content');
    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    } else {
      this.state.editorState = EditorState.createEmpty();
    }
    
    const loadProfile = () => {
      console.log(this.state.token)
      Axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API}/user/${this.state.authorized}`,
        headers: {
            Authorization: `Bearer ${this.state.token}`
        }
    })
        .then(response => {
          console.log(response)
      })
    }

    loadProfile();

    const html = '';
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }

  onEditorStateChange: Function = (editorState) => {
    this.setState({
      editorState,
    });
  };
  
  
  render() {
    const handleChange = (name) => event => {
      this.setState({ title: this.state.title, keyTerms: this.state.keyTerms, scriptures: this.state.scriptures, body: this.state.body, editor: this.state.editor, [name]: event.target.value })
  }

    const handleSubmit = () => {
      const token = getCookie('token')
      Axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API}/admin/lesson/post`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: { keyTerms: this.state.keyTerms, title: this.state.title, body: this.state.editor, scriptures: this.state.scriptures }
    })
        .then(response => {
          toast.success("A new lesson was posted")
      })

    }

    const { editorState, token } = this.state;
    return (
      <form>
        <ToastContainer />
        <div>
          <div className='btn-post-lesson'>
            <input type="submit" onClick={() => handleSubmit()}/>
          </div>
          <div className="bodyText">
            <Accordion defaultActiveKey="0" style={{ width: '100%' }}>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Start Lesson Here
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <label >Title of Lesson:</label>
                    <br />
                    <input type="text" name="title" placeholder="title goes here..." style={{ width: '100%' }} onChange={handleChange('title')} />
                    <label >Searchable Key Terms:</label>
                    <br />
                    <input type="text" name="keyTerms" placeholder="write keyTerms with # and no spaces..." style={{ width: '100%' }} onChange={handleChange('keyTerms')} />
                    <label >Scriptures:</label>
                    <br />
                    <textarea name="scriptures" style={{ width: '100%' }} onChange={handleChange('scriptures')}></textarea>
                    <label >Paste from HTML:</label>
                    <textarea name="body" style={{ width: '100%' }} onChange={handleChange('body')}></textarea>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Word Pad Lessons
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="editorState">
                      <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                      /></div>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  HTML Raw Data
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <textarea
                      name="editor"
                      style={{ width: '100%', height: '40vh' }}
                      editorState={editorState}
                      onEditorStateChange={this.onEditorStateChange}
                      value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                      onChange= {handleChange('editor')}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </div>
        </div>
      </form>
    )
  }
}

export default PracticeDraft;