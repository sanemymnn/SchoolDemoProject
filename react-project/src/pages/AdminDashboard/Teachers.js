import axios from 'axios';
import React from 'react';
import AdminService from '../../services/AdminService';
import AdminAddTeacher from './AdminAddTeacher';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNDIsImV4cCI6MTYzMTc3NzU0MiwiaWF0IjoxNjMxNjkxMTQyfQ.-T2f_o5EqPtbmBVQFy6Plj2M0pbKglgU1WtvX-IWe6o';

class Teachers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            teachers: [],
            isAddUserFormOpen: false
        }
    }
    toggleAddUserForm = () => {
        this.setState({ isAddUserFormOpen: !this.state.isAddUserFormOpen });
    };
    toggleIsLoading = () => {
        this.setState({ isLoading: !this.state.isLoading });
    };

    componentDidMount() {
        AdminService.getTeachers().then((response) => {
            this.setState({ teachers: response.data })
        });
    }


    delete = (teacherId) => {
        axios.delete("https://dmapi.eu-west-3.elasticbeanstalk.com/admin/teacher/" + teacherId, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                if (response.data !== null) {
                    alert("User deleted successfully");
                    this.setState({
                        teachers: this.state.teachers.filter(teacher => teacher.teacherId !== teacherId)
                    });
                }
            });
    };

    render() {
        const { isAddUserFormOpen, isLoading } = this.state;
        if (isLoading) {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            );
        }


        return (
            <div className="d-flex" id="wrapper">

                <div className="bg-white" id="sidebar-wrapper">
                    <div className="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"><i
                        className="fas fa-user-secret me-2"></i>Admin Panel</div>
                    <div className="list-group list-group-flush my-3">
                        <a href="sysadmin" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-tachometer-alt me-2"></i>Users</a>
                        <a href="teachers" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-tachometer-alt me-2"></i>Teachers</a>
                        <a href="students" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-tachometer-alt me-2"></i>Students</a>
                        <a href="roles" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-tachometer-alt me-2"></i>Roles</a>
                        <a href="/lessons" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-tachometer-alt me-2"></i>Lessons</a>
                        <a href="/signed-out" className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"><i
                            className="fas fa-power-off me-2"></i>Logout</a>
                    </div>
                </div>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-transparent py-4 px-4">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-align-left primary-text fs-4 me-3" id="menu-toggle"></i>
                        </div>



                    </nav>

                    <div className="container-fluid px-4">

                        <div className="row my-5">
                            <h3 className="fs-4 mb-3">Teacher <button onClick={this.toggleAddUserForm} type="button" className="btn btn-outline-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg></button></h3>
                            {isAddUserFormOpen &&
                                <AdminAddTeacher isOpen={isAddUserFormOpen}
                                    toggle={this.toggleAddUserForm}
                                    toggleIsLoading={this.toggleIsLoading}
                                />
                            }

                            <div className="col">
                                <table className="table bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr><td>Teacher Id</td>
                                            <td>Username</td>
                                            <td>Name</td>
                                            <td>Surname</td>
                                            <td>Phone number</td>
                                            <td>Email</td>
                                            <td>Role</td>
                                            <td>Delete</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.teachers.map(
                                                teacher =>
                                                    <tr key={teacher.teacherId}>
                                                        <td>{teacher.teacherId}</td>
                                                        <td>{teacher.username}</td>
                                                        <td>{teacher.name}</td>
                                                        <td>{teacher.surname}</td>
                                                        <td>{teacher.phoneNumber}</td>
                                                        <td>{teacher.email}</td>
                                                        <td>{teacher.role}</td>


                                                        <td>

                                                            <button onClick={this.delete.bind(this, teacher.teacherId)} type="button" className="btn btn-outline-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
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

export default Teachers
