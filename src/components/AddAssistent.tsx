import React from 'react';
import {Button, Dropdown, DropdownProps, Form, Input, Table} from "semantic-ui-react";
import axios from 'axios'


interface IProps {
    closeModal: any,
    activeAssistent: Assistent | undefined
}

interface DropDownItem{
    key: number,
    value: number,
    text: string
}

interface Title{
    titleID: number,
    titleName: string
}

interface Assistent  {
    employeeId: number,
    employmentDate: string,
    identificationNumber: string,
    name: string,
    surname: string,
    title: Title
}

interface IState {
    name: string,
    surname: string,
    employmentDate: string,
    identificationNumber: string,
    message: string,
    titles: DropDownItem[];
    selectedTitle: number
}

class  AddAssistant extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            employmentDate: '',
            identificationNumber: '',
            message: '',
            titles: [],
            selectedTitle: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitAddUser = this.handleSubmitAddUser.bind(this);
        this.dropdownChange = this.dropdownChange.bind(this);
    }


    handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }

    //Dropwdown change event
    // @ts-ignore
    dropdownChange = (event: React.SyntheticEvent<HTMLElement>, data:any) => {
        this.setState({selectedTitle: data.value})
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
            titleID: this.state.selectedTitle

        }

        if(!this.props.activeAssistent) {

            await axios.post('http://localhost:8080/employee/assistants', user, config)
                .then(res => {
                    alert("Assistent added succesfully!")
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
        else{
            await axios.put('http://localhost:8080/employee/assistants/'+this.props.activeAssistent.employeeId, user, config)
                .then( res => {
                    alert("Assistent updated succesfully!")
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


        if(this.props.activeAssistent){
            this.setState({
                name: this.props.activeAssistent.name,
                surname: this.props.activeAssistent.surname,
                employmentDate:this.props.activeAssistent.employmentDate,
                identificationNumber: this.props.activeAssistent.identificationNumber,
                selectedTitle: this.props.activeAssistent.title.titleID,

            })
        }

        await axios.get('http://localhost:8080/titles')
            .then(res=> {
                console.log(res.data)
                this.setState({
                    titles: res.data.map((element:any) =>
                          ({value: element.titleID,
                            text: element.titleName,
                            key:element.titleID }))
                })
            })
            .catch(error => {
                console.log(error)
            });

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
                    <label>Title</label>

                </Form.Field>
                <Form.Field>
                    <label>{this.state.message}</label>
                    <Dropdown
                        placeholder='Title'
                        fluid
                        selection
                        options={this.state.titles}
                        name="value"
                        onChange={this.dropdownChange}
                        value = {this.state.selectedTitle}
                    >
                    </Dropdown>
                </Form.Field>
                <Button id = "loginBtn" primary type='submit'>Submit</Button>
            </Form>


        );
    }
}

export default AddAssistant;

