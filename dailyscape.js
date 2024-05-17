const storage = window.localStorage;

const timeframes = ['rs3daily', 'rs3dailyshops', 'rs3weekly', 'rs3monthly'];
var currentProfile = 'default';
var currentLayout = 'default';
var profilePrefix = '';
var dragRow; //global for currently dragged row
var totalDailyProfit = 0; //global for total daily profit, maybe move this

var rs3daily = {
    "treasure-hunter-keys": {task: "Treasure Hunter Keys", url: "https://runescape.wiki/w/Treasure_Hunter", short: true, desc: "Use 2 free daily keys"},
    "traveling-merchant": {task: "Traveling Merchant", url: "https://runescape.wiki/w/Travelling_Merchant%27s_Shop", short: true, desc: "Buy rare items in deep sea fishing hub ('WhirlPoolDnD' FC)<span id=\"traveling-merchant-stock\"></span>"},
    "daily-challenge": {task: "Daily Challenge", url: "https://runescape.wiki/w/Challenge_System", short: true, desc: "Get xp, treasure hunter key x3"},
    "jack-of-trades": {task: "Jack of Trades", url: "https://runescape.wiki/w/Jack_of_trades_aura/Routines", short: true, desc: "Get xp in a range of skills to get an xp book"},
    "soul-reaper": {task: "Soul Reaper", url: "https://runescape.wiki/w/Soul_Reaper", desc: "Kill assigned bosses"},
    "player-owned-ports": {task: "Player Owned Ports", url: "https://runescape.wiki/w/Player-owned_port", short: true, desc: "Manage your player owned port<br>Buy resources from <a href=\"https://runescape.wiki/w/The_Black_Marketeer\" target=\"_blank\" rel=\"noreferrer noopener\">Black Marketeer</a>"},
    "player-owned-farm": {task: "Player Owned Farm", url: "https://runescape.wiki/w/Player-owned_farm", short: true, desc: "Manage your player owned farm"},
    "crystal-tree-blossom": {task: "Crystal Tree Blossom", url: "https://runescape.wiki/w/Crystal_tree_blossom", short: true, desc: "Collect crystal tree blossom for perfect plus potions"},
    "invention-machine": {task: "Invention Machine", url: "https://runescape.wiki/w/Machines", short: true, desc: "Fill and collect from invention machines"},
    "motherlode-maw": {task: "Motherlode Maw", url: "https://runescape.wiki/w/Motherlode_Maw", short: true, desc: "Receive treasure from motherlode maw.<br>Turn in 10 <a href=\"https://runescape.wiki/w/Crystal_motherlode_shard\" target=\"_blank\" rel=\"noreferrer noopener\">motherlode shards</a> to Wythien"},
    "gorajo-card": {task: "Gorajo Card", url: "https://runescape.wiki/w/Gorajo_card", short: true, desc: "Consistent yak card gives a guaranteed Meilyr combination potion recipe"},
    "divine-locations": {task: "Divine Locations", url: "https://runescape.wiki/w/Divine_location", short: true, desc: "Gather resources from divine locations<br>Divine Yews best xp"},
    "archaeology-research": {task: "Archaeology Research", url: "https://runescape.wiki/w/Research", short: true, desc: "Use Chronotes to send out research teams for Arch XP and resources"},
    "wilderness-warbands": {task: "Wilderness Warbands", url: "https://runescape.wiki/w/Wilderness_Warbands", short: true, desc: "Every 7 hours. Defeat invaders in the wilderness for xp or gp"},
    "nemi-forest": {task: "Nemi Forest", url: "https://runescape.wiki/w/Nemi_Forest", desc: "'NemiForest' FC. See also <a href=\"https://www.reddit.com/r/NemiForest/new/\" target=\"_blank\" rel=\"noreferrer noopener\">Daily Maps</a>"},
    "guthixian-cache": {task: "Guthixian Cache", url: "https://runescape.wiki/w/Guthixian_Cache", desc: "Divination D&D"},
    "sinkholes": {task: "Sinkholes", url: "https://runescape.wiki/w/Sinkholes", desc: "Dungeoneering XP lamps and tokens, 2x a day"},
    "goebie-bands": {task: "Goebie Bands", url: "https://runescape.wiki/w/Supply_run", desc: "Supply Run"},
    "menaphos-obelisk": {task: "Menaphos Obelisk/Scarabs", url: "https://runescape.wiki/w/Soul_obelisk_(Menaphos)", desc: "'SoulObby' FC. Gain Menaphos reputation, also from <a href=\"https://runescape.wiki/w/Corrupted_Scarab_(Menaphos)\" target=\"_blank\" rel=\"noreferrer noopener\">corrupted scarabs</a>"},
    "big-chinchompa": {task: "Big Chinchompa", url: "https://runescape.wiki/w/Big_Chinchompa", desc: "Private hunting instances and hunter xp"},
    "phoenix": {task: "Phoenix", url: "https://runescape.wiki/w/Phoenix_Lair", desc: "Baby phoenix pet"},
    "liberation-of-mazcab": {task: "Liberation of Mazcab", url: "https://runescape.wiki/w/Liberation_of_Mazcab", desc: "Every 2 Days 'Raid FC' FC"},
    "fish-flingers": {task: "Fish Flingers", url: "http://runescape.wiki/w/Fish_Flingers", desc: "2 entry tickets a day from fisherman"},
    "evil-tree": {task: "Evil Tree", url: "http://runescape.wiki/w/Evil_Tree", desc: "Woodcutting, firemaking and farming xp and woodcutting buff. 2x a day"},
    "shooting-star": {task: "Shooting Star", url: "http://runescape.wiki/w/Shooting_Star", desc: "Mining XP and double ore mining buff"},
    "bork": {task: "Bork", url: "http://runescape.wiki/w/Bork", desc: "Slayer XP and summoning charms"},
    "serenity-post": {task: "Serenity Posts", url: "https://runescape.wiki/w/Serenity_posts", desc: "20K agility XP, match poses to complete in 10ish minutes"},
    "fixate": {task: "Fixate Charges", url: "https://runescape.wiki/w/Fixate", desc: "Use x3 fixate charges for guaranteed artefacts e.g. <a href=\"https://runescape.wiki/w/Red_Rum_Relics_III\" target=\"_blank\" rel=\"noreferrer noopener\">Red Rum Relics III</a>"},
    "arc-contracts": {task: "Arc Contracts", url: "https://runescape.wiki/w/Contract", desc: "Complete up to 7 contracts in the Arc for chimes and xp<br>Deplete claimed island"},
    "rapid-growth": {task: "Rapid Growth", url: "https://runescape.wiki/w/Rapid_Growth", desc: "Make plants grow faster up to 2x a day",
        inputs: [
            {id: 555, quantity: 3, shop_price: 0}, //water rune
            {id: 557, quantity: 3, shop_price: 0}, //earth rune
            {id: 561, quantity: 3, shop_price: 0}, //nature rune
            {id: 566, quantity: 3, shop_price: 0}, //soul rune
        ]
    },
    "runesphere": {task: "Runesphere", url: "https://runescape.wiki/w/Runesphere", desc: "Hand in up to 1k rune dust for 25k xp"},
    "book-of-char": {task: "Book of Char", url: "https://runescape.wiki/w/The_Book_of_Char", desc: "Drop logs on the ground and use book for fast firemaking xp"},
    "premier-xp": {task: "Premier XP boost", url: "https://runescape.wiki/w/Premier_artefact", desc: "10% bonus XP for an hour"},
    "premier-porter": {task: "Premier Porter", url: "https://runescape.wiki/w/Premier_artefact", desc: "50% chance to act as a porter for an hour"},
    "premier-aura": {task: "Premier Aura Reset", url: "https://runescape.wiki/w/Premier_artefact", desc: "Reset one aura once per day"},
    "premier-slayer": {task: "Premier Slayer Aura", url: "https://runescape.wiki/w/Premier_artefact", desc: "20% hit chance on enemies < 15% health, 10% chance to not decrease slayer kill count"},
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
    "vis-wax": {task: "Vis wax", url: "https://runescape.wiki/w/Rune_Goldberg_Machine", short: true, desc: "Profit from shop price and avg of combinations<br>See <a href=\"https://runescape.wiki/w/Calculator:Vis_wax\" target=\"_blank\" rel=\"noreferrer noopener\">Calculator:Vis wax</a>",
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
    "bloodwood-tree": {task: "Bak Bolts", url: "https://runescape.wiki/w/Money_making_guide/Fletching_bakriminel_bolts", desc: "Fletch bakriminel bolts. Every 6H",
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
                {id: 554, quantity: 500, shop_price: 0}, //fire rune
                {id: 555, quantity: 500, shop_price: 0}, //water rune
                {id: 556, quantity: 500, shop_price: 0}, //air rune
                {id: 557, quantity: 500, shop_price: 0}, //earth rune
                {id: 558, quantity: 500, shop_price: 0}, //mind rune
                {id: 559, quantity: 500, shop_price: 0}, //body rune
                {id: 560, quantity: 25, shop_price: 0}, //death rune
                {id: 561, quantity: 25, shop_price: 0}, //nature rune
                {id: 562, quantity: 25, shop_price: 0}, //chaos rune
                {id: 563, quantity: 25, shop_price: 0}, //law rune
                {id: 564, quantity: 25, shop_price: 0}, //cosmic rune
                {id: 565, quantity: 25, shop_price: 0}, //blood rune
                {id: 566, quantity: 25, shop_price: 0}, //soul rune
                {id: 9075, quantity: 25, shop_price: 0}, //astral rune
            ],
            [   // Craft from pure essence
                {id: 554, quantity: 750, shop_price: 0}, //fire rune
                {id: 555, quantity: 1400, shop_price: 0}, //water rune
                {id: 556, quantity: 1800, shop_price: 0}, //air rune
                {id: 557, quantity: 900, shop_price: 0}, //earth rune
                {id: 558, quantity: 1200, shop_price: 0}, //mind rune
                {id: 559, quantity: 450, shop_price: 0}, //body rune
                {id: 560, quantity: 150, shop_price: 0}, //death rune
                {id: 561, quantity: 300, shop_price: 0}, //nature rune
                {id: 562, quantity: 300, shop_price: 0}, //chaos rune
                {id: 563, quantity: 150, shop_price: 0}, //law rune
                {id: 564, quantity: 300, shop_price: 0}, //cosmic rune
                {id: 565, quantity: 150, shop_price: 0}, //blood rune
                {id: 566, quantity: 30, shop_price: 0}, //soul rune
                {id: 9075, quantity: 350, shop_price: 0}, //astral rune
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
    "seaweed-and-pineapples": {task: "Seaweed and Pineapples", url: "https://runescape.wiki/w/Money_making_guide/Buying_seaweed_and_pineapples_from_Arhein", short: true,
        outputs: [
            {id: 401, quantity: 80, shop_price: 2}, //seaweed
            {id: 2114, quantity: 40, shop_price: 2}, //pineapples
        ]
    },
    "bert-sand": {task: "Sand from Bert", url: "https://runescape.wiki/w/Bert", short: true,
        outputs: [
            {id: 1783, quantity: 120, shop_price: 0}, //bucket of sand
        ]
    },
    "oldman-potato-cactus": {task: "Potato Cactus from Weird Old Man", url: "https://runescape.wiki/w/Weird_Old_Man", short: true,
        outputs: [
            {id: 3138, quantity: 40, shop_price: 0}, //potato cactus
        ]
    },
    "razmire-planks": {task: "Planks from Razmire", url: "https://runescape.wiki/w/Razmire_Keelgan", desc: "30 noted planks, other items at this shop might not sell quickly", short: true,
        outputs: [
            {id: 960, quantity: 30, shop_price: 0}, //plank
        ]
    },
    "geoffrey-flax": {task: "Flax from Geoffrey", url: "https://runescape.wiki/w/Geoffrey", short: true,
        outputs: [
            {id: 1779, quantity: 200, shop_price: 0}, //flax
        ]
    },
    "dellmonti-pineapples": {task: "Pineapples and Apples from Dell Monti", url: "https://runescape.wiki/w/Dell_Monti", short: true,
        outputs: [
            {id: 2114, quantity: 40, shop_price: 0}, //pineapples
            {id: 1955, quantity: 40, shop_price: 0}, //cooking apples
        ]
    },
    "cromperty-pure-essence": {task: "Pure Essence from Wizard Cromperty", url: "https://runescape.wiki/w/Wizard_Cromperty", short: true,
        outputs: [
            {id: 7936, quantity: 150, shop_price: 0}, //pure essence
        ]
    },
    "coeden-logs": {task: "Logs from Coeden", url: "https://runescape.wiki/w/Coeden", desc: "Average of combinations you could receive", short: true,
        outputs: [
            {id: 29556, quantity: 10, shop_price: 0}, //elder logs
            {id: 1513, quantity: 9.142857143, shop_price: 0}, //magic logs
            {id: 1515, quantity: 8.857142857, shop_price: 0}, //yew logs
        ]
    },
    "modified-skilling-helms": {task: "Modified Skilling Helms", url: "http://runescape.wiki/w/Category:Modified_skill_helms", desc: "Collect resources from upgraded skilling outfit helms", short: true,
        outputs: [
            {id: 1761, quantity: 35, shop_price: 0, label_override: "Soft clay from Artisan's bandana"}, //soft clay
            {id: 453, quantity: 50, shop_price: 0, label_override: "Coal from Blacksmith's helmet"}, //coal
            {id: 227, quantity: 200, shop_price: 0, label_override: "Vials of Water from Botanist's mask"}, //vial of water
            {id: 29293, quantity: 3, shop_price: 0, label_override: "Chronical fragments from Diviner's headwear"}, //chronicle fragment
            {id: 7413, quantity: 2, shop_price: 0, label_override: "Bird's nests from Master farmer's hat"}, //bird's nest
            {id: 453, quantity: 3, shop_price: 0, label_override: "Dragon bones from First age tiara"}, //dragon bones
            {id: 12183, quantity: 500, shop_price: 0, label_override: "Spirit shards from Shaman's headdress"}, //spirit shard
            {id: 2315, quantity: 10, shop_price: 0, label_override: "Pie shells from Sous chef's toque"}, //pie shells
        ]
    },
};

var rs3weekly = {
    "thalmunds-wares": {task: "Thalmund's Wares", url: "https://runescape.wiki/w/Thalmund%27s_Wares", desc: "Merchant in City of Um"},
    "capping-clan-citadel": {task: "Capping Clan Citadel", url: "https://runescape.wiki/w/Clan_Citadel", desc: "Get skill xp, set xp bonus, make clan happy"},
    "charge-anachronia-totems": {task: "Charge Anachronia Totems", url: "https://runescape.wiki/w/Totem", desc: "Recharge totems weekly and optionally swap out"},
    "meg": {task: "Meg", url: "https://runescape.wiki/w/Meg#Meg's_questions", short: true, desc: "XP lamp and coins"},
    "tears-of-guthix": {task: "Tears of Guthix", url: "https://runescape.wiki/w/Tears_of_Guthix", short: true, desc: "Gain xp for lowest level skill"},
    "herby-werby": {task: "Herby Werby", url: "https://runescape.wiki/w/Herby_Werby", desc: "Herb bag and Totem pieces"},
    "big-top-bonanza": {task: "Big Top Bonanza", url: "https://runescape.wiki/w/Balthazar_Beauregard%27s_Big_Top_Bonanza", short: true, desc: "Do circus tricks for xp"},
    "penguin-hide-and-seek": {task: "Penguin Hide and Seek", url: "http://2016.world60pengs.com/", desc: "Find penguins, get xp lamps"},
    "wisps-of-the-grove": {task: "Wisps of the Grove", url: "https://runescape.wiki/w/Wisps_of_the_Grove", desc: "Farming & Hunting XP, Vinny pet"},
    "shattered-worlds": {task: "Shattered Worlds", url: "https://runescape.wiki/w/Shattered_Worlds", desc: "Complete weekly challenges for additional <a href=\"https://runescape.wiki/w/Shattered_Worlds/Rewards\" target=\"_blank\" rel=\"noreferrer noopener\">shattered anima</a>"},
    "familiarisation": {task: "Familiarisation", url: "https://runescape.wiki/w/Familiarisation", desc: "Summoning outfit"},
    "skeletal-horror": {task: "Skeletal horror", url: "https://runescape.wiki/w/Skeletal_horror", desc: "Kill it for an elite or master clue scroll"},
    "aquarium-treasure-chest": {task: "Aquarium Treasure Chest", url: "https://runescape.wiki/w/Treasure_chest_decoration", desc: "Get an elite or master clue scroll"},
    "agoroth": {task: "Agoroth", url: "http://runescape.wiki/w/Agoroth", desc: "2x a week. Black pearl is equivalent to a medium prismatic fallen star's bxp"},
    "broken-home": {task: "Replay Broken Home", url: "http://runescape.wiki/w/Broken_Home/Quick_guide", desc: "No death speed run < 37 minutes, max 1 food for a huge xp lamp"},
    "rush-of-blood": {task: "Rush Of Blood", url: "http://runescape.wiki/w/Rush_of_Blood", desc: "Slayer XP and titles"},
    "water-filtration": {task: "Water Filtration", url:"https://runescape.wiki/w/Water_filtration_system", desc: "Clean out water filtration system at Het's oasis for troves, golden roses etc"},
    "miscellania-weekly": {task: "Miscellania", url: "https://runescape.wiki/w/Calculator:Other/Miscellania", short: true, desc: "Check approval rating and funds in coffer"},
    "invention-machine-weekly": {task: "Invention Machine", url: "https://runescape.wiki/w/Machines", short: true, desc: "Fill and collect from invention machines"},
    "arc-supplies": {task: "Arc Supplies Crate", url: "https://runescape.wiki/w/Rosie_(supplies)", desc: "Get free supplies from Rosie's crate for Arc voyages"},
    "dream-of-iaia-resource": {task: "Dream of Iaia Resources", url: "https://runescape.wiki/w/Dream_of_Iaia", desc: "Convert resources to skilling stations at a rate of 2 resource to 1 xp"},
    "gwd2-bounties": {task: "GWD2 Bounties", url: "https://runescape.wiki/w/Feng,_the_Bounty_Master", desc: "Up to 5 bounties can be stored for GWD2 reputation"},
    "dnd-of-the-week": {task: "D&amp;D of the Week", url: "https://runescape.wiki/w/Distractions_and_Diversions#D&D_of_the_week", desc:"Participate for a TH key token:<span id=\"dnd-of-the-week\"></span>"},
    "fort-forinthry-bonus-xp": {task: "Fort Forinthry Bonus XP", url: "https://runescape.wiki/w/Town_Hall_(Fort_Forinthry)", desc:"Receive up to 15 small stars worth of bonus xp"},
};

var rs3monthly = {
    "solomon-s-store": {task: "Solomon's Store", url: "https://secure.runescape.com/m=mtxn_rs_shop/index?jptg=ia&jptv=sgs_page#category/FreeItem", short: true, desc: "Free cosmetics, check loyalty points and sales"},
    "premier-club-vault": {task: "Premier Club Vault", url: "https://runescape.wiki/w/Premier_Club_Vault", short: true, desc: "Get free lamps/stars/proteans. Open colossal chest last 5 seconds. Try to do during <a href=\"https://runescape.wiki/w/Prismania\" target=\"_blank\" rel=\"noreferrer noopener\">Prismania</a>"},
    "giant-oyster": {task: "Giant Oyster", url: "https://runescape.wiki/w/Giant_Oyster", short: true, desc: "Fishing & Farming XP and a free treasure trails chest"},
    "god-statues": {task: "God Statues", url: "https://runescape.wiki/w/God_Statues", desc: "Up to 177k construction and 88k prayer or slayer xp"},
    "effigy-incubator": {task: "Effigy Incubator", url: "https://runescape.wiki/w/Effigy_Incubator", desc: "Get 10+ effigies"},
    "troll-invasion": {task: "Troll Invasion", url: "https://runescape.wiki/w/Troll_Invasion", desc: "Defend all waves for up to 77k xp book and a treasure hunter key"},
    "dream-of-iaia-xp": {task: "Dream of Iaia XP", url: "https://runescape.wiki/w/Dream_of_Iaia", desc: "Use up stored xp in skilling stations"},
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
    let hideTable = storage.getItem(profilePrefix + timeFrame + '-hide') ?? 'false';
    if (hideTable == 'hide') {
        document.querySelector('div.' + timeFrame + '_table').dataset.hide = 'hide';
    }

    //User defined sorting
    let customOrder = storage.getItem(profilePrefix + timeFrame + '-order') ?? 'false';
    if (customOrder !== 'false' && !['asc', 'desc', 'alpha', 'default'].includes(customOrder)) {
        let sortArray = customOrder.split(',');

        data = Object.keys(data).sort(function(a, b) {
            let indexA = sortArray.indexOf(a);
            let indexB = sortArray.indexOf(b);

            if (indexA == -1 && indexB == -1) {
                return 0;
            } else if (indexA == -1) {
                return 1;
            } else if (indexB == -1) {
                return -1
            } else {
                return indexA - indexB;
            }
        }).reduce(
            (obj, key) => {
                obj[key] = data[key];
                return obj;
            },
            {}
        );
    }

    //loop through tasks in timeframe
    for (let taskSlug in data) {
        let rowClone = sampleRow.content.cloneNode(true);
        let newRow = rowClone.querySelector('tr');
        let newRowAnchor = rowClone.querySelector('td.activity_name a');
        let newRowColor = rowClone.querySelector('td.activity_color .activity_desc');

        let taskState = storage.getItem(profilePrefix + taskSlug) ?? 'false';

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


                let profitSpan = newRowColor.parentNode.insertBefore(document.createElement('span'), newRowColor);
                profitSpan.classList.add('item_profit');
                profitSpan.innerHTML = '<span class="item_profit_label">Profit: </span><strong>' + totalItemProfit.toLocaleString() + '</strong><span class="coin">●</span>';
                if (!!data[taskSlug].desc) {
                    newRowColor.innerHTML += '<br>' + data[taskSlug].desc;
                }

                for (let item of buyItems) {
                    let itemApiData = rsapidata[item.id];
                    let itemInputData = !!item.inputs ? ' data-inputs="' + encodeURIComponent(JSON.stringify(item.inputs)) + '"' : '';

                    newRowColor.innerHTML += '<div class="item_output" data-item_id="' + item.id + '" data-shop_price="' + item.shop_price + '"' + itemInputData + '>'
                                            + '<img class="item_icon" src="/rsdata/images/' + item.id + '.gif">'
                                            + (!!item.label_override ? item.label_override : itemApiData.name) + ' x' + item.quantity.toLocaleString() + ' (' + item.profit.toLocaleString() + ')'
                                            + '</div>';
                }

                if (skipItems.length > 0) {
                    newRowColor.innerHTML += '<br>Skip:<br>'
                    for (let item of skipItems) {
                        let itemApiData = rsapidata[item.id];
                        newRowColor.innerHTML += '<div class="item_output" data-item_id="' + item.id + '" data-shop_price="' + item.shop_price + '">'
                                                + '<img class="item_icon" src="/rsdata/images/' + item.id + '.gif">'
                                                + (!!item.label_override ? item.label_override : itemApiData.name) + ' x' + item.quantity.toLocaleString() + ' (' + item.profit.toLocaleString() + ')'
                                                + '</div>';
                    }
                }
            } else if (!!data[taskSlug].inputs) {
                //entries with only inputs and no outputs for display purposes
                newRowColor.innerHTML = data[taskSlug].desc;
                for (let item of data[taskSlug].inputs) {
                    let itemApiData = rsapidata[item.id];
                    let itemInputData = !!item.inputs ? ' data-inputs="' + encodeURIComponent(JSON.stringify(item.inputs)) + '"' : '';

                    newRowColor.innerHTML += '<div class="item_output" data-item_id="' + item.id + '" data-shop_price="' + item.shop_price + '"' + itemInputData + '>'
                                            + '<img class="item_icon" src="/rsdata/images/' + item.id + '.gif">'
                                            + (!!item.label_override ? item.label_override : itemApiData.name) + ' x' + item.quantity.toLocaleString()
                                            + '</div>';
                }

            } else if (!!data[taskSlug].desc) {
                //@todo lazy hack for getting warbands timer to display for compact mode
                if (taskSlug == 'wilderness-warbands') {
                    let profitSpan = newRowColor.parentNode.insertBefore(document.createElement('span'), newRowColor);
                    profitSpan.classList.add('item_profit');
                    profitSpan.innerHTML = '<span class="item_profit_label">Next Warbands: </span><span id=\"warbands-countdown\"></span>';
                    newRowColor.innerHTML = '<br>' + data[taskSlug].desc;
                } else {
                    newRowColor.innerHTML = data[taskSlug].desc;
                }
            }
        } else {
            newRowAnchor.innerHTML = data[taskSlug].task;
        }

        tbody.appendChild(newRow);
        newRow.dataset.completed = taskState;
    }

    //@todo kludgy double dom manipulation because depends on profit calcs in the html
    if (['asc', 'desc', 'alpha'].includes(customOrder)) {
        table.dataset.sort = customOrder;
        let tableRows = Array.from(tbody.querySelectorAll('tr'));
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

    let tableRows = Array.from(tbody.querySelectorAll('tr'));
    for (let row of tableRows) {
        if (row.dataset.completed == 'hide') {
            tbody.appendChild(row);
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
        let itemApiData = rsapidata[item.id] ?? {price: 0}

        let itemPrice = String(itemApiData.price).endsWith('k')
            ? parseFloat(String(itemApiData.price).slice(0, -1).replace(/,/g, '')) * 1000
            : parseInt(String(itemApiData.price).replace(/\D/g, ''), 10);

        if (!!item.multiplier) {
            item.quantity *= item.multiplier;
        }

        let itemCost = totalInputPrice > 0 ? totalInputPrice : item.quantity * (item.shop_price ?? parseInt(String(rsapidata[item.id].price).replace(/\D/g, ''), 10));
        item.profit = Math.round((item.quantity * itemPrice) - itemCost);

        if (method == 'max') {
            if ((!!item.inputs)) {
                for (let inputkey in item.inputs) {
                    let inputItemData = rsapidata[inputkey];
                    item.profit = Math.round(item.profit - Math.round(item.inputs[inputkey] * inputItemData.price));
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
                storage.setItem(profilePrefix + taskSlug, newState);
            } else {
                storage.removeItem(profilePrefix + taskSlug);
            }

            storage.setItem(profilePrefix + thisTimeframe + '-updated', new Date().getTime());
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
            let thisTbody = this.closest('tbody');
            let thisRow = this.closest('tr');
            let taskSlug = thisRow.dataset.task;
            thisRow.dataset.completed = 'hide';
            storage.setItem(profilePrefix + taskSlug, 'hide');

            if (thisRow.hasAttribute('data-profit')) {
                let totalProfitElement = document.getElementById('rs3dailyshops_totalprofit');
                let totalProfitNumber = parseInt(String(totalProfitElement.innerHTML).replace(/\D/g, ''), 10);
                let newProfit = totalProfitNumber - parseInt(thisRow.dataset.profit);
                document.getElementById('rs3dailyshops_totalprofit').innerHTML = 'Total Profit: <strong>' + newProfit.toLocaleString() + '</strong><span class="coin">●</span>';
            }

            thisTbody.appendChild(thisRow);
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
                storage.removeItem(profilePrefix + timeFrame + '-order');
                return data.indexOf(a.dataset.task) - data.indexOf(b.dataset.task);
            } else if (sortstate == 'asc') {
                table.dataset.sort = 'alpha';
                storage.setItem(profilePrefix + timeFrame + '-order', 'alpha');
                return a.querySelector('td a').innerHTML.localeCompare(b.querySelector('td a').innerHTML);
            } else if (sortstate == 'desc') {
                table.dataset.sort = 'asc';
                storage.setItem(profilePrefix + timeFrame + '-order', 'asc');
                return a.dataset.profit - b.dataset.profit;
            } else {
                table.dataset.sort = 'desc';
                storage.setItem(profilePrefix + timeFrame + '-order', 'desc');
                return b.dataset.profit - a.dataset.profit;
            }
        });

        for (let sortedrow of tableRows) {
            tbody.appendChild(sortedrow);
        }
    });
};

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

            storage.setItem(profilePrefix + timeFrame + '-order', csv.join(','));

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
        let itemState = storage.getItem(profilePrefix + rowTarget.dataset.task) ?? 'false';
        if (itemState != 'hide') {
            if (html) {
                rowTarget.dataset.completed = false;
            }

            storage.removeItem(profilePrefix + rowTarget.dataset.task);
        }
    }

    storage.removeItem(profilePrefix + timeFrame + '-updated');
};

