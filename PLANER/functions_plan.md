# 🛠️ Perencanaan Fungsi & API Berdasarkan Role (Role-Based Methods Map)

Dokumen ini adalah pemetaan teknis (*Method Mapping*) untuk semua fungsi, tipe input/output (DTO), dan Service yang harus kita bangun di NestJS. Ini didasarkan pada `app_workflow.md`.

---

## 🔐 1. Modul Autentikasi (Universal)
Fitur universal yang tidak terikat otorisasi role, diperuntukkan di `AuthController` dan `AuthService`.

| Fungsi/Method | Endpoint | Keterangan |
|---|---|---|
| `register()` | `POST /auth/register` | Fungsi pendaftaran untuk semua tipe role. Menerima `RegisterDto` (email, password, nama, role wajib diisi). Sistem melakukan *hash* menggunakan `bcrypt` lalu menyimpan ke tabel User. |
| `login()` | `POST /auth/login` | Fungsi verifikasi login. Menerima `LoginDto` (email, password). Jika verifikasi `bcrypt.compare()` sukses, *auth service* akan menyerahkan payload *(id, email, role)* untuk di-sign menjadi JWT Token. Mengembalikan objek `{ accessToken: "..." }`. |

---

## 🔍 2. Fungsi Role: PENCARI (Penyewa)
Semua fungsi berikut mengacu pada kebutuhan Pencari Kost.

### Module: Kost (`KostService`)
| Fungsi/Method | Endpoint | Guard Level | Keterangan |
|---|---|---|---|
| `findAllKosts()` | `GET /kost` | `Public` (Akses Bebas) | Fungsi membaca tabel Kost untuk semua pengunjung. Wajib memperhitungkan filter query parametrik seperti `?city=` dan `?maxPrice=`. |
| `findKostById()` | `GET /kost/:id` | `Public` (Akses Bebas) | Mengembalikan struktur objek detail kost dari Prisma (termasuk list facilities & array String gambar). |

### Module: Booking (`BookingService`)
| Fungsi/Method | Endpoint | Guard Level | Keterangan |
|---|---|---|---|
| `createBooking()` | `POST /booking` | `@Roles('PENCARI')` | Memasukkan record baru ke database. Menerima `CreateBookingDto` *(kostId, startDate, durationMonths)*. Logic Service wajib mengambil field harga di tabel Kost lalu mengalikannya dengan *duration* per bulan untuk mengisi otomatis field `totalPrice`. Parameter status dibuat otomatis `PENDING`. |
| `findMyBookings()` | `GET /booking` | `@Roles('PENCARI')` | Fungsi historis yang di-_filtering_ berdasarkan subjek JWT Token / `userId` PENCARI. Mengambil seluruh pesanan dari user tersebut. |

---

## 💼 3. Fungsi Role: PEMILIK (Pemberi Sewa)
Semua fungsi berikut adalah administrasi pengelolaan kos yang dilindungi sangat ketat khusus Pemilik.

### Module: Kost (`KostService`)
| Fungsi/Method | Endpoint | Guard Level | Keterangan |
|---|---|---|---|
| `createKost()` | `POST /kost` | `@Roles('PEMILIK')` | Fungsi membuat Kost baru. Mengambil `ownerId` berdasarkan subjek Token `req.user.id`. Data DTO *(name, description, city, dll)* akan langsung direkam. |
| `findMyKosts()` | `GET /kost/my` | `@Roles('PEMILIK')` | Menampilkan dashboard kost milik user spesifik. Tabel didapatkan dari query SQL `where { ownerId: req.user.id }`. |
| `updateKost()` | `PATCH /kost/:id` | `@Roles('PEMILIK')` | Mengedit deskripsi, gambar, maupun harga. Guard di tingkat logic harus memastikan sang pemilik *benar-benar berhak* mengubah Kost ber-KTP/:id tersebut. |
| `deleteKost()` | `DELETE /kost/:id` | `@Roles('PEMILIK')` | Menghapus penawaran properti (soft delete atau hard delete bergantung kesepakatan). |

### Module: Booking (`BookingService`)
| Fungsi/Method | Endpoint | Guard Level | Keterangan |
|---|---|---|---|
| `findIncomingBookings()` | `GET /booking/incoming` | `@Roles('PEMILIK')` | Sebuah antarmuka tabel pesanan (Booking). Query Prisma yang dipakai harus me-*relational* target `Kost`, dengan kriteria filter dimana `Kost.ownerId == req.user.id`. |
| `updateBookingStatus()`| `PATCH /booking/:id/status` | `@Roles('PEMILIK')` | Sangat krusial. Merupakan fungsi yang merubah status dari `PENDING` -> `APPROVED` atau `REJECTED`. DTO yang diterima hanyalah `UpdateStatusDto` berisi string ENUM konfirmasi. |

---

## ⚖️ 4. Komponen Global / Shared (Folder `common/`)
- `JwtAuthGuard`: Kelas untuk menangkat interseptor request dalam mengecek ekstensi dari "Bearer Token".
- `RolesGuard`: Kelas ini menggunakan referensi metedata `@Roles(...)` yang dicantumkan di endpoint function, memecah isi dari hasil Jwt Payload (`req.user.role`), lalu mengunci endpoint jika `Role` tersebut tidak *match*.
- `GetUser` (Custom Decorator): Parameter _Syntax-Sugar_ NestJS seperti `@GetUser() user: UserPayload` agar programmer (kita) tidak berulang kali memanggil `req.user` saat mengambil informasi ID.

---
**Tujuan Dokumen:**
Pemetaan ini dibuat sedemikian spesifik di awal agar pada saat tahap implementasi kode, kita akan mempunyai target API Method dan DTO (Database Transfer Object) yang jelas dan tertata tanpa ada resiko tumpang tindih otorisasi.
