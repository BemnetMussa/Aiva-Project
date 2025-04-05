import { io, Socket } from "socket.io-client";
import { clientToServer, serverToClient } from "./socketTypeCheck";
const socket: Socket<serverToClient, clientToServer> = io(
  "http://localhost:5000"
);
export default socket;
