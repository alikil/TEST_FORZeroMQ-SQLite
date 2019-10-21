import * as zmq from "zeromq";
import { message } from "./message";
import { DB, pubSocket} from "./Server";
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
    Socket.on("message", (topic:string,message:string) => {          
      const msg:message = JSON.parse(message)
      console.log("Message reseved =>"+JSON.stringify(msg))
      if (msg.type == "login"){
        DB.get(`SELECT * FROM User WHERE email='${msg.email}'`)            
        .then(
          (res: any) => {
            console.log(res)
            console.log("ok from db")
            if (res.passw == msg.password){
              let msgForSend = JSON.stringify({
                  msg_id:  msg.msg_id,
                  user_id: res.user_id,
                  status:  "ok"
                })
              pubSocket.send('api_out',msgForSend)
            } else {
              let msgForSend = JSON.stringify({
                  msg_id:  msg.msg_id,                 
                  status:  "error",
                  error:  "WRONG_PWD"
                })
              pubSocket.send('api_out',msgForSend)
            }
          },
          (rej:any) => {
            console.log(rej)
            let msgForSend = JSON.stringify({
              msg_id:  msg.msg_id,             
              status:  "error",
              error:  `WRONG_FORMAT`
            })
            pubSocket.send('api_out',msgForSend)
          }
        )
      }
    });
  return Socket
  }
}
export { SubSocket }