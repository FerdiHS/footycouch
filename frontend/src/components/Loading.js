import React from "react";
import ReactLoading from "react-loading";
 
export default function Loading() {
    return (
        <div class ="loading">
            <div class="centerLoading"><ReactLoading type="spin" color="#0000FF"
                height={100} width={50} /></div>
            
        </div>
    );
}