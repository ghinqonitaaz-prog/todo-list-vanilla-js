const FirebaseApp = (function () {
  let currentUser = null;
  let auth = null;
  let db = null;

  function init(onUserChanged) {
    if (!window.firebaseConfig || window.firebaseConfig.apiKey === "YOUR_API_KEY") {
      console.warn("Firebase belum dikonfigurasi. Edit firebase-config.js dengan kredensial Firebase kamu.");
      return;
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(window.firebaseConfig);
    }
    auth = firebase.auth();
    db = firebase.firestore();

    auth.onAuthStateChanged((user) => {
      currentUser = user;
      if (onUserChanged) onUserChanged(user);
    });
  }

  async function signup(email, password) {
    const cred = await auth.createUserWithEmailAndPassword(email, password);
    await ensureUserDoc(cred.user.uid, email);
    return cred.user;
  }

  async function login(email, password) {
    const cred = await auth.signInWithEmailAndPassword(email, password);
    return cred.user;
  }

  async function logout() {
    await auth.signOut();
  }

  async function ensureUserDoc(uid, email) {
    const ref = db.collection("users").doc(uid);
    const snap = await ref.get();
    if (!snap.exists) {
      await ref.set({
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  }

  function userDocRef(uid) {
    return db.collection("users").doc(uid);
  }

  async function saveData(collection, docId, data) {
    if (!currentUser) throw new Error("Belum login");
    const ref = db.collection("users").doc(currentUser.uid).collection(collection).doc(docId);
    await ref.set({ ...data, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }, { merge: true });
  }

  async function loadData(collection, docId) {
    if (!currentUser) return null;
    const ref = db.collection("users").doc(currentUser.uid).collection(collection).doc(docId);
    const snap = await ref.get();
    return snap.exists ? snap.data() : null;
  }

  return {
    init,
    signup,
    login,
    logout,
    saveData,
    loadData,
    get currentUser() { return currentUser; }
  };
})();
