
const busRoutes = require("./bus_line_routes.json");
const busInStationData = require('./bus_in_stations.json');
const graph = require('./station_graph.json');
const stationData = require("./bus_station_id_info.json");
const stationGraph = new Map(Object.entries(graph));
const busInfo = require('./bus_line_detail_start.json');

function findNumberOfStops(bus, start, destination) {


    let stop = 0;
    let foundStart = false;
    let foundEnd = false;
    for (let i = 0; i < busRoutes[bus].length; i++) {
        if (!foundStart && start == busRoutes[bus][i]) {

            foundStart = true;
            stop = 0;
        }
        if (foundStart && destination.has(busRoutes[bus][i])) {
            break;
        }
        stop++;
    }
    return stop;


}

function oneTransitRoutes(start, end) {
    // to find 1 transit routes
    // go to station graph
    // go to the starting node
    // check the next nodes
    // while checking the next nodes go to the each bus
    // when going through each bus, check whether they have the END route in their possible routes
    // if they have. Choose that bus
    const queue = [start];
    const visited = new Set();
    // get end stations busses
    const busInStation = new Map(Object.entries(busInStationData));

    const stationInfo = new Map(Object.entries(stationData));
    // since there are many stations also get ID of stations with the same name. There are almost no difference between their distance
    const endStationName = stationInfo.get(end).station_name;

    const possibleEndId = new Map();

    for (let item of stationInfo) {

        if (item[1].station_name == endStationName) {
            possibleEndId.set(item[0])
        }
    }

    // const possibleBus = [...busInStation.get(end)];

    let possibleBus = new Map();
    // for each possible end stations. Look at their bus and push it to possibleBus
    for (let item of possibleEndId) {
        busInStation.get(item[0]).forEach((bus) => {
            possibleBus.set(bus, 1);
        })
    }
    let allRoutes = [];
    let counter = 0;
    while (queue.length > 0) {
        let stops = 0;
        const station = queue.shift();
        const nextStations = stationGraph.get(station);
        for (const next in nextStations) {

            busInStation.get(next).forEach((bus) => {
                if (possibleBus.has(bus)) {
                    stops += findNumberOfStops(bus, station, possibleEndId);
                    // next is the station. Find bus that comes goes from start to next
                    let midStationBuses = busInStation.get(next);
                    let startStationBuses = busInStation.get(start);
                    let commonBus = startStationBuses.filter(x => midStationBuses.indexOf(x) !== -1);

                    if (commonBus.length != 0) {
                        stops += findNumberOfStops(commonBus[0], startStationBuses, midStationBuses);
                        console.log("total stops: " + stops + ": sit from: " + start + ": to: " + commonBus + ": drop at: " + next + ": and sit:" + bus);
                       

                        // console.log("sit on:" + commonBus + ": drop at station: " + stationInfo.get(next).station_name + " and hop into bus: " + busInfo[bus].line_name);
                        allRoutes.push([stops, start, commonBus, next, bus, end]);

                        counter++;
                    }

                    // find the number of stops 
                }
            })
            if (!visited.has(next)) {
                queue.push(next);
                visited.add(next);
            }
        }

    }
    // let's just take all the best.
    // allRoutes.sort(function (a, b) { return a[0] - b[0] });
    // console.log(allRoutes);
    let minimum = allRoutes[0][0];
    let minimumIndex = 0;
    allRoutes.forEach((item, index) => {
        if(item[0] < minimum)
        {
            minimum = item[0];
            minimumIndex = index;
        }
    })
    console.log("sit on:" + allRoutes[minimumIndex][2] + " drop at station: " + allRoutes[minimumIndex][3] + " and hop into bus: " + allRoutes[minimumIndex][4]);
    console.log(allRoutes[minimumIndex][0]);


    console.log(counter);

}

oneTransitRoutes("000000771", "000000414")