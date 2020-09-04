import React from 'react';
import {Button, Form, Input} from "semantic-ui-react";
import axios from 'axios'


interface IProps {
    closeModal: any
}

interface IState {
    name: string,
    surname: string,
    employmentDate: string,
    identificationNumber: string,
    message: string
}

class  AddUser extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            name: '',
            surname: '',
            employmentDate: '',
            identificationNumber: '',
            message: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitAddUser = this.handleSubmitAddUser.bind(this);
    }


    handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }

    private handleSubmitAddUser = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let user = {
            name: this.state.name,
            surname: this.state.surname,
            employmentDate:new Date(this.state.employmentDate),
            identificationNumber: this.state.identificationNumber,

        }

        await axios.post('http://localhost:8080/employee', user, config)
            .then(res => {
                alert("Employee added succesfully!")
                this.props.closeModal(res.data);
            })
            .catch(error =>{
                console.log(error.response)
            })



    };


    render() {

        return (    <Form id = 'AddUserForm' onSubmit={this.handleSubmitAddUser}>
                        <Form.Field>
                            <label>Name</label>
                            <Input icon='user outline' iconPosition='left' placeholder='name' name = 'name' value={this.state.name} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Surname</label>
                            <Input icon='lock' iconPosition='left' placeholder='surname' name = 'surname' value={this.state.surname} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Employment Date</label>
                            <Input icon='mail' iconPosition='left'  placeholder='Employment Date' name = 'employmentDate' value={this.state.employmentDate} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>Identification number</label>
                            <Input icon='address card' iconPosition='left' placeholder='identification number' name = 'identificationNumber' value={this.state.identificationNumber} onChange={this.handleChange} />
                        </Form.Field>
                        <Form.Field>
                            <label>{this.state.message}</label>
                        </Form.Field>
                        <Button id = "loginBtn" primary type='submit'>Submit</Button>
                    </Form>


        );
    }
}

export default AddUser;

