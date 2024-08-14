"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const citySchema = new mongoose_1.default.Schema({
    name: String,
    neighbors: [{ name: String, distance: Number }],
});
const City = mongoose_1.default.model('City', citySchema);
exports.default = City;
//# sourceMappingURL=City.js.map