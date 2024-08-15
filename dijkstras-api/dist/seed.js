"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const City_1 = __importDefault(require("./City"));
const db_1 = __importDefault(require("./db"));
db_1.default.once('open', async () => {
    await City_1.default.deleteMany();
    const cities = [
        {
            name: 'Flathead Lake',
            neighbors: [
                { name: 'Whitefish', distance: 32 },
                { name: 'Strawberry Mountain', distance: 40 },
            ],
        },
        {
            name: 'Strawberry Mountain',
            neighbors: [
                { name: 'Flathead Lake', distance: 40 },
                { name: 'Hungry Horse', distance: 44 },
            ],
        },
        {
            name: 'Whitefish',
            neighbors: [
                { name: 'Flathead Lake', distance: 32 },
                { name: 'Hungry Horse', distance: 25 },
                { name: 'Lake McDonald', distance: 48 },
            ],
        },
        {
            name: 'Hungry Horse',
            neighbors: [
                { name: 'Whitefish', distance: 25 },
                { name: 'Lake McDonald', distance: 26 },
                { name: 'Strawberry Mountain', distance: 44 },
            ],
        },
        {
            name: 'Lake McDonald',
            neighbors: [
                { name: 'Whitefish', distance: 48 },
                { name: 'Hungry Horse', distance: 26 },
                { name: 'Highline Trail', distance: 35 },
                { name: 'Avalanche Lake', distance: 20 },
                { name: 'Two Medicine Lake', distance: 88 },
            ],
        },
        {
            name: 'Avalanche Lake',
            neighbors: [
                { name: 'Lake McDonald', distance: 20 },
                { name: 'Logan Pass', distance: 40 },
            ],
        },
        {
            name: 'Highline Trail',
            neighbors: [
                { name: 'Logan Pass', distance: 10 },
                { name: 'Lake McDonald', distance: 35 },
                { name: 'Iceberg Trail', distance: 84 },
            ],
        },
        {
            name: 'Iceberg Trail',
            neighbors: [
                { name: 'Highline Trail', distance: 84 },
                { name: 'Grinnell Glacier', distance: 169 },
            ],
        },
        {
            name: 'Logan Pass',
            neighbors: [
                { name: 'Highline Trail', distance: 10 },
                { name: 'Avalanche Lake', distance: 40 },
                { name: 'Virginia Falls', distance: 14 },
                { name: 'Grinnell Glacier', distance: 12 },
            ],
        },
        {
            name: 'Grinnell Glacier',
            neighbors: [
                { name: 'Iceberg Trail', distance: 169 },
                { name: 'Logan Pass', distance: 12 },
                { name: 'Virginia Falls', distance: 26 },
            ],
        },
        {
            name: 'Virginia Falls',
            neighbors: [
                { name: 'Logan Pass', distance: 14 },
                { name: 'Grinnel Glacier', distance: 26 },
                { name: 'Two Medicine Lake', distance: 68 },
            ],
        },
        {
            name: 'Two Medicine Lake',
            neighbors: [
                { name: 'Virginia Falls', distance: 68 },
                { name: 'Lake McDonald', distance: 88 },
            ],
        },
    ];
    await City_1.default.insertMany(cities);
    console.log('Example data inserted');
    process.exit();
});
//# sourceMappingURL=seed.js.map