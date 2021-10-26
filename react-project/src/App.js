import { Route, BrowserRouter, Switch } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import Roles from './pages/AdminDashboard/Roles';
import SignedOut from './pages/SignedOut';
import AdminAddUser from './pages/AdminDashboard/AdminAddUser';
import ManagerAddStudent from './pages/ManagerDashboard/ManagerAddStudent';
import ManagerAddTeacher from './pages/ManagerDashboard/ManagerAddTeacher';
import ManagerDashboard from './pages/ManagerDashboard/ManagerDashboard';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard/StudentDashboard';
import EnrollLesson from './pages/StudentDashboard/EnrollLesson';
import MyLessons from './pages/StudentDashboard/MyLessons';
import AdminAddLesson from './pages/AdminDashboard/AdminAddLesson';
import AdminAddTeacher from './pages/AdminDashboard/AdminAddTeacher';
import AdminAddStudent from './pages/AdminDashboard/AdminAddStudent';
import Lessons from './pages/AdminDashboard/Lessons';
import Teachers from './pages/AdminDashboard/Teachers';
import Students from './pages/AdminDashboard/Students';
import TeacherAddLesson from './pages/TeacherDashboard/TeacherAddLesson';


function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route exact path='/' component={SignedOut} />
          <Route exact path='/signed-out' component={SignedOut} />
          <Route exact path="/sysadmin" component={AdminDashboard} />
          <Route exact path="/teacher" component={TeacherDashboard} />
          <Route exact path="/student" component={StudentDashboard} />
          <Route exact path="/enrollLesson" component={EnrollLesson} />
          <Route exact path="/schoolmanager" component={ManagerDashboard} />
          <Route exact path="/roles" component={Roles} />
          <Route exact path="/lessons" component={Lessons} />
          <Route exact path="/teachers" component={Teachers} />
          <Route exact path="/students" component={Students} />
          <Route exact path="/addLesson" component={AdminAddLesson} />
          <Route exact path="/managerAddStudent" component={ManagerAddStudent} />
          <Route exact path="/managerAddTeacher" component={ManagerAddTeacher} />
          <Route exact path="/teacherAddLesson" component={TeacherAddLesson} />
          <Route exact path="/adminAddUser" component={AdminAddUser} />
          <Route exact path="/adminAddTeacher" component={AdminAddTeacher} />
          <Route exact path="/adminAddStudent" component={AdminAddStudent} />
          <Route exact path="/myLessons" component={MyLessons} />

        </Switch>

      </div>
    </BrowserRouter>

  );
}

export default App;
