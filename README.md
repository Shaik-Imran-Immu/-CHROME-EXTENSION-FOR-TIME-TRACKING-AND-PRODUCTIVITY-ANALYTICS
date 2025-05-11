# -CHROME EXTENSION FOR TIME TRACKING AND PRODUCTIVITY ANALYTICS

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: Shaik Imran

*INTERN ID*: CT08WF24

*DOMAIN*: Full Stack Web Development

*DURATION*: 8 WEEEKS

*MENTOR*: NEELA SANTOSH

*DESCRIPTION*: [Task - 4]

Developed a Chrome extension designed to monitor user activity, track the amount of time spent on different websites and present insightful productivity analytics through a visually rich dashboard. The core objective is to help users understand their browsing habits and optimize their time online. The extension will automatically detect and log user visits to websites, classify those websites as either productive (e.g., coding platforms) or unproductive (e.g., social media) and generate weekly reports that visualize time distribution and productivity trends.

Objective:
Created a lightweight, efficient and user-friendly Chrome extension that operates in the background to collect browsing data, syncs with a backend server for persistent storage and offers a dashboard that helps users assess and improve their online productivity. It combines frontend development, backend integration, Chrome extension APIs and data visualization to deliver a comprehensive digital wellbeing tool.

Key Features:

1. Chrome Extension for Time Tracking:
   The extension will use Chrome’s background and content scripts to detect active tabs and record the duration spent on each domain. It will:

* Monitor tab activity and user focus
* Start timers when a tab becomes active
* Pause tracking on tab switch
* Store time logs with timestamps, durations and website URLs in MongoDB

2. Website Classification System:
   Websites will be automatically classified into two categories:

* Productive: GitHub, Leetcode, Hackerrank.
* Unproductive: Facebook, Twitter, Instagram.

Classification will be based on a predefined list of domains. Future enhancement could include allowing users to customize this list.

3. Backend Integration for Data Storage:
   A backend built using Node.js will receive and store time tracking data sent by the Chrome extension. The backend will:

* Accept time logs via WebSocket
* Store data securely in a MongoDB

4. Interactive Analytics Dashboard:
   A dashboard accessible via the extension and also a dedicated web page will allow users to view and analyze their data. Key features will include:

* Bar chart showing time spent per website, color-coded by category (e.g., green for productive, red for unproductive)
* Pie chart displaying overall productivity percentage for a week
* Time trends across different days of the week
* Insights into most-visited domains and total online time

This dashboard is developed using React.js, with visualization libraries like Chart.js for interactive charts.

5. Weekly Productivity Reports:
   The system will automatically calculate and display weekly summaries including:

* Total productive vs. unproductive hours

6. Privacy and Efficiency:
   The extension will operate with minimal performance impact. Users data will not be shared or accessed by third parties. The extension will provide settings to pause tracking, clear history and review classified websites.

Deliverables:

* A fully functioning Chrome extension that tracks website activity
* Backend server for collecting and storing tracking data
* A dashboard that visually displays productivity analytics
* Weekly summaries based on user activity
* Clean, modular code with clear documentation

Technology Stack:

* Chrome Extension APIs, JavaScript
* Backend: Node.js with Express
* Database: MongoDB
* Frontend Dashboard: React.js + Chart.js




