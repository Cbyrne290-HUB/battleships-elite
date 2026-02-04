# Battleships Elite

Battleships Elite is a high-stakes, browser-based strategy game that reimagines the classic naval combat experience for the modern web. Designed with a "Mobile-First" philosophy, the platform provides a seamless, high-engagement tactical simulation that allows users to deploy, rotate, and command a fleet against an adaptive AI opponent. The project hopes to bridge the gap between nostalgic board games and fast-paced digital entertainment, offering a polished interface that responds instantly to the commander's touch.

The application is specifically targeted toward strategy enthusiasts and casual gamers who seek quick, accessible mental challenges during their daily routines. By removing the need for high-end hardware or complex account registrations, Battleships Elite serves as a vital tool for cognitive stimulation and stress relief. Whether played on a desktop in a quiet moment or on an iPhone during a commute, the game provides a consistent, high-fidelity experience that rewards tactical positioning and calculated risk-taking.

<img width="942" height="534" alt="Screenshot 2026-02-03 at 23 52 49" src="https://github.com/user-attachments/assets/b242c534-8337-46b6-982b-c4086e725e77" />

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

#### Dynamic Ship Rotation

* Implemented via a dedicated "Rotate" button, this feature toggles the placement orientation between horizontal and vertical.

* Value: Offers deeper tactical flexibility, allowing users to fit ships into tight spaces or create complex patterns to confuse the AI.

#### Interactive Dual-Grid Interface

* The game features two high-fidelity grids: "Friendly Waters" for fleet management and "Hostile Waters" for offensive strikes.

* Value: The clear visual separation helps the user focus on the two different phases of the game—defense and offense—without cluttering the screen.

#### Real-Time Combat Feedback & Animations

* Utilizing CSS keyframes, the game triggers a "Screen Shake" on successful hits and a "Splash" animation for misses.

* Value: This adds a layer of visceral, "Elite" feel to the game, providing immediate emotional reward and clarity on whether an attack was successful.

#### Adaptive Fleet Status HUD

* A live tracking system in the status area that updates as ships are damaged or sunk, complete with a "strike-through" visual for destroyed vessels.

* Value: Allows the user to quickly assess the "Health" of both their own fleet and the enemy's, helping them decide which ships to hunt next.

####  Fully Responsive Mobile Design

* The layout dynamically adjusts using CSS Media Queries to ensure the grids remain playable on smaller screens like iPhones.

* Value: Crucial for our target audience of casual gamers, allowing them to play a high-quality strategy game on the go without losing UI functionality.

#### Integrated Audio Controller

* A custom music toggle with a browser-safe "unlocker" that allows users to enable or disable the cinematic soundtrack.

* Value: Enhances the immersive atmosphere of naval warfare while giving the user control over their environment (e.g., playing silently in public).

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

#### Headings & UI Structure
* A clear visual hierarchy was implemented to make Battleships Elite intuitive. By using bold, uppercase titles for the "Command Console" and "Fleet Status," I created a visual path that guides the user from deployment to combat. Proper HTML5 semantic tags were used throughout to ensure the layout is organized and accessible for screen readers, ensuring the "Status" updates are always the focal point.

#### Branding & Iconography
* The visual identity of Battleships Elite—from the grid icons to the splash screen—was designed to bridge the gap between classic board games and modern tactical simulators. By using consistent "Glow" effects on the buttons and high-contrast markers on the grids, I created a cohesive visual link between the "Commander" persona and the actual gameplay. This establishes a polished, "Studio-Quality" feel from the moment the user enters the deployment phase.
