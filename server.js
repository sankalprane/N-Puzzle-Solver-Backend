const express = require('express');
const app = express();
const BFS_Service = require('./services/bfs-service').BFS_Service;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/bfs', (req, res) => {
    console.log(req.body);
    const bfs_service = new BFS_Service();
    start =  [[5, 1, 2, 3], [9, 6, 7, 4], [13, 10, 11, 8], [0, 14, 15, 12]];
    res.json(bfs_service.start(start));
});

app.listen(3000);