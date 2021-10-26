
import React from 'react';
import AdminService from '../../services/AdminService';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        AdminService.getRoles().then((response) => {
            this.setState({ users: response.data })
        });
    }



    render() {


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
                            <h3 className="fs-4 mb-3">Roles</h3>
                            <div className="col">
                                <table className="table bg-white rounded shadow-sm  table-hover">
                                    <thead>
                                        <tr><td>Role Id</td>
                                            <td>Role Name</td>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.users.map(
                                                user =>
                                                    <tr key={user.id}>
                                                        <td>{user.id}</td>

                                                        <td>{user.roleName}</td>

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

export default AdminDashboard
