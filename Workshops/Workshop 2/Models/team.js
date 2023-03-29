const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const team = new Schema({
  name: { type: String },
  description: { type: String }
});

const TeamModel = mongoose.model('teams', team);

module.exports = {
  schema: team,
  model: TeamModel
}