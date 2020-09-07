import React from 'react';
import axios from 'axios';
import {Button, Confirm, Form, Input} from "semantic-ui-react";
const useHistory = require("react-router-dom").useHistory
const Link = require("react-router-dom").Link;
const useParams = require("react-router-dom").useParams;

interface IProps {
    message: string,
    operation: string,
    activeProfile: Profile|undefined,
    hendleLogOut: any
}

interface IState {

}

interface Employee {
    name: string,
    surname: string,
    identificationNumber: string,
    employmentDate: string
}

interface Profile {
    profileId: number
    username: string,
    password: string,
    email: string,
    showing: boolean,
    employee: Employee
}




function  ConfirmForm(props: IProps) {
        let {id} = useParams();
        const history = useHistory();
   async function handleConfirm(id: number){
       if(props.operation === 'confirm') {
           await axios.post('http://localhost:8080/profiles/activate/' + id)
               .then(response => {
                   alert("Your account is succesfully activated!")
               })
               .catch(error => {
                   if (error.response) {
                       console.log(error.response)
                   } else if (error.request) {
                       console.log("This is error request")
                   } else {
                       console.log("This is just error")
                   }
               })
       }
       else {
           if(props.activeProfile)
           await axios.delete('http://localhost:8080/profiles/' + props.activeProfile.profileId)
                      .then(res =>{
                          alert("Your account is succesfully deleted!")
                      })
                      .catch(error => {
                          if (error.response) {
                              console.log(error.response)
                          }}
                      )

       }
        props.hendleLogOut()
        history.push("/")
    }

        return (
            <div>
                <Confirm
                    open={true}
                    content={props.message}
                    onConfirm={() => handleConfirm(id)}
                    cancelButton={<Button as={Link} to='/'> Cancel</Button>}
                />
            </div>
        );
}



export default ConfirmForm;