/**
 * Attach event listener to button for resetting table
 * @param {String} timeFrame
 */
const resettableSection = function(timeFrame) {
    let data = window[timeFrame];
    let resetButton = document.querySelector('#' + timeFrame + '_reset_button');
    resetButton.addEventListener('click', function () {
        // resetTable(timeFrame, false);

        let unhideTable = document.querySelector('div.' + timeFrame + '_table');
        unhideTable.dataset.hide = '';
        storage.removeItem(profilePrefix + timeFrame + '-hide');

        for (let taskSlug in data) {
            let itemState = storage.getItem(profilePrefix + taskSlug) ?? 'false';

            if (itemState == 'hide') {
                storage.removeItem(profilePrefix + taskSlug);
            }
        }

        storage.removeItem(profilePrefix + timeFrame + '-order');
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
        let hideTable = document.querySelector('div.' + timeFrame + '_table');
        hideTable.dataset.hide = 'hide';
        storage.setItem(profilePrefix + timeFrame + '-hide', 'hide');
    });

    let unhideTable = function () {
        let hideTable = document.querySelector('div.' + timeFrame + '_table');
        hideTable.dataset.hide = '';
        storage.removeItem(profilePrefix + timeFrame + '-hide');
    };

    let navLink = document.querySelector('#' + timeFrame + '_nav');
    navLink.addEventListener('click', unhideTable);

    let unhideButton = document.querySelector('#' + timeFrame + '_unhide_button');
    unhideButton.addEventListener('click', unhideTable);
};

