

# SpeakEx Frontend

Welcome to the frontend repository for Speakex, a platform designed to help users achieve fluency in new languages through real-time conversations.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Installation](#installation)
5. [Contributing](#contributing)
6. [Links](#links)
7. [Contact](#contact)

## Overview

The frontend of SpeakEx is built using React and TypeScript, providing a robust and modern user experience. It integrates with the backend to support real-time video conversations, dynamic content, and multilingual support.

## Features

- **Real-Time Conversations**: Enabled through WebRTC video calls.
- **Community Blog**: Supports media storage on AWS S3, includes a rich text editor (Tiptap), and dynamic hashtagging.
- **Internationalization (i18n)**: Language switching functionality for localized user experience.
- **Dynamic Matching**: Priority queue-based matching algorithm to pair learners with helpers based on compatibility and availability.
- **Real-Time Notifications and Chat**: Implemented using WebSocket for seamless communication.
- **Authentication**: JWT-based authentication ensuring secure access to platform features.
- **Engineered with Clean Architecture**: Uses Uncle Bob’s Clean Architecture for separation of concerns, scalability, and maintainability, and developed using TypeScript for enhanced type safety.
- **Payment Integration**: Utilizes Stripe with the latest webhook for flexible transaction handling and secure payment processing.
- **Documentation**: Well-documented with Swagger/OpenAPI, Dockerized for containerized deployment, and hosted on AWS EC2 for reliability and scalability.
- **Frontend**: Crafted using React.js and Tailwind CSS for a responsive and dynamic user interface.
- **Backend**: Engineered with Node.js, Express.js, and MongoDB for a scalable and efficient backend.

## Technologies Used

- **React**: For building interactive and dynamic user interfaces.
- **TypeScript**: For type safety and improved development experience.
- **Redux**: For state management.
- **RTK Query**: For efficient data fetching and caching.
- **Tailwind CSS**: For responsive and customizable styling.
- **WebSocket**: For real-time communication.
- **AWS S3**: For media storage.
- **react-i18next**: For internationalization and multi-language support.
- **WebRTC**: For enabling real-time video calls.
- **React Hook Form**: For managing form states and validations.
- **Zod**: For schema validation.

## Installation

To get started with the frontend development:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/adwxithc/speak-ex-frontend.git
   cd speakex-frontend
   ```

2. **Install Dependencies**

   Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then, run:

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory with the following content:

   ```env
   # Stripe public key
   VITE_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

   # Backend URL
   VITE_BACKEND_URL=http://localhost:5000

   # TURN server credentials
   VITE_TURN_USERNAME=your_turn_username
   VITE_TURN_CREDENTIAL=your_turn_credential
   ```

   Replace the placeholder values with your actual values.

4. **Run the Application**

   Start the development server with:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

## Contributing

We welcome contributions to SpeakEx! To get started:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.



## Links

- **Frontend GitHub Repository**: [SpeakEx Frontend GitHub](https://github.com/adwxithc/speak-ex-frontend)
- **Backend GitHub Repository**: [SpeakEx Backend GitHub](https://github.com/adwxithc/speak-ex-backend)
- **Live Link**: [SpeakEx Live](https://speakex.easycart.website/)

## Contact

For questions or feedback, please contact:

- **Adwaith C**
- **Email**: [adwaithjanardhanan0@gmail.com](mailto:adwaithjanardhanan0@gmail.com)
- **LinkedIn**: [Adwaith C LinkedIn](https://www.linkedin.com/in/adwaith-c-25b5a0218/)
- **GitHub**: [adwxithc](https://github.com/adwxithc)

