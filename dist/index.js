"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_1 = __importDefault(require("./db"));
const City_1 = __importDefault(require("./City"));
const dijkstras_1 = __importDefault(require("./dijkstras"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.get('cities', async (req, res) => {
    try {
        const cities = await City_1.default.find();
        res.json(cities);
    }
    catch (error) {
        console.log('Error fetching city', error);
        res.status(500).json({ error: 'failed to fetch the cities' });
    }
});
app.post('/calculate-path', async (req, res) => {
    const { startCity, endCity } = req.body;
    const cities = await City_1.default.find();
    const graph = {};
    cities.forEach((city) => {
        graph[city.name] = {};
        city.neighbors.forEach((neighbor) => {
            graph[city.name][neighbor.name] = neighbor.distance;
        });
    });
    const shortestPath = (0, dijkstras_1.default)(graph, startCity, endCity);
    res.json({ shortestPath });
});
db_1.default.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server is running in port ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map