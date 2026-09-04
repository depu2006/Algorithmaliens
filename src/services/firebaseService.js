import { collection, addDoc, query, orderBy, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

// Lazy accessor — avoids module-level crash when Firebase is not configured
const getContactsCollection = () => db ? collection(db, 'contacts') : null;

export async function submitContactToFirestore(payload) {
  const contactsCollection = getContactsCollection();
  if (!contactsCollection) {
    console.warn('[Firestore Web SDK] Firebase not configured, skipping Firestore write.');
    return { success: false };
  }
  try {
    const docRef = await addDoc(contactsCollection, {
      name: payload.name,
      email: payload.email,
      phone: payload.phone || '',
      subject: payload.subject || '',
      company: payload.company || null,
      service: payload.service || null,
      projectDescription: payload.projectDescription || null,
      message: payload.message || '',
      type: payload.type || 'contact',
      status: 'new',
      createdAt: serverTimestamp()
    });
    console.log('[Firestore Web SDK] Document written with ID:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (err) {
    console.warn('[Firestore Web SDK Notice]', err.message);
    throw err;
  }
}

export async function getContactsFromFirestore() {
  const contactsCollection = getContactsCollection();
  if (!contactsCollection) return [];
  const q = query(contactsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const rows = [];
  snapshot.forEach(d => rows.push({ id: d.id, ...d.data() }));
  return rows;
}

export async function updateContactStatusInFirestore(id, status) {
  if (!db) return { success: false };
  const d = doc(db, 'contacts', id);
  await updateDoc(d, { status });
  return { success: true };
}

export async function deleteContactFromFirestore(id) {
  if (!db) return { success: false };
  const d = doc(db, 'contacts', id);
  await deleteDoc(d);
  return { success: true };
}

export function uploadFileToStorage(file, pathPrefix = 'uploads') {
  if (!storage) return Promise.reject(new Error('Firebase Storage not configured'));
  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, `${pathPrefix}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on('state_changed',
      () => {},
      (err) => reject(err),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url });
      }
    );
  });
}
