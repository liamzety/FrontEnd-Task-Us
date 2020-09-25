import React from 'react'
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi'


export class MobileNav extends React.Component {

    state = {
        isMenuShown:false
    }
    
    toggleMenuModal=()=>{
        this.setState({isMenuShown: !this.state.isMenuShown})
    }

    closeMenuModal=()=>{
        this.setState({isMenuShown: false})
    }

    render() {
        return (
            <React.Fragment>
                <nav>
                    <div className="hamburger flex align-center justify-center" onClick={this.toggleMenuModal} >
                        <GiHamburgerMenu />
                    </div>
                </nav>
                <section className={`${this.state.isMenuShown && 'animate-menu-modal'} menu-modal flex column align-center`}>
                    <NavLink to="/">
                        <h3>Home</h3>
                    </NavLink>
                    <NavLink to="/boards">
                        <h3>Boards List</h3>
                    </NavLink>
                    <NavLink to="/myweek">
                        <h3>My Week</h3>
                    </NavLink>
                    <NavLink to={`/user/${this.props.loggedUser._id}`}>
                        <h3>My Profile</h3>
                    </NavLink>
                    <NavLink to="/login">
                        <h3>Logout</h3>
                    </NavLink>
                </section>
                {this.state.isMenuShown &&  <div className="modal-screen-wrapper" onClick={this.closeMenuModal}></div>}
            </React.Fragment>
        )
    }
}