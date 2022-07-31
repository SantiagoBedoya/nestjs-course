<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clone the repository
2. npm install
3. rename `.env-template` to `.env`
4. Define environment variables

```
  # .env
  DB_USER=postgres
  DB_PASSWORD=root
  DB_HOST=localhost
  DB_PORT=5432
```

5. Initialize PostgreSQL

```
docker-compose up -d
```

6. Start the project

```
npm run start:dev
```

7. Run seeder

```
http://localhost:3000/api/seed
```
