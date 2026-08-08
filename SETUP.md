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
