import mongoose, {Document, Schema } from "mongoose";

export interface ICity extends Document {
    name: string;
    neighbors: {
        name: string;
        distance: number;
    }[];
}

const citySchema = new mongoose.Schema<ICity>({
    name: String,
    neighbors: [{ name: String, distance: Number }],
});

const City = mongoose.model<ICity>('City', citySchema)

export default City;