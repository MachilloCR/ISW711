const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb+srv://machillo_cr:M%40cho913@cluster0.zlsypte.mongodb.net/?retryWrites=true&w=majority");

const TeamModel = require("./Models/team");
const playerModel = require("./Models/players");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/teams', (req, res) => {

    TeamModel.model.find().then(data => {
        res.json(data)
    }).catch(err => console.log(err));

});

app.get('/teams/team', (req, res) => {

    //   check if there's an ID in the querystring

    if (req.query && req.query.id) {

        TeamModel.model.findById(req.query.id, function (err, team) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Team', err);
                res.json({ error: "Team doesnt exist" });
            }
            res.status(200); // OK
            res.json(team);
        });
    } else {
        res.status(404);
        res.json({ error: "Task doesnt exist xd" });
    }

});

app.post('/teams/create', function (req, res) {

    const team = new TeamModel.model;


    team.name = req.body.name;
    team.description = req.body.description;
    if (team.name && team.description) {
        team.save(function (err) {
            if (err) {
                res.status(422);
                console.log('error while saving the team', err);
                res.json({
                    error: 'There was an error saving the team'
                });
            }
            res.status(201);//CREATED
            res.header({
                'location': `http://localhost:3000/team/?id=${team.id}`
            });
            res.json(team);
        });
    } else {
        res.status(422);
        console.log('error while saving the team')
        res.json({
            error: 'No valid data provided for team'
        });
    }
});

app.patch('/teams/edit', (req, res) => {
    const team = new TeamModel();

    //   check if there's an ID in the querystring

    if (req.query && req.query.id) {

        TeamModel.model.findById(req.query.id, function (err, team) {
            if (err) {
                res.status(404);
                console.log('error while queryting the task', err);
                res.json({ error: "Task doesnt exist xd 2" });
            }

            // update the task object (patch)
            team.name = req.body.name ? req.body.name : team.name;
            team.description = req.body.description ? req.body.description : team.description;
            // update the task object (put)
            // task.title = req.body.title
            // task.detail = req.body.detail

            team.save(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the task', err);
                    res.json({
                        error: 'There was an error saving the task'
                    });
                }
                res.status(200); // OK
                res.json(team);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Task doesnt exist xd" });
    }

});

app.delete('/teams/delete', (req, res) => {

    //   check if there's an ID in the querystring

    if (req.query && req.query.id) {

        TeamModel.model.findById(req.query.id, function (err, team) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Team', err);
                res.json({ error: "Team doesnt exist" });
            }
            team.delete(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the task', err);
                    res.json({
                        error: 'There was an error saving the task'
                    });
                }
                res.status(200); // OK
                res.json("team" + team);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Task doesnt exist xd" });
    }

});

app.post('/players/create', function (req, res) {

    const player = new playerModel.model;

    player.first_name = req.body.first_name;
    player.last_name = req.body.last_name;
    player.age = req.body.age;

    if ( player.first_name && player.last_name && player.age) {
        TeamModel.model.findById(req.body.team, function (err, equipo) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Team', err);
                res.json({ error: "Team doesnt exist" });
            }
            player.team = equipo;
        });

        player.save(function (err) {
            if (err) {
                res.status(422);
                console.log('error while saving the team', err);
                res.json({
                    error: 'There was an error saving the player'
                });
            }
            res.status(201);//CREATED
            res.header({
                'location': `http://localhost:3000/players/player/?id=${player.id}`
            });
            res.json(player);
        });
    } else {
        res.status(422);
        console.log('error while saving the team')
        res.json({
            error: 'No valid data provided for team'
        });
    }
});

app.delete('/players/delete', (req, res) => {

    //   check if there's an ID in the querystring

    if (req.query && req.query.id) {

        playerModel.model.findById(req.query.id, function (err, player) {
            if (err) {
                res.status(404);
                console.log('error while queryting the Team', err);
                res.json({ error: "Team doesnt exist" });
            }
            player.delete(function (err) {
                if (err) {
                    res.status(422);
                    console.log('error while saving the task', err);
                    res.json({
                        error: 'There was an error saving the task'
                    });
                }
                res.status(200); // OK
                res.json(player);
            });
        });
    } else {
        res.status(404);
        res.json({ error: "Task doesnt exist xd" });
    }

});



app.listen(3000, () => console.log(`Fifa app listening on port 3000!`))