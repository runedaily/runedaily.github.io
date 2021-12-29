const storage = window.localStorage;

var dragRow; //global for currently dragged row
var totalDailyProfit = 0; //global for total daily profit, maybe move this

var rs3daily = {
    "treasure-hunter-keys": {task: "Treasure Hunter Keys", url: "https://runescape.wiki/w/Treasure_Hunter", short: true, desc: "Use 2 free daily keys"},
    "traveling-merchant": {task: "Traveling Merchant", url: "https://runescape.wiki/w/Travelling_Merchant%27s_Shop", short: true, desc: "Buy rare items in deep sea fishing hub ('WhirlPoolDnD' FC)"},
    "daily-challenge": {task: "Daily Challenge", url: "https://runescape.wiki/w/Challenge_System", short: true, desc: "Get xp, treasure hunter key x3"},
    "jack-of-trades": {task: "Jack of Trades", url: "https://runescape.wiki/w/Jack_of_trades_aura/Routines", short: true, desc: "Get xp in a range of skills to get an xp book"},
    "soul-reaper": {task: "Soul Reaper", url: "https://runescape.wiki/w/Soul_Reaper", desc: "Kill assigned bosses"},
    "player-owned-ports": {task: "Player Owned Ports", url: "https://runescape.wiki/w/Player-owned_port", short: true, desc: "Manage your player owned port"},
    "player-owned-farm": {task: "Player Owned Farm", url: "https://runescape.wiki/w/Player-owned_farm", short: true, desc: "Manage your player owned farm"},
    "crystal-tree-blossom": {task: "Crystal Tree Blossom", url: "https://runescape.wiki/w/Crystal_tree_blossom", short: true, desc: "Collect crystal tree blossom for perfect plus potions"},
    "invention-machine": {task: "Invention Machine", url: "https://runescape.wiki/w/Machines", short: true, desc: "Fill and collect from invention machines"},
    "motherlode-maw": {task: "Motherlode Maw", url: "https://runescape.wiki/w/Motherlode_Maw", short: true, desc: "Receive treasure from motherlode maw"},
    "gorajo-card": {task: "Gorajo Card", url: "https://runescape.wiki/w/Gorajo_card", short: true, desc: "Consistent yak card gives a guaranteed Meilyr combination potion recipe"},
    "divine-locations": {task: "Divine Locations", url: "https://runescape.wiki/w/Divine_location", short: true, desc: "Gather resources from divine locations, Herb 1 best profit, Yews best xp"},
    "archaeology-research": {task: "Archaeology Research", url: "https://runescape.wiki/w/Research", short: true, desc: "Use Chronotes to send out research teams for Arch XP and resources"},
    "wilderness-warbands": {task: "Wilderness Warbands", url: "https://runescape.wiki/w/Wilderness_Warbands", short: true, desc: "Every 7 hours. Defeat invaders in the wilderness for xp or gp"},
    "nemi-forest": {task: "Nemi Forest", url: "https://www.reddit.com/r/NemiForest/new/", desc: "'NemiForest' FC"},
    "guthixian-cache": {task: "Guthixian Cache", url: "https://runescape.wiki/w/Guthixian_Cache", desc: "Divination D&D"},
    "sinkholes": {task: "Sinkholes", url: "https://runescape.wiki/w/Sinkholes", desc: "Dungeoneering XP lamps and tokens, 2x a day"},
    "goebie-bands": {task: "Goebie Bands", url: "https://runescape.wiki/w/Supply_run", desc: "Supply Run"},
    "menaphos-obelisk": {task: "Menaphos Obelisk/Scarabs", url: "https://runescape.wiki/w/Soul_obelisk_(Menaphos)", desc: "'SoulObby' FC. Gain Menaphos reputation, also from <a href=\"https://runescape.wiki/w/Corrupted_Scarab_(Menaphos)\" target=\"_blank\" rel=\"noreferrer noopener\">corrupted scarabs</a>"},
    "big-chinchompa": {task: "Big Chinchompa", url: "https://runescape.wiki/w/Big_Chinchompa", desc: "Private hunting instances and hunter xp"},
    "phoenix": {task: "Phoenix", url: "https://runescape.wiki/w/Phoenix_Lair", desc: "Baby phoenix pet"},
    "liberation-of-mazcab": {task: "Liberation of Mazcab", url: "https://runescape.wiki/w/Liberation_of_Mazcab", desc: "Every 2 Days 'Raid FC' FC"},
};

