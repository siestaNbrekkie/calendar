FROM mysql:5.7.15

MAINTAINER me

ENV MYSQL_DATABASE='siestaNbrekkie' \
    MYSQL_ROOT_PASSWORD="password"

ADD sleepcal_dump.sql /docker-entrypoint-initdb.d

EXPOSE 3306