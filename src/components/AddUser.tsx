import React from 'react';
import {Button, Form, Input} from "semantic-ui-react";
import axios from 'axios'


interface IProps {
    closeModal: any
    activeEmp: Employee|undefined
}
interface Employee  {
    employeeId: number,
    employmentDate: string,
    identificationNumber: string,
    name: string,
    surname: string
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

        if(!this.props.activeEmp) {
            await axios.post('http://localhost:8080/employee', user, config)
                .then(res => {
                    alert("Employee added succesfully!")
                    this.props.closeModal(res.data);
                })
                .catch(error => {
                    if (error.response) {
                        this.setState({
                            ...this.state,
                            message: ''
                        });
                        for (let i = 0; i < error.response.data.details.length; i++) {
                            this.setState({
                                ...this.state,
                                message: this.state.message + "\n" + error.response.data.details[i]
                            });
                        }
                    }
                })
        }
        else {
            await axios.put('http://localhost:8080/employee/'+this.props.activeEmp.employeeId, user, config)
                .then( res => {
                    alert("Employee updated succesfully!")
                    this.props.closeModal(res.data);
                })
                .catch(err => {
                    if (err.response) {
                        this.setState({
                            ...this.state,
                            message: ''
                        });
                        for (let i = 0; i < err.response.data.details.length; i++) {
                            this.setState({
                                ...this.state,
                                message: this.state.message + "\n" + err.response.data.details[i]
                            });
                        }
                    }
                })
        }


    };

    async componentDidMount(){

        if(this.props.activeEmp){
            this.setState({
                name: this.props.activeEmp.name,
                surname: this.props.activeEmp.surname,
                employmentDate:this.props.activeEmp.employmentDate,
                identificationNumber: this.props.activeEmp.identificationNumber,
            })
        }

    }


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