var rs3dailyshops = {
    "rune-shop-run": {task: "Rune Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_runes", short: true,
        outputs: [
            {id: 554, quantity: 7500, shop_price: 17}, //fire rune
            {id: 555, quantity: 7500, shop_price: 17}, //water rune
            {id: 556, quantity: 7500, shop_price: 17}, //air rune
            {id: 557, quantity: 7500, shop_price: 17}, //earth rune
            {id: 558, quantity: 5700, shop_price: 17}, //mind rune
            {id: 559, quantity: 4700, shop_price: 16}, //body rune
            {id: 560, quantity: 1900, shop_price: 310}, //death rune
            {id: 561, quantity: 1200, shop_price: 372}, //nature rune
            {id: 562, quantity: 1800, shop_price: 140}, //chaos rune
            {id: 563, quantity: 700, shop_price: 378}, //law rune
            {id: 564, quantity: 400, shop_price: 232}, //cosmic rune
            {id: 565, quantity: 400, shop_price: 550}, //blood rune
            {id: 566, quantity: 300, shop_price: 410}, //soul rune
            {id: 9075, quantity: 100, shop_price: 220}, //astral rune
        ]
    },
    "vis-wax": {task: "Vis wax", url: "https://runescape.wiki/w/Rune_Goldberg_Machine", short: true, desc: "Profit from shop price and avg of combinations",
        outputs: [
            {id: 32092, quantity: 100, shop_price: 0}, //vis wax
        ],
        inputs: [
            {id: 554, quantity: 150, shop_price: 17}, //fire rune
            {id: 555, quantity: 150, shop_price: 17}, //water rune
            {id: 556, quantity: 150, shop_price: 17}, //air rune
            {id: 557, quantity: 150, shop_price: 17}, //earth rune
            {id: 558, quantity: 300, shop_price: 17}, //mind rune
            {id: 559, quantity: 300, shop_price: 16}, //body rune
            {id: 560, quantity: 60, shop_price: 310}, //death rune
            {id: 561, quantity: 52.5, shop_price: 372}, //nature rune
            {id: 562, quantity: 75, shop_price: 140}, //chaos rune
            {id: 563, quantity: 45, shop_price: 378}, //law rune
            {id: 564, quantity: 60, shop_price: 232}, //cosmic rune
            {id: 565, quantity: 52.5, shop_price: 550}, //blood rune
            {id: 566, quantity: 45, shop_price: 410}, //soul rune
            {id: 4694, quantity: 75}, //steam rune
            {id: 4695, quantity: 75}, //mist rune
            {id: 4696, quantity: 75}, //dust rune
            {id: 4697, quantity: 75}, //smoke rune
            {id: 4698, quantity: 45}, //mud rune
            {id: 4699, quantity: 75}, //lava rune
            {id: 9075, quantity: 45, shop_price: 220}, //astral rune
        ]
    },
    "feathers-of-ma-at": {task: "Feathers of Ma'at", url: "https://runescape.wiki/w/Money_making_guide/Buying_feathers_of_Ma%27at", short: true,
        outputs: [
            {id: 40303, quantity: 1000, shop_price: 1500}, //feather of ma'at
        ]
    },
    "bloodwood-tree": {task: "Bloodwood Tree", url: "https://runescape.wiki/w/Money_making_guide/Fletching_bakriminel_bolts", desc: "Fletch bakriminel bolts. Every 6H",
        outputs: [
            {id: 24116, quantity: 1500, shop_price: 0}, //bakriminel bolts
        ],
        inputs: [
            {id: 24127, quantity: 1500, shop_price: 200}, //bakriminel bolt tips
        ]
    },
    "wicked-hood-runes": {task: "Wicked Hood Runes", url: "https://runescape.wiki/w/Wicked_hood", short: true, desc: "Teleport for Vis. Profits based on 99 RC and fully upgraded hood, see <a href=\"https://runescape.wiki/w/Wicked_hood#Runecrafting\" target=\"_blank\" rel=\"noreferrer noopener\">crafting profitability table</a>",
        outputs_max: [
            [   // Withdraw from hood
                {id: 554, quantity: 200, shop_price: 0}, //fire rune
                {id: 555, quantity: 200, shop_price: 0}, //water rune
                {id: 556, quantity: 200, shop_price: 0}, //air rune
                {id: 557, quantity: 200, shop_price: 0}, //earth rune
                {id: 558, quantity: 200, shop_price: 0}, //mind rune
                {id: 559, quantity: 200, shop_price: 0}, //body rune
                {id: 560, quantity: 10, shop_price: 0}, //death rune
                {id: 561, quantity: 10, shop_price: 0}, //nature rune
                {id: 562, quantity: 10, shop_price: 0}, //chaos rune
                {id: 563, quantity: 10, shop_price: 0}, //law rune
                {id: 564, quantity: 10, shop_price: 0}, //cosmic rune
                {id: 565, quantity: 10, shop_price: 0}, //blood rune
                {id: 566, quantity: 10, shop_price: 0}, //soul rune
                {id: 9075, quantity: 10, shop_price: 0}, //astral rune
            ],
            [   // Craft from pure essence
                {id: 554, quantity: 300, shop_price: 0}, //fire rune
                {id: 555, quantity: 600, shop_price: 0}, //water rune
                {id: 556, quantity: 1000, shop_price: 0}, //air rune
                {id: 557, quantity: 400, shop_price: 0}, //earth rune
                {id: 558, quantity: 800, shop_price: 0}, //mind rune
                {id: 559, quantity: 300, shop_price: 0}, //body rune
                {id: 560, quantity: 100, shop_price: 0}, //death rune
                {id: 561, quantity: 200, shop_price: 0}, //nature rune
                {id: 562, quantity: 200, shop_price: 0}, //chaos rune
                {id: 563, quantity: 100, shop_price: 0}, //law rune
                {id: 564, quantity: 200, shop_price: 0}, //cosmic rune
                {id: 565, quantity: 100, shop_price: 0}, //blood rune
                {id: 566, quantity: 20, shop_price: 0}, //soul rune
                {id: 9075, quantity: 200, shop_price: 0}, //astral rune
            ],
        ]
    },
    "feather-shop-run": {task: "Feather Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_feathers", short: true, desc: 'Normalized for 24 hours',
        outputs: [
            {id: 314, quantity: 12000, shop_price: 6}, //feathers
            {id: 314, quantity: 110000, shop_price: 7.5, multiplier: 0.4, label_override: 'Feather (Packs@60hrs)'}, //feather packs respawn over 60 hours 24/60=0.4
            {id: 313, quantity: 9000, shop_price: 3}, //fishing bait
        ]
    },
    "miscellania": {task: "Miscellania", url: "https://runescape.wiki/w/Calculator:Other/Miscellania", short: true, desc: "Check approval rating and funds in coffer",
        outputs: [
            {id: 1517, quantity: 892, shop_price: 0}, //maple logs
            {id: 6332, quantity: 223, shop_price: 0}, //mahogany logs
        ],
        inputs: [
            {id: -1, quantity: 1, shop_price: 37500}, //kingdom upkeep
        ]
    },
    "sand-stone": {task: "Sand Stone", url: "https://runescape.wiki/w/Red_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask",
        outputs: [
            {id: 23191, quantity: 50, shop_price: 0}, //potion flask
        ]
    },
    "crystal-sand-stone": {task: "Crystal Sand Stone", url: "https://runescape.wiki/w/Crystal-flecked_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask",
        outputs: [
            {id: 32843, quantity: 50, shop_price: 0}, //crystal flask
        ]
    },
    "meat-packs-from-oo-glog": {task: "Meat Packs from Oo'glog", url: "https://runescape.wiki/w/Money_making_guide/Buying_Meat_from_Oo%27glog", short: true, desc: "Only buy packs",
        outputs: [
            {id: 2132, quantity: 300, shop_price: 59}, //raw beef packs
            {id: 9978, quantity: 300, shop_price: 63}, //raw bird meat packs
            {id: 3226, quantity: 100, shop_price: 67}, //raw rabbit packs
        ]
    },
    "vial-of-water-packs": {task: "Vial of Water Packs", url: "https://runescape.wiki/w/Money_making_guide/Buying_vials_of_water", short: true,  desc: 'Normalized for 24 hours. +6 from Sigmund the Merchant',
        outputs: [
            {id: 227, quantity: 5300, shop_price: 10, multiplier: 0.367924528, label_override: 'Vial of Water (Packs@160hrs)'}, //vial of water packs respawn over 160 hours 24/160=0.4
            {id: 221, quantity: 2000, shop_price: 3}, //eye of newt packs
            {id: 48961, quantity: 200, shop_price: 5}, //bomb vial
        ]
    },
    "yak-hide": {task: "Yak Hide", url: "https://runescape.wiki/w/Money_making_guide/Buying_yak-hide", short: true,
        outputs: [
            {id: 10818, quantity: 1000, shop_price: 50}, //yak-hide packs
        ]
    },
    "broad-arrowheads": {task: "Broad Arrowheads", url: "https://runescape.wiki/w/Money_making_guide/Buying_broad_arrowheads", short: true, desc: "Taverly + Any other Slayer Master (e.g. Lumby)",
        outputs: [
            {id: 13278, quantity: 6000, shop_price: 50}, //broad arrowheads
        ]
    },
    "bandit-duty-free": {task: "Bandit Duty Free", url: "https://runescape.wiki/w/Money_making_guide/Buying_construction_materials_from_Bandit_Duty_Free", short: true, desc: "Shop in the Wilderness, get skulled by Mr X first, slow resale on some items.",
        outputs: [
            {id: 13278, quantity: 3000, shop_price: 50}, //broad arrowheads
            {id: 37952, quantity: 5, shop_price: 50000}, //bloodweed seeds
            // {id: 29864, quantity: 5, shop_price: 450000}, //algarum thread
            // {id: 8784, quantity: 5, shop_price: 117000}, //gold leaf
            // {id: 28628, quantity: 5, shop_price: 450000}, //stone of binding
            // {id: 8786, quantity: 5, shop_price: 292500}, //marble block
            {id: 227, quantity: 300, shop_price: 10, label_override: 'Vial of Water Packs'}, //vial of water packs
        ]
    },
    "herb-run": {task: "Herb Run", url: "https://runescape.wiki/w/Money_making_guide/Farming_spirit_weed", short: true, desc: "Plant and gather your favorite herbs",
        outputs_max: [
            [
                {id: 48243, quantity: 69, shop_price: 0, inputs: {48201: 7, 43966: 7, 20011: 0.25}}, //Grimy arbuck
                {id: 211, quantity: 69, shop_price: 0, inputs: {5298: 7, 43966: 7, 20011: 0.25}}, //Grimy avantoe
                // {id: 37975, quantity: 110, shop_price: 50000, inputs: {37952: 7, 43966: 7, 20011: 0.25}}, //Grimy bloodweed
                {id: 215, quantity: 69, shop_price: 0, inputs: {5301: 7, 43966: 7, 20011: 0.25}}, //Grimy cadantine
                {id: 217, quantity: 69, shop_price: 0, inputs: {5303: 7, 43966: 7, 20011: 0.25}}, //Grimy dwarf weed
                {id: 21626, quantity: 69, shop_price: 0, inputs: {21621: 7, 43966: 7, 20011: 0.25}}, //Grimy fellstalk
                {id: 199, quantity: 110, shop_price: 0, inputs: {5291: 7, 43966: 7, 20011: 0.25}}, //Grimy guam
                {id: 205, quantity: 110, shop_price: 0, inputs: {5294: 7, 43966: 7, 20011: 0.25}}, //Grimy harralander
                {id: 209, quantity: 69, shop_price: 0, inputs: {5297: 7, 43966: 7, 20011: 0.25}}, //Grimy irit
                {id: 213, quantity: 69, shop_price: 0, inputs: {5299: 7, 43966: 7, 20011: 0.25}}, //Grimy kwuarm
                {id: 2485, quantity: 69, shop_price: 0, inputs: {5302: 7, 43966: 7, 20011: 0.25}}, //Grimy lantadyme
                {id: 201, quantity: 110, shop_price: 0, inputs: {5292: 7, 43966: 7, 20011: 0.25}}, //Grimy marrentill
                {id: 207, quantity: 69, shop_price: 0, inputs: {5295: 7, 43966: 7, 20011: 0.25}}, //Grimy ranarr
                {id: 3051, quantity: 69, shop_price: 0, inputs: {5300: 7, 43966: 7, 20011: 0.25}}, //Grimy snapdragon
                {id: 12174, quantity: 110, shop_price: 0, inputs: {12176: 7, 43966: 7, 20011: 0.25}}, //Grimy spirit weed
                {id: 203, quantity: 110, shop_price: 0, inputs: {5293: 7, 43966: 7, 20011: 0.25}}, //Grimy tarromin
                {id: 3049, quantity: 69, shop_price: 0, inputs: {5296: 7, 43966: 7, 20011: 0.25}}, //Grimy toadflax
                {id: 219, quantity: 69, shop_price: 0, inputs: {5304: 7, 43966: 7, 20011: 0.25}}, //Grimy torstol
                {id: 14836, quantity: 69, shop_price: 0, inputs: {14870: 7, 43966: 7, 20011: 0.25}} //Grimy wergali
            ]
        ]
    },
};

