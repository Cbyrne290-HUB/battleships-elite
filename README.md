# Battleships Elite

Battleships Elite is a command-line Python application that brings 
the classic naval strategy game to life in the terminal. Built as 
a single-player experience, the game challenges the user to deploy 
their fleet and engage an AI opponent in turn-based combat on a 
10x10 grid. The project was developed as part of a Python Essentials 
portfolio module, with a focus on clean code structure, input 
validation, and data handling using a JSON-based leaderboard system.

<img width="1726" height="1039" alt="Screenshot 2026-03-26 at 15 19 33" src="https://github.com/user-attachments/assets/18a4fa44-230b-4c72-993b-c9b69441742b" />

## Table of Contents

- [Project Overview](#Project-Overview)
- [Features](#Features)
- [User Experience (UX)](#user-experience-ux)
- [Design](#Design)
- [Technologies Used](#technologies-used)
- [Testing & Logic Validation](#testing-and-logic-validation)
- [Deployment](#Deployment) 
- [Credits](#Credits) 

## Project overview

#### Why I Built Battleships Elite
* The inspiration came from a desire to build a fully functional 
strategy game using pure Python. I wanted to create a CLI 
experience that felt polished and engaging — using colorama for 
terminal colours, structured data with JSON, and a clean turn-based 
game loop that handles all edge cases gracefully.

#### The Objective
* Battleships Elite is built for strategy enthusiasts and casual 
gamers. It challenges users to outsmart an AI opponent through 
calculated fleet deployment and precision strikes. By 
incorporating a ship placement phase and a turn-based combat 
system, I aimed to create an engaging experience that makes 
the user feel like they are commanding a real naval operation 
directly from the terminal.

#### Personal Growth
* This project was a significant milestone in my Python journey. 
Key challenges I overcame included:

* Input Validation: Building robust validation for every user 
input — ship placement coordinates, shot coordinates, menu 
selections — ensuring the game never crashes on bad input.

* Data Persistence: Implementing a JSON-based leaderboard that 
reads and writes scores within a session, demonstrating 
real-world data management.

* Game Logic: Designing a coordinate system using nested lists 
that correctly handles ship placement, overlap detection, 
boundary checking, and hit/miss tracking.

## Features

#### Existing Features

#### Main Menu
* A clean terminal menu with three options — New Game, Leaderboard, 
and Quit. Loops until the player makes a valid choice.

<img width="855" height="680" alt="Screenshot 2026-03-22 at 20 50 15" src="https://github.com/user-attachments/assets/0c42ddb9-3f6f-4578-b32b-a982a0843a36" />

#### Ship Placement System
* Players place all 5 ships manually before the game begins. Each 
ship can be placed horizontally or vertically. The system validates 
every placement for boundaries and overlaps. The game cannot start 
until all ships are placed.

<img width="386" height="234" alt="Screenshot 2026-03-22 at 20 49 29" src="https://github.com/user-attachments/assets/f49df2cd-15ac-4989-91ea-b09103faf853" />

#### 10x10 Combat Grid
* Two boards are displayed — the player's own board showing their 
fleet, and the enemy board hiding the computer's ships. Rows are 
labelled A-J and columns 0-9. Hits show as X, misses as O.

<img width="393" height="460" alt="Screenshot 2026-03-22 at 20 22 41" src="https://github.com/user-attachments/assets/5c401b7e-72d8-4737-ab6b-99ab8a405315" />

#### Turn-Based Combat
* Players fire by entering a row letter (A-J) and column number 
(0-9). The computer fires back using random targeting. Duplicate 
shots are rejected. The game ends when all ships on either side 
are sunk.

<img width="393" height="460" alt="Screenshot 2026-03-22 at 20 22 41" src="https://github.com/user-attachments/assets/470a29a9-849e-4ec8-a0f9-b202d9dc0a14" />

#### JSON Leaderboard
* Every completed game saves the player name, result, and number 
of turns to a local scores.json file. The leaderboard displays 
all results sorted by fewest turns.

* Note: Due to Heroku's ephemeral filesystem, new scores saved 
during a session will be lost when the application restarts. 
The leaderboard displays pre-loaded sample scores by default. 
For persistent score storage, a database integration such as 
Google Sheets would be required.

<img width="341" height="120" alt="Screenshot 2026-03-22 at 20 42 53" src="https://github.com/user-attachments/assets/d45c09e5-8bed-40f0-a4b2-0dd6e81a3944" />

#### Features Left to Implement

#### Smarter AI Difficulty

* Smarter AI that hunts around a hit rather than firing randomly

#### Multiplayer Mode

* Multiplayer mode over a network connection

#### Custom Grid Sizes

* An option for users to choose between a "Quick Skirmish" (7x7 grid) or an "Epic War" (12x12 grid).

* Value: Increases the replayability of the game by allowing users to choose the length of their play session.

## User Experience (UX)

#### Project Goals
* The main objective for Battleships Elite was to create a fully 
functional command-line strategy game using Python. The focus 
was on clean code, robust input validation, and an engaging 
terminal-based experience that feels polished and intuitive.

#### User Experience Goals

* Intuitive Navigation: The main menu provides clear numbered 
options. Every prompt tells the user exactly what input is 
expected, removing any guesswork.

<img width="855" height="680" alt="Screenshot 2026-03-22 at 20 50 15" src="https://github.com/user-attachments/assets/9c89f9fa-56b7-422b-a686-3e16964c2951" />

* Clear Feedback: Every action produces immediate feedback — 
a hit displays 💥 HIT!, a miss displays 🌊 MISS!, invalid 
inputs are rejected with a clear error message and re-prompt.

<img width="82" height="22" alt="Screenshot 2026-03-22 at 20 24 13" src="https://github.com/user-attachments/assets/7bfdf598-fefc-498b-9888-35bfcd4fb316" />

<img width="79" height="25" alt="Screenshot 2026-03-22 at 20 24 24" src="https://github.com/user-attachments/assets/e7139195-2f51-444e-aec9-7ee4792f8368" />

* Engaging Presentation: Using colorama, the terminal output 
uses colour to differentiate key elements — green for ships, 
red for hits, blue for water — making the boards easy to 
read at a glance.

* Note: Colour output via colorama is fully functional when 
running the application locally with python3 run.py. When 
deployed on Heroku, the mock terminal displays all text in 
the default green colour. The colour logic remains active 
in the code and functions correctly in a standard terminal 
environment.

#### Technical & Learning Goals

* Input Validation: A primary goal was ensuring every user 
input is validated thoroughly — covering empty strings, 
out-of-range values, duplicate shots, and non-integer inputs.

* Data Persistence: I challenged myself to implement a real 
data layer using JSON to retrieve leaderboard 
scores across sessions.

* Clean Code Structure: I focused on writing modular, well-
documented Python functions — each with a clear single 
responsibility — following PEP8 standards throughout.

#### User Stories

* As a first-time player, I want clear prompts so I know 
exactly how to place my ships and fire shots without 
confusion.

* As a player, I want immediate feedback on whether my shot 
hit or missed so the game feels responsive and engaging.

* As a competitive player, I want my score saved to a 
leaderboard so I can track my best performances over time.

<img width="404" height="25" alt="Screenshot 2026-03-22 at 20 32 47" src="https://github.com/user-attachments/assets/4f913567-0cb9-4998-8091-c9e9c50094ba" />

* As a player, I want the game to reject invalid inputs 
gracefully so it never crashes or behaves unexpectedly.

<img width="540" height="41" alt="Screenshot 2026-03-22 at 20 54 38" src="https://github.com/user-attachments/assets/9b8d7dea-6315-4b3e-b8a3-b05ae981ef7e" />

## Design

#### Terminal Colour Scheme

* The colour scheme for Battleships Elite was chosen to make 
the terminal output easy to read and visually engaging.

| Element | Colour | Purpose |
|---------|--------|---------|
| Ships (S) | Green | Shows player fleet position clearly |
| Hits (X) | Red | Immediate visual indicator of damage |
| Misses (O) | Blue | Distinguishes misses from water |
| Water (~) | Blue | Fills empty board cells |
| Headers | Cyan | Separates sections clearly |
| Victory | Bright Green | Celebrates win condition |
| Defeat | Bright Red | Signals loss condition |

* Note: Colour output via colorama is fully functional when 
running the application locally with python3 run.py. When 
deployed on Heroku, the mock terminal displays all text in 
the default green colour. The colour logic remains active 
in the code and functions correctly in a standard terminal 
environment.

#### Board Layout
* The game displays two 10x10 grids in the terminal — the 
player's board showing their fleet, and the enemy board 
hiding the computer's ships. Rows are labelled A-J and 
columns 0-9 to make coordinates intuitive.

<img width="397" height="221" alt="Screenshot 2026-03-22 at 20 55 46" src="https://github.com/user-attachments/assets/733e3bf8-905d-49d3-825f-89049fadf977" />

#### Logic Flowcharts
* To ensure the game logic was solid before coding, I designed 
flowcharts to map out the primary loops of the game.

* Ship Deployment Flow: Checks if a ship is within bounds and 
not overlapping before confirming placement.

<img width="1443" height="426" alt="Screenshot 2026-03-26 at 15 28 23" src="https://github.com/user-attachments/assets/73bfb2f5-1153-492d-a203-bfe2b0c4e89e" />

* Combat Loop: Tracks the process from a player entering 
coordinates to the computer calculating its counter-attack.

<img width="1670" height="435" alt="Screenshot 2026-03-26 at 15 31 50" src="https://github.com/user-attachments/assets/068663f1-d9d5-4616-864d-fd86fb15ab27" />

## Technologies Used

* Python 3.12: Core language used for all game logic, input 
validation, data handling, and terminal output.

<img width="225" height="225" alt="image" src="https://github.com/user-attachments/assets/a1391b06-ac2b-49f7-8acc-12c0b9e0736b" />

* colorama: Python library used to add colour to terminal output — 
green for ships, red for hits, blue for water.

* json: Built-in Python library used to read and write the 
leaderboard data to scores.json.

<img width="690" height="330" alt="image" src="https://github.com/user-attachments/assets/9a4709ea-cc69-4940-9637-d65b1ec15178" />

* os: Built-in Python library used to clear the terminal screen 
between turns for a clean display.

* random: Built-in Python library used for the computer's random 
ship placement and targeting logic.

* GitHub: Used for version control with descriptive commit messages 
throughout development.

<img width="55" height="48" alt="Screenshot 2025-12-31 at 01 17 01" src="https://github.com/user-attachments/assets/677b4f69-8fa5-4573-982c-a763b75c5c87" />

* Heroku: Used to deploy the CLI application to a cloud platform 
using the CI mock terminal template.

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/6d24d21d-c742-4aed-abe0-a69d35373f7f" />

##### Development Approach

* A functional programming approach was chosen over object-oriented programming (OOP) for this project. The game logic is linear and sequential — each stage of the game flows naturally from one function to the next. Every function has a single clear responsibility, making the code easy to follow, test and maintain without the overhead of class structures. For a CLI project of this scope and complexity, functional programming is the most appropriate and readable solution.

## Testing and Logic Validation

* PEP8 Validation
The run.py file was passed through the Code Institute PEP8 
validator at [PEP8 Validator](https://pep8ci.herokuapp.com/) with zero errors.

<img width="1725" height="1040" alt="Screenshot 2026-03-22 at 19 46 15" src="https://github.com/user-attachments/assets/dd83b718-fcbc-4421-92ac-c7d94116b12b" />

#### Manual Testing

| Test | Expected Result | Pass/Fail |
|------|----------------|-----------|
| Enter name | Accepts any non-empty string | Pass |
| Empty name | Rejects and re-prompts | Pass |
| Place ship horizontally | Ship appears on board correctly | Pass |
| Place ship vertically | Ship appears on board correctly | Pass |
| Place ship out of bounds | Rejected with error message | Pass |
| Overlap ship placement | Rejected with error message | Pass |
| Start game without all ships placed | Not possible — must place all 5 | Pass |
| Fire valid coordinate | Hit or miss registered correctly | Pass |
| Fire duplicate coordinate | Rejected with error message | Pass |
| Fire out of range coordinate | Rejected with error message | Pass |
| Fire non-letter row | Rejected with error message | Pass |
| Computer fires each turn | Random valid coordinate selected | Pass |
| All enemy ships sunk | Victory message displayed | Pass |
| All player ships sunk | Defeat message displayed | Pass |
| Score saves after game | scores.json updated correctly | Pass |
| Leaderboard sorted by turns | Fewest turns shown first | Pass |
| Menu option 1 | Starts new game | Pass |
| Menu option 2 | Shows leaderboard | Pass |
| Menu option 3 | Exits game | Pass |
| Invalid menu input | Rejected with error message | Pass |

#### Resolved Bugs

* Ship Overflow Issue:
Ships placed near grid edges would overflow to the next row.
Fix: Added boundary validation checking both row and column 
limits before confirming placement.

* Duplicate Shot Bug:
Players could fire at the same coordinate twice.
Fix: All fired coordinates are stored in a set and checked 
before each shot is accepted.

#### Unfixed Bugs
* There are no known unfixed bugs at the time of submission.

## Deployment

* The application was deployed to Heroku using the Code Institute 
mock terminal template. Steps to deploy:

1. Create a new Heroku app from the Heroku dashboard

2. Add the following buildpacks in order:
   - heroku/python
   - heroku/nodejs

3. Ensure the following files are present in the repository:
   - requirements.txt (containing colorama)
   - Procfile (containing: web: node index.js)
   - runtime.txt (containing: python-3.12.3)
   - package.json
   - index.js (mock terminal server)
   - views/index.html (terminal UI)

4. Connect your GitHub repository to Heroku

5. Push to Heroku using: git push heroku main

* The live link can be found here:
[Live Link](https://battleships-elite-game-fbfab49a7bcc.herokuapp.com/)

To run locally:
1. Clone the repository: 
   git clone https://github.com/Cbyrne290-HUB/battleships-elite
2. Install dependencies: pip install colorama
3. Run the game: python3 run.py

## Credits

#### Tools & Deployment

* Validation: Python code checked using the Code Institute PEP8 
validator at [PEP8 Validator](https://pep8ci.herokuapp.com/)

* Deployment: Application hosted on [Heroku](https://www.heroku.com/) using the Code Institute 
mock terminal template.

<img width="400" height="400" alt="image" src="https://github.com/user-attachments/assets/900c5f6e-10b7-443f-8a05-12197e081ed5" />

* Version Control:[GitHub](https://github.com/apps/desktop) used for version control and source 
code hosting.

<img width="55" height="48" alt="Screenshot 2025-12-31 at 01 17 01" src="https://github.com/user-attachments/assets/1a3a4273-5a45-4ea3-9019-6852d68e29f6" />

* Libraries
colorama: Terminal colour library — [Colorama](https://pypi.org/project/colorama/)

* Acknowledgments
A huge thanks to my college instructors for their feedback and 
guidance throughout my software development journey.
