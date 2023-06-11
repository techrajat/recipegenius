# RecipeGenius

RecipeGenius is a web application built with the MERN stack that generates recipes using the Spoonacular API.

## Prerequisites

Before running the RecipeGenius application, make sure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (running locally)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/your-username/recipegenius.git
```

2. Start the MongoDB local server:

```shell
mongod
```

> Note: If you already have MongoDB running, you can skip this step.

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

8. Start the React frontend:

```shell
npm start
```

## Usage

Once the backend and frontend servers are running, open your web browser and visit `http://localhost:3000` to access the RecipeGenius application.

## Credits

- [Spoonacular API](https://spoonacular.com/food-api): Used for generating recipes.

## Contributing

Contributions to RecipeGenius are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.