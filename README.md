# URL Shortening Service

## A full-stack URL Shortening Service with a React frontend and ASP.NET Core Web API backend

This project allows users to create short, shareable links, track usage, and manage URLs through a clean web interface.

**Features:**

* Shorten long URLs to simple short codes.
* Retrieve the original URL using a short code.
* Update existing shortened URLs.
* Delete shortened URLs.
* View statistics (click count, main URL) for each shortened URL.
* Swagger documentation for backend APIs.
* Simple frontend UI for user interaction.

---

## API Endpoints

### Shorten URL

```http
POST /shorten
```

**Request:**

```json
{
  "originalUrl": "https://example.com"
}
```

**Response:** 200 OK

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

---

### Retrieve Original URL

```http
GET /shorten/{shortCode}
```

**Response:** 200 OK with the URL data, or 404 Not Found.

---

### Update URL

```http
PUT /shorten/{shortCode}
```

**Request Body:**

```json
{
  "url": "https://www.example.com/some/updated/url"
}
```

**Response:** 200 OK

```json
{
  "id": "1",
  "url": "https://www.example.com/some/updated/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 0
}
```

Or 404 Not Found if the short code does not exist.

---

### Delete Shortened URL

```http
DELETE /shorten/{shortCode}
```

**Response:** 200 OK, or 404 Not Found.

---

### Get URL Stats

```http
GET /shorten/{shortCode}/stats
```

**Response:** 200 OK

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 10
}
```

Or 404 Not Found if the short code does not exist.

---

## Installation & Setup

### Backend (ASP.NET Core Web API)

1. Navigate to the backend folder:

   ```bash
   cd Backend
   ```

2. Restore dependencies:

   ```bash
   dotnet restore
   ```

3. Update `appsettings.json` with your database connection string:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "YourDatabaseConnectionString"
     }
   }
   ```

4. Run migrations:

   ```bash
   dotnet ef database update
   ```

5. Start the API:

   ```bash
   dotnet run
   ```

*The API will run at [https://localhost:7060](https://localhost:7060)*

---

### Frontend (React)

1. Navigate to the frontend folder:

   ```bash
   cd Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Make sure the backend URL is correctly configured:
   If you are using the `proxy` field in `package.json`, check that it matches your backend URL.

   ```json
   "proxy": "https://localhost:7060"
   ```

4. Start the frontend:

   ```bash
   npm start
   ```

*The React app will run at [http://localhost:3000](http://localhost:3000)*

---

## Source

This project idea comes from [roadmap.sh - URL Shortening Service Project](https://roadmap.sh/projects/url-shortening-service)
