const Node = require('../model/node').Node;

class BFS_Service {
    goal = [[1, 2, 3], [4, 5, 6], [7, 8, 0]]
    dir_row = [-1, 1, 0, 0]
    dir_col = [0, 0, -1, 1]
    direction = ['U','D','L','R'];
    hashset = new Set();

    checkEquals(a, b) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
    
    deepCopyArray(array) {
        return array.map(row => row.slice());
    }

    isVisited(a) {
        if (this.hashset.has(JSON.stringify(a)))
            return true;
        return false;
    }

    setVisited(a) {
        this.hashset.add(JSON.stringify(a));
    }


    expand(current) {
        const list_of_child_nodes= [];
        let x = current.coordinates[0];
        let y = current.coordinates[1];
        for (let i = 0; i < 4; i++) {
            const new_node = new Node();
            new_node.state = this.deepCopyArray(current.state);
            new_node.path = [...current.path];
            (new_node.path).push(this.direction[i]);
            let new_x = x + this.dir_row[i];
            let new_y = y + this.dir_col[i];
            if (new_x >= 0 && new_x < 3 && new_y >= 0 && new_y < 3) {
                let temp = new_node.state[new_x][new_y];
                new_node.state[new_x][new_y] = new_node.state[x][y];
                new_node.state[x][y] = temp;
                new_node.coordinates[0] = new_x;
                new_node.coordinates[1] = new_y;
                list_of_child_nodes.push(new_node);
            }
        }
        return list_of_child_nodes;
    }

    bfs(start, parent) {
        const queue = [];
        queue.push([start, parent]);
        while(queue.length !== 0) {
            let [x, parent] = queue.shift();
            // console.log('x', x);
            this.setVisited(x.state);
            if (this.checkEquals(x.state, this.goal)) {
                console.log("MOVES: ");
                console.log(x.path);
                return x.path;
            }
            for (let child of this.expand(x)) {
                // console.log('child', child);
                if (!this.isVisited(child.state)) {
                    const node = {
                        name: child.state,
                        children: [],
                    }
                    parent.push(node);
                    queue.push([child, node.children]);
                    this.setVisited(child.state);
                }
            }
        }
        return 0;
    }





    start(start) {
        // start =  [[5, 1, 2, 3], [9, 6, 7, 4], [13, 10, 11, 8], [0, 14, 15, 12]];
        const s = new Node();
        s.state = this.deepCopyArray(start);
        const tree = {
            name: start,
            children: [],
        }
        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (start[i][j] == 0) {
                    s.coordinates[0] = i;
                    s.coordinates[1] = j;
                }
            }
        }
        const path = this.bfs(s, tree.children);

        return { "path": path, "tree": tree };
    }
}

exports.BFS_Service = BFS_Service;