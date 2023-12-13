const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js')+'');

function generateGraph(){       //Generates random graph for testing purposes
    const nodeAmount = jsc.integer(0, 10).generator();    //Generates the number of nodes between 1-10
    const graph = getGraph(nodeAmount);                   //Create a graph with a random number of nodes
    for(let i=0; i<nodeAmount; i++){                      //Iterate over each node in the graph
        for(let j=i+1; j<nodeAmount; j++){                //Iterate over the nodes that come after i (Avoids duplicate edges)
            if(jsc.integer(0, 1).generator()==1){       //Randomly chooses whether to add an edges between i and j
                addEdge(graph, i, j);                   //Adds edge
            }
        }
    }
    return graph;
}

const test= 
    jsc.forall("nat", function(arr){
        const graph = generateGraph();      //Generate a random graph
        const startNode = jsc.integer(0, graph.length-1).generator();   //Choose a random source
        const targetNode = jsc.integer(0, graph.length-1).generator();  //Choose a random target
        if(startNode == targetNode){                                    //Checks if source and target nodes are the same
            return true;
        }

        const path = depthFirstSearch(graph, startNode, targetNode);    //Runs depthFirstSearch
        const isPathGood = Array.isArray(path) && path.every(node => Number.isInteger(node) && node>=0 && node<graph.length);   //Checks if the path is vaild
        
        return isPathGood;
    });

jsc.assert(test);   //Runs the test