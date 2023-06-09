import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Profile from "../components/Profile.js";
export default function ProfilePage({setToken}) {
    return (
        <div class="App">
            <HeaderWebAfterLog setToken={setToken}/>
            <Profile />
        </div>
    );
}
