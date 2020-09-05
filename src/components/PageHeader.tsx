import React, { Component } from 'react'
import {Button, Menu} from 'semantic-ui-react'
import {log} from "util";
const Link = require("react-router-dom").Link
const useHistory = require("react-router-dom").useHistory


interface IProps {
    activeItem: string
    handleLogOut: any
}

interface IState {

}


function PageHeader(props:IProps)  {

    function logOut(){
        props.handleLogOut();
        history.push('/')
    }

     let history = useHistory();

     return (

            <Menu>
                <Menu.Item
                    name='MyProfile'
                    active={props.activeItem === 'MyProfile'}
                    onClick ={() => {
                        history.push('/MyProfile')
                    }}
                >
                    MyProfile
                </Menu.Item>
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

                <Menu.Item
                    name='DeleteAcc'
                    onClick ={() => {
                        history.push('/DeleteAcc')
                    }}

                >
                    Delete profile
                </Menu.Item>

                <Menu.Item
                    name='LogOut'
                    position={'right'}
                    active={props.activeItem === 'LogOut'}
                    onClick={()=> logOut()}
                >
                    Log out
                </Menu.Item>

            </Menu>


     )

}

export default PageHeader;