import React from 'react';
import './App.css';

import LoginForm from "./components/LoginForm";
import 'semantic-ui-css/semantic.min.css'
import SignIn from "./components/SignIn";
import ConfirmForm from "./components/ConfirmForm";
import UserTable from "./components/UserTable";
import PageHeader from "./components/PageHeader";
import AssistentsTable from "./components/AssistentsTable";
import TeachersTable from "./components/TeachersTable";
import MyProfile from "./components/MyProfile";


const BrowserRouter = require("react-router-dom").BrowserRouter;
const Route = require("react-router-dom").Route;
const Link = require("react-router-dom").Link;
const Switch = require("react-router-dom").Switch
const Redirect = require("react-router-dom").Redirect

interface IProps {

}

interface IState {
    showLogin: boolean,
    showSignIn: boolean
    activeProfile: Profile | undefined,
    loginSuccess: boolean
}

interface Employee {
    name: string,
    surname: string,
    identificationNumber: string,
    employmentDate: string
}

interface Profile {
    username: string,
    password: string,
    email: string,
    showing: boolean,
    employee: Employee
}

class  App extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props)

        this.state ={
            showLogin: true,
            showSignIn: false,
            activeProfile: undefined,
            loginSuccess: false

        };

        this.handler = this.handler.bind(this)
        this.handleLogin = this.handleLogin.bind(this)

    }

    handler= ()=> {
        this.setState({
            showSignIn: !this.state.showSignIn,
            showLogin: !this.state.showLogin
        })
    }

    handleLogin(p: Profile) {
        this.setState({
            activeProfile: p,
            loginSuccess: true
        })
    }


    render() {

    return (

        <BrowserRouter>
            <Redirect to />
            <Switch>
                <Route exact  path="/" >
                    {this.state.loginSuccess ? <Redirect to="/MyProfile" /> : <LoginForm handleLogin={this.handleLogin} showing={this.state.showLogin} heandler={this.handler} />}
                     <SignIn showing={this.state.showSignIn} heandler={this.handler} />
                </Route>
                <Route exact  path="/confirmation/:id">
                    <ConfirmForm message={"Are you sure that you want to confirm activation of your account?"}/>
            </Route>
                <Route exact  path="/Employee">
                    <PageHeader activeItem={"Employee"}/>
                    <UserTable/>
                </Route>
                <Route exact  path="/Assistents">
                    <PageHeader activeItem={"Assistents"}/>
                    <AssistentsTable/>
                </Route>
                <Route exact  path="/Teachers">
                    <PageHeader activeItem={"Teachers"}/>
                    <TeachersTable/>
                </Route>
                <Route exact  path="/MyProfile">
                <PageHeader activeItem={"MyProfile"}/>
                <MyProfile activeProfile={this.state.activeProfile}/>
            </Route>
                <Route exact  path="/DeleteAcc">
                    <PageHeader activeItem={"DeleteAcc"}/>
                    <ConfirmForm message={"Are you sure that you want to delete acc?"}/>
                </Route>
        </Switch>
        </BrowserRouter>
    )
  }
}

export default App;
