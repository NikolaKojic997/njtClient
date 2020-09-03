import React from 'react'
import { Table } from 'semantic-ui-react'
import axios from 'axios'





interface Title{
    titleId: number,
    titleName: string
}

interface Rank{
    rankId: number,
    rankName: string
}

interface Teacher  {
    employeeId: number,
    employmentDate: Date,
    identificationNumber: string,
    name: string,
    surname: string,
    title: Title,
    rank: Rank
}

interface IProps {

}

interface IState {
    users: Teacher[],
    activeItem: number

}

export default class TeachersTable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            users: [],
            activeItem: 0
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){

        await axios.get('http://localhost:8080/employee/teachers')
            .then(res=> {
                console.log(res.data)
                this.setState({
                    users: res.data
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

    render(){
        return(
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Surname</Table.HeaderCell>
                        <Table.HeaderCell>Identification number</Table.HeaderCell>
                        <Table.HeaderCell>Employment date</Table.HeaderCell>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Rank</Table.HeaderCell>
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
                            <Table.Cell>{element.title.titleName}</Table.Cell>
                            <Table.Cell>{element.rank.rankName}</Table.Cell>
                        </Table.Row>


                    ))}

                </Table.Body>
            </Table>
        )
    }
}


