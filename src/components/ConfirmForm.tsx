import React from 'react';
import axios from 'axios';
import {Button, Confirm, Form, Input} from "semantic-ui-react";
const useHistory = require("react-router-dom").useHistory
const Link = require("react-router-dom").Link;
const useParams = require("react-router-dom").useParams;

interface IProps {
    message: string
}

interface IState {

}



function  ConfirmForm(props: IProps) {
        let {id} = useParams();
        const history = useHistory();
   async function handleConfirm(id: number){
        await axios.post('http://localhost:8080/profiles/activate/'+id)
            .then(response => {
                alert("Your account is succesfully activated!" )
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

