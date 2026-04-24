# 🏠 AI Native Project Plan — Kost App (React Native)

## 📌 Overview

Aplikasi mobile untuk mencari & menyewa kost berbasis **React Native**, dengan backend API (Laravel / Node.js).

Pendekatan: **AI Native Development**
→ AI sebagai partner coding (bukan sekadar tools)

---

# 🎯 1. Project Scope

## 🎯 Tujuan

Membuat aplikasi pencarian dan booking kost secara online.

## 👥 Target User

* Mahasiswa
* Pekerja rantau

## ⭐ Core Features (MVP)

* Authentication (Login/Register)
* List Kost
* Detail Kost
* Booking Kost
* Riwayat Booking

---

# 🧠 2. AI Context Document

## 🧱 Tech Stack

```md
Frontend:
- React Native (Expo)

Backend:
- Laravel API / Express.js

State Management:
- Zustand / BLoC

API:
- REST JSON
```

## 🏗 Architecture

```md
- Clean Architecture
- Feature-based structure
- Separation:
  - presentation
  - domain
  - data
```

## 📏 Rules

```md
- Gunakan async/await
- Pisahkan UI & logic
- Gunakan reusable component
- Error handling wajib
```

---

# 📂 3. Struktur Project

```bash
src/
 ├── core/
 │    ├── api/
 │    ├── utils/
 │
 ├── features/
 │    ├── auth/
 │    ├── kost/
 │    ├── booking/
 │
 ├── shared/
 │    ├── components/
 │    ├── theme/
```

---

# 🧩 4. Breakdown Feature (Micro Task)

## 🔐 Auth

* UI Login
* UI Register
* Integrasi API Auth
* Simpan token

## 🏠 Kost

* Get list kost
* Search kost (kota)
* Filter harga

## 📄 Detail Kost

* Tampilkan foto
* Fasilitas
* Harga

## 📅 Booking

* Pilih tanggal
* Submit booking
* Status booking

---

# 🤖 5. AI Workflow (WAJIB)

## 🔁 Feedback Loop

1. Prompt
2. Generate
3. Review
4. Improve

---

# 💬 6. Prompt Template (SIAP PAKAI)

## 📌 Setup Struktur

```txt
Buatkan struktur folder React Native dengan clean architecture
untuk aplikasi sewa kost dengan fitur:
auth, kost, booking
```

---

## 📌 UI Login

```txt
Buatkan UI login React Native dengan:
- email & password
- validasi sederhana
- tombol login
- loading state
```

---

## 📌 API Integration

```txt
Buatkan service API untuk login menggunakan fetch/axios
dengan response JSON dan error handling
```

---

## 📌 List Kost

```txt
Buatkan screen React Native untuk menampilkan list kost:
- gunakan FlatList
- tampilkan nama, harga, lokasi
- ada loading & error state
```

---

## 📌 Booking Feature

```txt
Buatkan fungsi booking kost dengan:
- input tanggal
- kirim ke API
- tampilkan status sukses/gagal
```

---

# 👨‍💼 7. Cara Pakai AI (Best Practice)

## ✅ Lakukan

* Prompt spesifik
* Kasih context
* Review hasil

## ❌ Jangan

* Minta full app
* Prompt terlalu umum
* Copy paste tanpa cek

---

# ⚡ 8. Development Flow

```md
Step 1: Setup project
Step 2: Auth feature
Step 3: Kost list
Step 4: Detail kost
Step 5: Booking
Step 6: Testing
```

---

# 🔍 9. Validasi (Checklist)

* API jalan?
* UI responsive?
* Error handling ada?
* Code clean?

---

# ⚠️ 10. Common Mistakes

* ❌ Langsung generate full app
* ❌ Tidak pakai context
* ❌ Tidak modular
* ❌ Tidak testing

---

# 🚀 11. Scaling (Advanced)

Jika sudah stabil:

## Multi-Agent Setup

* AI 1 → UI
* AI 2 → Backend integration
* AI 3 → Testing

## Tambahan Feature

* Chat pemilik kost
* Payment integration
* Map lokasi

---

# 🧠 Final Insight

AI Native =
👉 Kamu jadi “arsitek”, AI jadi “eksekutor”

---

# ✅ Next Step

Mulai dari:

1. Setup project React Native
2. Gunakan prompt di atas
3. Build per fitur (jangan lompat)

---
