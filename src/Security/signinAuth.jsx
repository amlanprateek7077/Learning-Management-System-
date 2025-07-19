import { useParams } from "react-router-dom"
import Signin from "../Pages/Signin";

const SigninAuth = () => {
    const userType = useParams().userType;

    return <Signin userType={userType}/>
}

export default SigninAuth;