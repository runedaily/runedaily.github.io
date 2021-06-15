window.onload = function () {
    //Dayan
    const dayanMain = ["Spins", "Divine Location", "Motherlode Maw", "Crystal Tree", "Crystal Sandstone", "Daily Challenge", "Red Sandstone",
        "Modified Helms", "Oo'glog Feather Shop", "Taverley Slayer Shop", "Shilo Village Slayer Shop", "Shilo Village Feather Shop",
        "Vis Wax", "Player Owned Ports", "Logs from Coeden", "Port Sarim Feather Shop", "Void Knight Runes Shop", "Lunar Isle Runes Shop",
        "Magic Guild Runes Shop", "Edgeville Runes Shop"];

    const dayanIron = ["Jack of Trades Aura", "Nemi Forest", "Daily Challenge", "Crystal Sandstone", "Red Sandstone", "Player Owned Ports",
        "Taverley Slayer Shop", "Canifis Slayer Shop", "Aquarium", "Pineapples and Seaweed from Arhein", "Catherby Herb Patch",
        "Catherby Fruit Tree", "Brimhaven Fruit Tree", "Modified Helms", "Serenity Posts"];

    //Valesco
    const valIron = ["Jack of Trades Aura", "Daily Challenge", "Player Owned Ports",
        "Player Owned Farms", "Slayer Shop run", "Shop Run", "Modified Helms",
        "VisWax", "Merchant", "Ooglog Meat Shop", "Sand Stone", "Reaper Task"];

    //Akazaron
    const akazaronDaily = ["Jack of Trades Aura", "Daily Challenge", "Player Owned Ports",
        "Player Owned Farms", "Slayer Shop run", "Shop Run", "Modified Helms",
        "VisWax", "Merchant", "Ooglog Meat Shop", "Sand Stone", "Reaper Task", "Soul Obby",
        "Nemi Forest", "Jack of Trades", "Cache", "Wicked Hood Runes", "Big Chin"];

    const akazaronWeekly = ["Meg", "Herby Werby", "Penguin", "Tears of Guthix", "Familiarisation"];

    const akazaronMonthlies = ["Oyster", "Troll Invasion", "God Statues"];

    //Common Daily
    const commday = [
        {daily: "Treasure Hunter Keys (IronManBTW)", url: "https://runescape.wiki/w/Treasure_Hunter"},
        {daily: "Daily Challenge", url: "https://runescape.wiki/w/Challenge_System"},
        {daily: "Modified Skilling Helms", url: "https://runescape.wiki/w/Category:Modified_skill_helms"},
        {daily: "Nemi Forest ('NemiForest' FC)", url: "https://www.reddit.com/r/NemiForest/new/"},
        {daily: "Jack of Trades", url: "https://runescape.wiki/w/Jack_of_trades_aura/Routines"},
        {daily: "Guthixian Cache", url: "https://runescape.wiki/w/Guthixian_Cache"},
        {daily: "Sinkholes", url: "https://runescape.wiki/w/Sinkholes"},
        {daily: "Miscellania", url: "https://runescape.wiki/w/Calculator:Other/Miscellania"},
        {daily: "Divine Locations", url: "https://runescape.wiki/w/Divine_location"},
        {daily: "Wilderness Warbands", url: "https://runescape.wiki/w/Wilderness_Warbands"},
        {daily: "Wicked Hood Runes", url: "https://runescape.wiki/w/Wicked_hood"},
        {daily: "Soul Reaper", url: "https://runescape.wiki/w/Soul_Reaper"},
        {daily: "Broad Bolts (Taverly Shop + Other Slayer Master)", url: "https://runescape.wiki/w/Money_making_guide/Buying_broad_arrowheads"},
        {daily: "Rune Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_runes"},
        {daily: "Traveling Merchant ('WhirlPoolDnD' FC)", url: "https://runescape.wiki/w/Travelling_Merchant%27s_Shop"},
        {daily: "Motherlode Maw", url: "https://runescape.wiki/w/Motherlode_Maw"},
        {daily: "Crystal Sand Stone", url: "https://runescape.wiki/w/Crystal-flecked_sandstone"},
        {daily: "Sand Stone", url: "https://runescape.wiki/w/Red_sandstone"},
        {daily: "Invention Machine", url: "https://runescape.wiki/w/Machines"},
        {daily: "Player Owned Ports", url: "https://runescape.wiki/w/Player-owned_port"},
        {daily: "VisWax", url: "http://services.runescape.com/m=forum/forums.ws?75,76,331,66006366"},
        {daily: "Bloodwood Tree (Every 6H)", url: "https://runescape.wiki/w/Bloodwood_tree"},
        {daily: "Goebie Bands (Supply Run)", url: "https://runescape.wiki/w/Supply_run"},
    ];

    const commweek = [
        {daily: "Agoroth (Twice)", url: "https://runescape.wiki/w/Agoroth"},
        {daily: "Penguin Hide and Seek", url: "http://2016.world60pengs.com/"},
        {daily: "Tears of Guthix", url: "https://runescape.wiki/w/Tears_of_Guthix"},
        {daily: "Meg", url: "https://runescape.wiki/w/Meg"},
        {daily: "Shattered Worlds", url: "https://runescape.wiki/w/Shattered_Worlds"},
    ];

    const commmonth = [
        {daily: "Giant Oyster", url: "https://runescape.wiki/w/Giant_Oyster"},
        {daily: "Troll Invasion", url: "https://runescape.wiki/w/Troll_Invasion"},
        {daily: "God Statues", url: "https://runescape.wiki/w/God_Statues"},
        {daily: "Premier Club Vault", url: "https://runescape.wiki/w/Premier_Club_Vault"},
    ];

    //RS3
    const rs3day = [
        {daily: "Treasure Hunter Keys", url: "https://runescape.wiki/w/Treasure_Hunter", desc: "Use 2 free daily keys"},
        {daily: "Daily Challenge", url: "https://runescape.wiki/w/Challenge_System", desc: "Get xp"},
        {daily: "Rune Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_runes", desc: "~2m profit"},
        {daily: "VisWax", url: "http://services.runescape.com/m=forum/forums.ws?75,76,331,66006366", desc: "~1m profit"},
        {daily: "Feather Shop Run", url: "https://runescape.wiki/w/Money_making_guide/Buying_feathers", desc: "~320k profit"},
        {daily: "Broad Bolts (Taverly Shop + Other Slayer Master)", url: "https://runescape.wiki/w/Money_making_guide/Buying_broad_arrowheads", desc: "~115k profit"},
        {daily: "Menaphos Obelisk ('SoulObby' FC)", url: "https://runescape.wiki/w/Soul_obelisk_(Menaphos)"},
        {daily: "Modified Skilling Helms", url: "https://runescape.wiki/w/Category:Modified_skill_helms"},
        {daily: "Nemi Forest ('NemiForest' FC)", url: "https://www.reddit.com/r/NemiForest/new/"},
        {daily: "Jack of Trades", url: "https://runescape.wiki/w/Jack_of_trades_aura/Routines"},
        {daily: "Guthixian Cache", url: "https://runescape.wiki/w/Guthixian_Cache"},
        {daily: "Fish Flingers", url: "https://runescape.wiki/w/Fish_Flingers"},
        {daily: "Sinkholes", url: "https://runescape.wiki/w/Sinkholes"},
        {daily: "Miscellania", url: "https://runescape.wiki/w/Calculator:Other/Miscellania"},
        {daily: "Evil Tree", url: "https://runescape.wiki/w/Evil_Tree"},
        {daily: "Divine Locations", url: "https://runescape.wiki/w/Divine_location"},
        {daily: "Crystal Tree Blossom", url: "https://runescape.wiki/w/Crystal_tree_blossom"},
        {daily: "Shooting Star", url: "https://runescape.wiki/w/Shooting_Star"},
        {daily: "Bork", url: "https://runescape.wiki/w/Bork"},
        {daily: "Wilderness Warbands", url: "https://runescape.wiki/w/Wilderness_Warbands"},
        {daily: "Wicked Hood Runes", url: "https://runescape.wiki/w/Wicked_hood"},
        {daily: "Big Chinchompa", url: "https://runescape.wiki/w/Big_Chinchompa"},
        {daily: "Soul Reaper", url: "https://runescape.wiki/w/Soul_Reaper"},
        {daily: "Traveling Merchant ('WhirlPoolDnD' FC)", url: "https://runescape.wiki/w/Travelling_Merchant%27s_Shop"},
        {daily: "Yak Hide", url: "https://runescape.wiki/w/Money_making_guide/Buying_yak-hide"},
        {daily: "Seaweed & Pineapples", url: "https://runescape.wiki/w/Money_making_guide/Buying_seaweed_and_pineapples_from_Arhein"},
        {daily: "Motherlode Maw", url: "https://runescape.wiki/w/Motherlode_Maw"},
        {daily: "Crystal Sand Stone", url: "https://runescape.wiki/w/Crystal-flecked_sandstone"},
        {daily: "Sand Stone", url: "https://runescape.wiki/w/Red_sandstone"},
        {daily: "Invention Machine", url: "https://runescape.wiki/w/Machines"},
        {daily: "Player Owned Ports", url: "https://runescape.wiki/w/Player-owned_port"},
        {daily: "Bloodwood Tree (Every 6H)", url: "https://runescape.wiki/w/Bloodwood_tree"},
        {daily: "Goebie Bands (Supply Run)", url: "https://runescape.wiki/w/Supply_run"},
        {daily: "Phoenix", url: "https://runescape.wiki/w/Phoenix_Lair"},
        {daily: "Liberation of Mazcab (Every 2 Days 'Raid FC' FC)", url: "https://runescape.wiki/w/Liberation_of_Mazcab"},
    ];

    const rs3week = [
        {daily: "Agoroth (Twice)", url: "https://runescape.wiki/w/Agoroth"},
        {daily: "Penguin Hide and Seek", url: "http://2016.world60pengs.com/"},
        {daily: "Tears of Guthix", url: "https://runescape.wiki/w/Tears_of_Guthix"},
        {daily: "Capping Clan Citadel", url: "https://runescape.wiki/w/Clan_Citadel"},
        {daily: "Meg", url: "https://runescape.wiki/w/Meg"},
        {daily: "Familiarisation", url: "https://runescape.wiki/w/Familiarisation"},
        {daily: "Replay Broken Home", url: "https://runescape.wiki/w/Broken_Home/Quick_guide"},
        {daily: "Rush Of Blood", url: "https://runescape.wiki/w/Rush_of_Blood"},
        {daily: "Shattered Worlds", url: "https://runescape.wiki/w/Shattered_Worlds"}
    ];

    const rs3month = [
        {daily: "Giant Oyster", url: "https://runescape.wiki/w/Giant_Oyster"},
        {daily: "Troll Invasion", url: "https://runescape.wiki/w/Troll_Invasion"},
        {daily: "God Statues", url: "https://runescape.wiki/w/God_Statues"},
        {daily: "Premier Club Vault", url: "https://runescape.wiki/w/Premier_Club_Vault"}
    ];

    const rowElem = document.getElementById("sample_row");

    //Dayan
    populateTable("dayan1", dayanMain);
    populateTable("dayan2", dayanIron);
    //Valesco
    populateTable("valesco2", valIron);
    //Akazaron
    populateTable("akazaron1", akazaronDaily);
    populateTable("akazaron2", akazaronWeekly);
    populateTable("akazaron3", akazaronMonthlies);
    //Common
    populateTable("commday", commday);
    populateTable("commweek", commweek);
    populateTable("commmonth", commmonth);
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
            newRowColourElem.id = tableName + "_colour_" + rowID;

            if (!!data[rowID].url) {
                newRowNameElem.children[0].href = data[rowID].url;
                newRowNameElem.children[0].target = "_blank";
                newRowNameElem.children[0].setAttribute('rel', 'noopener noreferrer');
                newRowNameElem.children[0].innerHTML = data[rowID].daily;

                if (!!data[rowID].desc) {
                    newRowNameElem.children[1].innerHTML = data[rowID].desc;
                }
            } else {
                newRowNameElem.children[0].innerHTML = data[rowID];
            }

            console.log(!!data[rowID].url);

            if (rowID % 2 == 0) {
                newRowNameElem.classList += " even_row";
            } else {
                newRowNameElem.classList += " odd_row";
            }

            tableElem.appendChild(newRow);

            newRow.completed = false;

            newRowNameElem.style.width = "80%";
            newRowColourElem.style.backgroundColor = "red";
            newRowColourElem.addEventListener("click", function () {
                newRow.completed = !newRow.completed;

                if (newRow.completed) {
                    newRowColourElem.style.backgroundColor = "#11ce00";
                } else {
                    newRowColourElem.style.backgroundColor = "red";
                }
            });
        }

        let resetButton = document.getElementById(tableName + "_reset_button");

        resetButton.addEventListener("click", function () {
            for (let rowID = 0; rowID < data.length; rowID++) {
                document.getElementById(tableName + "_colour_" + rowID).style.backgroundColor = "red";
                document.getElementById(tableName + "_row_" + rowID).completed = false;
            }
        });
    }
};
