# Full Stack Application for Basic Authentication

This repository contains both the backend and frontend of a full stack application. The backend is built with FastAPI, and the frontend is developed using Angular.

## Features

- User authentication and management
- RESTful API with FastAPI
- Interactive frontend interface
- Database integration with Tortoise ORM


## Setup

### Backend

1. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

2. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate     # On Windows
   ```

3. **Install Backend Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**

   Create a `.env` file in the `backend` directory and add your environment variables:

   ```plaintext
   DATABASE_URL=sqlite://./local.db
   JWT_SECRET_KEY=secret
   ```

5. **Run the Backend**

   Start the FastAPI server using Uvicorn:

   ```bash
   uvicorn app.main:app
   ```

6. **Access the Backend API**

   - Swagger UI: `http://127.0.0.1:8000/docs`
   - ReDoc: `http://127.0.0.1:8000/redoc`

7. **Run Backend Tests**

   Execute the tests using pytest:

   ```bash
   pytest
   ```

### Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Frontend Dependencies**

   ```bash
   npm install
   ```

3. **Run the Frontend**

   Start the development server:

   ```bash
   npm start
   ```

4. **Access the Frontend**

   Open your browser and navigate to `http://localhost:4200` 

5. **Run Frontend Tests**

   Execute the tests using Angular CLI:

   ```bash
   npm test
   ```
