# GadgetZone - Frontend

## Project Overview

This project is a single-page website built using the MERN stack (MongoDB, Express.js, React.js, Node.js) where users can search, filter, and sort tech gadgets. The project includes essential functionalities such as pagination, search, categorization, and sorting. Additionally, Firebase is used for Google and Email/Password authentication.

## Features

1. **Pagination:**
   - Efficient loading of products with pagination.
   - Navigation buttons for Next and Previous pages.
2. **Search Functionality:**
   - Search products by name.
3. **Categorization:**

   - Filter products by Brand, Category, and Price Range.
   - Users can apply multiple filters simultaneously.

4. **Sorting:**

   - Sort products by Price (Low to High, High to Low).
   - Sort by Date Added (Newest First).

5. **Authentication:**

   - Google Authentication using Firebase.
   - Email and Password Authentication using Firebase.

6. **Responsive Design:**

   - Fully responsive with a mobile-first design approach.
   - Fixed-size product cards to display product information concisely.

7. **UI Components:**
   - Navbar with website name/logo and relevant routes.
   - Footer with necessary information and links.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Express.js, Node.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Styling:** Tailwind CSS, Daisy UI

## Project Setup

### Prerequisites

- Node.js
- NPM or Yarn
- MongoDB
- Firebase Project Setup

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/moriyam-mohona/GadgetZone-Client-.git
   cd GadgetZone-Client-
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add your Firebase configuration.

   ```env
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
   ```

4. **Run the Project:**

   ```bash
   npm start
   ```

   The project will run on `http://localhost:5000`.

## Deployment

This project is deployed using Firebase Hosting. To deploy:

1. **Build the Project:**

   ```bash
   npm run build
   ```

2. **Deploy to Firebase:**

   ```bash
   firebase deploy
   ```

## Live Demo

Check out the live website: [GadgetZone Live](https://gadgetzone-f7d41.web.app)

## Contributing

Feel free to contribute to the project by forking the repository, making changes, and submitting a pull request.

## Contact

For any questions or inquiries, please contact me at [moriyammohona@gmail.com](mailto:moriyammohona@gmail.com).
