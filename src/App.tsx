import React from 'react';
import './App.css';

import LoginForm from "./components/LoginForm";
import 'semantic-ui-css/semantic.min.css'
import SignIn from "./components/SignIn";
import ConfirmForm from "./components/ConfirmForm";
import UserTable from "./components/UserTable";
import PageHeader from "./components/PageHeader";


const BrowserRouter = require("react-router-dom").BrowserRouter;
const Route = require("react-router-dom").Route;
const Link = require("react-router-dom").Link;
const Switch = require("react-router-dom").Switch

interface IProps {

}

interface IState {
    showLogin: boolean,
    showSignIn: boolean
}

class  App extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state ={
            showLogin: true,
            showSignIn: false
        };

        this.handler = this.handler.bind(this)
    }

    handler= ()=> {
        this.setState({
            showSignIn: !this.state.showSignIn,
            showLogin: !this.state.showLogin
        })


    }
    render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact  path="/" >
                    <LoginForm  showing={this.state.showLogin} heandler={this.handler} />
                    <SignIn showing={this.state.showSignIn} heandler={this.handler} />
                </Route>
                <Route exact  path="/confirmation/:id">
                    <ConfirmForm message={"Are you sure that you want to confirm activation of your account?"}/>
            </Route>
                <Route exact  path="/table">
                    <PageHeader/>
                    <UserTable/>
                </Route>
        </Switch>
        </BrowserRouter>
    )
  }
}

export default App;
