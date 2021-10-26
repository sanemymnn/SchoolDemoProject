import axios from 'axios';
import React from 'react';
import AdminService from '../../services/AdminService';
import ManagerAddStudent from './ManagerAddStudent';
import ManagerAddTeacher from './ManagerAddTeacher';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNzUsImV4cCI6MTYzMTc3NzU3NSwiaWF0IjoxNjMxNjkxMTc1fQ.iQpCF4iST9kLP7tBQ6TV5FlJf8LVJWFD3tAMq9ml-Ic';

class ManagerDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            students: [],
            isAddUserFormOpen: false,
            isAddUserFormOpen2: false
        }

    }
    toggleAddUserForm = () => {
        this.setState({ isAddUserFormOpen: !this.state.isAddUserFormOpen });
    };
    toggleAddUserForm2 = () => {
        this.setState({ isAddUserFormOpen2: !this.state.isAddUserFormOpen2 });
    };
    toggleIsLoading = () => {
        this.setState({ isLoading: !this.state.isLoading });
    };
    componentDidMount() {
        AdminService.getTeachers().then((response) => {
            this.setState({ users: response.data })
        });
        AdminService.getStudents().then((response) => {
            this.setState({ students: response.data })
        });
    }


    delete = (userId) => {
        axios.delete("https://dmapi.eu-west-3.elasticbeanstalk.com/management/student/" + userId, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                if (response.data != null) {
                    alert("User deleted successfully");
                    this.setState({
                        users: this.state.users.filter(user => user.id !== userId)
                    });
                }
            });
    };

    render() {

        const { isAddUserFormOpen, isLoading, isAddUserFormOpen2 } = this.state;
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
                        className="fas fa-user-secret me-2"></i>Manager</div>
                    <div className="list-group list-group-flush my-3">
                        <a href="/" className="list-group-item list-group-item-action bg-transparent second-text fw-bold"><i
                            className="fas fa-tachometer-alt me-2"></i>Users</a>

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
                        <div className="row g-6 my-2">



                        </div>
                        <div className="row my-5">
                            <h3 className="fs-4 mb-3">Teachers <button onClick={this.toggleAddUserForm2} type="button" className="btn btn-outline-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg></button></h3>
                            {isAddUserFormOpen2 &&
                                <ManagerAddTeacher isOpen={isAddUserFormOpen2}
                                    toggle={this.toggleAddUserForm2}
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

                                            <td>Delete</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.users.map(
                                                user =>
                                                    <tr key={user.id}>
                                                        <td>{user.teacherId}</td>
                                                        <td>{user.username}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.surname}</td>
                                                        <td>{user.phoneNumber}</td>
                                                        <td>{user.email}</td>



                                                        <td>

                                                            <button onClick={this.delete.bind(this, user.id)} type="button" className="btn btn-outline-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                            </svg></button></td>
                                                    </tr>

                                            )

                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row my-5">
                            <h3 className="fs-4 mb-3">Students <button onClick={this.toggleAddUserForm} type="button" className="btn btn-outline-success"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
                            </svg></button></h3>
                            {isAddUserFormOpen &&
                                <ManagerAddStudent isOpen={isAddUserFormOpen}
                                    toggle={this.toggleAddUserForm}
                                    toggleIsLoading={this.toggleIsLoading} />
                            }


                            <div className="col">
                                <table className="table bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr><td>Student Id</td>
                                            <td>Username</td>
                                            <td>Name</td>
                                            <td>Surname</td>
                                            <td>Phone number</td>
                                            <td>Email</td>
                                            <td>Delete</td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.students.map(
                                                student =>
                                                    <tr key={student.studentId}>
                                                        <td>{student.studentId}</td>
                                                        <td>{student.username}</td>
                                                        <td>{student.name}</td>
                                                        <td>{student.surname}</td>
                                                        <td>{student.phoneNumber}</td>
                                                        <td>{student.email}</td>
                                                        <td>
                                                            <button onClick={this.delete.bind(this, student.studentId)} type="button" className="btn btn-outline-danger"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
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

export default ManagerDashboard
