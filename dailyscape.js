const storage = window.localStorage;

var rs3daily = [
    {task: "Treasure Hunter Keys", url: "https://runescape.wiki/w/Treasure_Hunter", short: true, desc: "Use 2 free daily keys"},
    {task: "Traveling Merchant", url: "https://runescape.wiki/w/Travelling_Merchant%27s_Shop", short: true, desc: "Buy rare items from traveling merchant in deep sea fishing hub ('WhirlPoolDnD' FC)"},
    {task: "Daily Challenge", url: "https://runescape.wiki/w/Challenge_System", short: true, desc: "Get xp, treasure hunter key x3"},
    {task: "Jack of Trades", url: "https://runescape.wiki/w/Jack_of_trades_aura/Routines", short: true, desc: "Get xp in a range of skills to get an xp book"},
    {task: "Soul Reaper", url: "https://runescape.wiki/w/Soul_Reaper", desc: "Kill assigned bosses"},
    {task: "Player Owned Ports", url: "https://runescape.wiki/w/Player-owned_port", short: true, desc: "Manage your player owned port"},
    {task: "Crystal Tree Blossom", url: "https://runescape.wiki/w/Crystal_tree_blossom", short: true, desc: "Collect crystal tree blossom"},
    {task: "Invention Machine", url: "https://runescape.wiki/w/Machines", short: true, desc: "Fill and collect from invention machines"},
    {task: "Bloodwood Tree", url: "https://runescape.wiki/w/Bloodwood_tree", desc: "Fletch bakriminel bolts. Every 6H"},
    {task: "Motherlode Maw", url: "https://runescape.wiki/w/Motherlode_Maw", short: true, desc: "Receive treasure from motherlode maw"},

    {task: "Wicked Hood Runes", url: "https://runescape.wiki/w/Wicked_hood", short: true, desc: "~85k profit - Withdraw Soul/Fire, see <a href=\"https://runescape.wiki/w/Wicked_hood#Runecrafting\" target=\"_blank\" rel=\"noreferrer noopener\">crafting profitability table</a>, teleport for vis"},
    {task: "VisWax", url: "https://runescape.wiki/w/Rune_Goldberg_Machine", short: true, desc: "~500k profit"},
    {task: "Miscellania", url: "https://runescape.wiki/w/Calculator:Other/Miscellania", short: true, desc: "Check approval rating and funds in coffer. Get resources for ~300k profit"},
    {task: "Divine Locations", url: "https://runescape.wiki/w/Divine_location", short: true, desc: "Gather resources from divine locations, Divine Herb 1 is most profitable"},
    {task: "Sand Stone", url: "https://runescape.wiki/w/Red_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask"},
    {task: "Crystal Sand Stone", url: "https://runescape.wiki/w/Crystal-flecked_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask or profit"},

    {task: "Rune Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_runes", short: true, desc: "~2m profit"},
    {task: "Feather Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_feathers", short: true, desc: "~29k profit per shop (11k feathers) up to ~319k profit<br>(or <a href=\"https://runescape.wiki/w/Money_making_guide/Fletching_headless_arrows\" target=\"_blank\" rel=\"noreferrer noopener\">fletch headless arrows</a> from yew logs - ~341k profit per 11k up to ~3.75m profit)"}, // 11k headless arrows = 517k - 11k feathers cost 81000, 315 yew logs = 94,500 profit 341500
    {task: "Meat Packs from Oo'glog", url: "https://runescape.wiki/w/Money_making_guide/Buying_Meat_from_Oo%27glog", short: true, shop: true, desc: "Buy raw meat packs 43k, sell for ~460k profit"},
    {task: "Vial of Water Packs", url: "https://runescape.wiki/w/Money_making_guide/Buying_vials_of_water", short: true, shop: true, desc: "Buy vial of water + eye of newt packs and bomb vials for ~270k profit"},
    {task: "Yak Hide", url: "https://runescape.wiki/w/Money_making_guide/Buying_yak-hide", short: true, shop: true, desc: "Buy Yak Hide packs for ~109k profit"},
    {task: "Broad Arrowheads", url: "https://runescape.wiki/w/Money_making_guide/Buying_broad_arrowheads", short: true, shop: true, desc: "~96k profit (Taverly Shop + Other Slayer Master)"},

    {task: "Nemi Forest", url: "https://www.reddit.com/r/NemiForest/new/", desc: "'NemiForest' FC"},
    {task: "Guthixian Cache", url: "https://runescape.wiki/w/Guthixian_Cache", desc: "Divination D&D"},
    {task: "Sinkholes", url: "https://runescape.wiki/w/Sinkholes", desc: "Dungeoneering XP lamps and tokens, 2x a day"},
    {task: "Goebie Bands", url: "https://runescape.wiki/w/Supply_run", desc: "(Supply Run)"},
    {task: "Menaphos Obelisk", url: "https://runescape.wiki/w/Soul_obelisk_(Menaphos)", desc: "'SoulObby' FC"},
    {task: "Big Chinchompa", url: "https://runescape.wiki/w/Big_Chinchompa", desc: "Private hunting instances and hunter xp"},
    {task: "Phoenix", url: "https://runescape.wiki/w/Phoenix_Lair", desc: "Baby phoenix pet"},
    {task: "Liberation of Mazcab", url: "https://runescape.wiki/w/Liberation_of_Mazcab", desc: "Every 2 Days 'Raid FC' FC"},
];

