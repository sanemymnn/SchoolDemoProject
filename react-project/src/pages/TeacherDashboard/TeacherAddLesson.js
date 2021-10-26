import React, { Component } from 'react'
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';

const USERS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/teacher/lesson';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTE0ODMsImV4cCI6MTYzMTc3Nzg4MywiaWF0IjoxNjMxNjkxNDgzfQ.UhI59U7gMThawnptYFi2IXw3jPvGHRHsTOOlFgN9Mfo';


export default class TeacherAddLesson extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {

            name: this.name,
            subject: this.subject,
            teacherId: this.teacherId


        };
        axios.post(USERS_REST_API_URL, data, { headers: { "Authorization": `Bearer ${token}` } }).then(
            res => {
                console.log(res)
                this.props.history.push("/teacher")
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
                    Add New Lesson
                </ModalHeader>
                <ModalBody>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" placeholder="Name"
                                onChange={e => this.name = e.target.value} />
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" placeholder="Subject"
                                onChange={e => this.subject = e.target.value}
                            />
                        </div>

                        <div className="form-group">
                            <label>Teacher Id</label>
                            <input type="text" className="form-control" placeholder="Teacher Id"
                                onChange={e => this.teacherId = e.target.value}
                            />
                        </div>
                        <ModalFooter style={{ justifyContent: "center" }}>
                            <Button color="success" block type="submit" onClick={this.handleSubmit} href="/teacher" >Add User</Button>
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