# RecipeGenius

RecipeGenius is a web application built with the MERN stack that generates recipes using the Spoonacular API.

## Prerequisites

Before running the RecipeGenius application, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (v9.6 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/your-username/recipegenius.git
```

2. Start the MongoDB local server:
> Note: If you already have MongoDB local server running, you can skip this step.

```shell
mongod
```

3. Navigate to the backend folder:

```shell
cd recipegenius/backend
```

4. Install backend dependencies:

```shell
npm install
```

5. Start the Node.js backend:

```shell
node index.js
```
or
```shell
nodemon index.js
```

6. In a new terminal, go back to the root folder:

```shell
cd ../
```

7. Install frontend dependencies:

```shell
npm install
```

8. Obtain Spoonacular API key:

   - Visit [Spoonacular API](https://spoonacular.com/food-api) and create an account (if you don't have one).
   - Request an API key from Spoonacular.

9. Replace API key in `.env.example`:

   - Rename `.env.example` file to `.env` in the root folder of the app.
   - Open `.env` file and replace `my-api-key` in `REACT_APP_API_KEY="my-api-key"` with your actual Spoonacular API key.

10. Start the React frontend:

```shell
npm start
```

## Usage

Once the backend and frontend servers are running, open your web browser and visit `http://localhost:3000` to access the RecipeGenius application.

## Credits

- [Spoonacular API](https://spoonacular.com/food-api): Used for generating recipes.

## Contributing

Contributions to RecipeGenius are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.