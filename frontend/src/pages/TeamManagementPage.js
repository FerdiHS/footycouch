import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js";
import TeamManagement from "../components/TeamManagement.js";
export default function TeamManagementPage({setToken}) {
    return (
        <div>
            <HeaderWebAfterLog setToken={setToken}/>
            <TeamManagement />
        </div>
    );
}
