import { IPublisher, ISubscriber } from "./Sockets";
import { UserPrompt } from "./UserPrompt";

new ISubscriber(process.env.sub||3000);
const publisher = new IPublisher(process.env.pub||4000);

UserPrompt().then((res) => {publisher.send("api_in", res)})
    














 

   