var rs3weekly = {
    "capping-clan-citadel": {task: "Capping Clan Citadel", url: "https://runescape.wiki/w/Clan_Citadel", desc: "Get skill xp, set xp bonus, make clan happy"},
    "charge-anachronia-totems": {task: "Charge Anachronia Totems", url: "https://runescape.wiki/w/Totem", desc: "Recharge totems weekly and optionally swap out"},
    "meg": {task: "Meg", url: "https://runescape.wiki/w/Meg", short: true, desc: "XP lamp and coins"},
    "tears-of-guthix": {task: "Tears of Guthix", url: "https://runescape.wiki/w/Tears_of_Guthix", short: true, desc: "Gain xp for lowest level skill"},
    "herby-werby": {task: "Herby Werby", url: "https://runescape.wiki/w/Herby_Werby", desc: "Herb bag and Totem pieces"},
    "big-top-bonanza": {task: "Big Top Bonanza", url: "https://runescape.wiki/w/Balthazar_Beauregard%27s_Big_Top_Bonanza", short: true, desc: "Do circus tricks for xp"},
    "penguin-hide-and-seek": {task: "Penguin Hide and Seek", url: "http://2016.world60pengs.com/", desc: "Find penguins, get xp lamps"},
    "wisps-of-the-grove": {task: "Wisps of the Grove", url: "https://runescape.wiki/w/Wisps_of_the_Grove", desc: "Farming & Hunting XP, Vinny pet"},
    "shattered-worlds": {task: "Shattered Worlds", url: "https://runescape.wiki/w/Shattered_Worlds", desc: "Complete weekly challenges for additional <a href=\"https://runescape.wiki/w/Shattered_Worlds/Rewards\" target=\"_blank\" rel=\"noreferrer noopener\">shattered anima</a>"},
    "familiarisation": {task: "Familiarisation", url: "https://runescape.wiki/w/Familiarisation", desc: "Summoning outfit"},
    "skeletal-horror": {task: "Skeletal horror", url: "https://runescape.wiki/w/Skeletal_horror", desc: "Kill it for an elite or master clue scroll"},
    "aquarium-treasure-chest": {task: "Aquarium Treasure Chest", url: "https://runescape.wiki/w/Treasure_chest_decoration", desc: "Get an elite or master clue scroll"},
};

