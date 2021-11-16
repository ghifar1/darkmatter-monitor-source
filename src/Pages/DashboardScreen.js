import React from "react";
import Card from "./DashboardPart/Card";

const DashboardScreen = ()=>{
    return (
        <div className="w-full h-full">
            <div className="font-medium text-3xl text-white mb-5" style={{fontFamily: 'Poppins'}}>
                Connected Computers
            </div>
            <div className="flex flex-wrap gap-3">
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}

export default DashboardScreen