const db = require("../config/db/postgres");
const Track = db.models.track;

exports.addFavorite = (req, res) => {
    if (!req.body.note) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }

    const track = {
        idTrack: req.body.idTrack,
        image: req.body.image,
        name: req.body.name,
        artists: req.body.artists,
        note: req.body.note,
        userId: req.body.userId,
    };

    Track.create(track)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user.",
            });
        });
};

exports.findAllUser = (req, res) => {
    const id = req.params.id;
    if(id === "") {
        res.status(400).send({
            message: "id user is empty!",
        });
        return;
    }

    Track.findAll({ where: { userId: id }})
        .then(tracks => res.send(tracks))
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user.",
            });
        })
    
};

exports.deleteTrackFavorite = (req, res) => { 
    const id = req.params.id;
    if(id === "") {
        res.status(400).send({
            message: "id track to delete is empty!",
        });
        return;
    }

    Track.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "track was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete track with id=${id}. Maybe track was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete track with id=" + id
            });
        });
};

exports.updateTrackFavorite = (req, res) => {
    const id = req.params.id;
    if(id === "") {
        res.status(400).send({
            message: "id track to update is empty!",
        });
        return;
    }
    if (!req.body.note) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    const track = {
        note: req.body.note
    }

    Track.update(track, { where: { id: id } })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Track was updated successfully."
                });
            } else {
                res.send({
                message: `Cannot update track with id=${id}. Maybe track was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating track with id=" + id
            });
        });

};
