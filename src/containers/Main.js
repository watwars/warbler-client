import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Homepage from "../components/Homepage"
import AuthForm from "../components/Authform"
import {authUser} from "../store/actions/auth"
import {removeError} from '../store/actions/errors'
import withAuth from '../hocs/withAuth'
import MessageForm from '../containers/MessageForm'

const Main = props => {
    const {authUser, errors, removeError, currentUser} = props;
    return(
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <Homepage {...props} currentUser={currentUser}/>}></Route>
                <Route exact path='/signin' render={props => {
                    return(
                        <AuthForm 
                            {...props} 
                            errors={errors}
                            buttonText='Log In' 
                            heading='Welcome Back.' 
                            onAuth={authUser}
                            removeError = {removeError}
                        />
                    )
                }}></Route>
                <Route exact path='/signup' render={props => {
                    return(
                        <AuthForm 
                            errors={errors}
                            {...props} 
                            signUp 
                            buttonText='Sign up' 
                            onAuth={authUser} 
                            heading='Join Warbler Today.'
                            removeError = {removeError}
                        />
                    )
                }}></Route>
                <Route path="/users/:id/messages/new" component={withAuth(MessageForm)}></Route>
            </Switch>
        </div>
    )
}

function mapStateToProps(state){
    return{
        currentUser: state.currentUser,
        errors: state.errors
    }
} 

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));