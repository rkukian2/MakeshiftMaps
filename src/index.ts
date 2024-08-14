import express from "express";
import bodyParser from "body-parser";
import db from "./db";
import City from "./City";
import dijkstra from "./dijkstras";
import { ICity } from "./City";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

interface Neighbors {
    [name: string]: number
 }


app.get('cities', async (req, res) => {
    try {
        const cities = await City.find();
        res.json(cities)
    } catch (error) {
        console.log('Error fetching city', error);
        res.status(500).json({error: 'failed to fetch the cities'});
    }
});

app.post('/calculate-path', async (req, res) => {
    const {startCity, endCity} = req.body;

    const cities: ICity[] = await City.find();
    const graph: Record<string, Neighbors> = {}

    cities.forEach((city) => {
        graph[city.name] = {};
        city.neighbors.forEach((neighbor) => {
          graph[city.name][neighbor.name] = neighbor.distance;
        });
    });
    
    const shortestPath = dijkstra(graph, startCity, endCity);
    res.json({ shortestPath });
});

db.once('open', () => {
    app.listen(PORT, ()=> {
        console.log(`Server is running in port ${PORT}`)
    });
});


