import React, { Component } from 'react'
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';

const USERS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/user';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNDIsImV4cCI6MTYzMTc3NzU0MiwiaWF0IjoxNjMxNjkxMTQyfQ.-T2f_o5EqPtbmBVQFy6Plj2M0pbKglgU1WtvX-IWe6o';


export default class AdminAddUser extends Component {


    handleSubmit = e => {
        e.preventDefault();
        const data = {
            username: this.userName,
            password: this.password,
            name: this.name,
            surname: this.surname,
            phoneNumber: this.phoneNumber,
            email: this.email,
            roleId: this.rolelId,
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
                    Add New User
                </ModalHeader>
                <ModalBody>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" placeholder="Username"
                                onChange={e => this.userName = e.target.value} />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name"
                                onChange={e => this.name = e.target.value} />
                        </div>

                        <div className="form-group">
                            <label>Surname</label>
                            <input type="text" className="form-control" placeholder="Surname"
                                onChange={e => this.surname = e.target.value}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="text" className="form-control" placeholder="Phone Number"
                                onChange={e => this.phoneNumber = e.target.value}
                            />
                        </div>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email"
                                onChange={e => this.email = e.target.value} />
                        </div>
                        <div className="form-group">
                            <label>Role Id</label>
                            <input type="text" className="form-control" placeholder="Enter role id"
                                onChange={e => this.rolelId = e.target.value} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password"
                                onChange={e => this.password = e.target.value} />
                        </div>

                        <ModalFooter style={{ justifyContent: "center" }}>
                            <Button color="success" block type="submit" onClick={this.handleSubmittoggle} onChange={toggle} href="/sysadmin" >Add User</Button>
                       
                        </ModalFooter>
                    </form>

                </ModalBody>

            </Modal>
        )

    }

}