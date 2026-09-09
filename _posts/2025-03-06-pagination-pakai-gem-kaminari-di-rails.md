---
layout: post
title: Pagination pakai Gem Kaminari di Rails
date: 2025-03-06
author: whdzera
comments: true
---

Halo!
kali ini kita akan bahas tentang pagination, kalau kalian belum tau apa itu pagination. pagination adalah teknik untuk membagi data atau konten yang jumlahnya sangat banyak menjadi beberapa halaman. di rails sebenarnya ada banyak gem untuk pagination, tapi kali ini kita bahas khusus gem kaminari saja karena gem favorit author.
jadi Kaminari adalah sebuah gem Ruby untuk melakukan pagination pada ActiveRecord, Mongoid, dan berbagai ORM lainnya.
penggunaan gem kaminari di rails sebenarnya sangat mudah loh.

Berikut ini cara memakai Gem Kaminari di Ruby on rails.

#### 1. Instalasi

Tambahkan Kaminari ke file `Gemfile`:

```ruby
gem 'kaminari'
```

Kemudian jalankan perintah:

```ruby
bundle install
```

#### 2. Setup Pagination di Controller

Misalkan kamu punya model Post, dan ingin menampilkan daftar postingan yang dipaginasi.

Di `posts_controller.rb`, ubah action index seperti berikut:

```ruby
def index
  @posts = Post.order(created_at: :desc).page(params[:page]).per(10)
end
```

`page(params[:page])` Menentukan halaman saat ini berdasarkan parameter URL `?page=`

#### 3. Tampilkan Pagination di View

Di file `app/views/posts/index.html.erb`, tambahkan kode berikut setelah daftar item:

```erb
<% @posts.each do |post| %>
  <div class="post">
    <h2><%= post.title %></h2>
    <p><%= truncate(post.content, length: 100) %></p>
  </div>
<% end %>

<%= paginate @posts %>
```

#### 4. Kustomisasi Tampilan Paginasi

Kaminari menyediakan generator untuk membuat file partial yang bisa kamu modifikasi:

```bash
rails g kaminari:views default
```

Ini akan menghasilkan file-file ERB di `app/views/kaminari/`. Kamu bisa mengedit tampilan tombol pagination sesuai selera, atau menambahkan class Tailwind, Bulma, Bootstrap, dsb.

Contoh kustomisasi tombol:

```erb
<li class="page-item <%= 'active' if current_page? %>">
  <%= link_to page, url, class: "page-link" %>
</li>
```

#### 5. Contoh URL Paginasi

Setelah setup di atas, kamu bisa membuka URL seperti:

```
http://localhost:3000/posts?page=2
```

Dan Rails akan menampilkan halaman ke-2 dari daftar Post

Dengan gem Kaminari, proses pagination di aplikasi Rails menjadi sangat mudah dan fleksibel. kalian bisa menggunakannya di berbagai model, mengkustom tampilan, serta menggabungkannya dengan AJAX atau infinite scrolling untuk pengalaman UX pengguna.

Semoga tutorial ini bermanfaat! Jika ada pertanyaan atau saran, silakan tinggalkan komentar di bawah ya.
