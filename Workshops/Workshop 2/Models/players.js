const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teamSchema = require("./team");

const player = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    age: { type: Number },
    team: teamSchema.schema
});

const PlayerModel = mongoose.model('players', player);

module.exports = {
  schema: player,
  model: PlayerModel
}