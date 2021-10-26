import React, { Component } from 'react'
import axios from 'axios';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';

const LESSONS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/lesson';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNDIsImV4cCI6MTYzMTc3NzU0MiwiaWF0IjoxNjMxNjkxMTQyfQ.-T2f_o5EqPtbmBVQFy6Plj2M0pbKglgU1WtvX-IWe6o';


export default class AdminAddLesson extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.name,
            subject: this.subject,
            teacherId: this.teacherId,
        };
        axios.post(LESSONS_REST_API_URL, data, { headers: { "Authorization": `Bearer ${token}` } }).then(
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
                    Add New Lesson
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Lesson Name</label>
                            <input type="text" className="form-control" placeholder="Name"
                                onChange={e => this.name = e.target.value} />
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input type="text" className="form-control" placeholder="Subject"
                                onChange={e => this.subject = e.target.value} />
                        </div>

                        <div className="form-group">
                            <label>Teacher Id</label>
                            <input type="text" className="form-control" placeholder="Teacher Id"
                                onChange={e => this.teacherId = e.target.value}
                            />
                        </div>
                        <ModalFooter style={{ justifyContent: "center" }}>
                            <Button color="success" block type="submit" onClick={this.handleSubmit} href="/sysadmin" >Add Lesson</Button>
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