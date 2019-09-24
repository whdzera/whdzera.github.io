---
layout: post
title: 'Deploy Discordrb to Glitch'
date: 2019-08-04
categories: tutorials
tags: ruby discordrb
cover: 'https://biteable.com/content/uploads/2018/01/Glitch-Thumb-1200x630-c-center.jpg'
---
### deploy Discordrb to glitch ? simple

Step by step :
1. clone this repo (for example) [Discordrb-indodax](https://github.com/rokhimin/discordbot-ruby-indodax)
2. create file ``glitch.json``
```
{
  "install": "bundle install --path ./.data/bundler",
  "start": "bundle exec ruby linkstart.rb",
  "watch": {
    "install": {
      "include": [
        "^Gemfile$"
      ]
    },
    "restart": {
      "include": [
        "\\.rb$"
      ]
    }
  }
}
```
3. basically glitch auto run your apps
4. if not run check log

### nb
- voice not working, glitch can't give access to install libsodium.