/**
 * Check if last updated timestamp for a timeframe is less than
 * the last reset for that timeframe if so reset the category
 * @param {String} timeFrame
 * @returns
 */
const checkReset = function(timeFrame) {
    let tableUpdateTime = storage.getItem(profilePrefix + timeFrame + '-updated') ?? 'false';

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

    if (timeFrame == 'rs3weekly') {
        let resetday = 3;
        nextdate.setUTCHours(24);
        nextdate.setUTCMinutes(0);
        nextdate.setUTCSeconds(0);
        let weekmodifier = (7 + resetday - nextdate.getUTCDay() ) % 7;
        nextdate.setUTCDate(nextdate.getUTCDate() + weekmodifier);
    } else if (timeFrame == 'rs3monthly') {
        nextdate.setUTCHours(0);
        nextdate.setUTCMinutes(0);
        nextdate.setUTCSeconds(0);
        nextdate.setUTCMonth(nextdate.getUTCMonth() + 1);
        nextdate.setUTCDate(1);
    } else {
        nextdate.setUTCHours(24);
        nextdate.setUTCMinutes(0);
        nextdate.setUTCSeconds(0);
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

/**
 * Starts at Thursday 0 UTC +7 hours each interval
 * @see https://runescape.wiki/w/Wilderness_Warbands#Timing
 */
const warbandsCounter = function() {
    let warbandsData = storage.getItem(profilePrefix + 'wilderness-warbands') ?? 'false';

    if (warbandsData !== 'hide') {

        let nowtime = new Date();
        var daysAfterLastThursday = (-7 + 4) - nowtime.getUTCDay();

        let lastThursday = new Date();
        lastThursday.setUTCDate(nowtime.getUTCDate() + daysAfterLastThursday);
        lastThursday.setUTCHours(0);
        lastThursday.setUTCMinutes(0);
        lastThursday.setUTCSeconds(0);

        let elapsedTime = (nowtime.getTime() - lastThursday.getTime()) / 1000 / 60 / 60;
        let elapsedIntervals = Math.floor(elapsedTime / 7);

        //get time of number of intervals + 1
        let nextWarbands = new Date();
        nextWarbands.setTime(lastThursday.getTime() + (elapsedIntervals + 1) * 7 * 60 * 60 * 1000);
        let remainingtime = (nextWarbands.getTime() - nowtime.getTime()) / 1000;

        //countdown with the diff
        let timeparts = [
            Math.floor(remainingtime / 86400), //d
            Math.floor(remainingtime % 86400 / 3600), //h
            Math.floor(remainingtime % 3600 / 60), //m
            Math.floor(remainingtime % 60) //s
        ];

        document.getElementById('warbands-countdown').innerHTML = (timeparts[0] > 0 ? (timeparts[0] + 'd ') : '') + (timeparts[1] > 0 ? (timeparts[1] + 'h ') : '') + timeparts[2] + 'm ' + timeparts[3] + 's';
    }
};

/**
 * Determine current merchant stock and output to specific element
 * @see https://runescape.wiki/w/Module:Rotations/Merchant
 */
 const merchantStock = function() {
    var merchantitems = {
        42274: {name: "Uncharted island map", shop_price: 800000},

        34918: {name: "Advanced pulse core", shop_price: 800000},
        36918: {name: "Anima crystal", shop_price: 150000},
        42283: {name: "Barrel of bait", shop_price: 50000},
        42284: {name: "Broken fishing rod", shop_price: 50000},
        27234: {name: "D&D reset token (daily)", shop_price: 250000},
        41035: {name: "Gift for the Reaper", shop_price: 1250000},
        35203: {name: "Goebie burial charm", shop_price: 100000},
        42290: {name: "Livid plant", shop_price: 1000000},
        40304: {name: "Menaphite gift (small)", shop_price: 100000},
        40306: {name: "Menaphite gift (medium)", shop_price: 300000},
        42289: {name: "Sacred clay", shop_price: 600000},
        40150: {name: "Shattered anima", shop_price: 750000},
        34823: {name: "Silverhawk down", shop_price: 1500000},
        41036: {name: "Slayer VIP Coupon", shop_price: 200000},
        35202: {name: "Small goebie burial charm", shop_price: 50000},
        42285: {name: "Tangled fishbowl", shop_price: 50000},
        32708: {name: "Unfocused damage enhancer", shop_price: 500000},
        41034: {name: "Unstable air rune", shop_price: 250000},
        54109: {name: "Horn of honour", shop_price: 1000000},

        28550: {name: "Crystal triskelion", shop_price: 2000000},
        25202: {name: "Deathtouched dart", shop_price: 5000000},
        27236: {name: "D&D reset token (monthly)", shop_price: 1000000},
        27235: {name: "D&D reset token (weekly)", shop_price: 400000},
        18782: {name: "Dragonkin lamp", shop_price: 250000},
        35575: {name: "Dungeoneering Wildcard", shop_price: 400000},
        32622: {name: "Harmonic dust", shop_price: 2000000},
        35204: {name: "Large goebie burial charm", shop_price: 150000},
        40308: {name: "Menaphite gift (large)", shop_price: 500000},
        42282: {name: "Message in a bottle", shop_price: 200000},
        18778: {name: "Starved ancient effigy", shop_price: 1000000},
        37758: {name: "Taijitu", shop_price: 800000},
        32716: {name: "Unfocused reward enhancer", shop_price: 10000000},
    }

    let slotABMap = [41035,42284,42283,36918,35202,35203,40304,40306,40150,27234,42289,42290,41036,34823,41034,34918,42285,32708,54109];
    let slotCMap = [37758,35204,40308,27235,27236,35575,42282,28550,18778,25202,18782,32622,32716];
    let runedate = Math.floor(((new Date() / 1000) - 1014768000) / 86400); // Days since 2002/02/27

    function avoidLimit(num) {
        let multi = [0, 2, 3, 5, 6, 9, 10, 13, 14, 15, 18, 19, 21, 22, 23, 25, 26, 27, 28, 30, 31, 32, 34];
        let out = 0;
        let mask = Math.pow(2, 48);
        for (let i = 0; i <= 35; i++) {
            if (multi.includes(i)) {
                out = (out + num) % mask;
            }
            num = (num * 2) % mask;
        }
        return out;
    }

    function slotIndex(runedate, k, n) {
        // Need to use BigInts through this method otherwise JS will treat numbers as 32bit whilst doing bitwise operations, which results in the wrong output
        let seed = (BigInt(runedate) << 32n) + (BigInt(runedate) % k);
        let multiplier = 25214903917n;
        let mask = 281474976710655n;
        seed = (seed ^ multiplier) & mask;
        seed = BigInt(avoidLimit(Number(seed)));
        seed = (seed + 11n) & mask;
        return (seed >> 17n) % n;
    }

    let slotA = slotABMap[slotIndex(runedate, 3n, 19n)];
    let slotB = slotABMap[slotIndex(runedate, 8n, 19n)];
    let slotC = slotCMap[slotIndex(runedate, 5n, 13n)];

    const outputElement = document.getElementById('traveling-merchant-stock');
    outputElement.innerHTML = '<br><strong>Current stock:</strong><br>';
    outputElement.innerHTML += '<img class="item_icon" src="/rsdata/images/' + slotA + '.gif"> ' + merchantitems[slotA].name + '<br>';
    outputElement.innerHTML += '<img class="item_icon" src="/rsdata/images/' + slotB + '.gif"> ' + merchantitems[slotB].name + '<br>';
    outputElement.innerHTML += '<img class="item_icon" src="/rsdata/images/' + slotC + '.gif"> ' + merchantitems[slotC].name;
};

/**
 * Calculate the featured dnd of the week
 * @see https://runescape.wiki/w/Template:SofDnD
 */
const dndOfTheWeek = function() {
    const outputElement = document.getElementById('dnd-of-the-week');

    const dndRotation = ['Evil Tree', 'Shooting Star', 'Penguin Hide and Seek', 'Circus'];

    let currentRotation = Math.floor(((Date.now() / 1000) + 86400) / 604800) % 4;

    outputElement.innerHTML = '<br><strong>' + dndRotation[currentRotation] + '</strong>';
}

/**
 * Good enough for now profile system
 * @todo make it better
 */
const profiles = function() {
    let profilesStored= storage.getItem('profiles') ?? 'default';
    let profilesArray = profilesStored.split(',');

    currentProfile = storage.getItem('current-profile') ?? 'default';
    profilePrefix = currentProfile == 'default' ? '' : currentProfile + '-';

    if (profilesArray.length > 1) {
        let profileName = document.getElementById('profile-name');
        profileName.innerHTML = currentProfile;
        profileName.style.display = 'inline-block';
        profileName.style.visibility = 'visible';
    }

    let profilebutton = document.getElementById('profile-button');
    let profileControl = document.getElementById('profile-control');
    let profileForm = profileControl.querySelector('form');
    let profileName = document.getElementById('profileName');
    let profileList = document.getElementById('profile-list');

    //populate list of existing profiles
    for (let profile of profilesArray) {
        let deleteButton = profile !== 'default' ? '<span class="profile-delete btn btn-danger btn-sm active" data-profile="' + profile + '" title="Delete ' + profile + '">⊘</span>' : '';
        if (profile !== currentProfile) {
            profileList.innerHTML += '<li><a href="#" data-profile="' + profile + '">' + profile + '</a>' + deleteButton + '</li>';
        } else {
            profileList.innerHTML += '<li>' + profile + deleteButton + '</li>'
        }
    }

    //Event listener for profile links
    let profileLinks = profileList.querySelectorAll('li a');
    for (let profileLink of profileLinks) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();

            let switchProfile = this.dataset.profile;
            storage.setItem('current-profile', switchProfile);
            window.location.reload();
        });
    }

    //Event listener for delete profile button
    let deleteButtons = profileList.querySelectorAll('.profile-delete');
    for (let deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', function(e) {
            e.preventDefault();
            profilesArray = profilesArray.filter(e => e != this.dataset.profile);
            storage.setItem('profiles', profilesArray.join(','));

            if (this.dataset.profile == currentProfile) {
                storage.setItem('current-profile', 'default');
            }

            let prefix = this.dataset.profile == 'default' ? '' : (this.dataset.profile + '-');
            for (const timeFrame of timeframes) {
                let data = window[timeFrame];
                for (let task in data) {
                    storage.removeItem(prefix + task);
                }
                storage.removeItem(prefix + timeFrame + '-order');
                storage.removeItem(prefix + timeFrame + '-updated');
            }

            window.location.reload();
        });
    }

    //alpha-numeric profile names only
    profileName.addEventListener('keypress', function(e) {
        if (!/^[A-Za-z0-9]+$/.test(e.key)) {
            e.preventDefault();
            return false;
        }
    });

    //Event listener for the main button hiding/showing control
    profilebutton.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();

        let display=profileControl.dataset.display;
        if (display == 'none') {
            profileControl.style.display = 'block';
            profileControl.style.visibility = 'visible';
            profileControl.dataset.display = 'block';
        } else {
            profileControl.style.display = 'none';
            profileControl.style.visibility = 'hidden';
            profileControl.dataset.display = 'none';
        }
    });

    // Save data on submit
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let profileNameField = this.querySelector('input#profileName');
        let profileErrorMsg = profileNameField.parentNode.querySelector('.invalid-feedback');

        if (!/^[A-Za-z0-9]+$/.test(profileNameField.value)) {
            profileName.classList.add('is-invalid');
            profileErrorMsg.innerHTML = 'Alpha numeric and no spaces only';
        } else if (profilesArray.includes(profileNameField.value)) {
            profileName.classList.add('is-invalid');
            profileErrorMsg.innerHTML = 'Profile already exists';
        } else {
            profilesArray.push(profileNameField.value);
            storage.setItem('profiles', profilesArray.join(','));
            storage.setItem('current-profile', profileNameField.value);
            window.location.reload();
        }
    });

    profileControl.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    document.addEventListener('click', function(e) {
        profileControl.style.display = 'none';
        profileControl.style.visibility = 'hidden';
        profileControl.dataset.display = 'none';
    });

    document.addEventListener('scroll', function(e) {
        profileControl.style.display = 'none';
        profileControl.style.visibility = 'hidden';
        profileControl.dataset.display = 'none';
    });
};

