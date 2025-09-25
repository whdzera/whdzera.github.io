---
layout: post
title: Halaman Error Lebih Baik dengan Gem better_errors di Rails
date: 2025-04-21
author: whdzera
comments: true
---

Saat mengembangkan aplikasi Ruby on Rails, tampilan error default seringkali terasa kurang informatif. Untuk pengalaman debugging yang lebih baik, kita bisa menggunakan **gem [better_errors](https://github.com/BetterErrors/better_errors)**.

Dengan gem ini, halaman error akan jauh lebih interaktif, lengkap dengan stack trace, preview variabel, hingga akses konsol Rails langsung dari browser.

---

## 1. Tambahkan Gem ke Gemfile

Buka file `Gemfile` lalu tambahkan:

```ruby
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
end
```

> `binding_of_caller` opsional tapi sangat disarankan, karena memungkinkan kita membuka IRB console langsung di halaman error.

## 2. Install Dependensi

Jalankan perintah:

```bash
bundle install
```

## 3. Konfigurasi (Opsional)

Secara default, **better_errors** hanya aktif di **environment development**.  
Kalau kamu ingin mengakses error page ini dari mesin lain (misalnya di jaringan lokal), tambahkan konfigurasi di `config/environments/development.rb`:

```ruby
BetterErrors::Middleware.allow_ip! "0.0.0.0/0"
```

> Hati-hati! Jangan mengaktifkan ini di **production**, karena bisa membocorkan informasi sensitif.

## 4. Coba Trigger Error

Untuk menguji, buat error sederhana di salah satu controller:

```ruby
def index
  raise "Test Better Errors"
end
```

Akses halaman tersebut, maka kamu akan melihat tampilan error yang jauh lebih informatif dibandingkan default Rails.

## 5. Fitur Utama

- Tampilan error dengan syntax highlight.
- Stack trace yang bisa diklik dan ditelusuri.
- Preview nilai variabel di setiap level stack.
- IRB console langsung di browser (butuh `binding_of_caller`).

## Kesimpulan

Menggunakan **better_errors** membuat debugging di Rails jauh lebih cepat dan menyenangkan.  
Dengan informasi error yang lebih jelas, kita bisa lebih mudah menemukan dan memperbaiki bug.

Kalau kamu sering bekerja dengan Rails, gem ini adalah salah satu yang **wajib** dipasang di environment development.
