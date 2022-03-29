

const stationGraph = new Map();

function addNode(station)
{
    stationGraph.set(station, []);
}

// 

function addEdge(origin, destination, distance)
{
    stationGraph.get(origin).push([destination, distance]);
}

// for(const )