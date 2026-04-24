plm-be/
├── 📄 .env & .env.example # Konfigurasi environment variables
├── 📄 package.json        # Dependensi dan script project
├── 📄 Dockerfile & docker-compose.yml # Konfigurasi deployment/containerization
├── 📄 tsconfig.json       # Konfigurasi TypeScript
├── 📄 AGENTS.md           # Aturan dan panduan sistem/agen untuk repository ini
├── 📄 README.md, REPORT.md, CHEATSHEET.md # Dokumentasi proyek
├── 📁 db/                 # Skrip atau file terkait inisialisasi/migrasi database
├── 📁 planner/, SPEC/, todo/ # Folder manajemen tugas, requirement, dan spesifikasi iterasi proyek
└── 📁 src/                # 🌟 Source Code Utama Aplikasi



src/
├── 📄 main.ts             # Entry point aplikasi (bootstrap Fastify, config Swagger/RapiDoc, global validation/CORS)
├── 📄 app.module.ts       # Root module: penyatuan seluruh modul, koneksi DB (TypeORM), dan integrasi global guard
│
├── 📁 common/             # Utility yang digunakan di skala global:
│   ├── constant/          # Nilai konstanta, magic string, role enums
│   ├── utils/             # Fungsi helper generic
│   └── messages/          # Standardisasi pesan response (sukses/error)
│
├── 📁 entities/           # Definisi schema database dan relasi antar tabel (TypeORM Entities)
│
├── 📁 guards/             # Lapis pengamanan untuk autentikasi dan otorisasi:
│   ├── jwt-auth.guard.ts  # Memverifikasi integritas token JWT pengguna
│   └── roles.guard.ts     # RBAC (Role-Based Access Control) mengecek kecocokan hak akses
│
├── 📁 libraries/          # Lapis eksternal/integrasi pihak ketiga:
│   ├── respond/           # Helper/wrapper untuk memformat response JSON secara konsisten
│   └── (lainnya)          # Integrasi seperti Redis, SMTP Mail, MinIO, atau layanan eksternal
│
├── 📁 scripts/            # Skrip internal untuk keperluan seeder, tooling, atau perbaikan data
│
└── 📁 modules/            # 📦 Modul-modul Domain Logic (Pusat Logika Bisnis)
