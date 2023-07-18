
export default function ChangeBench({exitBench, viewStats, switchPlayer}) {

    return (
        <div class="statistic">
            <div class="changeBenchMenu">
                <button class= "optionBench" onClick={viewStats}>View Player Statistic</button>
                <button class= "optionBench" onClick={switchPlayer}>Switch Player</button>
                <button class="exitStats" onClick={exitBench}>X</button>
            </div>
        </div>
    )
}