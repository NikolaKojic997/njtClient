import React from 'react';
import {Button, Dropdown, DropdownProps, Form, Input, Table} from "semantic-ui-react";
import axios from 'axios'


interface IProps {
    closeModal: any
}

interface DropDpwnItem{
    key: number,
    value: number,
    text: string
}

interface IState {
    name: string,
    surname: string,
    employmentDate: string,
    identificationNumber: string,
    message: string,
    titles: DropDpwnItem[],
    ranks: DropDpwnItem[],
    selectedTitle: number,
    selectedRank: number
}

class  AddTeacher extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            employmentDate: '',
            identificationNumber: '',
            message: '',
            titles: [],
            ranks: [],
            selectedTitle: 0,
            selectedRank: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitAddUser = this.handleSubmitAddUser.bind(this);
        this.dropdownChangeTitle = this.dropdownChangeTitle.bind(this);
        this.dropdownChangeRank = this.dropdownChangeRank.bind(this);
    }


    handleChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        this.setState({
            ...this.state,
            [e.target.name]:e.target.value
        });
    }

    //Dropwdown change event
    // @ts-ignore
    dropdownChangeTitle = (event: React.SyntheticEvent<HTMLElement>, data:any) => {
        this.setState({selectedTitle: data.value})
    }

    dropdownChangeRank = (event: React.SyntheticEvent<HTMLElement>, data:any) => {
        this.setState({selectedRank: data.value})
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
            titleID: this.state.selectedTitle,
            rankID: this.state.selectedRank

        }

        await axios.post('http://localhost:8080/employee/teachers', user, config)
            .then(res => {
                alert("Teacher added succesfully!")
                this.props.closeModal(res.data);
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



    };

    async componentDidMount(){

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
        await axios.get('http://localhost:8080/ranks')
            .then(res=> {
                console.log(res.data)
                this.setState({
                    ranks: res.data.map((element:any) =>
                        ({value: element.rankID,
                            text: element.rankName,
                            key:element.rankID }))
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
                    <label>{this.state.message}</label>
                </Form.Field>
                <Form.Field>
                    <label>Title</label>
                    <Dropdown
                        placeholder='Title'
                        fluid
                        selection
                        options={this.state.titles}
                        name="value"
                        onChange={this.dropdownChangeTitle}
                    >
                    </Dropdown>
                </Form.Field>
                <Form.Field>
                    <label>Rank</label>
                    <Dropdown
                        placeholder='Rank'
                        fluid
                        selection
                        options={this.state.ranks}
                        name="value"
                        onChange={this.dropdownChangeRank}
                    >
                    </Dropdown>
                </Form.Field>
                <Button id = "loginBtn" primary type='submit'>Submit</Button>
            </Form>


        );
    }
}

export default AddTeacher;