var rs3monthly = {
    "solomon-s-store": {task: "Solomon's Store", url: "https://secure.runescape.com/m=mtxn_rs_shop/index?jptg=ia&jptv=sgs_page#category/FreeItem", short: true, desc: "Free cosmetics, check loyalty points and sales"},
    "premier-club-vault": {task: "Premier Club Vault", url: "https://runescape.wiki/w/Premier_Club_Vault", short: true, desc: "Get free lamps/stars/proteans. Open colossal chest last 5 seconds. Try to do during <a href=\"https://runescape.wiki/w/Prismania\" target=\"_blank\" rel=\"noreferrer noopener\">Prismania</a>"},
    "giant-oyster": {task: "Giant Oyster", url: "https://runescape.wiki/w/Giant_Oyster", short: true, desc: "Fishing & Farming XP and a free treasure trails chest"},
    "god-statues": {task: "God Statues", url: "https://runescape.wiki/w/God_Statues", desc: "Up to 177k construction and 88k prayer or slayer xp"},
    "effigy-incubator": {task: "Effigy Incubator", url: "https://runescape.wiki/w/Effigy_Incubator", desc: "Get 10+ effigies"},
    "troll-invasion": {task: "Troll Invasion", url: "https://runescape.wiki/w/Troll_Invasion", desc: "Defend all waves for up to 77k xp book"},
};

