import React from 'react'
import {Button, Table} from 'semantic-ui-react'
import axios from 'axios'


interface Employee  {
    employeeId: number,
    employmentDate: Date,
    identificationNumber: string,
    name: string,
    surname: string
}

interface IProps {

}

interface IState {
    users: Employee[],
    activeItem: number

}

export default class UserTable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            users: [],
            activeItem: 0
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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
                <Button>Add new</Button>
                <Button disabled={this.state.activeItem === 0}>Update</Button>
                <Button disabled={this.state.activeItem === 0} onClick={this.handleDelete}>Delete</Button>
            </div>
            </div>
        )
}
}


