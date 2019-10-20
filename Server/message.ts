interface message {
    type: string,
    email: string,
    password: string,
    msg_id: number
}
class message {
    constructor(message:message) {
        this.type = message.type
        this.email = message.email
        this.password = message.password
        this.msg_id = message.msg_id
    }
}
export {message}