import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import {Low} from 'lowdb';
import {JSONFile} from 'lowdb/node'

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'ryansLaptop.json')

// Configure lowdb to write data to JSON file
const adapter = new JSONFile(file)
const defaultData = {}
const db = new Low(adapter, defaultData)
const saveToDB = async (id, pdData) => {
    try {
        await db.read();
        db.data = db.data || {}; // Initialize db.data if it doesn't exist
        db.data[id] = pdData;
        await db.write();
        console.log("File saved successfully.");
    } catch (error) {
        console.error("Error saving to the database:", error);
    }
};
export default saveToDB;