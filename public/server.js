const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const CryptoJS = require("crypto-js");
const cors = require("cors");
const router = require("./router");
const port = 3010;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

let activePC = [];

function sendEncryptedData(data, socket) {
	let encrypt = CryptoJS.AES.encrypt(
		JSON.stringify(data),
		"wadidaw"
	).toString();
	socket.emit("update", encrypt);
}

// function encrpytedBroadcast(data) {
// 	let encrypt = CryptoJS.AES.encrypt(
// 		JSON.stringify(data),
// 		"wadidaw"
// 	).toString();
// 	io.emit("refresh", encrypt);
// }

io.on("connection", (socket) => {
	//Emit for new connection
	console.log("new socket connected");

	//just send data if user needed
	socket.on('refresh', ()=>{
		sendEncryptedData(activePC, socket)
	});

	socket.on("disconnect", () => {
		Object.keys(activePC).forEach((val, idx) => {
			if (activePC[idx]["socket_id"] === socket.id) {
				activePC[idx]["is_active"] = false;
			}
		});
		// encrpytedBroadcast(activePC);
	});

	//get incoming data from pc user
	socket.on("pc-update", (data) => {
		Object.keys(activePC).forEach((val, idx) => {
			if (activePC[idx]["socket_id"] === socket.id) {
				activePC[idx]["uptime"] = data["uptime"];
				activePC[idx]["state"] = data["state"];
				activePC[idx]["last_seen"] = Date.now();
			}
		});
		// encrpytedBroadcast(activePC);
	});

	//trigger incoming data for new or update pc user
	socket.on("active-pc", (pc) => {
		//console.log(pc);
		let found = false;
		let key = undefined;
		Object.keys(activePC).forEach((val, idx) => {
			if (activePC[idx]["pc"] === pc["hostname"]) {
				found = true;
				key = idx;
			}
		});

		if (found) {
			activePC[key]["is_active"] = true;
			activePC[key]["socket_id"] = socket.id;
			activePC[key]["last_seen"] = Date.now();
		} else {
			let obj = {
				pc: pc["hostname"],
				is_active: true,
				uptime: pc["uptime"],
				socket_id: socket.id,
				state: pc["state"],
				last_seen: Date.now(),
			};

			activePC.push(obj);
		}
		// encrpytedBroadcast(activePC);
	});
});

app.use(cors());
app.use(router);

console.log(`Server listen to port ${port}`);
httpServer.listen(port);
