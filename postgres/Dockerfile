FROM postgres:latest
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=root
ENV POSTGRES_DB=pzpp
COPY init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
