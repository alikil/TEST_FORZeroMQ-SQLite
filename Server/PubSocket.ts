import * as zmq from "zeromq";
class PubSocket{
    socket: zmq.Socket;
    constructor (port: string | number){
        this.socket = this.init(port)
    }
    init (port: string | number){
        let Socket = zmq.socket("pub")
        Socket.bindSync(`tcp://127.0.0.1:${port}`)
        console.log(`Pub bindSync to port ${port}`)
        return Socket
    }
    send (topic: string, msg:string) {
        this.socket.send([topic,msg])
        console.log("Message sended => "+ msg)
    }
}
export { PubSocket }
