import { teamModel } from "../models/team.model.js";


export const getTeams = async function(){
  //get all teams
  try {
    const teams = await teamModel.find();
    if (teams) {
      return teams;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

export const getTeam = async function(id){
  //get one specific player
  try {
    const player = await playerModel.findById(id);
    if (player) {
      return player;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}