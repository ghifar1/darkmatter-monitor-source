import React, { useEffect, useState } from "react";
import Card from "./DashboardPart/Card";
import ws from "../utils/Websocket";

const ErrorText = () => {
	return (
		<div className="text-white font-medium">
			Websocket connection error.
		</div>
	);
};

const DashboardScreen = ({ dataPC }) => {
	const [wsError, setWsError] = useState(false);

	useEffect(() => {
		ws.on("connect_error", (err) => {
			setWsError(true);
		});

		ws.on("connect", () => {
			setWsError(false);
		});
		return;
	}, []);

	useEffect(() => {
		console.log(dataPC);
	}, [dataPC]);

	return (
		<div className="w-full h-full">
			<div className="flex flex-row flex-wrap gap-5 items-center mb-7">
				<div
					className="font-medium text-3xl text-white"
					style={{ fontFamily: "Poppins" }}
				>
					Connected Computers
				</div>
				<div className="grid grid-cols-2 gap-2 border-white border py-2 px-3 rounded-md">
					<div className="grid grid-cols-2">
						<div className="mx-auto">
							<div className="h-7 w-7 bg-green-400 rounded"></div>
						</div>
						<p className="text-white font-medium">Online</p>
					</div>
					<div className="grid grid-cols-2">
						<div className="mx-auto">
							<div className="h-7 w-7 bg-red-400 rounded"></div>
						</div>
						<p className="text-white font-medium">Offline</p>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap gap-3">
				{!wsError ? (
					dataPC.map((val, ind) => {
						console.log(val);
						return <Card key={ind} PC={val} />;
					})
				) : (
					<ErrorText />
				)}
			</div>
		</div>
	);
};

export default DashboardScreen;
