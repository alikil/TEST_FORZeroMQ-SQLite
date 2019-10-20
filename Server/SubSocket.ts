import * as zmq from "zeromq";
import { message } from "./message";
import { DB } from "./Server";
class SubSocket {
    Socket: zmq.Socket;
    constructor(port: string | number){
        this.Socket = this.init(port)
    }
    init(port: string | number){
        let Socket = zmq.socket("sub")
        Socket.bindSync(`tcp://127.0.0.1:${port}`);
        console.log(`Sub bindSync to port ${port}`)
        Socket.subscribe(`api_in`)
        Socket.on("message", (topic:string, message:string) => {
          const msg:message = JSON.parse(message)
          if (msg.type == "login"){
            DB.get(`SELECT passw FROM User`).then((res:{}|string) => {
              console.log(res)
              if (res == msg.password){
                console.log("+",res);
              } else {
                console.log("+1",res);
              }
                console.log("+2",res);
            })
          }          
        });
    return Socket
    }
}
export { SubSocket }