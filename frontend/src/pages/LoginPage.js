import HeaderWebBeforeLog from "../components/HeaderWebBeforeLog.js";
import Login from "../components/Login.js";
export default function LoginPage({setToken}) {
    return (
        <div>
            <HeaderWebBeforeLog />
            <Login setToken={setToken}/>
        </div>
    );
}
