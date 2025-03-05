# Nebula Survey

Nebula Survey is a dynamic survey application for collecting responses and analyzing relationships. The app leverages React and Next.js to handle the user interface and routing logic.

## Setup and Installation

Before running the project, ensure that you have `Node.js` and `npm` installed. If not, download and install them from [here](https://nodejs.org/).

1. Clone the repository:

   ```bash
   git clone <your-repository-url>
   cd nebula-survey
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Running the Project

The project supports both development and production environments.

### Development Environment

To run the app in development mode with live reloading:

```bash
npm run dev
```

Visit [http://localhost:3000/survey/relationship/q1](http://localhost:3000/survey/relationship/q1) or [http://localhost:3000/survey/profile/q1](http://localhost:3000/survey/profile/q1) to view a survey in your browser.

### Production Environment

To prepare and run the app for production:

```bash
npm run build
npm run start
```

Visit [http://localhost:3000/survey/relationship/q1](http://localhost:3000/survey/relationship/q1) or [http://localhost:3000/survey/profile/q1](http://localhost:3000/survey/profile/q1) to see the production version of a survey.

## Project Structure

`src/app/`: Contains the application routes.
`src/app/components/`: Contains React components used across the app.
`public/`: Static assets like images, fonts, etc.
`src/data/`: Contains the surveys structure and dynamic values for user interaction.
`src/store/`: Redux state for storing user answers.
`src/hooks/`: Reusable hooks.
`src/types/`: Types for application entities.
