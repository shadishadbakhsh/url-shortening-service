# URL Shortening Service

## A full-stack URL Shortening Service with a React frontend and ASP.NET Core Web API backend. 

This Project allows users to create short, shareable links, track usage, and manage URLs through a clean web interface.
* Shorten long URLs to simple short codes.
* Retrieve the original URL using a short code.
* Update existing shortened URLs.
* Delete shortened URLs.
* View statistics (click count, main URL) for each shortened URL.
* Swagger documentation for backend APIs.
* Simple frontend UI for user interaction.

## API Endpoints

Shorten URL:

```POST /shorten```

Request:
```json
{
  "originalUrl": "https://example.com"
}
```
Response:
```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

Retrieve Original URL:

```GET /shorten/{shortCode}```

Update URL:

```PUT /shorten/{shortCode}```

Resposne:
200 status code or 404 Not Found 

Delete Shortened URL:

```DELETE /shorten/{shortCode}```

Resposne:
200 status code or 404 Not Found 

Get URL Stats:

```GET /shorten/{shortCode}/stats```

Response:

200 Status code
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
or 404 Not Found





# Installation & Setup
1. Backend (ASP.NET Core Web API)

Navigate to the backend folder:

cd Backend


Restore dependencies:

dotnet restore


Update appsettings.json with your database connection string:

"ConnectionStrings": {
  "DefaultConnection": "YourDatabaseConnectionString"
}


Run migrations:

dotnet ef database update


Start the API:

dotnet run


API will run at https://localhost:7060 

2. Frontend (React)

Navigate to the frontend folder:

cd Frontend


Install dependencies:

npm install


Make sure the backend URL is correctly configured:

If you are using the proxy field in package.json, check that it matches your backend URL.

  "proxy": "https://localhost:7060"


Start the frontend:

npm start


React app will run at http://localhost:3000.

