import React, { Component } from 'react'
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';

const USERS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/management/teacher';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNzUsImV4cCI6MTYzMTc3NzU3NSwiaWF0IjoxNjMxNjkxMTc1fQ.iQpCF4iST9kLP7tBQ6TV5FlJf8LVJWFD3tAMq9ml-Ic';


export default class ManagerAddTeacher extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {


            userId: this.userId,
            schoolId: this.schoolId


        };
        axios.post(USERS_REST_API_URL, data, { headers: { "Authorization": `Bearer ${token}` } }).then(
            res => {
                console.log(res)
                this.props.history.push("/schoolmanager")
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    };
    render() {
        const { isOpen, toggle } = this.props;
        return (
            <Modal isOpen={isOpen} toggle={toggle}
                className="modal-lg modal-info"
                backdrop="static"
                keyboard={false}>
                <ModalHeader toggle={toggle}>
                    Add New Teacher
                </ModalHeader>
                <ModalBody>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>


                        <div className="form-group">
                            <label>User Id</label>
                            <input type="text" className="form-control" placeholder="User Id"
                                onChange={e => this.userId = e.target.value} />
                        </div>

                        <div className="form-group">
                            <label>School Id</label>
                            <input type="text" className="form-control" placeholder="School Id"
                                onChange={e => this.schoolId = e.target.value}
                            />
                        </div>

                        <br></br>
                        <ModalFooter style={{ justifyContent: "center" }}>
                            <Button color="success" block type="submit" onClick={this.handleSubmit} href="/sysadmin" >Add User</Button>
                            <Button color="secondary" block onClick={toggle}>
                                Close
                            </Button>
                        </ModalFooter>
                    </form>

                </ModalBody>

            </Modal>
        )

    }

}