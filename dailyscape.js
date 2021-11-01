window.onload = function () {
    //RS3
    const rs3day = [
        {daily: "Treasure Hunter Keys", url: "https://runescape.wiki/w/Treasure_Hunter", short: true, desc: "Use 2 free daily keys"},
        {daily: "Daily Challenge", url: "https://runescape.wiki/w/Challenge_System", short: true, desc: "Get xp, treasure hunter key"},
        {daily: "Wicked Hood Runes", url: "https://runescape.wiki/w/Wicked_hood", short: true, desc: "~85k profit - Withdraw Soul/Fire, see <a href=\"https://runescape.wiki/w/Wicked_hood#Runecrafting\" target=\"_blank\" rel=\"noreferrer noopener\">crafting profitability table</a>, teleport for vis"},
        {daily: "Rune Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_runes", short: true, desc: "~2m profit"},
        {daily: "VisWax", url: "https://runescape.wiki/w/Rune_Goldberg_Machine", short: true, desc: "~500k profit"},
        {daily: "Feather Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_feathers", short: true, desc: "~29k profit per shop (11k feathers) up to ~319k profit<br>(or <a href=\"https://runescape.wiki/w/Money_making_guide/Fletching_headless_arrows\" target=\"_blank\" rel=\"noreferrer noopener\">fletch headless arrows</a> from yew logs - ~341k profit per 11k up to ~3.75m profit)"}, // 11k headless arrows = 517k - 11k feathers cost 81000, 315 yew logs = 94,500 profit 341500
        {daily: "Miscellania", url: "https://runescape.wiki/w/Calculator:Other/Miscellania", short: true, desc: "Check approval rating and funds in coffer. Get resources for ~300k profit"},
        {daily: "Meat Packs from Oo'glog", url: "https://runescape.wiki/w/Money_making_guide/Buying_Meat_from_Oo%27glog", short: true, desc: "Buy raw meat packs 43k, sell for ~460k profit"},
        {daily: "Vial of Water Packs", url: "https://runescape.wiki/w/Money_making_guide/Buying_vials_of_water", short: true, desc: "Buy vial of water + eye of newt packs and bomb vials for ~270k profit"},
        {daily: "Yak Hide", url: "https://runescape.wiki/w/Money_making_guide/Buying_yak-hide", short: true, desc: "Buy Yak Hide packs for ~109k profit"},
        {daily: "Broad Arrowheads (Taverly Shop + Other Slayer Master)", url: "https://runescape.wiki/w/Money_making_guide/Buying_broad_arrowheads", short: true, desc: "~96k profit"},
        {daily: "Divine Locations", url: "https://runescape.wiki/w/Divine_location", short: true, desc: "Gather resources from divine locations, Divine Herb 1 is most profitable"},
        {daily: "Sand Stone", url: "https://runescape.wiki/w/Red_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask"},
        {daily: "Crystal Sand Stone", url: "https://runescape.wiki/w/Crystal-flecked_sandstone", short: true, desc: "Accumulate sandstone for Blessed Flask"},
        {daily: "Modified Skilling Helms", url: "https://runescape.wiki/w/Category:Modified_skill_helms", short: true},
        {daily: "Nemi Forest ('NemiForest' FC)", url: "https://www.reddit.com/r/NemiForest/new/", short: true},
        {daily: "Jack of Trades", url: "https://runescape.wiki/w/Jack_of_trades_aura/Routines", short: true},
        {daily: "Guthixian Cache", url: "https://runescape.wiki/w/Guthixian_Cache", short: true},
        {daily: "Sinkholes", url: "https://runescape.wiki/w/Sinkholes", short: true},
        {daily: "Wilderness Warbands", url: "https://runescape.wiki/w/Wilderness_Warbands", short: true},
        {daily: "Soul Reaper", url: "https://runescape.wiki/w/Soul_Reaper", short: true},
        {daily: "Traveling Merchant ('WhirlPoolDnD' FC)", url: "https://runescape.wiki/w/Travelling_Merchant%27s_Shop", short: true},
        {daily: "Motherlode Maw", url: "https://runescape.wiki/w/Motherlode_Maw", short: true},

        {daily: "Invention Machine", url: "https://runescape.wiki/w/Machines", short: true},
        {daily: "Player Owned Ports", url: "https://runescape.wiki/w/Player-owned_port", short: true},
        {daily: "Bloodwood Tree (Every 6H)", url: "https://runescape.wiki/w/Bloodwood_tree", short: true},
        {daily: "Goebie Bands (Supply Run)", url: "https://runescape.wiki/w/Supply_run", short: true},
        {daily: "Menaphos Obelisk ('SoulObby' FC)", url: "https://runescape.wiki/w/Soul_obelisk_(Menaphos)"},
        {daily: "Fish Flingers", url: "https://runescape.wiki/w/Fish_Flingers"},
        {daily: "Evil Tree", url: "https://runescape.wiki/w/Evil_Tree"},
        {daily: "Crystal Tree Blossom", url: "https://runescape.wiki/w/Crystal_tree_blossom"},
        {daily: "Shooting Star", url: "https://runescape.wiki/w/Shooting_Star"},
        {daily: "Bork", url: "https://runescape.wiki/w/Bork"},
        {daily: "Big Chinchompa", url: "https://runescape.wiki/w/Big_Chinchompa"},
        {daily: "Seaweed & Pineapples", url: "https://runescape.wiki/w/Money_making_guide/Buying_seaweed_and_pineapples_from_Arhein"},
        {daily: "Phoenix", url: "https://runescape.wiki/w/Phoenix_Lair"},
        {daily: "Liberation of Mazcab (Every 2 Days 'Raid FC' FC)", url: "https://runescape.wiki/w/Liberation_of_Mazcab"},
    ];

    const rs3week = [
        {daily: "Capping Clan Citadel", url: "https://runescape.wiki/w/Clan_Citadel", short: true, desc: "Get skill xp, set xp bonus, make clan happy"},
        {daily: "Meg", url: "https://runescape.wiki/w/Meg", short: true, desc: "XP lamp and coins"},
        {daily: "Tears of Guthix", url: "https://runescape.wiki/w/Tears_of_Guthix", short: true, desc: "Gain xp for lowest level skill"},
        {daily: "Big Top Bonanza", url: "https://runescape.wiki/w/Balthazar_Beauregard%27s_Big_Top_Bonanza", short: true, desc: "Do circus tricks for xp"},
        {daily: "Charge Anachronia Totems", url: "https://runescape.wiki/w/Totem", desc: "Recharge totems weekly and optionally swap out"},
        {daily: "Wisps of the Grove", url: "https://runescape.wiki/w/Wisps_of_the_Grove", desc: "Farming & Hunting XP, Vinny pet"},
        {daily: "Herby Werby", url: "https://runescape.wiki/w/Herby_Werby", desc: "Herb bag and Totem pieces"},
        {daily: "Agoroth (Twice)", url: "https://runescape.wiki/w/Agoroth", short: true},
        {daily: "Penguin Hide and Seek", url: "http://2016.world60pengs.com/", short: true},
        {daily: "Shattered Worlds", url: "https://runescape.wiki/w/Shattered_Worlds", short: true},
        {daily: "Familiarisation", url: "https://runescape.wiki/w/Familiarisation"},
        {daily: "Replay Broken Home", url: "https://runescape.wiki/w/Broken_Home/Quick_guide"},
        {daily: "Rush Of Blood", url: "https://runescape.wiki/w/Rush_of_Blood"},
    ];

    const rs3month = [
        {daily: "Giant Oyster", url: "https://runescape.wiki/w/Giant_Oyster", short: true},
        {daily: "Troll Invasion", url: "https://runescape.wiki/w/Troll_Invasion", short: true},
        {daily: "God Statues", url: "https://runescape.wiki/w/God_Statues", short: true},
        {daily: "Solomon's Store", url: "https://secure.runescape.com/m=mtxn_rs_shop/index?jptg=ia&jptv=sgs_page#category/FreeItem", short: true, desc: "Free cosmetics, check loyalty points and sales"},
        {daily: "Premier Club Vault", url: "https://runescape.wiki/w/Premier_Club_Vault", short: true}
    ];

    const rowElem = document.getElementById("sample_row");

    //RS3
    populateTable("rs3daily", rs3day);
    populateTable("rs3weekly", rs3week);
    populateTable("rs3monthly", rs3month);

    function populateTable(tableName, data) {
        let tableElem = document.getElementById(tableName + "_table");

        if (!tableElem) {
            console.warn("Table does not exist: " + tableName);
            return;
        }

        for (let rowID = 0; rowID < data.length; rowID++) {
            let newRow = rowElem.cloneNode(true);
            let newRowNameElem = newRow.children[0];
            let newRowColourElem = newRow.children[1];

            newRow.id = tableName + "_row_" + rowID;

            newRowNameElem.id = tableName + "_name_" + rowID;
            newRowNameElem.classList.add('taskName');

            newRowColourElem.id = tableName + "_colour_" + rowID;
            newRowColourElem.classList.add('clickzone');
            newRowColourElem.classList.add('uncompleted');

            if (!!data[rowID].url) {
                newRowNameElem.children[0].href = data[rowID].url;
                newRowNameElem.children[0].target = "_blank";
                newRowNameElem.children[0].setAttribute('rel', 'noopener noreferrer');
                newRowNameElem.children[0].innerHTML = data[rowID].daily;

                if (!!data[rowID].desc) {
                    newRowColourElem.innerHTML = data[rowID].desc;
                }
            } else {
                newRowNameElem.children[0].innerHTML = data[rowID];
            }

            console.log(!!data[rowID].url);

            if (rowID % 2 == 0) {
                newRow.classList.add('odd_row');
            } else {
                newRow.classList.add('even_row')
            }

            tableElem.appendChild(newRow);

            newRow.completed = false;

            newRowColourElem.addEventListener("click", function () {
                newRow.completed = !newRow.completed;
                newRowColourElem.classList.toggle('uncompleted');
                newRowColourElem.classList.toggle('completed');
            });
        }

        let resetButton = document.getElementById(tableName + "_reset_button");

        resetButton.addEventListener("click", function () {
            for (let rowID = 0; rowID < data.length; rowID++) {
                document.getElementById(tableName + "_colour_" + rowID).classList.remove('completed');
                document.getElementById(tableName + "_colour_" + rowID).classList.add('uncompleted');

                document.getElementById(tableName + "_row_" + rowID).completed = false;
            }
        });
    }
};
