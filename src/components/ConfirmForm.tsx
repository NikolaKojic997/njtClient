import React from 'react';
import {Button, Confirm, Form, Input} from "semantic-ui-react";
import axios from 'axios'
const useHistory = require("react-router-dom").useHistory
const Link = require("react-router-dom").Link;

interface IProps {
    message: string
}

interface IState {

}

class  ConfirmForm extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }

    private handleCancel = () => {
        const history = useHistory();
        history.push("/")
    };

    private handleConfirm =  () => {
       console.log("Ovo radi??")
    };


    render() {
        return (
            <div>
                <Confirm
                    open={true}
                    content={this.props.message}
                    onConfirm={this.handleConfirm}
                    cancelButton={<Button as={Link} to='/'> Confirm</Button>}
                    confirmButton= {<Button as={Link} to='/'> Confirm</Button>}
                />
            </div>
        );
    }
}

export default ConfirmForm;

