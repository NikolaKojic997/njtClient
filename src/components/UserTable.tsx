import React from 'react'
import {Button, Modal, Pagination, Table} from 'semantic-ui-react'
import axios from 'axios'
import AddUser from "./AddUser";


interface Employee  {
    employeeId: number,
    employmentDate: string,
    identificationNumber: string,
    name: string,
    surname: string
}

interface IProps {

}

interface IState {
    users: Employee[],
    activeItem: number,
    modalAddOpen: boolean,
    modalUpdateOpen: boolean

}

export default class UserTable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            users: [],
            activeItem: 0,
            modalAddOpen: false,
            modalUpdateOpen: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.handleUpdateUser = this.handleUpdateUser.bind(this);

    }

    async componentDidMount(){

        await axios.get('http://localhost:8080/employee')
                    .then(resoult => {
                        this.setState({
                            users: resoult.data
                        })
                    })
                    .catch(error => {
                        console.log(error)
                    });

    }

    handleClick = (id: number)=> {
        this.setState({
            ...this.state,
            activeItem:id
        });
    }

     handleDelete = async ()=> {
        let activeItem = this.state.activeItem;
        await axios.delete('http://localhost:8080/employee/'+ this.state.activeItem)
            .then(res =>{
                console.log(res);
                alert("Employee deleted")
            })
            .catch(err =>{
                console.log(err)
            })
         this.setState(
             {
                 users: this.state.users.filter( obj => obj.employeeId !== activeItem),
                 activeItem:0
             }
         )



    }

    handleAddUser = (emp: Employee) =>{
        this.setState({
            modalAddOpen: false,
            users: [...this.state.users, emp]
        })
    }

    handleUpdateUser = (emp: Employee) =>{
        this.setState({
            modalUpdateOpen: false,
            users: this.state.users.filter( obj => obj.employeeId !== emp.employeeId)
        })
        this.setState({
            users: [...this.state.users, emp]
        })
    }


    render(){
        return(
            <div >
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Surname</Table.HeaderCell>
                        <Table.HeaderCell>Identification number</Table.HeaderCell>
                        <Table.HeaderCell>Employment date</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.users.map(element => (

                            <Table.Row key={element.employeeId} active={this.state.activeItem == element.employeeId}
                                   onClick={() => this.handleClick(element.employeeId)}>
                            <Table.Cell>{element.name}</Table.Cell>
                            <Table.Cell>{element.surname}</Table.Cell>
                            <Table.Cell>{element.identificationNumber}</Table.Cell>
                            <Table.Cell>{element.employmentDate}</Table.Cell>

                        </Table.Row>


                    ))}

                </Table.Body>
            </Table>
            <div id = 'buttonTab' >
                <Button onClick={()=> this.setState({
                    modalAddOpen: true
                })}>Add new</Button>
                <Button disabled={this.state.activeItem === 0} onClick={()=> this.setState({
                    modalUpdateOpen: true
                })}>Update</Button>
                <Button disabled={this.state.activeItem === 0} onClick={this.handleDelete}>Delete</Button>
            </div>
                <Modal
                    open={this.state.modalAddOpen}
                    onClose={()=> this.setState({
                        modalAddOpen: false
                    })}
                    closeIcon>
                    <Modal.Header>Add User</Modal.Header>
                    <Modal.Content>
                        <AddUser activeEmp={undefined} closeModal={this.handleAddUser} />
                    </Modal.Content>
                </Modal>
                <Modal
                    open={this.state.modalUpdateOpen}
                    onClose={()=> this.setState({
                        modalUpdateOpen: false
                    })}
                    closeIcon>
                    <Modal.Header>Update User</Modal.Header>
                    <Modal.Content>
                        <AddUser activeEmp={this.state.users.find(t => t.employeeId === this.state.activeItem)}closeModal={this.handleUpdateUser} />
                    </Modal.Content>
                </Modal>

            </div>

        )
}
}


