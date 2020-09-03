const sql = require("./db.js");

//constructor
const Anggota = function(anggota) {
    this.nik = anggota.nik;
    this.name = anggota.name;
    this.email = anggota.email;
    this.dateofbirth = anggota.dateofbirth;
    this.placeofbirth = anggota.placeofbirth;
    this.address = anggota.address;
    this.active = anggota.active;
}

Anggota.create = (newAnggota, result) => {
    sql.query("INSERT INTO anggota SET ?", newAnggota, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("create anggota: ", { id: res.insertId, ...newAnggota});
        result(null, { id:res.insertId, ...newAnggota})
    });
};


Anggota.findById = (anggotaId, result) => {
    sql.query(`SELECT*FROM anggota WHERE id =${anggotaId}`, (err, res) => {
        if(err) {
            console.log("error", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found anggota: ", res[0]);
            result(null, res[0]);
            return;
        }

        //not found anggota with the id
        result({ kind: "not_found" }, null);
    });
};

Anggota.getAll = result => {
    sql.query("SELECT * FROM anggota", (err, res) => {
        if(err){
            console.log("error :", err);
            result(null, err);
            return;
        }

        console.log("anggota", res);
        result(null, res);
    });
};

Anggota.updateById = (id, anggota, result) => {
    sql.query(
        "UPDATE anggota SET nik=?, name=?, email=?, dateofbirth=?, placeofbirth=?, address=?, active=? WHERE id=?",
        [anggota.nik, anggota.name, anggota.email, anggota.dateofbirth,
        anggota.placeofbirth, anggota.address, anggota.active, id],
        (err, res) => {
            if(err) {
                console.log("error", err);
                result(null, err);
                return;
            }

            if(res.affectedRows == 0){
                //not found anggota with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated anggota: ", { id:id, ...anggota });
            result(null, { id:id, ...anggota });
        }
    );
};

Anggota.remove = (id, result) => {
    sql.query("DELETE FROM anggota WHERE id = ?", id, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(nul, err);
            return;
        }

        if(res.affectedRows == 0){
            //not found anggota with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("delete customer with id: ", id);
        result(null, res);
    });
};

Anggota.removeAll = result => {
    sql.query("DELETE FROM anggota", (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} anggota`);
        result(null, res);
    });
};

module.exports = Anggota;