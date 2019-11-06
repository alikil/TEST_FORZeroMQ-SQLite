import * as zmq from "zeromq";

class IPublisher {
    Socket: zmq.Socket;    
    constructor (port: string | number){
        this.Socket = this.init(port)
    }
    init (port: string | number){
        let socket = zmq.socket("pub")
        socket.connect(`tcp://127.0.0.1:${port}`)
        console.log(`PubSocket connected to port ${port}`)
        return socket
    }
    send(topic: string,msg: string) {
        this.Socket.send([topic,msg])
        console.log("Message sended => "+ msg)
    }
}

class ISubscriber {
    Socket: zmq.Socket;
    constructor (port: string | number){
        this.Socket = this.init(port)
    }
    init (port: string | number){
        let socket = zmq.socket("sub")
        socket.connect(`tcp://127.0.0.1:${port}`);
        console.log(`SubSocket connected to port ${port}`)
        socket.subscribe(`api_out`);
        socket.on("message", (topic:string ,msg:string) => {            
            const resMsg = JSON.parse(msg)
            console.log("Message reseved => "+JSON.stringify(resMsg))
            if(resMsg.status == "ok"){
                console.log("ok")
            } else if (resMsg.status == "error"){
                console.log(resMsg.error)
            }
        })
    return socket
    }
}

export { IPublisher,ISubscriber }