/**
 * Toggle between full and compact mode
 */
const layouts = function() {
    const layoutButton = document.getElementById('layout-button');
    const layoutGlyph = layoutButton.querySelector('.glyph');
    let currentLayout = storage.getItem('current-layout') ?? 'default';
    if (currentLayout !== 'default') {
        document.body.classList.add('compact');
        layoutButton.innerHTML = '⊞<span class="expanding_text">&nbsp;Full Mode</span>';
    }

    layoutButton.addEventListener('click', function(e) {
        e.preventDefault();

        let setLayout = document.body.classList.contains('compact') ? 'compact' : 'default';

        if (setLayout == 'default') {
            storage.setItem('current-layout', 'compact');
            document.body.classList.add('compact');
            layoutButton.innerHTML = '⊞<span class="expanding_text">&nbsp;Full Mode</span>';
        } else {
            storage.removeItem('current-layout');
            document.body.classList.remove('compact');
            layoutButton.innerHTML = '⊟<span class="expanding_text">&nbsp;Compact Mode</span>';
        }
    });
};

/**
 * Add event listeners for item tooltips
 */
const itemStatsTooltip = function() {
    let items = document.querySelectorAll('div.item_output');
    let tooltip = document.getElementById('tooltip');

    for (let item of items) {
        item.addEventListener('mouseover', function(e) {
            e.preventDefault();
            let itemdata = rsapidata[this.dataset.item_id] ?? {name: "", price: 0};

            item.after(tooltip);

            tooltip.innerHTML = '<img src="/rsdata/images/' + this.dataset.item_id + '.gif" class="item_icon"> ' + itemdata.name + '<br>'
                                + 'GE: ' + itemdata.price.toLocaleString() + '<span class="coin">●</span>' + (parseInt(this.dataset.shop_price) > 0 ? ' Shop: ' + parseInt(this.dataset.shop_price).toLocaleString() + '<span class="coin">●</span>' : '');
            tooltip.innerHTML += '<br>Change: ' + (itemdata.price > itemdata.last ? '+' : '') + (itemdata.last != itemdata.price ? (itemdata.price - itemdata.last).toLocaleString() : '-') + (itemdata.price > itemdata.last ? '<span class="trend_positive">▲</span>' : itemdata.price < itemdata.last ? '<span class="trend_negative">▼</span>' : '<span class="trend_neutral">-</span>');

            if (!!this.dataset.inputs) {
                tooltip.innerHTML += '<br><strong>Inputs</strong>:<br>';

                let inputItems = JSON.parse(decodeURIComponent(this.dataset.inputs));

                for (let itemkey in inputItems) {
                    let inputItemData = rsapidata[itemkey];
                    tooltip.innerHTML += ' <img src="/rsdata/images/' + itemkey + '.gif" class="item_icon"> ' + inputItemData.name + ' x' + inputItems[itemkey] + ' (-' + parseInt(inputItemData.price * inputItems[itemkey]).toLocaleString() + ')<br>';
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
};

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

const dataUpdatedCheck = function() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
           if (xmlhttp.status == 200) {
               console.log(xmlhttp.responseText);
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "/rsdata/rsapiupdated.json", true);
    xmlhttp.send();
}

const enableBootstrapTooltips = function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map(function (e) {
        return new bootstrap.Tooltip(e)
    })
}

/**
 * Set up token modal popup with event listeners
 */
const importExportModal = function() {
    let tokenButton = document.getElementById('token-button');
    let tokenOutput = document.getElementById('token-output')
    let tokenInput = document.getElementById('token-input');
    let copyButton = document.getElementById('token-copy');
    let importButton = document.getElementById('token-import');
    
    copyButton.addEventListener('click', function() {
        navigator.clipboard.writeText(tokenOutput.value);
    });
    
    tokenButton.addEventListener('click', function() {
        tokenOutput.value = generateToken();
    });
    
    tokenInput.addEventListener('focus', function() {
       tokenInput.classList.remove("is-invalid");
    });
    
    importButton.addEventListener('click', function() {
        let inputToken;
        let jsonObject;
        
        try {
            inputToken = atob(tokenInput.value);
            jsonObject = JSON.parse(inputToken);
        } catch {
            tokenInput.classList.add("is-invalid");
            return;
        }
        
        localStorage.clear();
        
        for(let key in jsonObject) {
            storage.setItem(key, jsonObject[key]);
        }

        // Force a reload instead of manipulating the DOM to correctly display the tables
        location.reload();
    });
}

/**
 * Take all the local application storage, turn it in to a JSON payload and Base64 encode it
 */
const generateToken = function() {
    const items = { ...localStorage };
    return btoa(JSON.stringify(items));
}

window.onload = function() {
    enableBootstrapTooltips();    
    profiles();
    layouts();

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
    warbandsCounter();
    merchantStock();
    dndOfTheWeek();
    importExportModal();

    setInterval(function() {
        for (const timeFrame of timeframes) {
            checkReset(timeFrame);
            countDown(timeFrame);
        }

        warbandsCounter();
    }, 1000);

    setInterval(function() {
        dataUpdatedCheck();
    }, 600000);
};
