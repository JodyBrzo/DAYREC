const fs = require("fs");

const getAllowBetStatus = () => {
  //load the systemStatus.json file to hold the state is betting is allowed or not
  if (!global.systemStatus) {
    const fileData = fs.readFileSync("./data/systemStatus.json");
    global.systemStatus = JSON.parse(fileData);
  }
  return global.systemStatus;
};

const setAllowBetStatus = betStatus => {
  //load the systemStatus.json file to hold the state is betting is allowed or not
  global.systemStatus.allowBets = betStatus;
  const data = JSON.stringify(global.systemStatus);

  fs.writeFile("./data/systemStatus.json", data, err => {
    if (err) {
      throw err;
    }
  });
};

module.exports = {
  getAllowBetStatus: getAllowBetStatus,
  setAllowBetStatus: setAllowBetStatus
};
