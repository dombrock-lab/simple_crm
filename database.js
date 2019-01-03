exports.openDB = function(){
    return new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Connected to the test database.');
      });
}

exports.serialize = function(db){
    db.serialize(() => {
        db.each(`SELECT ID as id,
                        company as company,
                        name as name,
                        phone as phone,
                        email as email
                 FROM clients`, (err, row) => {
          if (err) {
            console.error(err.message);
          }
          console.log(row.id + "\t" + row.name);
        });
    });
}
exports.closeDB = function(db){
    db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Close the database connection.');
      });
}

exports.new_client = function(db,data){
    db.run(`INSERT INTO clients (company, name, email, phone) VALUES(?,?,?,?)`, [data.company,data.name,data.email,data.phone], function(err) {
        if (err) {
          return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been inserted with rowid ${this.lastID}`);
      });
}