var rs3weekly = [
    {task: "Capping Clan Citadel", url: "https://runescape.wiki/w/Clan_Citadel", desc: "Get skill xp, set xp bonus, make clan happy"},
    {task: "Charge Anachronia Totems", url: "https://runescape.wiki/w/Totem", desc: "Recharge totems weekly and optionally swap out"},
    {task: "Meg", url: "https://runescape.wiki/w/Meg", short: true, desc: "XP lamp and coins"},
    {task: "Tears of Guthix", url: "https://runescape.wiki/w/Tears_of_Guthix", short: true, desc: "Gain xp for lowest level skill"},
    {task: "Herby Werby", url: "https://runescape.wiki/w/Herby_Werby", desc: "Herb bag and Totem pieces"},
    {task: "Big Top Bonanza", url: "https://runescape.wiki/w/Balthazar_Beauregard%27s_Big_Top_Bonanza", short: true, desc: "Do circus tricks for xp"},
    {task: "Penguin Hide and Seek", url: "http://2016.world60pengs.com/", desc: "Find penguins, get xp lamps"},
    {task: "Wisps of the Grove", url: "https://runescape.wiki/w/Wisps_of_the_Grove", desc: "Farming & Hunting XP, Vinny pet"},
    {task: "Shattered Worlds", url: "https://runescape.wiki/w/Shattered_Worlds", desc: "Complete weekly challenges for additional <a href=\"https://runescape.wiki/w/Shattered_Worlds/Rewards\" target=\"_blank\" rel=\"noreferrer noopener\">shattered anima</a>"},
    {task: "Familiarisation", url: "https://runescape.wiki/w/Familiarisation", desc: "Summoning outfit"},
];

var rs3monthly = [
    {task: "Solomon's Store", url: "https://secure.runescape.com/m=mtxn_rs_shop/index?jptg=ia&jptv=sgs_page#category/FreeItem", short: true, desc: "Free cosmetics, check loyalty points and sales"},
    {task: "Premier Club Vault", url: "https://runescape.wiki/w/Premier_Club_Vault", short: true, desc: "Get free lamps/stars/proteans. Open colossal chest last 5 seconds. Try to do during <a href=\"https://runescape.wiki/w/Prismania\" target=\"_blank\" rel=\"noreferrer noopener\">Prismania</a>"},
    {task: "Giant Oyster", url: "https://runescape.wiki/w/Giant_Oyster", short: true, desc: "Fishing & Farming XP and a free treasure trails chest"},
    {task: "God Statues", url: "https://runescape.wiki/w/God_Statues", desc: "Up to 177k construction and 88k prayer or slayer xp"},
    {task: "Effigy Incubator", url: "https://runescape.wiki/w/Effigy_Incubator", desc: "Get 10+ effigies"},
    {task: "Troll Invasion", url: "https://runescape.wiki/w/Troll_Invasion", desc: "Defend all waves for up to 77k xp book"},
];

/**
 * Populate the HTML with data for a timeFrame and attach listeners
 * @param {String} timeFrame
 * @returns
 */
