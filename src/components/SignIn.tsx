import React from 'react';
import {Button, Form, Input} from "semantic-ui-react";
import axios from 'axios'
import './signIn.css'

interface IProps {
    showing: boolean,
    heandler: any
}

interface IState {
    username: string,
    password: string,
    message: string,
    email: string,
    identificationNumber: string,
    showing: boolean
}

class  SignIn extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            username: '',
            password: '',
            message: '',
            email: '',
            identificationNumber: '',
            showing: this.props.showing
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }

    private handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>


    ): Promise<void> => {

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let user = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            identificationNumber:this.state.identificationNumber
        }

        await axios.post('http://localhost:8080/profiles', user, config)
            .then(response => {
                this.setState({
                    ...this.state,
                    message: 'SignUp succesfull, profile id: '+ response.data.profileId
                });
                console.log(response);
            })
            .catch(error => {
                if (error.response) {
                    this.setState({
                        ...this.state,
                        message: ''
                    });
                    for (let i = 0; i<error.response.data.details.length; i++) {
                        this.setState({
                            ...this.state,
                            message: this.state.message + "\n" +  error.response.data.details[i]
                        });
                    }
                } else if (error.request) {
                    console.log("This is error request")
                } else {
                    console.log("This is just error")
                }
            })

    };


    render() {

        if (!this.props.showing) return null;

        return (
            <div  id='container'>
                <div hidden={!this.state.showing} className="loginForm">
                    <Form id = 'login' onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>Username</label>
                            <Input icon='user outline' iconPosition='left' placeholder='username' name = 'username' value={this.state.username} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input icon='lock' iconPosition='left' type='password' placeholder='password' name = 'password' value={this.state.password} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <Input icon='mail' iconPosition='left'  placeholder='email' name = 'email' value={this.state.email} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Identification number</label>
                            <Input icon='address card' iconPosition='left' placeholder='identification number' name = 'identificationNumber' value={this.state.identificationNumber} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>{this.state.message}</label>
                        </Form.Field>
                        <Form.Field>
                            <a  onClick={this.props.heandler} ><label>Login!</label></a>
                        </Form.Field>
                        <Button id = "loginBtn" primary type='submit'>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignIn;

