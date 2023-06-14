import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Transfer from "../components/Transfer.js";
export default function TransferPage({setToken}) {
    return (
        <div class="App">
            <HeaderWebAfterLog setToken={setToken}/>
            <Transfer />
        </div>
    );
}
