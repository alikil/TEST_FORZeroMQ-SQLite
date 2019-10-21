import { SubSocket } from "./SubSocket";
import { PubSocket } from "./PubSocket";
import { UserPrompt } from "./UserPrompt";

new SubSocket(process.env.sub||3000);
const pubSocket = new PubSocket(process.env.sub||4000);

UserPrompt().then((res) => {pubSocket.send("api_in", res)})
    














 

   











