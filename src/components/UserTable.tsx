import React from 'react'
import { Table } from 'semantic-ui-react'

interface IProps {

}

interface IState {
    projects: Array<{
        name:string,
        status: string,
        notes: string
    }>;

}

export default class UserTable extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            projects:[{
                name: "pera",
                status: "asdasd",
                notes: "none"
            },
             {
                    name: "pera",
                    status: "asdasd",
                    notes: "none"
             }]
        }
    }

    render(){
        return(
            <Table celled selectable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Notes</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.projects.map(element => (
                        <Table.Row>
                            <Table.Cell>{element.name}</Table.Cell>
                            <Table.Cell>{element.status}</Table.Cell>
                            <Table.Cell>{element.notes}</Table.Cell>
                        </Table.Row>
                    ))}

                </Table.Body>
            </Table>
        )
}
}


