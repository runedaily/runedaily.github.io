#!/bin/bash

API_DATA_FILE=${API_DATA_FILE:="./data/rsapidata.js"}
GITHUB_ACTIONS=${GITHUB_ACTIONS:=false}

itemlist=(
'556' #air rune
'9075' #astral rune
'565' #blood rune
'559' #body rune
'562' #chaos rune
'564' #cosmic rune
'560' #death rune
'4696' #dust rune
'557' #earth rune
'554' #fire rune
'4699' #lava rune
'563' #law rune
'558' #mind rune
'4695' #mist rune
'4698' #mud rune
'561' #nature rune
'4697' #smoke rune
'566' #soul rune
'4694' #steam rune
'555' #water rune
'32092' #vis wax
'314' #feather
'313' #fishing bait
'9978' #raw bird meat
'2132' #raw beef
'3226' #raw rabbit
'10818' #yak-hide
'13278' #broad arrowheads
'227' #vial of water
'221' #eye of newt
'48961' #bomb vial
'40303' #feather of ma'at
)

new_data="var rsapidata = {\n"

length=${#itemlist[@]}
current=0

curl_status=0

for items in "${itemlist[@]}"; do
    item=($items)
    (( current++ ))

    curl_response=$(curl -Ssf https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${item[0]})
    curl_status=$?
    if test "$curl_status" != "0"; then
        break
    fi

    new_data+="${item[0]}:${curl_response}"

    if (( $current < $length )); then
        new_data+=",\n"
    else
        new_data+="\n"
    fi
done

if (( $curl_status == 0 )); then
    new_data+="};"

    echo -e ${new_data} > ${API_DATA_FILE}
else
    exit ${curl_status}
fi
