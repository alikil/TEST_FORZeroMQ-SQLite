class api_userdata {
    type: string;
    email: any;
    password: any;
    msg_id: number;
    constructor(prompts:any) {
        this.type = "login"
        this.email = prompts.email
        this.password = prompts.pwd
        this.msg_id = this.random(1,1000)
    }
    random(min: number, max: number) {return Math.floor(Math.random() * (max - min) ) + min;}
    json () {
        const json = {
            type: this.type,
            email: this.email,
            password: this.password,
            msg_id: this.msg_id
        }
        return JSON.stringify(json)
    }
}
export { api_userdata }