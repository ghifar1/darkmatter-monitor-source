import React from 'react';
import { splashImage } from '../Images/Images';

const SplashScreen = ()=>{
    return (
        <div className="h-screen bg-black flex justify-center items-center">
            <div className="absolute top-0 bottom-0 left-0 right-0">
                <img src={splashImage} className="w-full h-full object-cover z-0"/>
            </div>
            <div className="text-white font-medium text-2xl z-10">
                <p style={{fontFamily: 'Poppins'}}>Dark Matter Monitoring</p>
            </div>
        </div>
    )
}

export default SplashScreen