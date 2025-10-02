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

**Shorten URL:**

```POST /shorten```

Request:
```json
{
  "originalUrl": "https://example.com"
}
```
Response:
200 status code

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z"
}
```

**Retrieve Original URL:**

```GET /shorten/{shortCode}```

Resposne:
200 status code or 404 Not Found 

**Update URL:**

```PUT /shorten/{shortCode}```

Request Body:

```json
{
  "url": "https://www.example.com/some/updated/url"
}
```

Resposne:
200 status code 

```json
{
  "id": "1",
  "url": "https://www.example.com/some/long/url",
  "shortCode": "abc123",
  "createdAt": "2021-09-01T12:00:00Z",
  "updatedAt": "2021-09-01T12:00:00Z",
  "accessCount": 0
}
```

or 404 Not Found 

**Delete Shortened URL:**

```DELETE /shorten/{shortCode}```

Resposne:
200 status code or 404 Not Found 

**Get URL Stats:**

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
**Backend (ASP.NET Core Web API)**

1.Navigate to the backend folder:

  ```cd Backend```


2.Restore dependencies:

```dotnet restore```


3.Update appsettings.json with your database connection string:

``` "ConnectionStrings": {"DefaultConnection": "YourDatabaseConnectionString"}```

4.Run migrations:

```dotnet ef database update```

5.Start the API:

```dotnet run```

API will run at https://localhost:7060 

**Frontend (React)**

1.Navigate to the frontend folder:

```cd Frontend```

2.Install dependencies:

```npm install```

3.Make sure the backend URL is correctly configured:

If you are using the proxy field in package.json, check that it matches your backend URL.

 ``` "proxy": "https://localhost:7060"```


4.Start the frontend:

```npm start```

React app will run at http://localhost:3000.

