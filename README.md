# GPT-Crawler-UI

## Overview

GPT-Crawler-UI is a web-based interface for the GPT-Crawler, originally developed by BuilderIO. This project extends the functionality of the original GPT-Crawler by providing a user-friendly web interface, allowing users to easily interact with the crawler without delving into command-line operations.

The original GPT-Crawler can be found here: [BuilderIO/gpt-crawler](https://github.com/BuilderIO/gpt-crawler).

## Structure

The GPT-Crawler-UI consists of two main components:

1. **Frontend:** A React-based user interface that allows users to input their crawling parameters and view the results in a structured format.

2. **Backend:** An Express server that handles requests from the frontend, executes the crawling process, and returns the results. The server is designed to restart after each request to ensure a fresh state for every operation.

### Backend

- Built with Express and integrates the PlaywrightCrawler from Crawlee.
- Handles the crawling logic and data processing.
- The server is designed to restart after each request, ensuring that each crawl starts with a clean state.

## Caveats

Due to the nature of the crawling process and the need to maintain a clean state, the server is set up to restart after each request. This design choice may affect performance and should be considered when deploying the application in a production environment.

## Getting Started

To get started with GPT-Crawler-UI:

1. Clone the repository:

   ```bash
   git clone https://github.com/JaleelB/gpt-crawler-ui.git
   ```

2. Install dependencies:

   ```bash
   cd gpt-crawler-ui
   pnpm i
   ```

3. Start the server and frontend:
   ```bash
   pnpm dev
   ```

## Contributing

If you have a suggestion that would make this better, send a PR!

## Acknowledgements

- Special thanks to BuilderIO for the original [GPT-Crawler](https://github.com/BuilderIO/gpt-crawler) which inspired this project.
