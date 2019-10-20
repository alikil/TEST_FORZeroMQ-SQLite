import * as prompts from 'prompts'; 
import { api_userdata } from './api_userdata';
const UserPrompt = async() => {
    const LoginPassMail = await prompts([
        {
            type: 'text',
            name: 'email',
            message: 'Your Email',
        },
        {
            type: 'text',
            name: 'pwd',
            message: 'Your password',
        },
    ]);
    return new api_userdata(LoginPassMail).json()
}
export { UserPrompt }