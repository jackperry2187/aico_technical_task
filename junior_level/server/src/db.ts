import fs from 'node:fs';
import path from 'node:path';

interface HistoryEntry {
  type: 'registered' | 'updated';
  timestamp: string;
  before?: Partial<Device>;
  after?: Partial<Device>;
}

export interface Device {
  id: string;
  type: string;
  value: number;
  history: HistoryEntry[];
}

interface Database {
  devices: Device[];
}

const isTest = process.env.NODE_ENV === 'test';
const dbPath = path.join(__dirname, 'database.json');

function load(): Database {
  if (isTest) return structuredClone(require('./mock.json')) as Database;
  return JSON.parse(fs.readFileSync(dbPath, 'utf8')) as Database;
}

let db = load();

export function getDb(): Database {
  return db;
}

export function resetDb(): void {
    db = load();
}

// Persist the current state of the database to disk, unless running in test mode
export function persist(): void {
  if (isTest) return;
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2) + '\n', 'utf8');
}