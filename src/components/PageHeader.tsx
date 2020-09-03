import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
const useHistory = require("react-router-dom").useHistory


interface IProps {
    activeItem: string
}

interface IState {

}


function PageHeader(props:IProps)  {


     let history = useHistory();

     return (
            <Menu>
                <Menu.Item
                    name='Employee'
                    active={props.activeItem === 'Employee'}
                    onClick ={() => {
                        history.push('/Employee')
                    }}
                >
                    Employee
                </Menu.Item>

                <Menu.Item
                    name='Assistents'
                    active={props.activeItem === 'Assistents'}
                    onClick ={() => {
                        history.push('/Assistents')
                    }}
                >
                    Assistents
                </Menu.Item>

                <Menu.Item
                    name='Teachers'
                    active={props.activeItem === 'Teachers'}
                    onClick ={() => {
                        history.push('/Teachers')
                    }}
                 >
                    Teachers
                </Menu.Item>
            </Menu>
     )

}

export default PageHeader;