/**
 * Populate the HTML with data for a timeFrame and attach listeners
 * @param {String} timeFrame
 * @returns
 */
const populateTable = function(timeFrame) {
    let data = window[timeFrame];

    const sampleRow = document.querySelector('#sample_row');
    const table = document.getElementById(timeFrame + '_table');
    const tbody = table.querySelector('tbody');

    //Hidden table
    let hideTable = storage.getItem(timeFrame + '-hide') ?? 'false';
    if (hideTable == 'hide') {
        document.querySelector('div.' + timeFrame + '_table').dataset.hide = 'hide';
    }

    //User defined sorting
    let customOrder = storage.getItem(timeFrame + '-order') ?? 'false';
    if (customOrder !== 'false' && !['asc', 'desc', 'alpha', 'default'].includes(customOrder)) {
        let sortArray = customOrder.split(',');

        data = Object.keys(data).sort(function(a, b) {
            return sortArray.indexOf(a) - sortArray.indexOf(b);
        }).reduce(
            (obj, key) => {
                obj[key] = data[key];
                return obj;
            },
            {}
        );
    }

    for (let taskSlug in data) {
        let rowClone = sampleRow.content.cloneNode(true);
        let newRow = rowClone.querySelector('tr');
        let newRowAnchor = rowClone.querySelector('td.activity_name a');
        let newRowColor = rowClone.querySelector('td.activity_color .activity_desc');

        let taskState = storage.getItem(taskSlug) ?? 'false';

        newRow.dataset.task=taskSlug;

        if (!!data[taskSlug].url) {
            newRowAnchor.href = data[taskSlug].url;
            newRowAnchor.innerHTML = data[taskSlug].task;

            /**
             * Handle if task has associated items
             * @todo refactor
             */
            if (!!data[taskSlug].outputs || !!data[taskSlug].outputs_max) {
                let totalInputPrice = 0;
                let totalItemProfit = 0;
                let buyItems = [];
                let skipItems = [];

                if (!!data[taskSlug].inputs) {
                    for (let input of data[taskSlug].inputs) {
                        totalInputPrice += input.quantity * (input.shop_price ?? parseInt(String(rsapidata[input.id].price).replace(/\D/g, ''), 10));
                    }
                }

                if (!!data[taskSlug].outputs_max) {
                    let rowMaxProfit = 0;
                    for (outputMax of data[taskSlug].outputs_max) {
                        let rowMax = calcOutputs(outputMax, totalInputPrice, 'max');
                        totalItemProfit += rowMax.totalItemProfit;
                        if (taskState != 'hide') {
                            totalDailyProfit += rowMax.totalDailyProfit;
                        }
                        rowMaxProfit += rowMax.totalDailyProfit
                        buyItems.push(...rowMax.buyItems);
                        skipItems.push(...rowMax.skipItems);
                    }
                    newRow.dataset.profit = rowMaxProfit;
                } else {
                    let rowSum = calcOutputs(data[taskSlug].outputs, totalInputPrice);
                    totalItemProfit += rowSum.totalItemProfit;
                    if (taskState != 'hide') {
                        totalDailyProfit += rowSum.totalDailyProfit;
                    }
                    newRow.dataset.profit = rowSum.totalDailyProfit;
                    buyItems.push(...rowSum.buyItems);
                    skipItems.push(...rowSum.skipItems);
                }

                newRowColor.innerHTML = 'Profit: <strong>' + totalItemProfit.toLocaleString() + '</strong><span class="coin">●</span><br>';

                if (!!data[taskSlug].desc) {
                    newRowColor.innerHTML += data[taskSlug].desc + '<br>';
                }

                for (let item of buyItems) {
                    let itemApiData = rsapidata[item.id];
                    let itemInputData = !!item.inputs ? ' data-inputs="' + encodeURIComponent(JSON.stringify(item.inputs)) + '"' : '';

                    newRowColor.innerHTML += '<div class="item_output" data-item_id="' + item.id + '" data-shop_price="' + item.shop_price + '"' + itemInputData + '>'
                                            + '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + item.id + '">'
                                            + (!!item.label_override ? item.label_override : itemApiData.name) + ' x' + item.quantity.toLocaleString() + ' (' + item.profit.toLocaleString() + ')'
                                            + '</div>';
                }

                if (skipItems.length > 0) {
                    newRowColor.innerHTML += '<br>Skip:<br>'
                    for (let item of skipItems) {
                        let itemApiData = rsapidata[item.id];
                        newRowColor.innerHTML += '<div class="item_output" data-item_id="' + item.id + '" data-shop_price="' + item.shop_price + '">'
                                                + '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + item.id + '">'
                                                + (!!item.label_override ? item.label_override : itemApiData.name) + ' x' + item.quantity.toLocaleString() + ' (' + item.profit.toLocaleString() + ')'
                                                + '</div>';
                    }
                }
            } else if (!!data[taskSlug].desc) {
                newRowColor.innerHTML = data[taskSlug].desc;
            }
        } else {
            newRowAnchor.innerHTML = data[taskSlug].task;
        }

        tbody.appendChild(newRow);
        newRow.dataset.completed = taskState;
    }

    if (['asc', 'desc', 'alpha'].includes(customOrder)) {
        table.dataset.sort = customOrder;
        const tableRows = Array.from(tbody.querySelectorAll('tr'));
        tableRows.sort((a, b) => {
            if (customOrder == 'alpha') {
                return a.dataset.task.localeCompare(b.dataset.task)
            } else if (customOrder == 'asc') {
                return a.dataset.profit - b.dataset.profit;
            } else if (customOrder == 'desc') {
                return b.dataset.profit - a.dataset.profit;
            }
        });

        for (let sortedrow of tableRows) {
            tbody.appendChild(sortedrow);
        }
    }

    if (timeFrame == 'rs3dailyshops') {
        document.getElementById('rs3dailyshops_totalprofit').innerHTML = 'Total Profit: <strong>' + totalDailyProfit.toLocaleString() + '</strong><span class="coin">●</span>';
    }
};

