#!/bin/bash
# @see https://runescape.wiki/w/User:Gaz_Lloyd/using_gemw#Exchange_API

starttime=$(date +%s)

API_DATA_FILE=${API_DATA_FILE:="./data/rsapidatawiki.js"}
ITEMS_DATA_FILE=${ITEMS_DATA_FILE:="./data/rsitems.json"}

# @todo Each request is limited to 100 items, upgrade to request 100 at a time
itemjson=$(<${ITEMS_DATA_FILE})
itemstring=$(jq -r '. | keys[] as $k | "\($k)|"' <<< ${itemjson} | tr -d '[:space:]')

curl_response=$(curl -Ssf https://api.weirdgloop.org/exchange/history/rs/latest?id=${itemstring:0:-1})
curl_status=$?

if test "$curl_status" == "0"; then
    #merge local items file with incoming data
    new_data="{\n"
    for row in $(jq -cr '.[]' <<< ${curl_response}); do
        itemid=$(jq -r '.id' <<< ${row})
        itemdata=$(jq -cr --arg itemid "$itemid" .[\"$itemid\"] <<< ${itemjson})
        itemmerged=$(jq -crs 'reduce .[] as $item ({}; . * $item)' <<< $(echo "${row} ${itemdata}"))
        new_data+="\"${itemid}\":${itemmerged},\n"
    done
    new_data="${new_data:0:-3}\n}"

    #test for valid json
    test_data=$(echo -e $new_data)
    jq -e . >/dev/null 2>&1 <<< $test_data
    testjson=$?
fi

endtime=$(date +%s)
runtime=$(( endtime - starttime ))
echo "Runtime: ${runtime}s"

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
