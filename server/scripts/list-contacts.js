import fs from 'fs/promises';
import path from 'path';

const keyPath = process.argv[2] || path.join(process.cwd(), './firebase-service-account.json');

try {
  const admin = await import('firebase-admin');
  const keyJson = JSON.parse(await fs.readFile(keyPath, 'utf8'));
  admin.initializeApp({ credential: admin.cert(keyJson) });
  const { getFirestore } = await import('firebase-admin/firestore');
  const db = getFirestore(admin.getApp());

  const snapshot = await db.collection('contacts').get();
  console.log(`[list-contacts] Found ${snapshot.size} documents in 'contacts'`);
  snapshot.forEach(doc => {
    console.log('---');
    console.log('id:', doc.id);
    console.log(JSON.stringify(doc.data(), null, 2));
  });
} catch (err) {
  console.error('[list-contacts] Error:', err);
  process.exit(1);
}
