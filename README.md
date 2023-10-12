# YouTube Metadata Extractor to Google Sheets

## Overview

The YouTube Metadata Extractor is a robust Google Apps Script solution designed to fetch and compile metadata from YouTube channels, their uploaded videos, and playlists directly into a Google Sheet. Leveraging the YouTube Data API, this script efficiently extracts desired data points, providing a structured overview without the need for manual research through each channel. The solution is engineered for easy customization and periodic data retrieval, making it a valuable tool for digital marketers, analysts, or anyone keen on organized YouTube data.

## Features

### 1. **Centralized Configuration**:
   - An initialization object is utilized to centralize the configuration, including tab names and data keys to extract from YouTube.
   - This central setup simplifies modifications in the data you aim to retrieve and store concerning channels, videos, and playlists.

### 2. **Automated or Manual Data Retrieval**:
   - Set up time-based triggers to automate data retrieval at preferred intervals.
   - Alternatively, run the script manually either via a custom menu item or directly from the editor.

### 3. **Comprehensive Data Extraction**:
   - **Channel Data**: Extracts metadata of specified channels from a list of channel IDs in the "Channel IDs" tab.
   - **Video Data**: For each channel, fetches all uploaded videos displaying their metadata in a structured format, with the ability to fetch more videos using "nextPage" tokens.
   - **Playlist Data**: Similarly, retrieves all playlists for each channel, displaying their metadata and leveraging "nextPage" tokens to fetch additional playlists as needed.

## Usage

1. **Setup**:
   - Copy the provided script into the script editor of your Google Sheet.
   - Input the channel IDs in the "Channel IDs" tab.
   
2. **Configuration**:
   - Adjust the initialization object to match your desired configuration.
   - Specify the data keys you wish to extract for channels, videos, and playlists.
   
3. **Execution**:
   - Either set up a time-based trigger for automated data retrieval or run the script manually.
   
4. **Viewing Data**:
   - Once the script has run, view the extracted data in the respective tabs of your Google Sheet.
   - Make any further modifications in the script as needed to tailor the data to your requirements.

## Benefits

- **Efficiency**: Minimizes time spent on manual data retrieval and research through channels.
- **Customization**: Easily modify data points you wish to extract and how they are stored.
- **Automation**: Option for setting up periodic data retrieval, keeping your sheet updated with the latest data.

## Tech Stack

- **Google Apps Script (JavaScript)**: The core of the solution, handling the data extraction and interaction with the YouTube Data API.
- **YouTube Data API**: The data source, providing extensive metadata on channels, videos, and playlists.
- **Google Sheets**: The data repository, where extracted data is structured and stored for easy access and analysis.

---
