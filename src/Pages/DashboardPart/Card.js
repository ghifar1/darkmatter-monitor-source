import React, { useEffect, useState } from "react";
import { DesktopComputerIcon } from "@heroicons/react/outline";
import moment from 'moment';

function msToTime(ms) {
	let seconds = (ms / 1000).toFixed(1);
	let minutes = (ms / (1000 * 60)).toFixed(1);
	let hours = (ms / (1000 * 60 * 60)).toFixed(1);
	let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
	if (seconds < 60) return seconds + " Sec";
	else if (minutes < 60) return minutes + " Min";
	else if (hours < 24) return hours + " Hrs";
	else return days + " Days";
}

function getDiff(last_seen) {
	let diff = Date.now() - last_seen;
	let teks = msToTime(diff);
    return teks;
}

const Card = ({ PC }) => {
    const [datetext, setDatetext] = useState('');

    useEffect(()=>{
        let date = new Date(PC.last_seen);
        setDatetext(moment(date).format('DD-MM-YYYY HH:MM:SS'))
    }, [PC])

	return (
		<div
			className={
				(PC.is_active ? "bg-green-400" : "bg-red-400") +
				" p-2 rounded grid grid-cols-3 shadow-lg h-full w-full md:h-48 md:w-96"
			}
		>
			<div className="flex items-center justify-center w-full h-full">
				<DesktopComputerIcon className="w-auto" />
			</div>
			<div className="col-span-2">
				<div
					className="text-center font-medium text-xl border-b-2 mx-3 pb-1 border-black"
					style={{ fontFamily: "Poppins" }}
				>
					{PC.pc}
				</div>
				<div
					className="flex flex-col p-2"
					style={{ fontFamily: "Poppins" }}
				>
					<div className="capitalize">
						<p>
							<span className="font-medium">OS :</span>{" "}
							{PC.state?.os}
						</p>
					</div>
                    <div>
						<p className="text-sm">
							<span className="font-medium text-base">
								Last seen :
							</span>{" "}
							{getDiff(PC.last_seen) + ' Ago'}
						</p>
                        <p className="text-xs">{datetext}</p>
					</div>
					<div>
						<p className="text-sm">
							<span className="font-medium text-base">
								State :
							</span>{" "}
							{PC.state?.windowName}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
