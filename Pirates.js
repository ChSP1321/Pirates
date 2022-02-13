function solve(input) {
   
    let commandLine = input.shift();
    let cities = {};
    
    while(commandLine !== "Sail"){
        let [myCity, firstPopulation, firstGold] = commandLine.split('||');
        let population = Number(firstPopulation);
        let gold = Number(firstGold);
        if (cities[myCity] === undefined){
            cities[myCity] = {population, gold};
            }else {
                cities[myCity].population = cities[myCity].population + population;
                cities[myCity].gold = cities[myCity].gold + gold;
            }
        commandLine = input.shift();
    }

    commandLine = input.shift();
    while(commandLine !== "End"){
        let [command, city, firstArguments, secondArguments] = commandLine.split("=>");
        let firstArgument = Number(firstArguments);
        let secondArgument = Number(secondArguments);
        if(command === "Plunder"){
            cities[city].population -= firstArgument;
            cities[city].gold -= secondArgument;
            console.log(`${city} plundered! ${secondArgument} gold stolen, ${firstArgument} citizens killed.`);
            if((cities[city].population <= 0) || (cities[city].gold <= 0)){
                delete cities[city];
                console.log(`${city} has been wiped off the map!`)
            }
        }
        else if (command === "Prosper"){
            if(firstArgument <= 0){
                console.log(`Gold added cannot be a negative number!`)
            }else{
                let sumGold = cities[city].gold + firstArgument;
                cities[city].gold += firstArgument;
                console.log(`${firstArgument} gold added to the city treasury. ${city} now has ${sumGold} gold.`);
            }
        }
        commandLine = input.shift();
    }

    let visibleCities = Object.keys(cities);
    let counter = 0;
    for (const cities of visibleCities) {
        counter++;
    }
    if (counter > 0) {
        
        let citiesEntries = Object.entries(cities);
        citiesEntries.sort((a,b) => {
            if (a[0].gold == b[0].gold) {
                return b[0].localeCompare(a[0]);
            }else{
                return a[1].gold - b[1].gold;
            } 
        });
        console.log(`Ahoy, Captain! There are ${counter} wealthy settlements to go to:`);
        for (const kvp of citiesEntries) {
            console.log(`${kvp[0]} -> Population: ${kvp[1].population} citizens, Gold: ${kvp[1].gold} kg`);
        }
    }else {
        console.log(`Ahoy, Captain! All targets have been plundered and destroyed!`);
    }
}

solve(["Nassau||95000||1000",
"San Juan||930000||1250",
"Campeche||270000||690",
"Port Royal||320000||1000",
"Port Royal||100000||2000",
"Sail",
"Prosper=>Port Royal=>-200",
"Plunder=>Nassau=>94000=>750",
"Plunder=>Nassau=>1000=>150",
"Plunder=>Campeche=>150000=>690",
"End"]);
