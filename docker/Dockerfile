#$ docker run -v mysql_volume:/var/lib/mysql --name MySQL -e MYSQL_ROOT_PASSWORD=passwd -d mysql:8.0
#$ docker build -t my-apache2 .
#$ docker run -dit -v "D:\Users\timakov\PhpstormProjects\convas_play_online:/usr/local/apache2/htdocs/" --name my-running-app -p 8080:80 my-apache2

#FROM httpd:2.4
#COPY ./my-httpd.conf /usr/local/apache2/conf/httpd.conf
#COPY . /usr/local/apache2/htdocs/


#$ docker build -t my-php-app .
#$ docker run -it --rm --name my-running-app my-php-app

#FROM php:7.4-apache
#COPY . /var/www/html/
#WORKDIR /usr/src/myapp
#CMD [ "php", "./Laravel/public/index.php" ]


#$ docker build -t my-php-app .
#$ docker run -d --name my-running-app my-php-app
#$ docker run -dit -v "D:\Users\timakov\PhpstormProjects\convas_play_online:/usr/local/apache2/htdocs/" --name my-running-app -p 8080:80 my-php-app
#$ docker run -dit --name my-running-app -p 8080:80 my-php-app

FROM php:7.4-apache
# PHP extensions
#RUN apt-get update && apt-get install -y \
        #libfreetype6-dev \
        #libjpeg62-turbo-dev \
        #libmcrypt-dev \
        #libpng-dev \
    #&& pecl install xdebug \
    #&& docker-php-ext-install -j$(nproc) pgsql pdo_pgsql \
    #&& docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    #&& docker-php-ext-install -j$(nproc) gd \
    #&& docker-php-ext-enable xdebug

# Apache modules
RUN a2enmod rewrite