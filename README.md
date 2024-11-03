# React + Laravel
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel
# Laravel Blog Application
![laravel-vite-page](https://i.postimg.cc/ZRt6RjzS/Screenshot-2024-11-03-181031.png)
![laravel-vite-page](https://i.postimg.cc/m22CttJt/Screenshot-2024-11-03-181753.png)
![laravel-vite-page](https://i.postimg.cc/zG4gtpBg/Screenshot-2024-11-03-181215.png)


## Laravel RESTful API for this project <img height="20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/1200px-Laravel.svg.png" />

All Requests start with http://127.0.0.1:8000/api

`OAuth`

- `POST /oauth/token` - login to get token access.

 `posts`
- `GET /api/blog` - Get all posts.No authentication required.
- `GET /api/blog/{slug}` - Get single post.No authentication required.
- `POST /api/create/post` - Create new post , authentication required.
- `PUT /api/update/{slug}` - Update authorized post, authentication required.
- `DELETE /api/delete/{slug}` - Delete authorized post, authentication required.
  
