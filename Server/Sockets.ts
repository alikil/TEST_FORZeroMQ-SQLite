import * as zmq from "zeromq";
import { DB } from "./Server";

class IPublisher {
  socket: zmq.Socket;
  static socket: zmq.Socket;
    constructor (port: string | number){
        this.socket = this.init(port)
    }
    init (port: string | number){
        let socket = zmq.socket("pub")
        socket.bindSync(`tcp://127.0.0.1:${port}`)
        console.log(`Pub bindSync to port ${port}`)
        return socket
    }
    send (topic: string, msg:string) {
        this.socket.send([topic,msg])
        console.log("Message sended => "+ msg)
    }
}

class ISubscriber {
  Socket: zmq.Socket;
  constructor(port: string | number,IPublisher: IPublisher){
      this.Socket = this.init(port, IPublisher)
  }
  init(port: string | number,IPublisher:any){
    let Socket = zmq.socket("sub")
    Socket.bindSync(`tcp://127.0.0.1:${port}`);
    console.log(`Sub bindSync to port ${port}`)
    Socket.subscribe(`api_in`)
    Socket.on("message", (topic:string,message:string) => {          
      const msg = JSON.parse(message)
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
                IPublisher.send('api_out',msgForSend)
            } else {
              let msgForSend = JSON.stringify({
                  msg_id:  msg.msg_id,                 
                  status:  "error",
                  error:  "WRONG_PWD"
                })
                IPublisher.send('api_out',msgForSend)
            }
          },
          (rej:any) => {
            console.log(rej)
            let msgForSend = JSON.stringify({
              msg_id:  msg.msg_id,             
              status:  "error",
              error:  `WRONG_FORMAT`
            })
            IPublisher.send('api_out',msgForSend)
          }
        )
      }
    });
  return Socket
  }
}

export { IPublisher,ISubscriber }
