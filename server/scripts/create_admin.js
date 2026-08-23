#!/usr/bin/env node
import bcrypt from 'bcryptjs';
import readline from 'readline';
import { query } from '../db/db.js';

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

(async function main(){
  try {
    const username = (process.argv[2] || await ask('Admin username (default admin): ')) || 'admin';
    const password = process.argv[3] || await ask('Admin password: ');
    if (!password) { console.error('Password is required'); process.exit(1); }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const existing = await query.get('SELECT * FROM users WHERE username = ?', [username]);
    if (existing) {
      await query.run('UPDATE users SET passwordHash = ? WHERE id = ?', [passwordHash, existing.id]);
      console.log(`Updated password for ${username}`);
    } else {
      await query.run('INSERT INTO users (username, passwordHash, role) VALUES (?, ?, ?)', [username, passwordHash, 'admin']);
      console.log(`Created admin user ${username}`);
    }
    process.exit(0);
  } catch (err) {
    console.error('Failed to create/update admin user', err);
    process.exit(1);
  }
})();
