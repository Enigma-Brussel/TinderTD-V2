FROM mysql:5.7

ADD tinderDump.sql /docker-entrypoint-initdb.d
RUN chmod -R 775 /docker-entrypoint-initdb.d