import React from 'react';
import {Button, Card, Form, Icon, Input, Image} from "semantic-ui-react";
import axios from 'axios'
import './signIn.css'

interface Employee {
    name: string,
    surname: string,
    identificationNumber: string,
    employmentDate: string
}

interface Profile {
    profileId: number,
    username: string,
    password: string,
    email: string,
    showing: boolean,
    employee: Employee
}

interface IProps {
    activeProfile: Profile|undefined
}

interface IState {
    username: string,
    password: string,
    message: string,
    email: string,
    identificationNumber: string,
    name: string,
    surname: string,
    updateEnabled: boolean
}

class  MyProfile extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            username: '',
            password: '',
            message: '',
            email: '',
            identificationNumber: '',
            name: '',
            surname: '',
            updateEnabled: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    async componentDidMount(){

        if(this.props.activeProfile){
            this.setState({
                username: this.props.activeProfile.username,
                password: this.props.activeProfile.password,
                email: this.props.activeProfile.email,
                identificationNumber: this.props.activeProfile.employee.identificationNumber,
                name: this.props.activeProfile.employee.name,
                surname: this.props.activeProfile.employee.surname
            })
        }

    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }

    handleUpdate = async ()=> {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let profile = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            identificationNumber: this.state.identificationNumber
        }

        console.log(profile)

        if(this.props.activeProfile) {
            await axios.put('http://localhost:8080/profiles/' + this.props.activeProfile.profileId, profile, config)
                .then(res=>{
                    alert("Profile updated succesfully")
                    this.setState({
                        updateEnabled: !this.state.updateEnabled
                    });
                })
                .catch(error =>{
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
                    }
                })


        }
    }


    render() {



        return (
            <div  id='container'>
                <div  className="loginForm">
                    <Form id = 'login' >
                        <Form.Field>
                            <label>Full name</label>
                            <Input icon='user outline' disabled={true} iconPosition='left'  name = 'fullName' value={this.state.name + " "+ this.state.surname}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Identification number</label>
                            <Input icon='lock' iconPosition='left' disabled={true} name = 'identificationNumber' value={this.state.identificationNumber}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <Input disabled={!this.state.updateEnabled} icon='user outline' iconPosition='left' placeholder='email' name = 'email' value={this.state.email} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Username</label>
                            <Input disabled={!this.state.updateEnabled} icon='user outline' iconPosition='left' placeholder='username' name = 'username' value={this.state.username} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input disabled={!this.state.updateEnabled} icon='lock' iconPosition='left' placeholder='password' name = 'password' value={this.state.password} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>{this.state.message}</label>
                        </Form.Field>
                        <Button id = "UpdateBtn"  primary disabled={this.state.updateEnabled} onClick={()=>this.setState({updateEnabled: true})} >Update profile</Button>
                        <Button id = "SubmitBtn"  primary  disabled={!this.state.updateEnabled} onClick={()=> this.handleUpdate()}>Submit</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default MyProfile;

