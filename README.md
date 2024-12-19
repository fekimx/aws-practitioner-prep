# AWS Cloud Practitioner Learning & Quiz Website

This project is a website designed to help users learn AWS Cloud Practitioner concepts and test their knowledge through quizzes. The application uses a combination of static questions pulled from a JSON file and dynamic questions stored in a PostgreSQL database.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Features
  
📚 Learn AWS Concepts: Explore key concepts related to the AWS Cloud Practitioner exam.  
📝 Quiz Yourself: Take quizzes to reinforce your understanding.  
📊 Dynamic and Static Questions: Questions are sourced from a JSON file and a PostgreSQL database for a mix of static and dynamic content.  
⚛️ React-Based: Built with React for a responsive and modern user experience.  

## Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Node.js and npm installed.  
PostgreSQL installed and configured.  
A `.env` file with the necessary database connection details.  

### Installation
Clone the Repository  
`git clone https://github.com/fekimx/aws-practitioner-prep.git  
cd aws-practitioner-prep`

### Install Dependencies
`npm install`

### Set Up Environment Variables
Create a `.env` file in the root directory with your PostgreSQL credentials:
`
REACT_APP_DB_HOST=your-db-host  
REACT_APP_DB_USER=your-db-user  
REACT_APP_DB_PASSWORD=your-db-password  
REACT_APP_DB_NAME=your-db-name
`

### Run the Application
`npm start`

Open `http://localhost:3000` to view the application in your browser.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Contributing

Contributions are welcome! If you’d like to improve this project, please:

Fork the repository.
Create a new branch: `git checkout -b feature-branch`.
Make your changes.
Submit a pull request.

## License

This project is licensed under the MIT License.
