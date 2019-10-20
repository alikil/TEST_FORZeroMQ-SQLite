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
        Socket.on("message", (topic:string ,msg:string) => {
            const resMsg = new api_in(JSON.parse(msg))            
            console.log("message reseved")
            if(resMsg.status == "ok"){
                console.log("ok")
            } else if (resMsg.status == "error"){
                console.log(resMsg.error)
            }
        })
    return Socket
    }
}
export { SubSocket }