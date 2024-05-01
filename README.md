[![DailyScape](./img/dailyscape.png)](https://dailyscape.github.io)
# DailyScape - RS3 Dailies, Weeklies, Monthlies Task Checklist for RuneScape

## Features
* List of daily, weekly and monthly repeatable tasks for Runescape 3
* Click the red area in right column (incomplete) to switch to green (completed)
* Brief comments on the benefits of completing the task
* Links to runescape.wiki or other relevant pages with further info
* Automatic countdown timer til the next reset time
* Once the reset time has past, completed tasks are automatically reset for you
* Saves what you checked off in the right column across visits in your browser's localStorage
* Drag and drop reordering (on desktop) that's saved so you can move the stuff you find more important to the top
* Links in nav to "more resources" that might be useful for gameplay information
* Makes profit calculations in "realtime" with data from [runescape.wiki GE API](https://runescape.wiki/w/User:Gaz_Lloyd/using_gemw#Exchange_API)
* Tooltips on items showing more info
* Allows hiding of tasks and sections and saves preference in localStorage
* Compact view mode
* Multiple profile capability
* Ad free / tracking free

## Dev setup / How to contribute

```
# fork this rep and replace with your repo URL
git clone https://github.com/dailyscape/dailyscape.github.io.git

# setup data import locally
cd ..
git clone https://github.com/dailyscape/rsdata.git
cd rsdata
pip install requests
python ./.github/scripts/rsapidata.py
python ./.github/scripts/rselydata.py
cd ../dailyscape.github.io
ln -s rsdata ../rsdata

# run a local test server
python -m http.server

# commit to your fork and make a PR to this repo!
```

## Requests

Please submit any missing tasks, bugs or new feature requests to the [issue tracker](https://github.com/dailyscape/dailyscape.github.io/issues).


RuneScape ® is a registered trademark of Jagex © 1999 Jagex Ltd.
