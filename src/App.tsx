import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm";
import InputField from "./components/InputField";
import SubmitButton from "./components/SubmitButton";
//import UsersStore from "./stores/UsersStore";

class  App extends React.Component {

    render() {
    return (
        <div className="app">
          <LoginForm/>
        </div>
    );
  }
}

export default App;
