import HeaderWebAfterLog from "../component/HeaderWebAfterLog.js"
import Transfer from "../component/Transfer.js";
export default function TransferPage({setToken}) {
    return (
        <div class="App">
            <HeaderWebAfterLog setToken={setToken}/>
            <Transfer />
        </div>
    );
}