import axios from 'axios';

const LESSONS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/lessons';
const USERS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/users';
const STUDENTS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/students';
const TEACHERS_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/teachers';
const ROLES_REST_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/admin/roles';
const MANAGER_TEACHERS = 'https://dmapi.eu-west-3.elasticbeanstalk.com/management/teachers';
const LOGIN_API_URL = 'https://dmapi.eu-west-3.elasticbeanstalk.com/user/token';
const USER_ROLE_ID = "roleId";
const ADMIN_TOKEN_TYPE_TEXT = "Bearer ";
const USER_OBJECT_TEXT = "userObject";
const USER_ID = "id";

const studentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTE0MjYsImV4cCI6MTYzMTc3NzgyNiwiaWF0IjoxNjMxNjkxNDI2fQ.pWMOsNutjFC0-Fqw0gKtcnsdyXauaS-3z4XNImNU_pM';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNDIsImV4cCI6MTYzMTc3NzU0MiwiaWF0IjoxNjMxNjkxMTQyfQ.-T2f_o5EqPtbmBVQFy6Plj2M0pbKglgU1WtvX-IWe6o';
const managerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUiLCJyb2xlIjoiQURNSU4iLCJuYmYiOjE2MzE2OTExNzUsImV4cCI6MTYzMTc3NzU3NSwiaWF0IjoxNjMxNjkxMTc1fQ.iQpCF4iST9kLP7tBQ6TV5FlJf8LVJWFD3tAMq9ml-Ic';
const ACCESS_TOKEN_TEXT = "token";
const USER_NAME_TEXT = "firstName";


class AdminService {

  getUsers() {
    return axios.get(USERS_REST_API_URL, { headers: { "Authorization": `Bearer ${token}` } });
  }

  getTeachers() {
    return axios.get(TEACHERS_REST_API_URL, { headers: { "Authorization": `Bearer ${token}` } });
  }

  getStudents() {
    return axios.get(STUDENTS_REST_API_URL, { headers: { "Authorization": `Bearer ${token}` } });
  }

  getLessons() {
    return axios.get(LESSONS_REST_API_URL, { headers: { "Authorization": `Bearer ${token}` } });
  }
  getStudentLessons() {
    const userId = getUserId();
    return axios.get("https://dmapi.eu-west-3.elasticbeanstalk.com/student/" + userId + "/lessons", { headers: { "Authorization": `Bearer ${studentToken}` } });
  }
  getRoles() {
    return axios.get(ROLES_REST_API_URL, { headers: { "Authorization": `Bearer ${token}` } });
  }
  getManagerTeachers() {
    return axios.get(MANAGER_TEACHERS, { headers: { "Authorization": `Bearer ${managerToken}` } });
  }
}
export default new AdminService();

export let Role = {
  id: 0,
  roleName: "",
};

export async function loginRequest(username, password) {
  let data = {
    username: username,
    password: password,
  };

  let options = {
    method: "POST",
    cache: "default",
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  };

  return request(LOGIN_API_URL, options);
}
export function createOptions(
  method,
  isBodyExist,
  body,
  isAuthExist,
  isContentTypeDifferent,
  contentType = null
) {
  return {
    method: method,
    cache: "default",
    ...(isBodyExist && { body: JSON.stringify(body) }),
    headers: new Headers({
      ...(isAuthExist && {
        Authorization: ADMIN_TOKEN_TYPE_TEXT.concat(getAccessToken()),
      }),
      ...(isContentTypeDifferent
        ? contentType !== null && { "Content-Type": contentType }
        : { "Content-Type": "application/json" }),
    }),
  };
}
export function parseJSON(response) {
  return new Promise((resolve) => {
    response.text().then((text) =>
      resolve({
        status: response.status,
        ok: response.ok,
        json: text ? JSON.parse(text) : {},
      })
    );
  });
}
export function parseResponse(response) {
  return new Promise((resolve) => {
    response.text().then((text) =>
      resolve({
        status: response.status,
        ok: response.ok,
        json: text ? text : {},
      })
    );
  });
}
export async function request(url, options) {
  return new Promise((resolve, reject) => {
    console.log(options);
    fetch(url, options)
      .then(parseJSON)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return resolve(response.json);
        }
        return reject(response.json.error);
      })
      .catch((error) =>
        reject({
          networkError: error.message,
        })
      );
  });
}
export async function requestString(url, options) {
  return new Promise((resolve, reject) => {
    console.log(options);
    fetch(url, options)
      .then(parseResponse)
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => reject({ networkError: error.message }));
  });
}

Storage.prototype.setObject = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObject = function (key) {
  return JSON.parse(this.getItem(key));
};

export function setUserObject(userObject) {
  localStorage.setObject(USER_OBJECT_TEXT, userObject);

}


export function getUserRole() {
  if (localStorage.hasOwnProperty(USER_OBJECT_TEXT)) {
    let roleId = localStorage.getObject(USER_OBJECT_TEXT)[USER_ROLE_ID];
    Role.id = roleId;
    if (roleId === 2) {
      Role.roleName = "STUDENT";
    } else if (roleId === 3) {
      Role.roleName = "TEACHER";
    } else if (roleId === 4) {
      Role.roleName = "SCHOOLMANAGER";
    } else if (roleId === 5) {
      Role.roleName = "SYSADMIN";
    }
    return Role;
  } else {
    return false;
  }
}
export function getUserId() {
  if (localStorage.hasOwnProperty(USER_OBJECT_TEXT)) {
    return localStorage.getObject(USER_OBJECT_TEXT)[USER_ID];
  } else {
    return false;
  }
}

export function isLoggedIn(role) {
  console.log("role parameter:", role);
  console.log("getUserRole:", getUserRole());
  return role === getUserRole().id;
}
export function getAccessToken() {
  if (localStorage.getObject(USER_OBJECT_TEXT)[ACCESS_TOKEN_TEXT])
    return localStorage.getObject(USER_OBJECT_TEXT)[ACCESS_TOKEN_TEXT];
  else return " )";
}
export function getUserName() {
  if (localStorage.hasOwnProperty(USER_OBJECT_TEXT)) {
    return localStorage.getObject(USER_OBJECT_TEXT)[USER_NAME_TEXT];
  } else {
    return false;
  }
}







