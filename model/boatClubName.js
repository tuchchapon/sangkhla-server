const mongooose = require("mongoose");

const boatClubName = {

    club_name: String,

}
const BoatClubName = mongooose.model('boatClubName', boatClubName);
module.exports = BoatClubName;
