const storage = window.localStorage;

var dragRow; //global for currently dragged row
var totalDailyProfit = 0; //global for total daily profit, maybe move this

var rs3daily = [
    {task: "Treasure Hunter Keys", url: "https://runescape.wiki/w/Treasure_Hunter", short: true, desc: "Use 2 free daily keys"},
    {task: "Traveling Merchant", url: "https://runescape.wiki/w/Travelling_Merchant%27s_Shop", short: true, desc: "Buy rare items in deep sea fishing hub ('WhirlPoolDnD' FC)"},
    {task: "Daily Challenge", url: "https://runescape.wiki/w/Challenge_System", short: true, desc: "Get xp, treasure hunter key x3"},
    {task: "Jack of Trades", url: "https://runescape.wiki/w/Jack_of_trades_aura/Routines", short: true, desc: "Get xp in a range of skills to get an xp book"},
    {task: "Soul Reaper", url: "https://runescape.wiki/w/Soul_Reaper", desc: "Kill assigned bosses"},
    {task: "Player Owned Ports", url: "https://runescape.wiki/w/Player-owned_port", short: true, desc: "Manage your player owned port"},
    {task: "Player Owned Farm", url: "https://runescape.wiki/w/Player-owned_farm", short: true, desc: "Manage your player owned farm"},
    {task: "Crystal Tree Blossom", url: "https://runescape.wiki/w/Crystal_tree_blossom", short: true, desc: "Collect crystal tree blossom for perfect plus potions"},
    {task: "Invention Machine", url: "https://runescape.wiki/w/Machines", short: true, desc: "Fill and collect from invention machines"},
    {task: "Motherlode Maw", url: "https://runescape.wiki/w/Motherlode_Maw", short: true, desc: "Receive treasure from motherlode maw"},
    {task: "Gorajo Card", url: "https://runescape.wiki/w/Gorajo_card", short: true, desc: "Consistent yak card gives a guaranteed Meilyr combination potion recipe"},
    {task: "Divine Locations", url: "https://runescape.wiki/w/Divine_location", short: true, desc: "Gather resources from divine locations, Divine Herb 1 most coins/resource, Divine Yew most xp/resource"},

    {task: "Nemi Forest", url: "https://www.reddit.com/r/NemiForest/new/", desc: "'NemiForest' FC"},
    {task: "Guthixian Cache", url: "https://runescape.wiki/w/Guthixian_Cache", desc: "Divination D&D"},
    {task: "Sinkholes", url: "https://runescape.wiki/w/Sinkholes", desc: "Dungeoneering XP lamps and tokens, 2x a day"},
    {task: "Goebie Bands", url: "https://runescape.wiki/w/Supply_run", desc: "Supply Run"},
    {task: "Menaphos Obelisk", url: "https://runescape.wiki/w/Soul_obelisk_(Menaphos)", desc: "'SoulObby' FC"},
    {task: "Big Chinchompa", url: "https://runescape.wiki/w/Big_Chinchompa", desc: "Private hunting instances and hunter xp"},
    {task: "Phoenix", url: "https://runescape.wiki/w/Phoenix_Lair", desc: "Baby phoenix pet"},
    {task: "Liberation of Mazcab", url: "https://runescape.wiki/w/Liberation_of_Mazcab", desc: "Every 2 Days 'Raid FC' FC"},
];

