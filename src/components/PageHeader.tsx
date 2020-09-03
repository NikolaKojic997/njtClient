import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'


interface IProps {

}

interface IState {
    activeItem: string
}


export default class PageHeader extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state ={
            activeItem: 'editorials'
        };
        this.handleItemClick = this.handleItemClick.bind(this);

    }

    handleItemClick = (e: any, {name}:any  ) => {
        this.setState({ activeItem: name }
        )
    }

    render() {
        const { activeItem } = this.state

        return (
            <Menu>
                <Menu.Item
                    name='editorials'
                    active={activeItem === 'editorials'}
                    onClick={this.handleItemClick}
                >
                    Editorials
                </Menu.Item>

                <Menu.Item
                    name='reviews'
                    active={activeItem === 'reviews'}
                    onClick={this.handleItemClick}
                >
                    Reviews
                </Menu.Item>

                <Menu.Item
                    name='upcomingEvents'
                    active={activeItem === 'upcomingEvents'}
                    onClick={this.handleItemClick}
                >
                    Upcoming Events
                </Menu.Item>
            </Menu>
        )
    }
}