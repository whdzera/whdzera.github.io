---
layout: post
title: Mengenal Migration dan Schema di Rails
date: 2026-05-04
author: whdzera
comments: true
---

Migration dan Schema adalah fondasi manajemen database di Rails. Kalau kamu baru di Rails, memahami kedua konsep ini adalah langkah wajib sebelum menyentuh model atau controller.

---

## Apa Itu Migration?

Migration adalah cara Rails mengelola perubahan struktur database. Setiap migration adalah file yang mendeskripsikan: tabel apa yang dibuat, kolom apa yang ditambahkan, atau index apa yang perlu diubah.

**Inti nya:**

- Migration = versioning untuk database
- Setiap perubahan tercatat dan reversible
- Team bisa migrate ke state yang sama dengan mudah

---

## Schema - Snapshot Struktur Database

Schema adalah representasi current state struktur database kamu. File `db/schema.rb` adalah snapshot semua tabel, kolom, dan relasi yang ada.

**Perbedaan penting:**

- Migration = history/log perubahan
- Schema = state saat ini

---

## Cara Kerja Migration

Rails menjalankan migration secara berurutan berdasarkan timestamp. Setiap migration punya:

- **Up method**: apa yang dilakukan (create, add, remove)
- **Down method**: bagaimana cara rollback

Rails juga menyimpan tabel `schema_migrations` untuk tracking migration mana yang sudah dijalankan.

---

## Common Migration Operations

| Operation       | Fungsi          |
| --------------- | --------------- |
| `create_table`  | Buat tabel baru |
| `add_column`    | Tambah kolom    |
| `remove_column` | Hapus kolom     |
| `add_index`     | Tambah index    |
| `rename_column` | Rename kolom    |
| `change_column` | Ubah tipe kolom |

---

## Tipe Data yang Umum Digunakan

| Tipe Rails   | Tipe Database | Penggunaan          |
| ------------ | ------------- | ------------------- |
| `string`     | VARCHAR       | Nama, email         |
| `text`       | TEXT          | Deskripsi panjang   |
| `integer`    | INT           | Counter, ID         |
| `decimal`    | DECIMAL       | Uang, presisi angka |
| `boolean`    | BOOLEAN       | True/false flags    |
| `date`       | DATE          | Tanggal saja        |
| `datetime`   | TIMESTAMP     | Tanggal + waktu     |
| `references` | FOREIGN KEY   | Relasi antar tabel  |

---

## Schema vs Struktur Database

Schema di Rails bukan sekadar output SQL. Ini adalah DSL (Domain Specific Language) yang readable dan version-controlled.

**Keuntungan schema.rb:**

- Bisa di-generate ulang dari migration
- Tidak perlu akses langsung ke database untuk lihat struktur
- Git-friendly: bisa diff, merge, review

---

Pahami migration bukan sebagai "rumit," tapi sebagai sistem versioning untuk database yang membuat collaboration jadi jauh lebih aman.

> Migration dan Schema adalah evidence bahwa Rails memperlakukan database sebagai partner, bukan sekadar storage.
