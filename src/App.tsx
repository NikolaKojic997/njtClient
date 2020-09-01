import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import 'semantic-ui-css/semantic.min.css'
import SignIn from "./components/SignIn";
//import UsersStore from "./stores/UsersStore";

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
        <div className="app">
          <SignIn showing={this.state.showSignIn} heandler={this.handler} />
          <LoginForm showing={this.state.showLogin} heandler={this.handler}/>
        </div>
    );
  }
}

export default App;
