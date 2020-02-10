import React, { Component } from "react";
import Bookmarks from "./Bookmarks/Bookmarks";
import Notes from './Notes/UserNotes'

class ProfileContainer extends Component {

    constructor() {
        super();
        this.state = {
            showHideNoteSection: false,
            showHideBookmarkSection: false
        }
        this.hideComponent = this.hideComponent.bind(this);
    }

    hideComponent(name) {
        console.log(name);
        switch (name) {
            case "showHideNewPost":
                this.setState({ showHideNewPost: !this.state.showHideNewPost,
                    showHideNoteSection: false,
                    showHideBookmarkSection: false
                });
                break;
            case "showHideNoteSection":
                this.setState({ showHideNoteSection: !this.state.showHideNoteSection, 
                    showHideNewPost: false,
                    showHideBookmarkSection: false
                 });
                break;
            case "showHideBookmarkSection":
                this.setState({ showHideBookmarkSection: !this.state.showHideBookmarkSection,
                    showHideNoteSection: false,
                    showHideNewPost: false
                 });
                break;
            default:
        }
    }

    render() {

        const { showHideNoteSection, showHideBookmarkSection } = this.state;

        return (
            <div>
                <div className="profile-tabs">
                    <button className="empty">Profile Navigation Menu</button>
                    <hr />
                    <button className="noteSection-tab" onClick={() => this.hideComponent("showHideNoteSection")}>
                        Notes
                </button>
                    <button className="bookmarkSection-tab" onClick={() => this.hideComponent("showHideBookmarkSection")}>
                        Bookmarks
                </button>
                </div>
                <div className="profile-body">
                    <img src={'images/dove.png'} alt="dove" />
                    {showHideNoteSection && (
                        <div className="noteSection">
                            <Notes />
                        </div>)}
                    {showHideBookmarkSection && (
                        <div className="bookmarkSection">
                            <Bookmarks />
                        </div>)}
                    <div className="profile-body">

                    </div>
                </div>
            </div>
        )
    }
}
export default ProfileContainer;