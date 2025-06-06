# StickDrift

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description

StickDrift, built by **The Leftovers**, is a full-stack MERN and GraphQL application that lets users search and categorize video games—both historical and upcoming—using data from the RAWG API. Users can sign up, create profiles, follow other users, and manage their personal game library (e.g., “Playing,” “Completed,” “Wishlist”). The back end is powered by Node.js, Express, Apollo Server (GraphQL), and MongoDB (Mongoose), while the front end uses React, Vite, and Apollo Client.

## Table of Contents

* [Installation](#installation)
* [Features](#features)
* [Tech](#tech)
* [Usage](#usage)
* [Environment Variables](#environment-variables)
* [License](#license)
* [Contribution](#contribution)
* [Testing](#testing)
* [Contact](#contact)

## Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/StickDrift.git
   cd StickDrift
   ```

2. **Install server dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Configure environment variables**

   * In the project **root**, create a `.env` file with:

     ```
     MONGODB_URI=<Your MongoDB connection string ending in /stickdrift>
     JWT_SECRET_KEY=<Your JWT secret>
     RAWG_API_KEY=<Your RAWG.io API key>
     NODE_ENV=development
     PORT=3001
     ```
   * Optionally, add a `.env.example` to show required names (without real values).

5. **Seed the database (optional)**

   ```bash
   npm run seed
   ```

   This populates initial example profiles in the `stickdrift` database.

## Features

* **User Authentication (JWT)**

  * Sign up and log in with email and password (passwords hashed via bcrypt).
  * JSON Web Token (JWT) stored in localStorage for protected routes.

* **GraphQL API**

  * Queries & mutations for profiles, follows/unfollows, and game searches.
  * Fetch real-time game data from RAWG.io (`searchGames` query).

* **Game Search & Library Management**

  * Search RAWG for game metadata (name, release date, cover image, rating) by typing at least two characters.
  * Add games to personal library categories (e.g., “Playing,” “Completed,” “Wishlist”).
  * Persist user’s library and categories in MongoDB.

* **Profile & Social Features**

  * View any user’s profile (name, email, followers count, following count).
  * Follow or unfollow other users; view their library collections.
  * Protected routes for “Library” and “Calendar” accessible only when logged in.

* **Responsive, Polished UI**

  * Mobile-first design with media queries for various screen sizes.
  * Dark theme with neon-cyan accents.
  * CSS Modules ensure scoped styling per component/page.

* **Deployment & CI/CD**

  * Hosted on Render (Node server serves React build).
  * MongoDB Atlas for data persistence.
  * GitHub Actions run ESLint and build checks on PRs to `main`.

## Tech

* **Frontend**

  * React v18 + TypeScript
  * Vite for development and build
  * Apollo Client (`@apollo/client`) for GraphQL
  * React Router v6 for client-side routing
  * CSS Modules for scoped styling

* **Backend**

  * Node.js v18+ + Express
  * Apollo Server (GraphQL)
  * MongoDB Atlas + Mongoose ODM
  * bcrypt for password hashing, jsonwebtoken for JWTs
  * node-fetch for RAWG REST API calls
  * TypeScript

* **Deployment**

  * Render (single Web Service serving both server and built client)
  * MongoDB Atlas

* **CI/CD**

  * GitHub Actions:

    * **ci.yml**: runs ESLint on client code for PRs to `main`.
    * **build-and-test.yml**: builds server and client on pushes/PRs to `dev` and `main`.

## Usage

### Local Development

1. **Back End**

   ```bash
   cd server
   npm run build
   npm start
   ```

   * Compiles server (`tsc`) into `server/dist` and starts Express on `http://localhost:3001`.

2. **Front End**

   ```bash
   cd client
   npm run dev
   ```

   * Starts Vite dev server on `http://localhost:5173`.

3. **Browse**

   * Front end: [http://localhost:5173](http://localhost:5173)
   * GraphQL Playground: [http://localhost:3001/graphql](http://localhost:3001/graphql)

### Production Build & Serve Locally

```bash
# From project root
npm run render-build
npm run start
```

* `npm run render-build` runs:

  * `cd server && npm run build` (builds server)
  * `cd client && npm run build` (builds client into `client/dist`)
* `npm run start` launches the server (`server/dist/server.js`) on port 3001, serving the React build.
* Visit [http://localhost:3001](http://localhost:3001) for the production app.

## Environment Variables

Required at project root (`.env`):

```
MONGODB_URI=<mongodb://.../stickdrift>
JWT_SECRET_KEY=<your_jwt_secret>
RAWG_API_KEY=<your_rawg_api_key>
NODE_ENV=development
PORT=3001
```

* **MONGODB\_URI**: MongoDB Atlas (or local) connection string.
* **JWT\_SECRET\_KEY**: secret for signing/verifying JWTs.
* **RAWG\_API\_KEY**: key to access RAWG API.
* **NODE\_ENV**: either `development` or `production`.
* **PORT**: port for Express server (default 3001).

> **Note:** No client-side `.env` is required unless you expose a `VITE_`-prefixed variable.

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

## Contribution

Contributions are welcome! To contribute:

1. **Fork the repo** and clone your fork:

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/StickDrift.git
   cd StickDrift
   ```

2. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes**, commit, and push:

   ```bash
   git commit -m "feat: describe your changes"
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** against the `dev` branch. Members of **The Leftovers** will review and merge.

## Testing

* **GraphQL Playground**:

  * Visit [http://localhost:3001/graphql](http://localhost:3001/graphql).
  * Example query:

    ```graphql
    query {
      searchGames(search: "Zelda") {
        id
        name
        released
        background_image
        rating
      }
    }
    ```

* **ESLint**:

  ```bash
  cd client
  npm run lint
  ```

  Ensures front-end code follows style rules. GH Actions also runs ESLint on PRs to `main`.

* **TypeScript**:

  ```bash
  npm run render-build
  ```

  Confirms both server and client compile without errors.

## Contact

* **Group**: The Leftovers
* **GitHub**: [https://github.com/YOUR\_GITHUB\_USERNAME/StickDrift](https://github.com/YOUR_GITHUB_USERNAME/StickDrift)
* **Email**: [your.email@example.com](mailto:your.email@example.com)
