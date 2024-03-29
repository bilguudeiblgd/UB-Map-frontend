const busRoutes = require("./bus_line_routes.json");
const busInStationData = require('./bus_in_stations.json');
const graph = require('./station_graph.json');
const stationData = require("./bus_station_id_info.json");
const stationGraph = new Map(Object.entries(graph));
const busInfo = require('./bus_line_detail_start.json');

function findMinumumStep(start, end) {
    const queue = [start];
    const visited = new Set();

    const stationInfo = new Map(Object.entries(stationData));

    let possibleBus = new Map();
    const edges = [];
    edges[start] = 0;
    const predecessors = [];
    predecessors[start] = null;
    const buildPath = (start, end, predecessors) => {

        const stack = [];
        stack.push(end);

        let u = predecessors[end];

        while (u != start) {
            stack.push(u);
            u = predecessors[u];
        }

        stack.push(start);

        let path = stack.reverse();

        return path;
    }

    while (queue.length > 0) {
        let stops = 0;
        const station = queue.shift();
        const nextStations = stationGraph.get(station);

        if (station == end) {
            return buildPath(start, end, predecessors);
        }


        for (const next in nextStations) {

            if (!visited.has(next)) {
                queue.push(next);
                visited.add(next);
                edges[next] = edges[station] + 1;
                predecessors[next] = station;
            }
        }

    }

}



function main() {
    const path = findMinumumStep("000000166", "000000279");

    console.log(path);
    // Go to graph
    // See the buses that goes to the stations
    // Go to next station. If eliminate bus that aren't there
    // We can get the MOST PROLONGED Bus later on

    // put it bus into a map;
    let currentBus = stationGraph.get(path[0])[path[1]];
    let possibleBus = new Map();
    currentBus.forEach((bus) => {
        possibleBus.set(bus, [0]);
    });
    let allBus = new Map(possibleBus);
    let busInStation = [currentBus];
    let guideline = new Map();
    let words = [];
    let preBus;
    for (let i = 1; i < path.length - 1; i++) {

        let nextBus = stationGraph.get(path[i])[path[i + 1]];

        nextBus.forEach((bus) => {
            if (!busInStation[i]) busInStation[i] = []
            else busInStation[i].push(bus);
            if (allBus.has(bus)) {
                // console.log("bus:" + bus + ": to get from: " + path[i] + " to -> " + path[i + 1]);
                let pastRoute = allBus.get(bus);
                pastRoute.push(i);
                allBus.set(bus, pastRoute);
            }
            else {
                allBus.set(bus, [i]);
            }

            // preBus equals bus with the most score

        });

    }

    let noTransit = new Map();
    let oneTransit = [];
    let twoTransit = new Map();
    let start = 0;
    let pointer = path.length - 2;
    // find no transit bus
    for (let item of allBus) {
        const [key, arr] = item;
        if (arr.length == path.length - 1) {
            noTransit.set(key, arr);
        }
    }
    console.log(noTransit);
    let allPath = new Set();
    for (let item of allBus) {
        // take two arrays

        const [key, arr] = item;
        if (arr.length == path.length - 1) {
            allBus.delete(key);
            continue;
        }
        arr.forEach((item) => {
            allPath.add(item);
        });
        for (let item1 of allBus) {
            const [key1, arr1] = item1;
            if (arr1.length == path.length - 1) {
                allBus.delete(key1);
                continue;
            }
            arr1.forEach((item) => {
                allPath.add(item);
            });
            
            if (item != item1) {
                if (allPath.size == path.length - 1) {
                    oneTransit.push(item);
                    oneTransit.push(item1);
                }
            }
            arr1.forEach((item) => {
                allPath.delete(item);
            })

        }
        // put them into a set
    };
   
    console.log(oneTransit);
    return {data: oneTransit, names: path};
}

main();
