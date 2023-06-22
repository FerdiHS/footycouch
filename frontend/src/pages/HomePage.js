import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
import Home from "../components/Home.js"
export default function HomePage({setToken}) {
    return (
        <div class="App">
            <HeaderWebAfterLog setToken={setToken}/>
            <Home />
        </div>
    );
}
