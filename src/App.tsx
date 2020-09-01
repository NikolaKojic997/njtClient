import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import 'semantic-ui-css/semantic.min.css'
import SignIn from "./components/SignIn";
//import UsersStore from "./stores/UsersStore";

class  App extends React.Component {

    render() {
    return (
        <div className="app">
          <SignIn/>
        </div>
    );
  }
}

export default App;
