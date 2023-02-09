const express = require('express');
const app = express();
const cors = require('cors');
const BFS_Service = require('./services/bfs-service').BFS_Service;
const ASTAR_Service = require('./services/astar-service').ASTAR_Service;
const IDDFS_Service = require('./services/iddfs-service').IDDFS_Service;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/bfs', (req, res) => {
    console.log(req.body);
    const bfs_service = new BFS_Service();
    start =  req.body.start;
    res.json(bfs_service.start(start));
});

app.post('/astar', (req, res) => {
    console.log(req.body);
    const bfs_service = new ASTAR_Service();
    start =  req.body.start;
    res.json(bfs_service.start(start));
});

app.post('/iddfs', (req, res) => {
    console.log(req.body);
    const bfs_service = new IDDFS_Service();
    start =  req.body.start;
    res.json(bfs_service.start(start));
});

app.listen(4000);