# Setup Repo GitHub & Deploy GitHub Pages

Token GitHub CLI saat ini tidak memiliki izin membuat repository (403 Forbidden). Ikuti langkah manual berikut:

## 1. Buat Repository di GitHub
- Buka https://github.com/new
- Nama repo: `todo-list-vanilla-js`
- Pilih **Public**
- Jangan centang "Add a README file"
- Klik **Create repository**

## 2. Push Kode ke GitHub
Jalankan perintah berikut di terminal (PowerShell) di folder `C:\Users\user\Downloads\AI CODER CLUB`:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
git remote add origin https://github.com/ghinqonitaaz-prog/todo-list-vanilla-js.git
git branch -M main
git push -u origin main
```

Ganti `ghinqonitaaz-prog` dengan username GitHub kamu jika berbeda.

## 3. Aktifkan GitHub Pages
- Buka repo GitHub kamu: `https://github.com/<username>/todo-list-vanilla-js`
- Klik **Settings** → **Pages**
- Di bawah **Build and deployment** → **Source**, pilih **Deploy from a branch**
- Di **Branch**, pilih `main` dan folder `/ (root)`, lalu klik **Save**

## 4. Akses Aplikasi
Setelah beberapa menit, aplikasi akan tersedia di:
`https://<username>.github.io/todo-list-vanilla-js/`

---

# Setup Firebase (Login & Database)

Aplikasi sudah terintegrasi dengan Firebase untuk menyimpan progres dan login. Ikuti langkah berikut untuk mengaktifkannya:

## 1. Buat Project Firebase
- Buka https://console.firebase.google.com/
- Klik **Add project** atau **Buat project**
- Masukkan nama project (misal: `todo-pomodoro-app`)
- Klik **Continue** lalu **Create project**

## 2. Aktifkan Authentication
- Di menu Firebase Console, pilih **Build** → **Authentication**
- Klik **Get started**
- Pilih tab **Sign-in method**
- Aktifkan **Email/Password**
- Klik **Save**

## 3. Buat Firestore Database
- Di menu Firebase Console, pilih **Build** → **Firestore Database**
- Klik **Create database**
- Pilih **Start in production mode** (kita akan atur rules nanti)
- Klik **Next** lalu pilih lokasi server (pilih yang terdekat)
- Klik **Enable**

## 4. Konfigurasi Firestore Rules (Opsional tapi Disarankan)
Di Firestore Database → **Rules**, ganti dengan:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Ini memastikan setiap user hanya bisa membaca/menulis data mereka sendiri.

## 5. Dapatkan Konfigurasi Firebase
- Di Firebase Console, klik **Project settings** (gear icon)
- Scroll ke bawah, cari **Your apps** → **Web app** (`</>`)
- Jika belum ada web app, klik **Add app** → pilih `</>` (Web)
- Beri nama app (misal: `todo-pomodoro-web`)
- Klik **Register app**
- Salin kode konfigurasi yang ditampilkan

## 6. Edit File Konfigurasi
Buka file `firebase-config.js` di root project, lalu ganti nilai placeholder dengan konfigurasi Firebase kamu:

```javascript
window.firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "nama-project.firebaseapp.com",
  projectId: "nama-project",
  storageBucket: "nama-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

## 7. Test Aplikasi
- Buka `index.html` (Todo List) atau `Pomodoro-timer-app/index.html` di browser
- Klik tombol **Masuk** di pojok kanan atas
- Daftar akun baru atau login dengan akun yang sudah ada
- Setelah login, semua data akan disimpan di Firebase dan bisa diakses dari perangkat lain

## Catatan
- Data tersimpan per user (diidentifikasi oleh UID Firebase)
- Jika belum login, data tetap disimpan di localStorage browser
- Untuk deploy ke GitHub Pages, pastikan file `firebase-config.js` sudah di-push ke repo
