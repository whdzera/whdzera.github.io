---
layout: post
title: Redis di Rails
date: 2026-01-03
author: whdzera
comments: true
---

## Apa itu Redis?

Redis (_Remote Dictionary Server_) adalah salah satu _in-memory data store_ yang sangat populer dan sering digunakan bersama Ruby on Rails untuk meningkatkan performa dan skalabilitas aplikasi. Pada artikel ini, kita akan membahas apa itu Redis, kenapa sering dipakai di Rails, serta contoh penggunaan umumnya.

Redis ini berbasis _key-value_ yang berjalan di memori (RAM). Karena bekerja di memori, Redis sangat cepat dibandingkan database relasional seperti MySQL atau PostgreSQL.
Redis biasanya digunakan untuk Cache data, Session stor, Background job queue, Real-time data (counter, leaderboard, rate limiting)
Walaupun berbasis memori, Redis juga mendukung _persistence_ ke disk, sehingga data bisa disimpan jika server direstart.

## Kenapa Redis Populer di Rails?

Rails dikenal produktif, tapi performa bisa menjadi tantangan ketika aplikasi sudah besar. Redis hadir sebagai solusi untuk beberapa masalah umum di Rails.

Beberapa alasannya:

1. **Performa Tinggi**
   Redis sangat cepat karena data disimpan di RAM. Cocok untuk mengurangi query berulang ke database.

2. **Integrasi Mudah**
   Rails sudah menyediakan dukungan bawaan untuk cache menggunakan Redis.

3. **Ekosistem Gem yang Kuat**
   Banyak gem Rails populer yang bergantung pada Redis, seperti Sidekiq dan Action Cable.

4. **Skalabilitas**
   Redis membantu Rails menangani traffic tinggi dengan lebih efisien.

---

## Penggunaan Redis di Rails

### Cache di Rails

Redis sering digunakan sebagai _cache store_ untuk menyimpan hasil query atau proses berat.

Contoh penggunaan:

- Cache hasil query ActiveRecord
- Cache halaman atau fragment

Dengan cache, Rails tidak perlu menghitung ulang atau query ulang data yang sama.

### Session Store

Secara default, Rails menyimpan session di cookie. Untuk aplikasi skala besar, session bisa disimpan di Redis agar:

- Lebih aman
- Tidak membebani client
- Mudah dibagi antar server

Ini sangat berguna untuk aplikasi yang menggunakan banyak server (load balancer).

### Background Job (Sidekiq)

Sidekiq adalah background job processor populer di Rails dan **wajib menggunakan Redis**.

Contoh use case:

- Kirim email
- Proses data besar
- Integrasi API pihak ketiga

Dengan Redis, job bisa diproses secara asynchronous tanpa mengganggu request utama user.

### Action Cable (WebSocket)

Untuk fitur real-time seperti chat atau notifikasi, Rails menggunakan Action Cable.

Redis digunakan sebagai:

- Pub/Sub adapter
- Media komunikasi antar server

Tanpa Redis, fitur real-time akan sulit diskalakan.

---

## Kapan Sebaiknya Menggunakan Redis?

Gunakan Redis jika:

- Aplikasi mulai lambat karena query berulang
- Membutuhkan background job
- Memiliki fitur real-time
- Traffic mulai tinggi

Tidak wajib menggunakan Redis untuk aplikasi Rails kecil, tapi sangat disarankan ketika aplikasi mulai berkembang.

## Kapan Tidak Perlu Redis?

Redis mungkin belum diperlukan jika:

- Aplikasi masih kecil
- Traffic masih rendah
- Belum ada kebutuhan async job atau real-time

Menambahkan Redis terlalu dini bisa menambah kompleksitas.

---

## Kesimpulan

Redis adalah pasangan yang sangat kuat untuk Ruby on Rails. Dengan Redis, aplikasi Rails bisa menjadi Lebih cepat, scalable, dan siap untuk traffic besar
Jika kamu membangun aplikasi Rails serius untuk production, Redis hampir pasti akan menjadi bagian dari arsitektur aplikasimu.

---

Semoga artikel ini membantu memahami Redis
