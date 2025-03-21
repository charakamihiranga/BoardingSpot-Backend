<div align="center">
  <a href="https://github.com/charakamihiranga/BoardingSpot-Backend.git">
    <img src="https://github.com/user-attachments/assets/fbf6fd5f-3b01-4904-b522-4eb53b8ca9e5" alt="Logo" width="80" height="80">
  </a>
  <h3>BoardingSpot API</h3>
  <p>
    A Node.js backend system for managing boarding house listings.
    <br />
    <br />
    <br />
  </p>
</div>

## About The Project

**BoardingSpot API** is a Node.js backend system designed to facilitate the management of boarding house listings. It provides endpoints for user authentication, boarding house management (CRUD operations), and search functionalities with map-based location filtering.

### Key Features:

-   **User Authentication:**
    -   Standard email/password signup and signin.
    -   Google OAuth integration.
    -   JWT-based access and refresh token management (using HTTP-only cookies).
    -   **Security:** OAuth 2.0 with JWT for stateless authentication.
    -   **Password Encryption:** BCrypt hashing to prevent plaintext storage.

-   **Boarding House Management:**
    -   Create, read, update, and delete boarding house listings.
    -   Image uploads using Cloudinary.
    -   Search and filter boarding houses by city, gender preference, capacity, rent, food availability, and category.
    -   Find boarding houses by location bounds for map integration.
    -   **Pagination:** Pagination for search and location based search results.
    -   **Owner Specific Boarding Houses:** Get all boarding houses published by a specific owner.

### Built With

-   [![Node.js][Node.js]][Node-url]
-   [![Express.js][Express.js]][Express-url]
-   [![MongoDB][MongoDB.com]][MongoDB-url]
-   [![TypeScript][TypeScript.com]][TypeScript-url]
-   [![JWT][JWT.io]][JWT-url]
-   [![Cloudinary][Cloudinary.com]][Cloudinary-url]

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   **Node.js 18** or higher
-   **MongoDB**
-   **npm** or **yarn**
-   **Git** (for version control)

### Installation

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/charakamihiranga/BoardingSpot-Backend.git
    cd backend
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  **Set Up Environment Variables**:

    -   Create a `.env` file in the root directory and add the following variables:

        ```properties
        MONGODB_URI=<your-mongodb-connection-string>
        JWT_SECRET=<your-jwt-secret>
        REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
        GOOGLE_CLIENT_ID=<your-google-client-id>
        CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
        CLOUDINARY_API_KEY=<your-cloudinary-api-key>
        CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
        NODE_ENV=development
        PORT=5000
        ```

4.  **Start the Development Server**:

    ```bash
    npm run dev
    ```

    or

    ```bash
    yarn dev
    ```

5.  **Access the API**:

    -   The API will be available at `http://localhost:5000` (or the port you specified in `.env`).


## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express-url]: https://expressjs.com/
[MongoDB.com]: https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[TypeScript.com]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[JWT.io]: https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens
[JWT-url]: https://jwt.io/
[Cloudinary.com]: https://img.shields.io/badge/Cloudinary-white?style=for-the-badge&logo=cloudinary&logoColor=blue
[Cloudinary-url]: https://cloudinary.com/
