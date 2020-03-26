const GAME_ID = 'phoenixpoint';
const EGS_CODENAME = "Iris";

const path = require('path');
const { fs, log, util } = require('vortex-api');

function PhoenixPoint(context) {
	context.registerGame({
        id: GAME_ID,
        name: 'Phoenix Point',
        mergeMods: true,
        queryPath: findGame,
        supportedTools: [],
        queryModPath: () => 'Mods',
        logo: 'gameart.jpg',
        executable: () => 'PhoenixPointWin64.exe',
        requiredFiles: [
          'PhoenixPointWin64.exe',
          '/PhoenixPointWin64_Data/Managed/Assembly-CSharp.dll'
        ],
        setup: prepareForModding,
      });
	return true
}

function findGame() {
    return util.epicGamesLauncher.findByName(EGS_CODENAME)
           .then(game => game.gamePath);
}

function prepareForModding(discovery) {
    let gamePath = discovery.path;
    let modsDir = path.join(gamePath, "Mods");

    fs.ensureDirAsync(modsDir);
}

module.exports = {
    default: PhoenixPoint,
};