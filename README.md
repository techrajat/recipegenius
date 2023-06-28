https://github.com/techrajat/recipegenius/assets/118634923/9f6bea7c-b26b-44f9-8bf5-77c79f540c2f

<p align="center"><img src="https://i.imgur.com/2OweQxN.png" alt="RecipeGenius" width="50%"></p>

## Description

RecipeGenius is a web application built using the MERN (MongoDB, Express, React, Node.js) stack. It provides a user-friendly interface for generating recipes.

### Key Features

- **Recipe Generation**: Generate recipes based on various criteria such as recipe names, ingredients, nutrients, cuisines, and more. Get inspired and discover new and exciting dishes.

- **Personalized Experience**: Registered users can log in to RecipeGenius and access a personalized list of recipes they have liked. Save your favorite recipes and easily access them for future reference.

- **User-Friendly Interface**: RecipeGenius offers an intuitive and user-friendly interface, making it easy to navigate, search for recipes, and explore different options.

## Prerequisites

Before running the RecipeGenius application, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v18.16 or higher)
- [npm](https://www.npmjs.com/) (v9.7 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/techrajat/recipegenius.git
```

2. Obtain Spoonacular API key:

   - Visit [Spoonacular API](https://spoonacular.com/food-api) and create an account (if you don't have one).
   - Request an API key from Spoonacular.

3. Rename the file `.env.example` and replace api key:

   - Rename `.env.example` file to `.env` in the root folder of the app.
   - Open `.env` file and replace `my-api-key` in `REACT_APP_API_KEY="my-api-key"` with your actual Spoonacular API key.

4. Open a terminal and start the MongoDB local server:
> Note: If you already have MongoDB local server running, you can skip this step.

```shell
mongod
```

5. In a new terminal, navigate to the backend folder:

```shell
cd recipegenius/backend
```

6. Install backend dependencies:

```shell
npm install
```

7. Start the Node.js backend:

```shell
node index.js
```
or
```shell
nodemon index.js
```

8. In a new terminal, go back to the root folder:

```shell
cd ../
```

9. Install frontend dependencies:

```shell
npm install
```

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
