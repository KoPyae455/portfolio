# 🔧 Local Setup Guide

Follow these steps to clone the repository, install its dependencies, and run the portfolio locally on your machine.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed (v16.0.0 or higher recommended).
- **Git**: Installed for cloning the repository.

## Installation Steps

1. **Clone the Repository**
   Open your terminal and clone the repository to your local machine:
   ```bash
   git clone https://github.com/KoPyae/KoPyae.github.io.git
   ```

2. **Navigate to the Project Directory**
   ```bash
   cd KoPyae.github.io
   ```

3. **Install Dependencies**
   Install all necessary packages via npm:
   ```bash
   npm install
   ```

4. **Run the Development Server**
   Start the local Vite server to see the code in action:
   ```bash
   npm run dev
   ```

5. **View Local Build**
   Open your browser and navigate to the localhost URL provided in your terminal (typically `http://localhost:5173/`).

## Project Deployment
To build and deploy the production site directly to your GitHub Pages `dist` branch, run:
```bash
npm run deploy
```
