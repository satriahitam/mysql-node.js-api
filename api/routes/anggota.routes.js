module.exports = app => {
    const anggota = require("../controllers/anggota.controller.js");

    //create a new anggota
    app.post("/anggotas", anggota.create);

    //retrieve all anggota
    app.get("/anggotas", anggota.findAll);

    //retrieve a single anggota with anggotaId
    app.get("/anggotas/:anggotaId", anggota.findOne);

    //update a anggota with anggotaId
    app.put("/anggotas/:anggotaId", anggota.update);

    app.delete("/anggotas/:anggotaId", anggota.delete);

    //create a new customer
    app.delete("/anggotas", anggota.deleteAll);
}