var rs3dailyshops = [
    {task: "Rune Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_runes", short: true,
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
    {task: "Vis Wax", url: "https://runescape.wiki/w/Rune_Goldberg_Machine", short: true, desc: "Profit from shop price and avg of combinations",
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
    {task: "Feathers of Ma'at", url: "https://runescape.wiki/w/Money_making_guide/Buying_feathers_of_Ma%27at", short: true,
        outputs: [
            {id: 40303, quantity: 1000, shop_price: 1500}, //feather of ma'at
        ]
    },
    {task: "Bloodwood Tree", url: "https://runescape.wiki/w/Money_making_guide/Fletching_bakriminel_bolts", desc: "Fletch bakriminel bolts. Every 6H",
        outputs: [
            {id: 24116, quantity: 1500, shop_price: 0}, //bakriminel bolts
        ],
        inputs: [
            {id: 24127, quantity: 1500, shop_price: 200}, //bakriminel bolt tips
        ]
    },
    {task: "Wicked Hood Runes", url: "https://runescape.wiki/w/Wicked_hood", short: true, desc: "Teleport for Vis. Profits based on 99 RC and fully upgraded hood, see <a href=\"https://runescape.wiki/w/Wicked_hood#Runecrafting\" target=\"_blank\" rel=\"noreferrer noopener\">crafting profitability table</a>",
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
    {task: "Feather Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_feathers", short: true, desc: 'Normalized for 24 hours',
        outputs: [
            {id: 314, quantity: 12000, shop_price: 6}, //feathers
            {id: 314, quantity: 110000, shop_price: 7.5, multiplier: 0.4, label_override: 'Feather (Packs@60hrs)'}, //feather packs respawn over 60 hours 24/60=0.4
            {id: 313, quantity: 9000, shop_price: 3}, //fishing bait
        ]
    },
    {task: "Miscellania", url: "https://runescape.wiki/w/Calculator:Other/Miscellania", short: true, desc: "Check approval rating and funds in coffer",
        outputs: [
            {id: 1517, quantity: 892, shop_price: 0}, //maple logs
            {id: 6332, quantity: 223, shop_price: 0}, //mahogany logs
        ],
        inputs: [
            {id: -1, quantity: 1, shop_price: 37500}, //kingdom upkeep
        ]
    },
    {task: "Sand Stone", url: "https://runescape.wiki/w/Red_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask",
        outputs: [
            {id: 23191, quantity: 50, shop_price: 0}, //potion flask
        ]
    },
    {task: "Crystal Sand Stone", url: "https://runescape.wiki/w/Crystal-flecked_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask",
        outputs: [
            {id: 32843, quantity: 50, shop_price: 0}, //crystal flask
        ]
    },
    {task: "Meat Packs from Oo'glog", url: "https://runescape.wiki/w/Money_making_guide/Buying_Meat_from_Oo%27glog", short: true, desc: "Only buy packs",
        outputs: [
            {id: 2132, quantity: 300, shop_price: 59}, //raw beef packs
            {id: 9978, quantity: 300, shop_price: 63}, //raw bird meat packs
            {id: 3226, quantity: 100, shop_price: 67}, //raw rabbit packs
        ]
    },
    {task: "Vial of Water Packs", url: "https://runescape.wiki/w/Money_making_guide/Buying_vials_of_water", short: true,  desc: 'Normalized for 24 hours. +6 from Sigmund the Merchant',
        outputs: [
            {id: 227, quantity: 5300, shop_price: 10, multiplier: 0.367924528, label_override: 'Vial of Water (Packs@160hrs)'}, //vial of water packs respawn over 160 hours 24/160=0.4
            {id: 221, quantity: 2000, shop_price: 3}, //eye of newt packs
            {id: 48961, quantity: 200, shop_price: 5}, //bomb vial
        ]
    },
    {task: "Yak Hide", url: "https://runescape.wiki/w/Money_making_guide/Buying_yak-hide", short: true,
        outputs: [
            {id: 10818, quantity: 1000, shop_price: 50}, //yak-hide packs
        ]
    },
    {task: "Broad Arrowheads", url: "https://runescape.wiki/w/Money_making_guide/Buying_broad_arrowheads", short: true, desc: "Taverly + Any other Slayer Master (e.g. Lumby)",
        outputs: [
            {id: 13278, quantity: 6000, shop_price: 50}, //broad arrowheads
        ]
    },
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

const toSlug = function(toSlug) {
    return toSlug.replace(/\W/g, '-').toLowerCase();
};

/**
 * Populate the HTML with data for a timeFrame and attach listeners
 * @param {String} timeFrame
 * @returns
 */
const populateTable = function(timeFrame) {
    let data = window[timeFrame];

    const sampleRow = document.querySelector('#sample_row');
    const targetTable = document.querySelector('#' + timeFrame + '_table tbody');

    //Hidden table
    let hideTable = storage.getItem(timeFrame + '-hide') ?? 'false';
    if (hideTable == 'hide') {
        document.querySelector('div.' + timeFrame + '_table').dataset.hide = 'hide';
    }

    //User defined sorting
    let customOrder = storage.getItem(timeFrame + '-order') ?? 'false';
    if (customOrder !== 'false') {
        let sortArray = customOrder.split(',');

        data.sort(function(a, b){
            return sortArray.indexOf(toSlug(a.task)) - sortArray.indexOf(toSlug(b.task));
        });
    }

    for (let row of data) {
        let taskSlug = toSlug(row.task);
        let rowClone = sampleRow.content.cloneNode(true);
        let newRow = rowClone.querySelector('tr');
        let newRowAnchor = rowClone.querySelector('td.activity_name a');
        let newRowColor = rowClone.querySelector('td.activity_color');

        let taskState = storage.getItem(taskSlug) ?? 'false';

        newRow.dataset.task=taskSlug;

        if (!!row.url) {
            newRowAnchor.href = row.url;
            newRowAnchor.innerHTML = row.task;

            if (!!row.desc) {
                newRowColor.innerHTML = row.desc;
            }

            /**
             * Handle if task has associated items
             * @todo refactor
             */
            if (!!row.outputs || !!row.outputs_max) {
                if (!!row.desc) {
                    newRowColor.innerHTML += '<br>';
                } else {
                    newRowColor.innerHTML = '';
                }

                let totalInputPrice = 0;
                let totalItemProfit = 0;
                let buyItems = [];
                let skipItems = [];

                if (!!row.inputs) {
                    for (let input of row.inputs) {
                        totalInputPrice += input.quantity * (input.shop_price ?? parseInt(String(rsapidata[input.id].item.current.price).replace(/\D/g, ''), 10));
                    }
                }

                if (!!row.outputs_max) {
                    let rowMaxProfit = 0;
                    for (outputMax of row.outputs_max) {
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
                    let rowSum = calcOutputs(row.outputs, totalInputPrice);
                    totalItemProfit += rowSum.totalItemProfit;
                    if (taskState != 'hide') {
                        totalDailyProfit += rowSum.totalDailyProfit;
                    }
                    newRow.dataset.profit = rowSum.totalDailyProfit;
                    buyItems.push(...rowSum.buyItems);
                    skipItems.push(...rowSum.skipItems);
                }

                newRowColor.innerHTML += 'Total Profit: <strong>' + totalItemProfit.toLocaleString() + '</strong><span class="coin">●</span><br>';

                for (let item of buyItems) {
                    let itemApiData = rsapidata[item.id].item;
                    newRowColor.innerHTML += '<div class="item_output" data-item_id="' + item.id + '" data-shop_price="' + item.shop_price + '">'
                                            + '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + item.id + '">'
                                            + (!!item.label_override ? item.label_override : itemApiData.name) + ' x' + item.quantity.toLocaleString() + ' (' + item.profit.toLocaleString() + ')'
                                            + '</div>';
                }

                if (skipItems.length > 0) {
                    newRowColor.innerHTML += '<br>Skip:<br>'
                    for (let item of skipItems) {
                        let itemApiData = rsapidata[item.id].item;
                        newRowColor.innerHTML += '<div class="item_output" data-item_id="' + item.id + '" data-shop_price="' + item.shop_price + '">'
                                                + '<img class="item_icon" src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + item.id + '">'
                                                + (!!item.label_override ? item.label_override : itemApiData.name) + ' x' + item.quantity.toLocaleString() + ' (' + item.profit.toLocaleString() + ')'
                                                + '</div>';
                    }
                }
            }

        } else {
            newRowAnchor.innerHTML = row.task;
        }

        targetTable.appendChild(newRow);
        newRow.dataset.completed = taskState;
    }

    if (timeFrame == 'rs3dailyshops') {
        document.getElementById('rs3dailyshops_totalprofit').innerHTML = 'Total Daily Profit: <strong>' + totalDailyProfit.toLocaleString() + '</strong><span class="coin">●</span>';
    }
};

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
                document.getElementById('rs3dailyshops_totalprofit').innerHTML = 'Total Daily Profit: <strong>' + newProfit.toLocaleString() + '</strong><span class="coin">●</span>';
            }
        });
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
        let itemApiData = rsapidata[item.id].item;
        let itemPrice = String(itemApiData.current.price).endsWith('k')
            ? parseFloat(String(itemApiData.current.price).slice(0, -1).replace(/,/g, '')) * 1000
            : parseInt(String(itemApiData.current.price).replace(/\D/g, ''), 10);

        if (!!item.multiplier) {
            item.quantity *= item.multiplier;
        }

        let itemCost = totalInputPrice > 0 ? totalInputPrice : item.quantity * (item.shop_price ?? parseInt(String(rsapidata[item.id].item.current.price).replace(/\D/g, ''), 10));
        item.profit = (item.quantity * itemPrice) - itemCost;

        if (method == 'max') {
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

        for (item of data) {
            let taskSlug = toSlug(item.task);
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
            let itemdata = rsapidata[this.dataset.item_id].item;

            item.after(tooltip);

            tooltip.innerHTML = '<img src="https://secure.runescape.com/m=itemdb_rs/obj_sprite.gif?id=' + this.dataset.item_id + '" class="item_icon"> ' + itemdata.name + '<br>'
                                + 'GE: ' + itemdata.current.price + '<span class="coin">●</span>' + (parseInt(this.dataset.shop_price) > 0 ? ' Shop: ' + this.dataset.shop_price + '<span class="coin">●</span>' : '') + '<br>'
                                + '&nbsp;&nbsp;&nbsp;&nbsp;Today: ' + (itemdata.today.trend == 'positive' ? '<span class="trend_positive">▲</span>' : itemdata.today.trend == 'negative' ? '<span class="trend_negative">▼</span>' : '<span class="trend_neutral">-</span> ') + (itemdata.today.price != '0' ? itemdata.today.price : '') + '<br>'
                                + '&nbsp;&nbsp;30 Day: ' + (itemdata.day30.trend == 'positive' ? '<span class="trend_positive">▲</span>' : itemdata.day30.trend == 'negative' ? '<span class="trend_negative">▼</span>' : '<span class="trend_neutral">-</span>') + itemdata.day30.change + '<br>'
                                + '&nbsp;&nbsp;90 Day: ' + (itemdata.day90.trend == 'positive' ? '<span class="trend_positive">▲</span>' : itemdata.day90.trend == 'negative' ? '<span class="trend_negative">▼</span>' : '<span class="trend_neutral">-</span>') + itemdata.day90.change + '<br>'
                                + '180 Day: ' + (itemdata.day180.trend == 'positive' ? '<span class="trend_positive">▲</span>' : itemdata.day180.trend == 'negative' ? '<span class="trend_negative">▼</span>' : '<span class="trend_neutral">-</span>') + itemdata.day180.change;

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

window.onload = function () {
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
    itemStatsTooltip();

    setInterval(function() {
        for (const timeFrame of timeframes) {
            checkReset(timeFrame);
            countDown(timeFrame);
        }
    }, 1000);
};
