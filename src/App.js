import { useEffect, useState } from "react";
// import SplashScreen from "./Pages/SplashScreen";
import DashboardScreen from "./Pages/DashboardScreen";
import ws from "./utils/Websocket";
import { AES, enc } from "crypto-js";

function dataLooping() {
	ws.emit("refresh");
}

function decryptData(cipher) {
	let bytes = AES.decrypt(cipher, "wadidaw");
	let original = bytes.toString(enc.Utf8);
	return JSON.parse(original);
}

function App() {
	const [splash, setSplash] = useState(true);
	const [dataPC, setDataPC] = useState([]);

	useEffect(() => {
		setInterval(dataLooping, 2000);
		setTimeout(() => {
			setSplash(false);
		}, 2000);

		ws.on("update", (res) => {
			// console.log(res);
			let teks = decryptData(res);
			// console.log(teks);
			setDataPC(teks);
		});
		return;
	}, []);
	return (
		<div className="bg-gray-800 h-screen py-5 px-5 md:px-10">
			<DashboardScreen dataPC={dataPC} />
		</div>
	);
}

export default App;
