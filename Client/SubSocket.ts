import * as zmq from "zeromq";
import { api_in } from "./api_in";
class SubSocket {
    Socket: zmq.Socket;
    constructor (port: string | number){
        this.Socket = this.init(port)
    }
    init (port: string | number){
        let Socket = zmq.socket("sub")
        Socket.connect(`tcp://127.0.0.1:${port}`);
        console.log(`SubSocket connected to port ${port}`)
        Socket.subscribe(`api_out`);
        Socket.on("api_in", (msg:api_in) => {
            console.log("message reseved")
            const resMsg = new api_in(msg)
            if(resMsg.status == "ok"){
                console.log("ok")
            } else if (resMsg.status == "error"){
                console.log("error")
            }
        })
    return Socket
    }
}
export { SubSocket }