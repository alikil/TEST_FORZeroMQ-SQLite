import { IPublisher,ISubscriber } from "./Sockets";
import { sqlite } from "./sql/sqlite3";

export const DB = new sqlite()
const publisher = new IPublisher(process.env.pub||3000)
const subscriber = new ISubscriber(process.env.sub||4000, publisher)




