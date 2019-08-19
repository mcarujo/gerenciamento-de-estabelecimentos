import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const URL = `http://localhost:81`;

const request = props => {
  return new Promise((resolve, reject) => {
    let res;
    const URI = `${URL}${props.uri}`;
    const headers = {
      headers: {
        token: cookies.get("token"),
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Max-Age": 86400
      }
    };
    if (props.method === "GET") {
      res = axios.get(URI, headers);
      res.then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method === "OPTIONS") {
      res = axios.options(URI, headers);
      res.catch(error => {
        errorActions();
      });
    } else if (props.method === "POST") {
      res = axios.post(URI, props.data, headers);
      res.then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method === "PUT") {
      res = axios.put(URI, props.data, headers);
      res.then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method === "DELETE") {
      res = axios.delete(URI, headers);
      res.then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method === "LOGIN") {
      cookies.remove("token");
      res = axios.post(URI, props.data, headers);
      res.then(response => {
        if (response.status === 200) {
          if (response.data === false) {
            resolve(false);
          } else {
            cookies.set("token", response.data.token, { path: "/" });
            resolve(true);
            goToHome();
          }
        } else {
          resolve(false);
        }
      });
    } else if (props.method === "LOGOFF") {
      res = axios.get(URI, headers);
      cookies.remove("token", { path: "/" });
      res.catch(error => {
        goToLogin();
      });
    }
  });
};

function errorActions() {
  // window.location.href = `/login`;
}

function goToLogin() {
  // window.location.href = `/login`;
}

function goToHome() {
  // window.location.href = `/`;
}

request.propTypes = {
  method: PropTypes.string,
  uri: PropTypes.string
};
export default request;
