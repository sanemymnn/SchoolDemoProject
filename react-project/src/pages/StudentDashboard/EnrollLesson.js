import React from 'react';
import axios from 'axios';
import AdminService from "../../services/AdminService";

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTE0MjYsImV4cCI6MTYzMTc3NzgyNiwiaWF0IjoxNjMxNjkxNDI2fQ.pWMOsNutjFC0-Fqw0gKtcnsdyXauaS-3z4XNImNU_pM';

class EnrollLesson extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }


    componentDidMount() {
        AdminService.getLessons().then((response) => {
            this.setState({ users: response.data })
        });
    }

    delete = (userId) => {
        axios.delete("https://dmapi.eu-west-3.elasticbeanstalk.com/student​/{id}​/lesson​/{lesson_id}" + userId, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                if (response.data != null) {
                    alert("Lesson dropped successfully");
                    this.setState({
                        users: this.state.users.filter(user => user.id !== userId)
                    });
                }
            });
    };

    enroll = (userId) => {
        axios.post("https://dmapi.eu-west-3.elasticbeanstalk.com//student/{id}/lesson/{lesson_id}" + userId, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                if (response.data != null) {
                    alert("Enrolled to lesson successfully");
                    this.setState({
                        users: this.state.users.filter(user => user.id !== userId)
                    });
                }
            });
    };

    render() {


        return (
            <div className="d-flex" id="wrapper">

                <div className="bg-white" id="sidebar-wrapper">
                    <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                        className="fas fa-user-secret me-2"></i>Student Panel</div>
                    <div className="list-group list-group-flush my-3">
                        <a href="/student" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-chart-line me-2"></i>Lessons</a>
                        <a href="/signed-out" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                            className="fas fa-power-off me-2"></i>Logout</a>
                    </div>
                </div>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        </div>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                    </nav>

                    <div className="container-fluid px-4">
                        <div className="row g-3 my-2">


                        </div>
                        <div className="row my-5">
                            <h3 className="fs-4 mb-3">Lessons to Enroll</h3>
                            <div className="col">
                                <table class="table bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr><td>Id</td>
                                            <td>Name</td>
                                            <td>Subject</td>
                                            <td>Teacher Name</td>
                                            <td>Teacher Id</td>
                                            <td>Enroll</td>
                                            <td>Drop</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.users.map(
                                                lesson =>
                                                    <tr key={lesson.id}>
                                                        <td>{lesson.id}</td>
                                                        <td>{lesson.name}</td>
                                                        <td>{lesson.subject}</td>
                                                        <td>{lesson.teacherName}</td>
                                                        <td>{lesson.teacherId}</td>
                                                        <td>
                                                            <button onClick={this.enroll.bind(this, lesson.id)} type="button" className="btn btn-outline-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                                                            </svg></button>
                                                        </td>
                                                        <td>

                                                            <button onClick={this.delete.bind(this, lesson.id)} type="button" className="btn btn-outline-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                            </svg></button></td>
                                                    </tr>

                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default EnrollLesson;