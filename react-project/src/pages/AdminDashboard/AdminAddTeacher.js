import React, { Component } from 'react'
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';

const USERS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/teacher';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNDIsImV4cCI6MTYzMTc3NzU0MiwiaWF0IjoxNjMxNjkxMTQyfQ.-T2f_o5EqPtbmBVQFy6Plj2M0pbKglgU1WtvX-IWe6o';


export default class AdminAddTeacher extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {

            userId: this.userId,
            schoolId: this.schoolId

        };
        axios.post(USERS_REST_API_URL, data, { headers: { "Authorization": `Bearer ${token}` } }).then(
            res => {
                console.log(res)
                this.props.history.push("/sysadmin")
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
                    Add Teacher
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