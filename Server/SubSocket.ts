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
        Socket.on("message", (message:string) => {
          const msg:message = JSON.parse(message)
          if (msg.type == "login"){
            DB.get(`SELECT * FROM User`).then((res:any) => {
              if (res.passw == msg.password){
                let msgForSend = JSON.stringify(
                  {
                    msg_id:  msg.msg_id,  //равно значению входящего сообщения
                    user_id: res.user_id,    //айди пользователя из БД
                    status:  "ok"
                  }
                )
                console.log(msgForSend);
                pubSocket.send('api_out',msgForSend)
              } else {
                let msgForSend = JSON.stringify(
                  {
                    msg_id:  msg.msg_id,  //равно значению входящего сообщения                    
                    status:  "error",
                    error:  "xxx"
                  }
                )
                console.log(msgForSend);
                pubSocket.send('api_out',msgForSend)
              }
            })
          }          
        });
    return Socket
    }
}
export { SubSocket }