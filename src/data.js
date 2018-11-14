// this includes endpoints at data.nba.com

const getJson = require("./get-json");
const { interpolate } = require("./util/string");

const scoreboardURL = interpolate("https://data.nba.com/data/5s/json/cms/noseason/scoreboard/__date__/games.json");
const boxScoreURL = interpolate("https://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/boxscore.json");
const playByPlayURL = interpolate("https://data.nba.com/data/5s/json/cms/noseason/game/__date__/__gameId__/pbp_all.json");

// NOTE: the 'date' argument should be a string in format like "20181008" (which indicates Oct 8 2018)
// You *can* pass a Date object but beware of timezone weirdness!

const scoreboard = date => getJson(scoreboardURL({ date: dateToYYYYMMDD(date) }));
scoreboard.defaults = { date: null };

const boxScore = (date, gameId) => getJson(boxScoreURL({ date: dateToYYYYMMDD(date), gameId }));
boxScore.defaults = { date: null, gameId: null };

const playByPlay = (date, gameId) => getJson(playByPlayURL({ date: dateToYYYYMMDD(date), gameId }));
playByPlay.defaults = { date: null, gameId: null };

function dateToYYYYMMDD (date) {
  if (date instanceof Date) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, 0),
      String(date.getDate()).padStart(2, 0),
    ].join("");
  }

  // TODO: better checking here?

  return date;
}

module.exports = {
  scoreboard,
  boxScore,
  playByPlay,
};