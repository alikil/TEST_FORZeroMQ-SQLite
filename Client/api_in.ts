interface api_in {
    msg_id: number
    user_id: number
    status: string
}
class api_in {
    constructor(message: api_in) {
        this.msg_id = message.msg_id
        this.user_id = message.user_id
        this.status = message.status
    }
}
export { api_in }