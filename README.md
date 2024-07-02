# Buzz Forums Backend

Welcome to the backend service for [Buzz Forums](https://buzz-forums.vercel.app). This service handles all server-side operations, including user authentication, post management, comment moderation, and site statistics.

## Live Preview
 You can visit our live site at [Buzz Forums Backend](https://buzz-forums-backend.vercel.app/).
 
## Frontend Repo
 - [Buzz Forums Frontend](https://github.com/zahidtdx61/buzz-forums-client)

## Features

### User Features

- **User Authentication:** Secure user registration and login.
- **Post Management:** APIs for creating, retrieving, updating, and deleting posts.
- **Comment Management:** APIs for adding, retrieving, updating, and deleting comments.
- **Voting System:** APIs for upvoting and downvoting posts and comments.
- **Reporting System:** APIs for reporting inappropriate comments.
- **Subscription Management:** APIs for handling gold membership subscriptions.
- **Stripe Integration:** APIs for handling payments using Stripe.

### Admin Features

- **User Management:** APIs for managing user roles and permissions.
- **Comment Moderation:** APIs for handling reported comments, including deletion.
- **Announcements:** APIs for creating and retrieving admin announcements.
- **Site Statistics:** APIs for retrieving site statistics in graph format.

## Installation

To run the backend server locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/zahidtdx61/burr-forums-server
```

2. Navigate to the project directory:

```sh
cd burr-forums-server
```

3. Install dependencies:

```sh
npm install
```

4. Set up environment variables. Create a `.env` file in the root directory and add the following:

```env
PORT=<any_port_of_your_choice>
MONGO_URL=<your_mongoDB_url>
MONGO_DB_NAME=buzz-forums
ACCESS_TOKEN_SECRET=<any_secret_token_for_JWT>
STRIPE_SECRET_KEY=<get_this_from_stripe>
```

5. Start the development server:

```sh
npm run dev
```

## Packages Used

This project uses the following packages:

- [express](https://www.npmjs.com/package/express) - Fast, unopinionated, minimalist web framework for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool designed to work in an asynchronous environment.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - An implementation of JSON Web Tokens.
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Parse Cookie header and populate `req.cookies` with an object keyed by the cookie names.
- [zod](https://www.npmjs.com/package/zod) - A TypeScript-first schema declaration and validation library.
- [cors](https://www.npmjs.com/package/cors) - Middleware that can be used to enable CORS with various options.
- [dotenv](https://www.npmjs.com/package/dotenv) - Loads environment variables from a `.env` file into `process.env`.
- [http-status-codes](https://www.npmjs.com/package/http-status-codes) - Utility to interact with HTTP status code.
- [stripe](https://www.npmjs.com/package/stripe) - Official Stripe API library.

## Contribution

We welcome contributions from the community to enhance and improve Buzz Forums.
