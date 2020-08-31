import React from 'react';
import {Button, Checkbox, Form} from "semantic-ui-react";
import axios from 'axios'
interface IProps {
}

interface IState {
    username: string,
    password: string,
    message: string
}

class  LoginForm extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
                username: '',
                password: '',
                message: ''
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
            password: this.state.password
        }

        await axios.post('http://localhost:8080/profiles/login', user, config)
            .then(response => {
                this.setState({
                    ...this.state,
                    message: 'Login succesfull, profile id: '+ response.data.profileId
                });
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
        return (
            <div className="loginForm">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='username' name = 'username' value={this.state.username} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' placeholder='password' name = 'password' value={this.state.password} onChange={this.handleChange} />
                    </Form.Field>
                    <Form.Field>
                        <label>{this.state.message}</label>
                     </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default LoginForm;