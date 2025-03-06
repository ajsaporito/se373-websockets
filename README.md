# SE373 WebSockets w/ OpenAI API

## Overview

A simple NodeJS application created with Express, Socket.IO, OpenAI's API, and TailwindCSS. Users can send messages in a simulated chat environment. Messages containing @bot will fetch a text response from the API. 

## Setup

1. **Clone the Repository:**

    ```sh
    git clone https://github.com/ajsaporito/se373-websockets.git
    ```

2. **Set Up Your Web Server:**

    - Install an up to date version of NodeJS on your machine and install the dependencies:

      ```sh
        npm install
      ```

3. **Configure Environment Variables:**

    - Create a `.env` file at the root of the directory and add your API key:

      ```env
        OPENAI_API_KEY=<your-api-key>
      ```

4. **Run the Application:**

    - Start your web server and navigate to `http://localhost:3000` in your web browser.
