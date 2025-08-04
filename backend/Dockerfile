FROM php:8.2-fpm

ARG UID
ARG GID

# Создаём пользователя
RUN useradd -G www-data,root -u 1000 -d /home/laravel -m laravel

WORKDIR /var/www

# Установка зависимостей и GD
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libwebp-dev \
    libxpm-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim unzip git curl libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install \
        pdo_mysql mbstring zip exif pcntl gd

# Установка Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /var/www

RUN chown -R laravel:laravel /var/www

USER laravel