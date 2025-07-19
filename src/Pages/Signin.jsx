import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"
import "../CSS/signin.css"

export default ({ userType }) => {
    const navigate = useNavigate()

    const [userData, setUserData] = useState({
        name: "",
        password: "",
        confirmPassword: "",
        branch: ""
    })

    const [branches, setBranches] = useState([])

    const formInput = [
        { type: "text", name: "name", placeholder: `Enter ${userType} Name` },
        { type: "password", name: "password", placeholder: "Enter Password" },
        { type: "password", name: "confirmPassword", placeholder: "Confirm Password" },
        { type: "select", name: "branch" }
    ]

    const handleInput = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        })
    }

    useEffect(() => {
        axios.get("getBranch")
            .then(res => setBranches(res.data))
            .catch(err => console.error(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userData.confirmPassword === userData.password) {
            axios.post(`${userType}/signin`, {
                name: userData.name,
                pass: userData.password,
                branch: userData.branch
            })
                .then(res => {
                    const { status, message } = res.data;
                    if (status) {
                        navigate("/dashboard", {
                            state: {
                                isTeacher: userType === "teacher",
                                user: message
                            }
                        })
                    } else {
                        toast(message)
                    }
                })
                .catch(err => {
                    toast("Network connection error ")
                    console.error(`Signin error : ${err}`)
                })
        } else {
            toast("Confirm Password and password must be same")
        }
    }

    return (
        <div className="signin-container">
        {
            branches.length > 0 &&
            <form className="signin-form" onSubmit={handleSubmit}>
                {
                    formInput.map((input, index) => (
                        <div key={index} className="form-group">
                            {
                                input.type !== "select"
                                    ? <input 
                                        className="form-input" 
                                        type={input.type} 
                                        name={input.name} 
                                        placeholder={input.placeholder} 
                                        onChange={handleInput} 
                                      />
                                    : <select 
                                        className="form-select" 
                                        name={input.name} 
                                        onChange={handleInput}>
                                        <option value="">--choose-branch--</option>
                                        {
                                            branches.map(branch => (
                                                <option key={branch.branchName} value={branch.branchName}>{branch.branchName}</option>
                                            ))
                                        }
                                    </select>
                            }
                        </div>
                    ))
                }
                <button className="signin-button">Sign in</button>
                <p className="login-text">Have an account? <Link className="login-link" to={`/login/${userType}`}>Login</Link></p>
            </form>
        }
    </div>
    )

}