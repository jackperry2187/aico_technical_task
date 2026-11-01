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

function load(): Database {
  if (isTest) return require('./mock.json') as Database;
  return JSON.parse(fs.readFileSync('./database.json', 'utf8')) as Database;
}

const db = load();

export function getDb(): Database {
  return db;
}

// Persist the current state of the database to disk, unless running in test mode
export function persist(): void {
  if (isTest) return;
  fs.mkdirSync(path.dirname('./database.json'), { recursive: true });
  fs.writeFileSync('./database.json', JSON.stringify(db, null, 2) + '\n', 'utf8');
}