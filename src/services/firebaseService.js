import { collection, addDoc, query, orderBy, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

const contactsCollection = collection(db, 'contacts');

export async function submitContactToFirestore(payload) {
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
  const q = query(contactsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  const rows = [];
  snapshot.forEach(d => rows.push({ id: d.id, ...d.data() }));
  return rows;
}

export async function updateContactStatusInFirestore(id, status) {
  const d = doc(db, 'contacts', id);
  await updateDoc(d, { status });
  return { success: true };
}

export async function deleteContactFromFirestore(id) {
  const d = doc(db, 'contacts', id);
  await deleteDoc(d);
  return { success: true };
}

export function uploadFileToStorage(file, pathPrefix = 'uploads') {
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
