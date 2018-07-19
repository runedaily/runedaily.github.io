window.onload = function() {
	//Dayan
	const dayanMain = ["Spins", "Divine Location", "Motherlode Maw", "Crystal Tree", "Crystal Sandstone", "Daily Challenge", "Red Sandstone", 
		"Modified Helms", "Oo'glog Feather Shop", "Taverley Slayer Shop", "Shilo Village Slayer Shop", "Shilo Village Feather Shop", 
		"Vis Wax", "Player Owned Ports", "Logs from Coeden", "Port Sarim Feather Shop", "Void Knight Runes Shop", "Lunar Isle Runes Shop", 
		"Magic Guild Runes Shop", "Edgeville Runes Shop"];


	
	const dayanIron = ["Jack of Trades Aura", "Nemi Forest", "Daily Challenge", "Crystal Sandstone", "Red Sandstone", "Player Owned Ports", 
		"Taverley Slayer Shop", "Canifis Slayer Shop", "Aquarium", "Pineapples and Seaweed from Arhein", "Catherby Herb Patch", 
		"Catherby Fruit Tree", "Brimhaven Fruit Tree", "Modified Helms", "Serenity Posts"];

	//Valesco
	const valMain = ["Nemi Forest", "Daily Challenge", "Player Owned Ports", 
		"Taverley Slayer Shop", "Canifis Slayer Shop", "Modified Helms", "Reaper Task", "Shop Run", "VisWax", "Tiltos",
			];

	const valIron = ["Jack of Trades Aura", "Nemi Forest", "Daily Challenge", "Player Owned Ports", 
		"Taverley Slayer Shop", "Canifis Slayer Shop", "Pineapples & Seaweed", "Modified Helms", "Reaper Task", "Shop Run",
			"VisWax", "Merchant"];

	//Common Daily
	const commday = [
	{daily : "Treasure Hunter Keys (IronManBTW)", url : "http://runescape.wikia.com/wiki/Treasure_Hunter"},
	{daily : "Daily Challenge", url : "http://runescape.wikia.com/wiki/Challenge_System"},
	{daily : "Modified Skilling Helms", url : "http://runescape.wikia.com/wiki/Category:Modified_skill_helms"},
	{daily : "Nemi Forest ('NemiForest' FC)", url : "https://www.reddit.com/r/NemiForest/new/"},
	{daily : "Jack of Trades", url : "http://runescape.wikia.com/wiki/Jack_of_trades_aura/Routines" },
	{daily : "Guthixian Cache", url : "http://runescape.wikia.com/wiki/Guthixian_Cache"},
	{daily : "Sinkholes", url : "http://runescape.wikia.com/wiki/Sinkholes"},
	{daily : "Miscellania", url : "http://runescape.wikia.com/wiki/Calculator:Other/Miscellania"},
	{daily : "Divine Locations", url : "http://runescape.wikia.com/wiki/Divine_location"},
	{daily : "Wilderness Warbands", url : "http://runescape.wikia.com/wiki/Wilderness_Warbands"},
	{daily : "Wicked Hood Runes", url : "http://runescape.wikia.com/wiki/Wicked_hood"},
	{daily : "Soul Reaper", url : "http://runescape.wikia.com/wiki/Soul_Reaper"},
	{daily : "Broad Bolts (Taverly Shop + Other Slayer Master)", url : "http://runescape.wikia.com/wiki/Money_making_guide/Buying_broad_arrowheads"},
	{daily : "Rune Shop Run", url : "http://runescape.wikia.com/wiki/Money_making_guide/Buying_runes"},
	{daily : "Traveling Merchant ('WhirlPoolDnD' FC)",url : "http://runescape.wikia.com/wiki/Travelling_Merchant%27s_Shop"},
	{daily : "Motherlode Maw", url : "http://runescape.wikia.com/wiki/Motherlode_Maw"},
	{daily : "Crystal Sand Stone", url : "http://runescape.wikia.com/wiki/Crystal-flecked_sandstone"},
	{daily : "Sand Stone", url : "http://runescape.wikia.com/wiki/Red_sandstone"},
	{daily : "Invention Machine", url : "http://runescape.wikia.com/wiki/Machines"},
	{daily : "Player Owned Ports", url : "http://runescape.wikia.com/wiki/Player-owned_port"},
	{daily : "VisWax", url : "http://services.runescape.com/m=forum/forums.ws?75,76,331,66006366"},
	{daily : "Bloodwood Tree (Every 6H)", url : "http://runescape.wikia.com/wiki/Bloodwood_tree"},
	{daily : "Goebie Bands (Supply Run)", url : "http://runescape.wikia.com/wiki/Supply_run"},
	];

	const commweek = [
	{daily : "Agoroth (Twice)", url : "http://runescape.wikia.com/wiki/Agoroth"},
	{daily : "Penguin Hide and Seek", url : "http://2016.world60pengs.com/"},
	{daily : "Tears of Guthix", url : "http://runescape.wikia.com/wiki/Tears_of_Guthix"},
	{daily : "Meg", url : "http://runescape.wikia.com/wiki/Meg"},
	{daily : "Shattered Worlds", url : "http://runescape.wikia.com/wiki/Shattered_Worlds"}
	];

	const commmonth = [
	{daily : "Giant Oyster", url : "http://runescape.wikia.com/wiki/Giant_Oyster"},
	{daily : "Troll Invasion", url : "http://runescape.wikia.com/wiki/Troll_Invasion"},
	{daily : "God Statues", url : "http://runescape.wikia.com/wiki/God_Statues"},
	{daily : "Premier Club Vault", url : "http://runescape.wikia.com/wiki/Premier_Club_Vault"}
	];

	//RS3
	const rs3day = [
	{daily : "Treasure Hunter Keys", url : "http://runescape.wikia.com/wiki/Treasure_Hunter"},
	{daily : "Daily Challenge", url : "http://runescape.wikia.com/wiki/Challenge_System"},
	{daily : "Menaphos Obelisk ('SoulObby' FC)", url : "http://runescape.wikia.com/wiki/Soul_obelisk_(Menaphos)"},
	{daily : "Modified Skilling Helms", url : "http://runescape.wikia.com/wiki/Category:Modified_skill_helms"},
	{daily : "Nemi Forest ('NemiForest' FC)", url : "https://www.reddit.com/r/NemiForest/new/"},
	{daily : "Jack of Trades", url : "http://runescape.wikia.com/wiki/Jack_of_trades_aura/Routines" },
	{daily : "Guthixian Cache", url : "http://runescape.wikia.com/wiki/Guthixian_Cache"},
	{daily : "Fish Flingers", url : "http://runescape.wikia.com/wiki/Fish_Flingers"},
	{daily : "Sinkholes", url : "http://runescape.wikia.com/wiki/Sinkholes"},
	{daily : "Miscellania", url : "http://runescape.wikia.com/wiki/Calculator:Other/Miscellania"},
	{daily : "Evil Tree", url : "http://runescape.wikia.com/wiki/Evil_Tree"}, 
	{daily : "Divine Locations", url : "http://runescape.wikia.com/wiki/Divine_location"},
	{daily : "Crystal Tree Blossom", url : "http://runescape.wikia.com/wiki/Crystal_tree_blossom"},
	{daily : "Shooting Star", url : "http://runescape.wikia.com/wiki/Shooting_Star"},
	{daily : "Bork", url : "http://runescape.wikia.com/wiki/Bork"},
	{daily : "Wilderness Warbands", url : "http://runescape.wikia.com/wiki/Wilderness_Warbands"},
	{daily : "Wicked Hood Runes", url : "http://runescape.wikia.com/wiki/Wicked_hood"},
	{daily : "Big Chinchompa", url : "http://runescape.wikia.com/wiki/Big_Chinchompa"},
	{daily : "Soul Reaper", url : "http://runescape.wikia.com/wiki/Soul_Reaper"},
	{daily : "Broad Bolts (Taverly Shop + Other Slayer Master)", url : "http://runescape.wikia.com/wiki/Money_making_guide/Buying_broad_arrowheads"},
	{daily : "Rune Shop Run", url : "http://runescape.wikia.com/wiki/Money_making_guide/Buying_runes"},
	{daily : "Feather Shop Run", url : "http://runescape.wikia.com/wiki/Money_making_guide/Buying_feathers"},
	{daily : "Traveling Merchant ('WhirlPoolDnD' FC)",url : "http://runescape.wikia.com/wiki/Travelling_Merchant%27s_Shop"},
	{daily : "Yak Hide", url : "http://runescape.wikia.com/wiki/Money_making_guide/Buying_yak-hide"},
	{daily : "Seaweed & Pineapples", url : "http://runescape.wikia.com/wiki/Money_making_guide/Buying_seaweed_and_pineapples_from_Arhein"},
	{daily : "Motherlode Maw", url : "http://runescape.wikia.com/wiki/Motherlode_Maw"},
	{daily : "Crystal Sand Stone", url : "http://runescape.wikia.com/wiki/Crystal-flecked_sandstone"},
	{daily : "Sand Stone", url : "http://runescape.wikia.com/wiki/Red_sandstone"},
	{daily : "Invention Machine", url : "http://runescape.wikia.com/wiki/Machines"},
	{daily : "Player Owned Ports", url : "http://runescape.wikia.com/wiki/Player-owned_port"},
	{daily : "VisWax", url : "http://services.runescape.com/m=forum/forums.ws?75,76,331,66006366"},
	{daily : "Bloodwood Tree (Every 6H)", url : "http://runescape.wikia.com/wiki/Bloodwood_tree"},
	{daily : "Liberation of Mazcab (Every 2 Days 'Raid FC' FC)", url : "http://runescape.wikia.com/wiki/Liberation_of_Mazcab"}
	];

	const rs3week = [
	{daily : "Agoroth (Twice)", url : "http://runescape.wikia.com/wiki/Agoroth"},
	{daily : "Penguin Hide and Seek", url : "http://2016.world60pengs.com/"},
	{daily : "Tears of Guthix", url : "http://runescape.wikia.com/wiki/Tears_of_Guthix"},
	{daily : "Capping Clan Citadel", url : "http://runescape.wikia.com/wiki/Clan_Citadel"},
	{daily : "Meg", url : "http://runescape.wikia.com/wiki/Meg"},
	{daily : "Familiarisation", url : "http://runescape.wikia.com/wiki/Familiarisation"},
	{daily : "Replay Broken Home", url : "http://runescape.wikia.com/wiki/Broken_Home/Quick_guide"},
	{daily : "Rush Of Blood", url : "http://runescape.wikia.com/wiki/Rush_of_Blood"},
	{daily : "Shattered Worlds", url : "http://runescape.wikia.com/wiki/Shattered_Worlds"}
	];

	const rs3month = [
	{daily : "Giant Oyster", url : "http://runescape.wikia.com/wiki/Giant_Oyster"},
	{daily : "Troll Invasion", url : "http://runescape.wikia.com/wiki/Troll_Invasion"},
	{daily : "God Statues", url : "http://runescape.wikia.com/wiki/God_Statues"},
	{daily : "Premier Club Vault", url : "http://runescape.wikia.com/wiki/Premier_Club_Vault"}
	];

	

	
	const rowElem = document.getElementById("sample_row");
	
	//Dayan
	populateTable("dayan1", dayanMain);
	populateTable("dayan2", dayanIron);
	//Valesco
	populateTable("valesco1", valMain);
	populateTable("valesco2", valIron);
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
		
		if(!tableElem) {
			console.warn("Table does not exist: " + tableName);
			return;
		}
		
		for(let rowID = 0; rowID < data.length; rowID++) {
			let newRow = rowElem.cloneNode(true);
			let newRowNameElem = newRow.children[0];
			let newRowColourElem = newRow.children[1];
			
			newRow.id = tableName + "_row_" + rowID;
			newRowNameElem.id = tableName + "_name_" + rowID;
			newRowColourElem.id = tableName + "_colour_" + rowID;


			if (!! data[rowID].url) {
				newRowNameElem.children[0].href = data[rowID].url;
				newRowNameElem.children[0].innerHTML = data[rowID].daily;
			}
			else {
				newRowNameElem.children[0].innerHTML = data[rowID];
			}
			console.log(!!data[rowID].url)


		


			
			if(rowID % 2 == 0) {
				newRowNameElem.classList += " even_row";
			} else {
				newRowNameElem.classList += " odd_row";
			}
			
			tableElem.appendChild(newRow);
			
			newRow.completed = false;
			
			newRowNameElem.style.width = "80%";
			newRowColourElem.style.backgroundColor = "red";
			newRowColourElem.addEventListener("click", function() {
				newRow.completed = !newRow.completed;
				
				if(newRow.completed) {
					newRowColourElem.style.backgroundColor = "#11ce00";
				} else {
					newRowColourElem.style.backgroundColor = "red";
				}
			});
		}
		
		let resetButton = document.getElementById(tableName + "_reset_button");
		
		resetButton.addEventListener("click", function() {
			for(let rowID = 0; rowID < data.length; rowID++) {
				document.getElementById(tableName + "_colour_" + rowID).style.backgroundColor = "red";
				document.getElementById(tableName + "_row_" + rowID).completed = false;
			}
		});
	}
}