/**
 * Calculates profits for array of items passed in
 * @param {*} outputArray array of objects to calc
 * @param {*} totalInputPrice inputs price to calc profit
 * @param {*} method default is sum, set to `max` as needed
 * @returns Object
 */
 const calcOutputs = function(outputArray, totalInputPrice, method='sum') {
    let returnObj = {
        buyItems: [],
        skipItems: [],
        totalItemProfit: 0,
        totalDailyProfit: 0
    };

    for (let item of outputArray) {
        let itemApiData = rsapidata[item.id];
        let itemPrice = String(itemApiData.price).endsWith('k')
            ? parseFloat(String(itemApiData.price).slice(0, -1).replace(/,/g, '')) * 1000
            : parseInt(String(itemApiData.price).replace(/\D/g, ''), 10);

        if (!!item.multiplier) {
            item.quantity *= item.multiplier;
        }

        let itemCost = totalInputPrice > 0 ? totalInputPrice : item.quantity * (item.shop_price ?? parseInt(String(rsapidata[item.id].price).replace(/\D/g, ''), 10));
        item.profit = (item.quantity * itemPrice) - itemCost;

        if (method == 'max') {
            if ((!!item.inputs)) {
                for (let inputkey in item.inputs) {
                    let inputItemData = rsapidata[inputkey];
                    item.profit = item.profit - Math.round(item.inputs[inputkey] * inputItemData.price);
                }
            }

            if (returnObj.buyItems.length > 0 && item.profit > returnObj.buyItems[0].profit) {
                returnObj.buyItems[0] = item;
            } else if (returnObj.buyItems.length == 0) {
                returnObj.buyItems.push(item);
            }
        } else {
            if (item.profit > 0) {
                returnObj.buyItems.push(item);
                returnObj.totalItemProfit += item.profit;
                returnObj.totalDailyProfit += item.profit;
            } else {
                returnObj.skipItems.push(item);
            }
        }
    }

    if (method == 'max') {
        returnObj.totalItemProfit += returnObj.buyItems[0].profit;
        returnObj.totalDailyProfit += returnObj.buyItems[0].profit;
    }

    return returnObj;
};

/**
 * Attach event listeners to table cells
 */
