const Anggota = require("../models/anggota.models.js");

//create and save a new anggota
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    //create a anggota
    const anggota = new Anggota({
        nik: req.body.nik,
        name: req.body.name,
        email: req.body.email,
        dateofbirth: req.body.dateofbirth,
        placeofbirth: req.body.placeofbirth,
        address: req.body.address,
        active: req.body.active
    });

    //save anggot in the database
    Anggota.create(anggota, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "some error occureed while creating the anggota."
            });
        else res.send(data);
    });
};

//retrieve all anggota from the database
exports.findAll = (req, res) => {
    Anggota.getAll( (err, data) => {
        if(err)
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving anggota"
        });

        else res.send(data);
    });
};

// Find a single anggota with a anggotaId
exports.findOne = (req, res) => {
    Anggota.findById(req.params.anggotaId, (err, data) => {
        if(err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found anggota with id ${req.params.anggotaId}.`
                });
            }else {
                res.status(500).send({
                    message: "Error retrieving anggota with id " + req.params.anggotaId
                });
            }
        } else res.send(data);
    });
};

//update a anggota identified by the anggotaId in the request
exports.update = (req, res) => {
    if(!req.body) { 
        res.status(400).send({
            message: "Content can not be empty"
        });
    }

    Anggota.updateById(
        req.params.anggotaId,
        new Anggota(req.body),
        (err, data) => {
            if(err) {
                if (err.kind === "not_found"){
                    res.status(404).send({
                        message: `Not found anggota with id ${req.params.anggotaId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating anggota with id" + req.params.anggotaId
                    });
                }
            }else res.send(data);
        }
    )
};

//delete a anggota with specified anggotaid
exports.delete = (req, res) => {
    Anggota.remove(req.params.anggotaId, (err, data) => {
        if(err) {
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found anggota with id ${req.params.anggotaId}.`
                });
            }else {
                res.status(500).send({
                    message: "Could not delete Anggota with id "+ req.params.anggotaId
                });
            }
        }else res.send({ message: `Anggota was delete successfully!` });
    });
};

//delete all anggota from the database
exports.deleteAll = (req, res) => {
    Anggota.removeAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all anggota"
            });
        else res.send({ message: `All anggota were deleted successfully`})
    })
};