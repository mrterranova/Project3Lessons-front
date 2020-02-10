import React, { Component } from "react";
import axios from 'axios';
import 'react-animated-slider/build/horizontal.css';
import CardBlock from './CardBlock'


class LessonsMap extends Component {

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
            console.log(res.data)
            this.setState ({ lessons: res.data })
        })
  };

  render() {
      
    return (
        <div>

        </div>
    );
  }
}

export default LessonsMap;
