
import sql from 'better-sqlite3';
import { cache } from 'react';
import { unstable_cache as nextCache } from 'next/cache';

const db = new sql('messages.db');

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY, 
      text TEXT
    )`);
}

initDb();

export function addMessage(message) {
  db.prepare('INSERT INTO messages (text) VALUES (?)').run(message);
}

//Here nextCache is used to add the data return by the inner cache function to the nextjs's data cache(nextCache always returns a promise)
export const getMessages = nextCache(
  //It is for request deduplication which means while rendering on server it the page has multiple component which makes an call to this function in that case this function will execite only once and for any other reequest it will be served from cache this cache is only valid till the render cycle is completed once page is sent to client it will be cleared from cache and for next server-render cycle it will be rexecuted
  cache(async function getMessages() {
    console.log('Fetching messages from db');
    return db.prepare("SELECT * FROM messages").all()
  }), ["messages"], {
  revalidate: 5
}
)
//here messages is just a cache key used internally by nextjs to identify cached data
