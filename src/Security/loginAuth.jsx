import { useParams } from "react-router-dom"
import Login from "../Pages/Login";

const LoginAuth = () => {
    const userType = useParams().userType;

    return <Login userType={userType} />
}

export default LoginAuth;