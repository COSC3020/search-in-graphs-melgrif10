function getGraph(nodeAmount){
    return Array.from({length: nodeAmount}, ()=>Array(nodeAmount).fill(0)); //Creates an empty adjacency matrix 
}

function addEdge(graph, node1, node2){  //Adds edge between nodes 1 and 2
    graph[node1][node2]=1;
    graph[node2][node1]=1;
}

function depthFirstSearch(graph, startNode, targetNode) {
    const nodesVisited = new Set();         //Keeps track of if node has been visited or not
    const path = [];                        //Stores the nodes on the path from start to target

    function recursive(currentNode){        //Recursive helper function
        if(currentNode == targetNode){      //If the current node is the target node
            path.push(currentNode);         //Add it to the path array 
            return true;                    //Return true
        }
        nodesVisited.add(currentNode);      //Mark that the current node has been visited
        for(let i=0; i<graph.length; i++){  //Looks at the nodes next to the current node
            if(graph[currentNode][i]==1 && !nodesVisited.has(i)){   //Checks if there is an edges between the current node and i and if i has been visited
                path.push(currentNode);     //Add the current node to the path array
                if(recursive(i)){           //Recursively visit node i
                    return true;
                }
                path.pop();                 //If the target is not found in this branch backtrack
            }
        }
        return false;                       //If the target is not found return false
    }
    return path;                            //Return the path from source to target nodes
}
