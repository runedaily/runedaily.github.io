#!/bin/bash
API_FULL_DATA_FILE=${API_FULL_DATA_FILE:="./data/rsapifulldata.js"}

categories=(
'0' #Miscellaneous
'1' #Ammo
'2' #Arrows
'3' #Bolts
'4' #Construction materials
'5' #Construction products
'6' #Cooking ingredients
'7' #Costumes
'8' #Crafting materials
'9' #Familiars
'10' #Farming produce
'11' #Fletching materials
'12' #Food and Drink
'13' #Herblore materials
'14' #Hunting equipment
'15' #Hunting Produce
'16' #Jewellery
'17' #Mage armour
'18' #Mage weapons
'19' #Melee armour - low level
'20' #Melee armour - mid level
'21' #Melee armour - high level
'22' #Melee weapons - low level
'23' #Melee weapons - mid level
'24' #Melee weapons - high level
'25' #Mining and Smithing
'26' #Potions
'27' #Prayer armour
'28' #Prayer materials
'29' #Range armour
'30' #Range weapons
'31' #Runecrafting
'32' #Runes, Spells and Teleports
'33' #Seeds
'34' #Summoning scrolls
'35' #Tools and containers
'36' #Woodcutting product
'37' #Pocket items
'38' #Stone spirits
'39' #Salvage
'40' #Firemaking products
'41' #Archaeology materials
)

throttletime="5"

starttime=$(date +%s)
totalitems=0
totalcalls=0

new_data="[\n"
length=${#itemlist[@]}

new_data="{\n"
for category in "${categories[@]}"; do
    #get category summary
    curl_response=$(curl -Ssf https://secure.runescape.com/m=itemdb_rs/api/catalogue/category.json?category=${category})
    curl_status=$?

    if test "$curl_status" != "0"; then
        echo "error retrieving"
        exit 1
    fi
    sleep ${throttletime}

    for row in $(jq -c '.alpha[] | select(.items > 0)' <<< ${curl_response}); do
        rowletter=$(jq -r .letter <<< ${row})
        rowitems=$(jq .items <<< ${row})
        (( totalitems+=$rowitems ))
        pages=$(( $rowitems / 12 ))
        if (( $rowitems % 12 > 0 )); then
            (( pages++ ))
        fi

        echo "$category - $rowletter - $rowitems - $pages"
        if [[ "$rowletter" == "#" ]]; then
            rowletter="%23"
        fi

        for (( p=1; p<=$pages; p++ )); do
            curl_response=$(curl -Ssf "https://secure.runescape.com/m=itemdb_rs/api/catalogue/items.json?category=${category}&alpha=${rowletter}&page=${p}")
            curl_status=$?

            if test "$curl_status" != "0"; then
                echo "error 2"
                exit 1
            elif [[ "${curl_response} " == " " ]]; then
                echo "no data returned - ${category} - ${rowletter} - ${rowitems} - ${p}"
                exit 1
            fi

            while read itemdata; do
                itemid=$(jq .id <<< ${itemdata})
                new_data+="\"${itemid}\":${itemdata},\n"
            done <<< $(jq -c -r '.items[] | del( .icon, .icon_large, .typeIcon )' <<< ${curl_response})

            sleep ${throttletime}
            (( page++ ))
            (( totalcalls++ ))
        done
    done
done

new_data="${new_data:0:-3}\n}"

echo -e $new_data

#test for valid json
test_data=$(echo -e $new_data)
jq -e . >/dev/null 2>&1 <<< $test_data
testjson=$?

endtime=$(date +%s)
runtime=$(( endtime - starttime ))
echo "Runtime: ${runtime}s Items: ${totalitems} Requests: ${totalcalls}"

#error or save
if (( $curl_status > 0 )); then
    echo "curl error"
    exit ${curl_status}
elif (( $testjson > 0 )); then
    echo "json invalid"
    exit 1
else
    echo -e "var rsapidata = ${new_data};" > ${API_FULL_DATA_FILE}
    echo "data saved"
fi
