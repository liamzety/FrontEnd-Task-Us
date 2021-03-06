import React, { Fragment } from 'react'
import { AiOutlineSend } from 'react-icons/ai';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
// inside imports
import { Reply } from './Reply';

export class Update extends React.Component {
    state = {
        txt: '',
        isEditMode: false,
        isOptionsModal: false
    }
    onReply = (newUpdate) => {
        if (!this.state.txt || this.state.txt.split('').every(letter => letter === ' ')) return
        const newReply = {
            txt: this.state.txt,
            createdAt: Date.now(),
            id: this.props.makeid(),
            member: {
                fullName: this.props.loggedUser.fullName,
                username: this.props.loggedUser.userName,
                _id: this.props.loggedUser.userName,
                imgUrl: this.props.loggedUser.imgUrl
            }
        }
        const update = this.props.updates.find(update => update.id === newUpdate.id)
        update.replies = [...update.replies, newReply]
        this.props.updateNote(update)
        this.setState({ txt: '' })
    }
    removeUpdate = (updateId) => {
        const updates = this.props.updates.filter(update => update.id !== updateId)
        this.props.sendNote(updates)
    }
    onToggleEditUpdate = () => {
        this.setState({ isEditMode: !this.state.isEditMode })
    }
    editUpdate = (newUpdate) => {
        if (newUpdate.txt === this.state.txt) return this.setState({ isEditMode: false })
        newUpdate.txt = this.state.txt
        const newUpdates = this.props.updates.map(update => {
            return update.id === newUpdate.id ? newUpdate : update
        })
        this.props.sendNote(newUpdates)
        this.setState({ isEditMode: false, txt: '' })
    }
    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }
    toggleOptionsModal = () => {
        this.setState({ isOptionsModal: !this.state.isOptionsModal })
    }
    getInitials(fullName) {
        const [firstName, lastName] = fullName.split(' ');
        let initials = firstName.charAt(0).toUpperCase();
        if (lastName) initials += lastName.charAt(0).toUpperCase();
        return initials;
    }
    render() {
        const { update, idx } = this.props
        return (
            <div key={idx} className="update-box flex wrap column relative">
                <HiOutlineDotsHorizontal className="options-reply-btn cursor-pointer" onClick={this.toggleOptionsModal} />
                {this.state.isOptionsModal &&
                    <Fragment>
                        <div onClick={() => {
                            this.toggleOptionsModal()
                        }} className="modal-screen-wrapper"></div>
                        <div className="update-options-modal">
                            <p className="remove-reply-btn cursor-pointer" onClick={() => {
                                this.toggleOptionsModal()
                                this.removeUpdate(update.id)
                            }}>Delete Post</p>
                            <p className="edit-reply-btn cursor-pointer" onClick={() => {
                                this.toggleOptionsModal()
                                this.onToggleEditUpdate()
                            }}>Edit Post</p>
                        </div>
                    </Fragment>
                }
                <div className="update-box-header flex align-center">
                {
                    update.member.imgUrl ?  <img src={update.member.imgUrl} alt="" />
                 : 
                 <div className="member-letter flex align-center justify-center"> 
                 {this.getInitials(update.member.fullName)[0]}
                 {this.getInitials(update.member.fullName)[1]}
                 </div>
                 }
                    <p className="member-name">{update.member.fullName}</p>
                </div>
                {this.state.isEditMode ?
                    <div className="update-box-edit flex column relative">
                        <textarea value={this.state.txt} name="txt" onChange={this.handleChange}></textarea>
                        <AiOutlineSend className="submit-edit-btn absolute" onClick={() => this.editUpdate(update)} />
                        {update.imgUrl && <img src={update.imgUrl} alt="" />}
                    </div>
                    :
                    <div className="update-box-main flex column">
                        {update.txt && <p className="update-text">{update.txt}</p>}
                        {update.imgUrl && <img src={update.imgUrl} alt="" />}
                    </div>
                }
                <div className="update-box-footer flex column">
                    {update.replies &&
                        <div className="replies-box flex column" style={{ borderTop: `${update.replies.length && '1px solid rgba(109, 109, 109, 0.35)'}` }}>
                            {update.replies.map((reply, idx) =>
                                <Reply key={idx} reply={reply} idx={idx} update={this.props.update}
                                    updateNote={this.props.updateNote} />
                            )}</div>
                    }
                    {!this.state.isEditMode &&
                        <div className="reply-footer flex space-between align-center">
                            <textarea value={this.state.txt} name="txt" onChange={this.handleChange}></textarea>
                            <button className="reply-button" onClick={() => this.onReply(update)}>Reply</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}