const tableEventListeners = function() {
    let rowsColor = document.querySelectorAll('td.activity_color');
    let rowsHide = document.querySelectorAll('td.activity_name button.hide-button');

    for (let colorCell of rowsColor) {
        colorCell.addEventListener('click', function () {
            let thisTimeframe = this.closest('table').dataset.timeframe;
            let thisRow = this.closest('tr');
            let taskSlug = thisRow.dataset.task;
            let newState = (thisRow.dataset.completed === 'true') ? 'false' : 'true'
            thisRow.dataset.completed = newState;

            if (newState === 'true') {
                storage.setItem(taskSlug, newState);
            } else {
                storage.removeItem(taskSlug);
            }

            storage.setItem(thisTimeframe + '-updated', new Date().getTime());
        });

        let descriptionAnchors = colorCell.querySelectorAll('a');
        for (let anchor of descriptionAnchors) {
            anchor.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }

    for (let rowHide of rowsHide) {
        rowHide.addEventListener('click', function() {
            let thisRow = this.closest('tr');
            let taskSlug = thisRow.dataset.task;
            thisRow.dataset.completed = 'hide';
            storage.setItem(taskSlug, 'hide');

            if (thisRow.hasAttribute('data-profit')) {
                let totalProfitElement = document.getElementById('rs3dailyshops_totalprofit');
                let totalProfitNumber = parseInt(String(totalProfitElement.innerHTML).replace(/\D/g, ''), 10);
                let newProfit = totalProfitNumber - parseInt(thisRow.dataset.profit);
                document.getElementById('rs3dailyshops_totalprofit').innerHTML = 'Total Profit: <strong>' + newProfit.toLocaleString() + '</strong><span class="coin">●</span>';
            }
        });
    }
};

/**
 * Handle clicking sort button for a table
 * @param {String} timeFrame
 */
 const sortButton = function(timeFrame) {
    const sortButton = document.getElementById(timeFrame + '_sort_button');
    sortButton.addEventListener('click', function(e) {
        const table = document.querySelector('#' + timeFrame + '_table');
        const tbody = table.querySelector('tbody');
        const tableRows = Array.from(tbody.querySelectorAll('tr'));
        let sortstate = table.dataset.sort;

        tableRows.sort((a, b) => {
            if (sortstate == 'alpha') {
                let data = Object.keys(window[timeFrame]);
                table.dataset.sort = 'default';
                storage.removeItem(timeFrame + '-order');
                return data.indexOf(a.dataset.task) - data.indexOf(b.dataset.task);
            } else if (sortstate == 'asc') {
                table.dataset.sort = 'alpha';
                storage.setItem(timeFrame + '-order', 'alpha');
                return a.dataset.task.localeCompare(b.dataset.task)
            } else if (sortstate == 'desc') {
                table.dataset.sort = 'asc';
                storage.setItem(timeFrame + '-order', 'asc');
                return a.dataset.profit - b.dataset.profit;
            } else {
                table.dataset.sort = 'desc';
                storage.setItem(timeFrame + '-order', 'desc');
                return b.dataset.profit - a.dataset.profit;
            }
        });

        for (let sortedrow of tableRows) {
            tbody.appendChild(sortedrow);
        }
    });
}

/**
 * Attach drag and drop functionality after elements added to DOM
 * @param {String} timeFrame
 */
const draggableTable = function(timeFrame) {

    const targetRows = document.querySelectorAll('#' + timeFrame + '_table tbody tr');

    for (let row of targetRows) {
        row.addEventListener('dragstart', function(e) {
            dragRow = e.target;
        });

        row.addEventListener('dragenter', function(e) {
            this.classList.add('dragover');
        });

        row.addEventListener('dragover', function(e) {
            e.preventDefault();

            //requery this in case rows reordered since load
            let rowArray = Array.from(document.querySelectorAll('#' + timeFrame + '_table tbody tr'));
            let dragOverRow = e.target.closest('tr');

            if (rowArray.indexOf(dragRow) < rowArray.indexOf(dragOverRow)) {
                dragOverRow.after(dragRow);
            } else {
                dragOverRow.before(dragRow);
            }
        });

        row.addEventListener('dragleave', function(e) {
            this.classList.remove('dragover');
        });

        row.addEventListener('dragend', function(e) {
            this.classList.remove('dragover');

            let clearRows = document.querySelectorAll('#' + timeFrame + '_table tbody tr');
            for (let clearRow of clearRows) {
                clearRow.classList.remove('dragover');
            }
        });

        row.addEventListener('drop', function(e) {
            e.stopPropagation();

            //save the order
            let csv = [];
            let rows = document.querySelectorAll('#' + timeFrame + '_table tbody tr');

            for (let row of rows) {
                csv.push(row.dataset.task);
            }

            storage.setItem(timeFrame + '-order', csv.join(','));

            return false;
        });
    }
};


/**
 * Takes a timeframe name and clear the associated localstorage and toggle the html data off
 * @param {String} timeFrame
 * @param {Boolean} html change the data on the element or not
 */
const resetTable = function(timeFrame, html) {
    const tableRows = document.querySelectorAll('#' + timeFrame + '_table tbody tr');

    for (let rowTarget of tableRows) {
        let taskSlug = rowTarget.dataset.task;
        let itemState = storage.getItem(taskSlug) ?? 'false';
        if (itemState != 'hide') {
            if (html) {
                rowTarget.dataset.completed = false;
            }

            storage.removeItem(taskSlug);
        }
    }

    storage.removeItem(timeFrame + '-updated');
};

/**
 * Attach event listener to button for resetting table
 * @param {String} timeFrame
 */
const resettableSection = function(timeFrame) {
    let data = window[timeFrame];
    let resetButton = document.querySelector('#' + timeFrame + '_reset_button');
    resetButton.addEventListener('click', function () {
        resetTable(timeFrame, false);

        for (let taskSlug in data) {
            let itemState = storage.getItem(taskSlug) ?? 'false';

            if (itemState == 'hide') {
                storage.removeItem(taskSlug);
            }
        }

        storage.removeItem(timeFrame + '-order');
        window.location.reload();
    });
};

/**
 * Attach event listener for hiding/unhiding table
 * @param {String} timeFrame
 */
const hidableSection = function(timeFrame) {
    let hideButton = document.querySelector('#' + timeFrame + '_hide_button');
    hideButton.addEventListener('click', function () {
        console.log(timeFrame);
        let hideTable = document.querySelector('div.' + timeFrame + '_table');
        hideTable.dataset.hide = 'hide';
        storage.setItem(timeFrame + '-hide', 'hide');
    });

    let navLink = document.querySelector('#' + timeFrame + '_nav');
    navLink.addEventListener('click', function() {
        let hideTable = document.querySelector('div.' + timeFrame + '_table');
        hideTable.dataset.hide = '';
        storage.removeItem(timeFrame + '-hide');
    });

    let unhideButton = document.querySelector('#' + timeFrame + '_unhide_button');
    unhideButton.addEventListener('click', function() {
        let hideTable = document.querySelector('div.' + timeFrame + '_table');
        hideTable.dataset.hide = '';
        storage.removeItem(timeFrame + '-hide');
    });
};

/**
 * Check if last updated timestamp for a timeframe is less than
 * the last reset for that timeframe if so reset the category
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
        resetTable(timeFrame, true);
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

const itemStatsTooltip = function() {
    let items = document.querySelectorAll('div.item_output');
    let tooltip = document.getElementById('tooltip');

    for (let item of items) {
        item.addEventListener('mouseover', function(e) {
            e.preventDefault();
            let itemdata = rsapidata[this.dataset.item_id];

            item.after(tooltip);

            tooltip.innerHTML = '<img src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + this.dataset.item_id + '" class="item_icon"> ' + itemdata.name + '<br>'
                                + 'GE: ' + itemdata.price.toLocaleString() + '<span class="coin">●</span>' + (parseInt(this.dataset.shop_price) > 0 ? ' Shop: ' + parseInt(this.dataset.shop_price).toLocaleString() + '<span class="coin">●</span>' : '');

            if (!!this.dataset.inputs) {
                tooltip.innerHTML += '<br><strong>Inputs</strong>:<br>';

                let inputItems = JSON.parse(decodeURIComponent(this.dataset.inputs));

                for (let itemkey in inputItems) {
                    let inputItemData = rsapidata[itemkey];
                    tooltip.innerHTML += ' <img src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + itemkey + '" class="item_icon"> ' + inputItemData.name + ' x' + inputItems[itemkey] + ' (-' + parseInt(inputItemData.price * inputItems[itemkey]).toLocaleString() + ')<br>';
                }

            }

            tooltip.style.display = 'block';
            tooltip.style.visibility = 'visible';
        });

        item.addEventListener('mouseout', function(e) {
            tooltip.style.display = 'none';
            tooltip.style.visibility = 'hidden';
        });
    }
}

/**
 * Make bootstrap 5 dropdown menus collapse after link is clicked
 * old method of adding `data-toggle="collapse" data-target=".navbar-collapse.show"` to the <li>s was preventing navigation by the same element
 */
const dropdownMenuHelper = function() {
    const navLinks = document.querySelectorAll('.nav-item:not(.dropdown), .dropdown-item');
    const menuToggle = document.getElementById('navbarSupportedContent');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});

    navLinks.forEach( function(l) {
        l.addEventListener('click', function() {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });
};

window.onload = function() {
    const timeframes = ['rs3daily', 'rs3dailyshops', 'rs3weekly', 'rs3monthly'];

    for (const timeFrame of timeframes) {
        populateTable(timeFrame);
        draggableTable(timeFrame);
        checkReset(timeFrame);
        resettableSection(timeFrame);
        hidableSection(timeFrame);
        countDown(timeFrame);
    }

    dropdownMenuHelper();
    tableEventListeners();
    sortButton('rs3dailyshops');
    itemStatsTooltip();

    setInterval(function() {
        for (const timeFrame of timeframes) {
            checkReset(timeFrame);
            countDown(timeFrame);
        }
    }, 1000);
};
