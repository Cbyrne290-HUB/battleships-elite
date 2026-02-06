# Battleships Elite

Battleships Elite is a high-stakes, browser-based strategy game that reimagines the classic naval combat experience for the modern web. Designed with a "Mobile-First" philosophy, the platform provides a seamless, high-engagement tactical simulation that allows users to deploy, rotate, and command a fleet against an adaptive AI opponent. The project hopes to bridge the gap between nostalgic board games and fast-paced digital entertainment, offering a polished interface that responds instantly to the commander's touch.

The application is specifically targeted toward strategy enthusiasts and casual gamers who seek quick, accessible mental challenges during their daily routines. By removing the need for high-end hardware or complex account registrations, Battleships Elite serves as a vital tool for cognitive stimulation and stress relief. Whether played on a desktop in a quiet moment or on an iPhone during a commute, the game provides a consistent, high-fidelity experience that rewards tactical positioning and calculated risk-taking.

<img width="942" height="534" alt="Screenshot 2026-02-03 at 23 52 49" src="https://github.com/user-attachments/assets/b242c534-8337-46b6-982b-c4086e725e77" />

## Table of Contents

- [Project Overview](#Project-Overview)
- [Features](#Features)
- [User Experience (UX)](#user-experience-ux)
- [Design](#Design)
- [Technologies Used](#technologies-used)
- [Testing & Logic Validation](#testing-logic-validation)
- [Deployment](#Deployment) 
- [Credits](#Credits) 

## Project overview

#### Why I Built Battleships Elite
* The inspiration for this project came from a desire to modernize classic strategy games. I realized that many browser-based versions of Battleship feel dated or clunky. My goal was to build a "Commander-themed" experience that feels like a high-stakes tactical simulation. I wanted to create a clean, vibrant UI that gives the user immediate satisfaction through high-energy colors, screen-shake effects, and an immersive soundtrack that makes every "hit" feel significant.

#### The Objective
* Battleships Elite is built for strategy enthusiasts and casual gamers. It challenges users to outsmart an AI opponent through calculated fleet deployment and precision strikes. By incorporating a deployment phase and a "Fleet Status" tracking system, I aimed to personalize the experience, making the user feel like they are commanding a real naval operation rather than just clicking a grid.

#### Personal Growth
* This project was a significant milestone in my coding journey. It allowed me to move beyond simple scripts and into the world of complex JavaScript logic and Python-based data modeling. Key challenges I overcame included:

* Dynamic UI & State Management: Learning how to transition from the "Deployment Phase" to the "Combat Phase" seamlessly using JavaScript to hide/show sections and update the DOM in real-time.

* Coordinate Logic (Array Management): Organizing the grid system so that 1D array indices (0-99) correctly map to 2D logic to prevent ships from "wrapping" around rows or overlapping.

* UX Polish (The "Elite" Feel): Fine-tuning the game’s feedback loop—implementing screen-shake CSS animations for hits and a specialized "Audio Unlocker" to ensure the soundtrack works across all modern browsers.

## Features

#### Existing Features

#### Tactical Deployment Sidebar

* This section allows users to select from five distinct ship classes (Carrier, Battleship, Submarine, Destroyer, and Patrol Boat) and place them strategically on their grid.

* Value: Provides the user with total control over their defensive strategy, ensuring every game starts with a unique setup tailored to their playstyle.

<img width="260" height="472" alt="Screenshot 2026-02-06 at 22 45 35" src="https://github.com/user-attachments/assets/ed45c650-99ec-44b0-ae9e-b79d00b7deb2" />

#### Dynamic Ship Rotation

* Implemented via a dedicated "Rotate" button, this feature toggles the placement orientation between horizontal and vertical.

* Value: Offers deeper tactical flexibility, allowing users to fit ships into tight spaces or create complex patterns to confuse the AI.

<img width="206" height="52" alt="Screenshot 2026-02-06 at 22 46 14" src="https://github.com/user-attachments/assets/4e546579-7173-42ef-91a3-683bafe8c130" />

#### Interactive Dual-Grid Interface

* The game features two high-fidelity grids: "Friendly Waters" for fleet management and "Hostile Waters" for offensive strikes.

* Value: The clear visual separation helps the user focus on the two different phases of the game—defense and offense—without cluttering the screen.

<img width="795" height="451" alt="Screenshot 2026-02-06 at 22 45 47" src="https://github.com/user-attachments/assets/ec3dad6a-63c3-44f6-b988-bac6cf747eab" />

#### Real-Time Combat Feedback & Animations

* Utilizing CSS keyframes, the game triggers a "Screen Shake" on successful hits and a "Splash" animation for misses.

* Value: This adds a layer of visceral, "Elite" feel to the game, providing immediate emotional reward and clarity on whether an attack was successful.

#### Adaptive Fleet Status HUD

* A live tracking system in the status area that updates as ships are sunk, complete with a "strike-through" visual for destroyed vessels.

* Value: Allows the user to quickly assess the "Health" of both their own fleet and the enemy's, helping them decide which ships to hunt next.

<img width="403" height="277" alt="Screenshot 2026-02-06 at 22 46 37" src="https://github.com/user-attachments/assets/590c38c4-a158-452f-a55b-dd6838508267" />

####  Fully Responsive Mobile Design

* The layout dynamically adjusts using CSS Media Queries to ensure the grids remain playable on smaller screens like iPhones.

* Value: Crucial for our target audience of casual gamers, allowing them to play a high-quality strategy game on the go without losing UI functionality.

<img width="942" height="534" alt="Screenshot 2026-02-03 at 23 52 49" src="https://github.com/user-attachments/assets/39928550-ce1a-4766-958c-a2aa9646f385" />

#### Integrated Audio Controller

* A custom music toggle with a browser-safe "unlocker" that allows users to enable or disable the cinematic soundtrack.

* Value: Enhances the immersive atmosphere of naval warfare while giving the user control over their environment (e.g., playing silently in public).

<img width="134" height="52" alt="Screenshot 2026-02-06 at 22 46 51" src="https://github.com/user-attachments/assets/ad59b53b-deeb-42fc-a0a3-791af723191c" />
<img width="137" height="53" alt="Screenshot 2026-02-06 at 22 46 58" src="https://github.com/user-attachments/assets/90f48d38-e36d-447a-b0a4-45a33c29b42a" />

#### Features Left to Implement

#### Global Leaderboard & Turn Counter

* Implementing a backend database to store the fewest number of turns taken to win.

* Value: Adds a competitive element, encouraging users to return to the site to beat their own high scores or compete against the community.

#### Custom Grid Sizes

* An option for users to choose between a "Quick Skirmish" (7x7 grid) or an "Epic War" (12x12 grid).

* Value: Increases the replayability of the game by allowing users to choose the length of their play session.

## User Experience (UX)

#### Project Goals
* My main objective for Battleships Elite was to modernize the classic naval strategy experience, creating a web-based tool that feels like a high-stakes tactical simulation rather than a static board game.

#### User Experience Goals
* Tactical Immersion: I wanted to make naval warfare engaging. By incorporating a "Deployment Phase" and cinematic "Screen Shake" effects, I aimed to give players a sense of weight and impact with every command.

* Intuitive Design: I focused on building a UI that requires no manual. Through "ghost" placement previews and clear button labeling, a user can deploy their fleet and engage the enemy within seconds.

* Visceral Feedback: It was vital that the game felt responsive. I utilized immediate visual cues (Red for hits, Gray for misses) and synchronized audio to provide an instantaneous feedback loop for every action.

#### Technical & Learning Goals
* Dynamic State Management: A primary goal was mastering JavaScript to handle the transition between the Placement Phase and the Combat Phase without a page refresh, maintaining the game state in the background.

* Grid Coordinate Logic: I challenged myself to build a robust coordinate system that prevents ship overlapping and ensures ships do not "wrap around" the grid borders, maintaining strict game rules.

* Mobile-First Polish: I focused on ensuring the "Command Console" remained perfectly aligned and interactive on everything from a small smartphone to a large desktop monitor using CSS Flexbox and Media Queries.

#### User Stories
* As a first-time visitor, I want to intuitively understand how to place my ships so I can start the game without reading a long tutorial.

<img width="125" height="52" alt="Screenshot 2026-02-06 at 22 53 16" src="https://github.com/user-attachments/assets/2e6ef47e-f043-4056-8883-0cea7422bb22" />

* As a player, I want to feel the impact of my strikes through visual and audio feedback so the game feels exciting and rewarding.

* As a strategic player, I want to track the remaining ships in the enemy fleet so I can plan my next moves based on which vessels are still afloat.

* As a mobile user, I want the buttons and grid cells to be large enough to tap accurately so I don't make accidental moves on a small screen.

## Design

#### Colour Scheme
* The color palette for Battleships Elite was selected to evoke the atmosphere of a high-tech naval command center. Using a tool called [coolors](Coolors.co), I developed a palette that balances deep "Sonar Blues" with high-visibility "Tactical Neons."The dark background gradients represent the depths of the ocean and the low-light environment of a submarine bridge, providing a high-contrast backdrop that makes the vibrant strike indicators (Red) and positioning markers (Green) pop. This "Dark Mode" aesthetic reduces eye strain during extended play sessions while maintaining a modern, professional "Elite" feel.

#### Role,Color,Name,HexCode,Purpose
Background (Top),Deep Command Blue,#1e3c72,Main brand identity and tactical contrast.

Background (Bottom),Abyss Blue,#2a5298,Adds depth to the UI and mimics the sea.

Primary ActionTactical,Green,#4eca72,Used for "Engage Enemy" and ship placement.

Strike/DamageWarning,Red,#dc3545,Immediate,feedback for hits and critical alerts.

Secondary ActionSteel,Gray,#6c757d,Used for secondary UI buttons and "Miss" markers.

Text/Overlays,High-Viz White,#ffffff,Maximum readability for HUD stats and alerts.

<img width="1727" height="638" alt="Screenshot 2026-02-04 at 00 51 51" src="https://github.com/user-attachments/assets/d2ec8f28-e063-4b36-9bba-b6701995b867" />
<img width="152" height="56" alt="Screenshot 2025-12-30 at 22 35 51" src="https://github.com/user-attachments/assets/e2b79cd8-d7b3-432f-b02e-955080f0606a" />

#### Typography
* I used the 'Nunito' font family from[Google Fonts](https://fonts.google.com/) for this project. While the game has a military theme, I chose 'Nunito' because its clean, rounded style provides the clarity of a modern digital display (HUD) without feeling dated.Hierarchy: I used extra-bold weights (800) for headers to mimic "Classification" titles found on military documents.Legibility: Medium weights were used for buttons and grid coordinates to ensure the user can make split-second tactical decisions on any device size.

<img width="193" height="51" alt="Screenshot 2025-12-30 at 22 35 05" src="https://github.com/user-attachments/assets/050b1f72-2887-4fc8-8fe1-48bc90be18df" />

#### Logic Flowcharts 
To ensure the game logic was solid before coding, I designed flowcharts to map out the primary loops of the game. These diagrams helped me visualize the turn-based system and the "Hit/Miss" validation logic.

Ship Deployment Flow: This covers how the system checks if a ship is within bounds and not overlapping before locking it in.

<img width="912" height="216" alt="Screenshot 2026-02-03 at 23 44 45" src="https://github.com/user-attachments/assets/ecf2c63c-1174-4ea1-8e25-d1d3ef90258a" />

Combat Loop: This tracks the process from a player clicking the enemy grid to the AI calculating its counter-attack.

<img width="1108" height="290" alt="Screenshot 2026-02-03 at 23 48 14" src="https://github.com/user-attachments/assets/dede19b8-02ed-4e76-bf1e-278a04c9977c" />

#### Headings & UI Structure
* A clear visual hierarchy was implemented to make Battleships Elite intuitive. By using bold, uppercase titles for the "Command Console" and "Fleet Status," I created a visual path that guides the user from deployment to combat. Proper HTML5 semantic tags were used throughout to ensure the layout is organized and accessible for screen readers, ensuring the "Status" updates are always the focal point.

#### Branding & Iconography
* The visual identity of Battleships Elite—from the grid icons to the splash screen—was designed to bridge the gap between classic board games and modern tactical simulators. By using consistent "Glow" effects on the buttons and high-contrast markers on the grids, I created a cohesive visual link between the "Commander" persona and the actual gameplay. This establishes a polished, "Studio-Quality" feel from the moment the user enters the deployment phase.

## Technologies Used

Python 3: Used for the backend logic and data handling. I focused on writing clean, modular code and ensured it followed PEP8 standards for professional readability.

<img width="262" height="221" alt="Screenshot 2026-02-04 at 01 50 50" src="https://github.com/user-attachments/assets/5771c9d7-0051-4b07-a493-1121122e392e" />

HTML5: Used to create the structural "Command Center" layout to ensure high accessibility scores.


<img width="442" height="520" alt="Screenshot 2026-02-04 at 01 51 36" src="https://github.com/user-attachments/assets/3eec84df-935d-473d-9e1e-334c71617a55" />

CSS3: Used for the tactical "Dark Mode" styling, including Flexbox for grid alignment and custom keyframe animations for the "Screen Shake" effects.

<img width="398" height="488" alt="Screenshot 2026-02-04 at 01 51 55" src="https://github.com/user-attachments/assets/691deb42-b25f-4627-a8e1-342890edf670" />

JavaScript (ES6+): The engine of the game. Used for DOM manipulation, managing the ship deployment state, and handling the AI combat logic through efficient array methods like .forEach().

<img width="330" height="375" alt="Screenshot 2026-02-04 at 01 52 13" src="https://github.com/user-attachments/assets/306d0780-eb4e-4a6d-866e-9be65b1bbb1e" />

Fonts: Specifically the 'Nunito' family, chosen for its high legibility and modern "Head-Up Display" (HUD) aesthetic.

<img width="193" height="51" alt="Screenshot 2025-12-30 at 22 35 05" src="https://github.com/user-attachments/assets/0bbdecf0-a398-4075-b733-3f82124f4fb1" />

Coolors: Used to research and generate a high-contrast naval color palette that balances accessibility with a tactical military feel.

<img width="152" height="56" alt="Screenshot 2025-12-30 at 22 35 51" src="https://github.com/user-attachments/assets/9e425835-b57b-4758-9303-c8fec639f332" />

GitHub / GitHub Pages: Utilized for version control with regular commits and for hosting the live production site.

<img width="55" height="48" alt="Screenshot 2025-12-31 at 01 17 01" src="https://github.com/user-attachments/assets/db191fde-c552-44e0-be9a-4da2f5c57ee6" />

Google Lighthouse: Used throughout development to audit and optimize performance, SEO, and accessibility.

<img width="455" height="225" alt="Screenshot 2026-02-04 at 01 52 49" src="https://github.com/user-attachments/assets/7dcf7082-48ae-4fbf-8b68-c5167075bfbf" />

## Testing & Logic Validation
#### Design Philosophy
* When I started building Battleships Elite, my goal was to create a game that felt "snappy" and responsive. I wanted the transition from placing ships to fighting the AI to be seamless. Most of my testing time was spent in the browser console, making sure that when a user clicks a coordinate, the game knows exactly which fleet is being hit and updates the health bars instantly.

#### Resolved Bugs

#### The Ship Overflow Issue:
* I found that if I clicked a ship at the very edge of the grid, it would "wrap around" and look like it was on two different rows.

* The Fix: I had to sit down and work out the grid math. I added a check using the modulo operator (%) to ensure a ship stays on its own line. Seeing it finally "hit a wall" at the edge of the grid was a huge relief.

#### The Infinite Deployment Bug: 
* During early testing, I realized I could just keep clicking and placing dozens of ships.

* The Fix: I implemented a "Ship Inventory" logic. Now, the code tracks how many of each ship type has been placed. Once you hit the limit, the grid stops listening to clicks for that ship.

#### Audio Browser Blocks: 
* I wanted the cinematic music to start immediately, but Chrome and Safari kept blocking it.

The Fix: I learned that browsers require a "user gesture" (like a click) before playing audio. I added an "Enter Command Center" button to start the game, which officially "unlocks" the sound for the player.

#### Unfixed Bugs 
* At the time of submission, there are no known bugs remaining in Battleships Elite. Every core feature—from ship deployment and grid boundary logic to the AI combat system and win/loss modals—has been tested across multiple browsers (Chrome, Safari) and devices. The game remains stable during rapid inputs, and the "Command Console" UI scales correctly without any layout breakage.

#### Manual Testing Results
* To ensure the game was "bulletproof" before submission, I performed extensive manual testing across several key areas:

* Ship Placement & Overlapping: I attempted to place multiple ships on the same squares to see if they would stack. The system correctly blocked the second ship, preserving the integrity of the grid.

* Grid Boundaries: I tested placing large ships (like the Carrier) near every edge of the 10x10 grid. The logic successfully denied any placement that would have exceeded the board limits or wrapped to the next line.

* Combat & Turn Logic: I intentionally clicked on squares that had already been recorded as a "Miss" or a "Hit." The game correctly ignored these inputs, ensuring that players cannot waste turns or cheat the system by clicking the same spot twice.

* Responsive UI: I loaded the game on multiple mobile devices and resized browser windows to extremes. The Flexbox layout kept the grid centered, and the buttons remained large enough to tap accurately on a touchscreen.

* Win Condition: I played through full sessions to ensure the game ended exactly when the final enemy ship was sunk. In every test, the "Victory" modal appeared instantly upon the final hit, successfully stopping the game clock.

#### Validation & Tools
* All code was passed through the [W3C Validator](https://validator.w3.org/), [(Jigsaw)Validator](https://jigsaw.w3.org/css-validator/) and the [JSHint Validator](https://jshint.com/) to ensure no major errors.

* JSHint: I used this to clean up my JavaScript. It flagged some messy loops I was using for the grid, so I refactored them into cleaner .forEach() methods.
* Code Analysis (JSHint) The JavaScript logic was validated using JSHint.Warnings: 0,Largest Function: 14 statements,Cyclomatic Complexity: 10 (Within professional industry standards)
Result: The code is highly modular with a low complexity median, ensuring maintainability and performance.

<img width="1097" height="220" alt="Screenshot 2026-02-04 at 02 52 15" src="https://github.com/user-attachments/assets/10271572-5db5-4a9f-9d63-8f1e37885788" />

* W3C Validators: Both the HTML and CSS were run through official validators to ensure there were no broken tags or syntax errors.

<img width="1685" height="709" alt="Screenshot 2026-02-04 at 02 52 32" src="https://github.com/user-attachments/assets/e7ecdf7d-9641-43eb-b5f3-d53841dafdd1" />
<img width="1727" height="305" alt="Screenshot 2026-02-04 at 02 52 47" src="https://github.com/user-attachments/assets/f003a554-d629-4e69-a209-fb2c38c4acc7" />

* PEP8: The Python code in run.py was formatted to follow PEP8 standards, keeping the backend as professional as the frontend.


#### Lighthouse Report
I have tested my site on performance, accessibility, SEO and best practices on both mobile and laptop. on mobile I scored a (100) on performance,SEO and best practices and I scored a (93) on accessibility
I scored the exact same on the laptops performance, accessibility, SEO and best practices. Overall this is nearly a perfect score on both mobile on laptop even with the room for improvement.

<img width="1728" height="926" alt="Screenshot 2026-02-04 at 01 29 40" src="https://github.com/user-attachments/assets/b18034b0-922c-4ca6-9e1a-5492996bcb02" />
<img width="1728" height="928" alt="Screenshot 2026-02-04 at 01 29 49" src="https://github.com/user-attachments/assets/5c18e03f-8dfa-4c0f-87cd-d85e0132dad4" />

### Browser Compatibility: 
* Tested the game on Safari and Google Chrome.

<img width="1726" height="1078" alt="Screenshot 2026-02-04 at 01 58 15" src="https://github.com/user-attachments/assets/c3a8dd32-6dc0-4304-af1e-3ebd71ee0997" />
<img width="1726" height="1080" alt="Screenshot 2026-02-04 at 02 00 31" src="https://github.com/user-attachments/assets/14bd812c-f36e-451a-9e40-c1bb6f8f88eb" />

### Device Testing: 
* Verified that the buttons and images scale correctly on all devices like the imac,macbook,ipad and iphone all came back with images and buttons working perfectly. 

<img width="942" height="534" alt="Screenshot 2026-02-03 at 23 52 49" src="https://github.com/user-attachments/assets/a4b76cc0-2070-4580-8273-071cb6f25c6b" />

## Deployment
* The site was deployed to GitHub pages. The steps to deploy are as follows:

<img width="55" height="48" alt="Screenshot 2025-12-31 at 01 17 01" src="https://github.com/user-attachments/assets/8ac1a447-321c-4015-beb8-110e9149b504" />

* In the GitHub repository, navigate to the Settings tab

<img width="141" height="32" alt="Screenshot 2026-02-04 at 01 37 48" src="https://github.com/user-attachments/assets/4cc8dbf6-7642-4c40-b464-0084571f06ef" />
<img width="98" height="33" alt="Screenshot 2026-02-04 at 01 38 04" src="https://github.com/user-attachments/assets/04b1e2ee-505e-48db-9d32-78a1eca5d906" />

* From the source section drop-down menu, select the Master Branch

<img width="772" height="227" alt="Screenshot 2026-02-04 at 01 39 08" src="https://github.com/user-attachments/assets/8c368578-f906-4121-8bc5-5cbe6b1517a5" />

* Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

<img width="789" height="77" alt="Screenshot 2026-02-04 at 01 40 16" src="https://github.com/user-attachments/assets/56253584-d8db-4981-9b63-8c72bb2f04ac" />

* The live link can be found here - [https://cbyrne290-hub.github.io/battleships-elite/](https://cbyrne290-hub.github.io/battleships-elite/)

## Credits
#### Media & Assets 
* Background Music: The cinematic track used in the game is provided by [CodeSkulptor Demos](https://py2.codeskulptor.org/demos.html#tabs-Hall-of-Fame). 

* Color Palette: Tactical color hex codes were researched and generated using [Coolors.co](https://coolors.co/). 

* Typography: The 'Nunito' font is provided by [Google Fonts](https://fonts.google.com/). 

#### Tools & Deployment 
Validation: Code was checked for errors using the [W3C HTML Validator](https://validator.w3.org/), [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) and [JSHint](https://jshint.com/). 

Performance: Audits were conducted using [Google Lighthouse](https://pagespeed.web.dev/) in Chrome DevTools to ensure a smooth user experience. 

Hosting: The project is hosted on [GitHub Pages](https://github.com/). 

Acknowledgments 
A huge thanks to my college instructors for their feedback and help so far in my software journey. Their guidance helped me turn a simple grid into a fully functional tactical simulation. 
