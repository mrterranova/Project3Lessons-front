import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import Settings from './Settings';
import '../style.css'

class SettingsModal extends Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }

    handleModal() {
        if (this.state.show === false) {
            this.setState({ show: true })
        }
        if (this.state.show === true) {
            this.setState({ show: false })
        }
    }

    render() {
        return (
            <div>
                <li className="nav-item settings-btn" onClick={() => { this.handleModal() }}>Settings</li>

                <Modal show={this.state.show}>
                    <Modal.Header>
                        <div className="settings-title">
                        <h2 >
                            Profile Settings
                        </h2>
                        </div>
                    </Modal.Header>
                    <Settings />
                    <div className='settings-modal-close'>
                        <Button className="settings-modal-btn" onClick={() => { this.handleModal() }}>Close</Button>
                    </div>
                </Modal>
            </div>
        )
    }
}


export default SettingsModal;