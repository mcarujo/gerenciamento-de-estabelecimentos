import axios from "axios";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const URL = `http://back-end:3001`;

const request = props => {
  return new Promise((resolve, reject) => {
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    let res;
    const URI = `${URL}${props.uri}`;
    const headers = {
      headers: {
        token: cookies.get("token")
      }
    };
    if (props.method == "GET") {
      res = axios.get(URI, headers);
      res.then(response => {
        if (response.status == 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method == "OPTIONS") {
      res = axios.options(URI, headers);
      res.catch(error => {
        errorActions();
      });
    } else if (props.method == "POST") {
      res = axios.post(URI, props.data, headers);
      res.then(response => {
        if (response.status == 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method == "PUT") {
      res = axios.put(URI, props.data, headers);
      res.then(response => {
        if (response.status == 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method == "DELETE") {
      res = axios.delete(URI, headers);
      res.then(response => {
        if (response.status == 200) {
          resolve(response.data);
        } else {
          goToLogin();
        }
      });
      res.catch(error => {
        errorActions();
      });
    } else if (props.method == "LOGIN") {
      cookies.remove("token");
      res = axios.post(URI, props.data, headers);
      res.then(response => {
        if (response.status == 200) {
          if (response.data == false) {
            resolve(false);
          } else {
            cookies.set("token", response.data.token, { path: "/" });
            resolve(true);
          }
        } else {
          resolve(false);
        }
      });
    } else if (props.method == "LOGOFF") {
      res = axios.get(URI, headers);
      cookies.remove("token", { path: "/" });
      res.catch(error => {
        goToLogin();
      });
    }
  });
};

const errorActions = () => {
  window.location.href = `/login`;
};
function goToLogin() {
  window.location.href = `/login`;
}

request.propTypes = {
  method: PropTypes.string,
  uri: PropTypes.string
};
export default request;
