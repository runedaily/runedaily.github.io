window.onload = function() {
	//DAYAN
	const dayanMain = ["Spins", "Divine Location", "Motherlode Maw", "Crystal Tree", "Crystal Sandstone", "Daily Challenge", "Red Sandstone", 
		"Modified Helms", "Oo'glog Feather Shop", "Taverley Slayer Shop", "Shilo Village Slayer Shop", "Shilo Village Feather Shop", 
		"Vis Wax", "Player Owned Ports", "Logs from Coeden", "Port Sarim Feather Shop", "Void Knight Runes Shop", "Lunar Isle Runes Shop", 
		"Magic Guild Runes Shop", "Edgeville Runes Shop"];
	
	const dayanIron = ["Jack of Trades Aura", "Nemi Forest", "Daily Challenge", "Crystal Sandstone", "Red Sandstone", "Player Owned Ports", 
		"Taverley Slayer Shop", "Canifis Slayer Shop", "Aquarium", "Pineapples and Seaweed from Arhein", "Catherby Herb Patch", 
		"Catherby Fruit Tree", "Brimhaven Fruit Tree", "Modified Helms", "Serenity Posts"];

	//RS3
	const rs3day = ["Treasure Hunter Spins", "Daily Challenge", "Menaphos rep ('SoulObby' FC)", "Modified Skilling Helms", "Nemi forest ('NemiForest' FC)", "Jack of trades",
		"Guthixian Cache", "Fish Flingers", "Sink Hole", "Miscellania", "Evil Trees", "Divine Locations", "Crystal tree blossom", "Shooting Star", "Bork", "Wilderness Warbands",
		"Wicked Hood", "Big Chinchompa", "Soul Reaper", "Broad Bolts (Taverly Shop + Other Slayer Master)", "Rune Shop Run", "Feather Shop Run", "Traveling Merchant ('WhirlPoolDnD' FC)",
		"Yak Hide", "Seaweed & Pineapples", "Motherlode Maw", "Crystal Sand Stone", "Sand Stone", "Invention Machinetal", "Player Owned Ports", "VisWax", "Liberation of Mazcab (Every 2 Days 'Raid FC' FC"];

	const rs3week = ["Agoroth Twice", "Penguin Hide and Seek", "Tears of Guthix", "Capping Clan Citadel", "Meg", "Familiarisation", "Replay Broken Home", "Rush Of Blood", "Shattered Worlds"];

	const rs3month = ["Giant oyster", "Troll invasion", "God Statues", "Premier Club Vault"];

	

	
	const rowElem = document.getElementById("sample_row");
	
	//Dayan
	populateTable("dayan1", dayanMain);
	populateTable("dayan2", dayanIron);
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
			
			newRowNameElem.innerHTML = data[rowID];
			
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
