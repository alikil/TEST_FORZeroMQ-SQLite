import { SubSocket } from "./SubSocket";
import { PubSocket } from "./PubSocket";
import { sqlite } from "./sql/sqlite3";

export const DB = new sqlite() 

new SubSocket(process.env.sub||4000)
new PubSocket(process.env.pub||3000)





