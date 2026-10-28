# Ziplink 🔗

### Long links. Short journeys.

Ziplink is a URL shortening application that transforms long URLs into compact, shareable links. It also generates downloadable QR codes and tracks link clicks, making sharing and managing URLs simple.

## Features

- **URL Shortening:** Convert long URLs into short, easy-to-share links.
- **Unique Short IDs:** Generate compact identifiers using Nano ID.
- **URL Validation:** Validate URLs before creating shortened links.
- **URL Redirection:** Redirect users to the original destination when they visit a short link.
- **Click Tracking:** Track the number of times a shortened URL is visited.
- **QR Code Generation:** Generate QR codes for shortened URLs.
- **QR Code Download:** Download generated QR codes as PNG images.
- **Copy to Clipboard:** Copy shortened links with a single click.
- **Error Handling:** Handle invalid URLs, missing links, and server errors.

## Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios
- `react-qr-code`
- `qrcode`

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- Nano ID
- Morgan
- Chalk

## Project Structure

```text
Ziplink/
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controller/
│   │   │   └── url.contoller.js
│   │   ├── models/
│   │   │   └── url.model.js
│   │   ├── routes/
│   │   │   └── url.routes.js
│   │   ├── utils/
│   │   │   └── logger.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
└── README.md
```

*The structure above is illustrative; adjust it to match your actual project.*

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- MongoDB instance or MongoDB Atlas account
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Ziplink
```

### 2. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_DB_URL=your_mongodb_connection_string
BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Replace the MongoDB connection string with your actual database URI.

Start the backend server using the appropriate script defined in `package.json`, for example:

```bash
npm run dev
```

### 3. Configure the Frontend

Open a separate terminal:

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_BACKEND_URL=http://localhost:5000/api/urls
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

> Restart the Vite development server whenever you change environment variables. Never commit real secrets or `.env` files to Git.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/check` | Check whether the backend is running |
| `POST` | `/api/urls/shorten` | Create a shortened URL |
| `GET` | `/:shortID` | Redirect to the original URL |

### Shorten a URL

**Request**

```http
POST /api/urls/shorten
Content-Type: application/json
```

```json
{
  "originalURL": "https://example.com/some/very/long/path"
}
```

**Example response**

```json
{
  "status": "Success",
  "message": "URL created successfully",
  "shortID": "abc1234",
  "shortURL": "http://localhost:5000/abc1234"
}
```

The returned short URL can be opened in a browser to redirect to the original destination.

### Redirect to the Original URL

```http
GET /:shortID
```

When a valid short ID is requested, the backend looks up the corresponding URL, increments its click counter, and redirects the browser to the original URL.

If the short ID does not exist, the server returns a `404 Not Found` response.

## How It Works

1. The user enters a long URL in the frontend.
2. The frontend sends the URL to the Express API.
3. The backend validates the URL and generates a unique short ID.
4. The shortened URL and its associated data are stored in MongoDB.
5. The frontend displays the shortened link and generates a QR code.
6. When someone visits the shortened link, the backend finds the original URL, updates the click count, and redirects the visitor.

## Data Model

Each shortened URL stores information such as:

| Field | Description |
|---|---|
| `originalURL` | The original destination URL |
| `shortID` | The unique identifier for the shortened link |
| `clicks` | The number of recorded visits |

The exact schema depends on the implementation in `url.model.js`.

## Future Improvements

- User authentication and personalized dashboards
- Custom short URL aliases
- Detailed click analytics and traffic statistics
- Link expiration and deletion
- Rate limiting and abuse prevention
- Input validation and stronger URL security
- Automated testing and API documentation
- Docker-based deployment

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

## License

This project is available under the MIT License if you choose to distribute it under that license. Add a `LICENSE` file before claiming that the project is officially licensed.

---

Built with ❤️ as a full-stack web development project.