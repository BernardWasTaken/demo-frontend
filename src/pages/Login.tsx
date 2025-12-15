import {FC, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../api/users";
import {UserRequest} from "../models/requests";
import authStore from "../utils/authstore";
import {Routes} from "../utils/routes";


const LoginPage: FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();

        if(username === "" || password === ""){
            document.getElementById("error")!.innerHTML="Please enter username and password before submitting";
            document.getElementById("error")!.style.display="flex";
            return;
        }

        const data: UserRequest = {
            username: username,
            password: password
        };

        const response = await login(data);
        if(response.status !== 200){
            document.getElementById("error")!.innerHTML="Wrong username or password";
            document.getElementById("error")!.style.display="flex";
            return;
        }

        authStore.login(response.data.user, response.data.token);
        navigate("/");
    }

    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div className="w-50 h-50 d-flex flex-column justify-content-evenly align-items-center rounded-4 p-4 secondary" >
              <h2 className="text">Login</h2>
              <form className="w-100">
                  <div className="form-group mb-3">
                    <input
                        type="text"
                        className="form-control primary text"
                        style={{border:"none", outline:"none"}}
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control primary text"
                            style={{border:"none", outline:"none"}}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                  <button className="btn btn-primary w-100 white primary-text" style={{border:"none"}} onClick={(e) => handleLogin(e)}>
                      Login
                  </button>
                  <p id="error" className="mt-2" style={{display: "none",color:"red"}}></p>
                  <Link to={Routes.REGISTER} className="tertiary-text">Not registered yet?</Link>
              </form>
          </div>
      </div>
    );
}

export default LoginPage;