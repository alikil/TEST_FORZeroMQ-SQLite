import * as zmq from "zeromq";

class PubSocket{
    Socket: zmq.Socket;    
    constructor (port: string | number){
        this.Socket = this.init(port)
    }
    init (port: string | number){
        let Socket = zmq.socket("pub")
        Socket.connect(`tcp://127.0.0.1:${port}`)
        console.log(`PubSocket connected to port ${port}`)
        return Socket
    }
    send(topic: string,msg: string) {
        console.log([topic,msg])
        this.Socket.send([topic,msg])        
    }
}
export { PubSocket }
