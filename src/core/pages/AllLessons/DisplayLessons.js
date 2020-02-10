import React, { Component } from "react";
import axios from 'axios';
// import { List, ListNote } from '../../components/List'
import { Link } from 'react-router-dom';
// import Layout from '../../components/NavigationBar/index';
// import Slider from 'react-animated-slider';
import CardBlock from '../../components/CardBlock';
import 'react-animated-slider/build/horizontal.css';
import './style.css'


class AllLessons extends Component {

  state = {
    lessons: []
  };

  componentDidMount() {
    this.loadLessons();
  }

  loadLessons = () => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API}/lessons`,
    })
      .then(res => {
        this.setState({ lessons: res.data })
      })
  };

  render() {

    return (
      <div>
        {this.state.lessons.length ? (
          <div>
            {this.state.lessons.map(lesson => (
              <div className="card-container" key={lesson._id}>
                <Link className="nav-link" to={'/lesson/' + lesson._id}>
                  <CardBlock 
                  key={lesson._id}
                    link={lesson._id}
                    keyTerms={lesson.keyTerms}
                    title={lesson.title}
                    body={lesson.body}>
                  </CardBlock>
                </Link>
              </div>
            ))}
          </div>
        ) : (
            <h3>For some reason lessons are offline. Please contact No-Limits Ministries at nolimitsministries@mail.com.</h3>
          )}
      </div>
    );
  }
}

export default AllLessons;
