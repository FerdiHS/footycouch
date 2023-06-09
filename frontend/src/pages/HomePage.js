import HeaderWebAfterLog from "../components/HeaderWebAfterLog.js"
export default function HomePage({setToken}) {
    return (
        <div class="App">
            <HeaderWebAfterLog setToken={setToken}/>
            <h2> Home </h2>  
        </div>
    );
}
