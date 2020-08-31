import React from 'react';
import {Button, Checkbox, Form} from "semantic-ui-react";
interface IProps {
}

interface IState {
    username: string,
    password: string
}

class  LoginForm extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
                username: '',
                password: ''
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

    handleSubmit(event: Event) {

    }


    render() {
        return (
            <div className="loginForm">
                <Form>
                    <Form.Field>
                        <label>Username</label>
                        <input placeholder='username' name = 'username' value={this.state.username} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input type='password' placeholder='password' name = 'password' value={this.state.password} onChange={this.handleChange} />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        );
    }
}

export default LoginForm;