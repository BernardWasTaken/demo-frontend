import {FC, use, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {Routes} from "../utils/routes";
import {UserRequest} from "../models/requests";
import {register} from "../api/users";

const RegisterPage: FC = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e: any) => {
        e.preventDefault();

        if(username === "" || password === ""){
            document.getElementById("error")!.innerHTML="Enter username and password before submitting";
            document.getElementById("error")!.style.display="flex";
            return;
        }

        if(password !== confirmPassword){
            document.getElementById("error")!.innerHTML="Passwords are not matching";
            document.getElementById("error")!.style.display="flex";
            return;
        }

        const data: UserRequest = {
            username: username,
            password: password,
        }

        const result = await register(data);
        if(result.status !== 200){
            document.getElementById("error")!.innerHTML="Username already taken";
            document.getElementById("error")!.style.display="flex";
            return;
        }



        navigate("/login");
    }

    return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="w-50 h-50 d-flex flex-column justify-content-evenly align-items-center rounded-4 p-4 secondary">
                <h2 className="text">Register</h2>
                <form className="w-100">
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control primary text"
                            style={{border: "none", outline: "none"}}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control primary text"
                            style={{border: "none", outline: "none"}}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="form-group mb-3">
                        <input
                            type="password"
                            className="form-control primary text"
                            style={{border: "none", outline: "none"}}
                            placeholder="Repeat password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100 primary-text white" style={{border:"none"}} onClick={(e) => handleRegister(e)}>
                        Register
                    </button>
                    <p id="error" className="mt-2" style={{display: "none",color:"red"}}></p>
                    <Link to={Routes.LOGIN} className="tertiary-text">Already have an account?</Link>
                </form>
            </div>
        </div>
    );;
}

export default RegisterPage;