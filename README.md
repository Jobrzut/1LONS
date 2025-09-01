# 1LONS

## Overview

**1LONS** is a web application designed to help students at my school easily access and view every classroom schedule. The project scrapes timetable data from the vulcan's website, processes it, and displays it in a user-friendly interface. With this tool, students can quickly find classroom schedules without navigating through the school's website manually.

## Features

- **Classroom Timetables**: View detailed schedules for each classroom.
- **Interactive Interface**: Easily navigate between different classrooms and their schedules.
- **Data Scraping**: Automatically fetches and processes timetable data from the school's website.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.

## How It Works

1. **Data Scraping**: 
   - The application uses a script (`scraper.js`) to scrape timetable data from the vulcan's website.
   - The data is parsed and saved as JSON files in the `plany` folder.

2. **Data Processing**:
   - The JSON files are loaded into the application and structured for easy access.
   - Each classroom's schedule is organized by day and time.

3. **Frontend Display**:
   - The schedules are displayed in a clean and interactive table format.
   - Users can select a classroom to view its timetable.

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Jobrzut/1LONS.git
   cd 1LONS
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the scraper to fetch timetable data:
   ```bash
   node src/js/scraper.js
   ```

4. Run a live server.

## File Structure

- **`src/`**: Contains the source code for the application.
  - **`index.html`**: The main HTML file for the app.
  - **`js/`**: JavaScript files for scraping, processing, and displaying data.
- **`plan-lekcji.json`**: A sample JSON file containing timetable data.
- **`style.css`**: Styles for the application.

## Usage

1. Open the application in your browser.
2. Select a classroom from the list of buttons.
3. View the timetable for the selected classroom, organized by day and time.
4. Use the "Wróć" button to go back to the list of classrooms.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js
- **Libraries**:
  - `cheerio`: For parsing HTML during data scraping.
  - `node-fetch`: For fetching data from the school's website.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Created by.... me (and my friend, chatgpt)!

## Contributing

Contributions are welcome! If you have ideas for improvements or new features, feel free to open an issue or submit a pull request.
