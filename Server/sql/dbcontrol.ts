import * as sqlite3 from "sqlite3";

  const init = () => {
    const DB_PATH = "./Server/sql/sqlite.db";
    let db = new sqlite3.Database(DB_PATH, (err) => {if (err) {return;}});
    let schema = `
    CREATE TABLE IF NOT EXISTS User (
    user_id INTEGER NOT NULL PRIMARY KEY,
    email TEXT NOT NULL,
    passw TEXT NOT NULL
    )`
    db.exec(schema, (err) => {if (err) {console.log(err);}});
    //db.close((err) => {if (err) {return console.error(err.message);}});
    return db
  }


  const db = init()

    const interer = `
    INSERT INTO User (user_id, email, passw) 
    VALUES (?,?,?)
    `
    const arr:[number,string,string] = [654645, "xxx@mail.com","yyy"]
    const test = db.run(interer,arr, (err)=>{
        if (err) throw err;
        console.log("ok");
    })

