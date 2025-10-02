 URL Shortening Service

A full-stack URL Shortening Service with a React frontend and ASP.NET Core Web API backend. Allows users to create short, shareable links, track usage, and manage URLs through a clean web interface.

🚀 Features

Shorten URLs: Convert long URLs into short, easy-to-share links.

Redirection: Short URLs redirect users to the original link.

URL Management: Create, read, update, and delete URLs.

Analytics: Track the number of clicks for each short URL.

Frontend: React-based user interface for managing URLs.

🛠️ Tech Stack

Frontend: React, Material-UI 

Backend: ASP.NET Core Web API (.NET 6/7)

Database: PostgreSQL 

📦 Installation & Setup
1️⃣ Backend (ASP.NET Core Web API)

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

2️⃣ Frontend (React)

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

