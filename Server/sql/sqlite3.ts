import * as sqlite3 from "sqlite3";
class sqlite {  
    DB: sqlite3.Database;
    static DB: sqlite3.Database;
    constructor() {
        this.DB = this.init()
    }
    init () {
        const DB_PATH = "./Server/sql/sqlite.db";
        let DB = new sqlite3.Database(DB_PATH, (err: any) => {if (err) {return;}});
        return DB
    }
    get(selector: string) {
        return new Promise((resolve, reject) => {
            console.log(selector)
            this.DB.get(selector,(err,res)=>{
                if (err) {reject(err)}
                else {resolve(res)}
            })
        })
    }
}
export { sqlite }
