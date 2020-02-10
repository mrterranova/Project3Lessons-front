import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import UserOptions from './UserOptions'

class UserLesson extends Component {

    eventLogger = (e: MouseEvent, data: Object) => {
      };

    render() {
        return (
          <Draggable
            handle=".handle"
            defaultPosition={{x: 100, y: 300}}
            position={null}
            grid={[25, 25]}
            onStart={this.handleStart}
            onDrag={this.handleDrag}
            onStop={this.handleStop}>
                <div className="notesContainer" style={{position:'absolute', zIndex:'3'}}>
                <div className="handle" style={{width:'24rem', backgroundColor:'#cccc', height: '2rem'}}></div>
                <UserOptions />
                </div>
          </Draggable>
        );
      }
}

ReactDOM.render(<UserLesson/>, document.getElementById("root"));

export default UserLesson