const populateTable = function(timeFrame) {
    let data = window[timeFrame];

    const rowElem = document.querySelector('#sample_row');

    let tableElem = document.querySelector('#' + timeFrame + '_table tbody');

    if (!tableElem) {
        console.warn("Table does not exist: " + timeFrame);
        return;
    }

    for (let rowID = 0; rowID < data.length; rowID++) {
        let newRow = rowElem.cloneNode(true);
        let newRowNameElem = newRow.children[0];
        let newRowColourElem = newRow.children[1];
        let newRowNameAnchor = newRowNameElem.firstChild;

        newRow.id = timeFrame + "_row_" + rowID;
        newRowNameElem.id = timeFrame + "_name_" + rowID;
        newRowColourElem.id = timeFrame + "_colour_" + rowID;

        if (!!data[rowID].url) {
            newRowNameAnchor.href = data[rowID].url;
            newRowNameAnchor.target = "_blank";
            newRowNameAnchor.setAttribute('rel', 'noopener noreferrer');
            newRowNameAnchor.innerHTML = data[rowID].task;

            if (!!data[rowID].desc) {
                newRowColourElem.innerHTML = data[rowID].desc;
            }
        } else {
            newRowNameAnchor.innerHTML = data[rowID];
        }

        let taskName = newRowNameAnchor.innerHTML;
        let taskState = storage.getItem(taskName) ?? 'false';

        tableElem.appendChild(newRow);

        newRow.dataset.completed = taskState;

        newRowColourElem.addEventListener("click", function () {
            let newState = (newRow.dataset.completed === 'true') ? 'false' : 'true'
            newRow.dataset.completed = newState;

            if (newState === 'true') {
                storage.setItem(taskName, newState)
            } else {
                storage.removeItem(taskName);
            }

            storage.setItem(timeFrame + '-updated', new Date().getTime());
        });
    }

    let resetButton = document.querySelector('#' + timeFrame + '_reset_button');
    resetButton.addEventListener("click", function () {
        resetTable(timeFrame);
    });
};

/**
 * Takes a timeframe name and clear the associated localstorage and toggle the html data off
 * @param {String} timeFrame
 */
const resetTable = function(timeFrame) {
    let data = window[timeFrame];

    for (let rowID = 0; rowID < data.length; rowID++) {
        let rowTarget = document.querySelector('#' + timeFrame + '_row_' + rowID);
        rowTarget.dataset.completed = false;

        let taskName = rowTarget.querySelector('.activity_name a').innerHTML;
        storage.removeItem(taskName);
    }

    storage.removeItem(timeFrame + '-updated');
};

/**
 * Check if last updated timestamp for a timeframe is less than
 * the last reset for that timeframeif so reset the category
 * @param {String} timeFrame
 * @returns
 */
const checkReset = function(timeFrame) {
    let tableUpdateTime = storage.getItem(timeFrame + '-updated') ?? 'false';

    if (tableUpdateTime === 'false') {
        return false;
    }

    let updateTime = new Date(parseInt(tableUpdateTime));

    let nextdate = new Date();
    nextdate.setUTCHours(0);
    nextdate.setUTCMinutes(0);
    nextdate.setUTCSeconds(0);

    //check lastupdated < last weekly reset
    if (timeFrame == 'rs3weekly') {
        let resetday = 3;
        let weekmodifier = (7 - resetday + nextdate.getUTCDay()) % 7;
        nextdate.setUTCDate(nextdate.getUTCDate() - weekmodifier);
    } else if (timeFrame == 'rs3monthly') {
        nextdate.setUTCDate(1);
    }

    if (updateTime.getTime() < nextdate.getTime()) {
        resetTable(timeFrame);
    }
};

/**
 * Add a countdown timer until the next reset for a timeframe
 * @param {String} timeFrame
 */
const countDown = function(timeFrame) {
    let nextdate = new Date();
    nextdate.setUTCHours(24);
    nextdate.setUTCMinutes(0);
    nextdate.setUTCSeconds(0);

    if (timeFrame == 'rs3weekly') {
        let resetday = 3;
        let weekmodifier = (7 + resetday - nextdate.getUTCDay() ) % 7;
        nextdate.setUTCDate(nextdate.getUTCDate() + weekmodifier);
    } else if (timeFrame == 'rs3monthly') {
        nextdate.setUTCMonth(nextdate.getUTCMonth() + 1);
        nextdate.setUTCDate(1);
    }

    let nowtime = new Date();
    let remainingtime = (nextdate.getTime() - nowtime.getTime()) / 1000;

    let timeparts = [
        Math.floor(remainingtime / 86400), //d
        Math.floor(remainingtime % 86400 / 3600), //h
        Math.floor(remainingtime % 3600 / 60), //m
        Math.floor(remainingtime % 60) //s
    ];

    document.getElementById('countdown-' + timeFrame).innerHTML = (timeparts[0] > 0 ? (timeparts[0] + 'd ') : '') + (timeparts[1] > 0 ? (timeparts[1] + 'h ') : '') + timeparts[2] + 'm ' + timeparts[3] + 's';
};

window.onload = function () {
    for (const timeFrame of ['rs3daily', 'rs3weekly', 'rs3monthly']) {
        populateTable(timeFrame);
        checkReset(timeFrame);
        countDown(timeFrame);
        setInterval(countDown, 1000, timeFrame);
    }
};
