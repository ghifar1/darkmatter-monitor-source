import React from "react";
import { DesktopComputerIcon } from "@heroicons/react/outline"

const Card = ()=>{
    return (
        <div className="bg-white p-2 rounded grid grid-cols-3 shadow-lg h-full w-full md:h-48 md:w-96">
            <div className="flex items-center justify-center w-full h-full">
                <DesktopComputerIcon className="w-auto"/>
            </div>
            <div className="col-span-2">
                <div className="text-center font-medium text-2xl border-b-2 mx-5 pb-1 border-black" style={{fontFamily: 'Poppins'}}>
                    ghifari-PC
                </div>
            </div>
        </div>
    )
}


export default Card;