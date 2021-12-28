#!/bin/bash
API_UPDATED_FILE=${API_UPDATED_FILE:="./data/rsapiupdated.json"}
API_DATA_FILE=${API_DATA_FILE:="./data/rsapidata.js"}

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
'1517' #maple logs
'6332' #mahogany logs
'24116' #bakriminel bolts
'23191' #potion flask
'32843' #crystal flask
'37952' #bloodweed seeds
# '29864' #algarum thread
# '8784' #gold leaf
# '28628' #stone of binding
# '8786' #marble block
)

# Sadly this does not seem to reliably update when prices are updated
# Saved in case this changes later
#
# apiupdated_cached=$(jq .lastConfigUpdateRuneday ${API_UPDATED_FILE})
#
# curl_response=$(curl -Ssf https://secure.runescape.com/m=itemdb_rs/api/info.json)
# curl_status=$?
#
# if (( $curl_status > 0 )); then
#     echo "curl error - getting apiupdated"
#     exit ${curl_status}
# fi
#
# apiupdated=$(jq -e .lastConfigUpdateRuneday <<< ${curl_response})
# testjson=$?
#
# if (( $testjson > 0 )); then
#     echo "json invalid:"
#     echo $apiupdated
#     exit 0
# elif (( $apiupdated <= $apiupdated_cached )); then
#     echo "no new data - old: ${apiupdated_cached} new: ${apiupdated}"
#     exit 0
# else
#     echo ${curl_response} > ${API_UPDATED_FILE}
# fi

#retrieve the new data
new_data="{\n"

length=${#itemlist[@]}
current=0

curl_status=0
empty_response=0

for items in "${itemlist[@]}"; do
    item=($items)
    (( current++ ))

    curl_response=$(curl -Ssf https://secure.runescape.com/m=itemdb_rs/api/catalogue/detail.json?item=${item[0]})
    curl_status=$?

    if test "$curl_status" != "0"; then
        break
    fi
    itemdata=$(jq -c -r '.item | del( .icon, .icon_large, .typeIcon )' <<< ${curl_response})
    new_data+="\"${item[0]}\":${itemdata}"

    if (( $current < $length )); then
        new_data+=",\n"
        sleep 1
    else
        new_data+="\n"
    fi
done

new_data+="}"

#test for valid json
test_data=$(echo -e $new_data)
jq -e . >/dev/null 2>&1 <<< $test_data
testjson=$?

#error or save
if (( $curl_status > 0 )); then
    echo "curl error"
    exit ${curl_status}
elif (( $testjson > 0 )); then
    echo "json invalid"
    exit 1
else
    echo -e "var rsapidata = ${new_data};" > ${API_DATA_FILE}
    echo "data saved"
fi
