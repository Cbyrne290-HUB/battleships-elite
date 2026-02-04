# Battleships Elite

Battleships Elite is a high-stakes, browser-based strategy game that reimagines the classic naval combat experience for the modern web. Designed with a "Mobile-First" philosophy, the platform provides a seamless, high-engagement tactical simulation that allows users to deploy, rotate, and command a fleet against an adaptive AI opponent. The project hopes to bridge the gap between nostalgic board games and fast-paced digital entertainment, offering a polished interface that responds instantly to the commander's touch.

The application is specifically targeted toward strategy enthusiasts and casual gamers who seek quick, accessible mental challenges during their daily routines. By removing the need for high-end hardware or complex account registrations, Battleships Elite serves as a vital tool for cognitive stimulation and stress relief. Whether played on a desktop in a quiet moment or on an iPhone during a commute, the game provides a consistent, high-fidelity experience that rewards tactical positioning and calculated risk-taking.

<img width="942" height="534" alt="Screenshot 2026-02-03 at 23 52 49" src="https://github.com/user-attachments/assets/b242c534-8337-46b6-982b-c4086e725e77" />

## Features

#### Existing Features

* Tactical Deployment Sidebar

This section allows users to select from five distinct ship classes (Carrier, Battleship, Submarine, Destroyer, and Patrol Boat) and place them strategically on their grid.

Value: Provides the user with total control over their defensive strategy, ensuring every game starts with a unique setup tailored to their playstyle.

* Dynamic Ship Rotation

Implemented via a dedicated "Rotate" button, this feature toggles the placement orientation between horizontal and vertical.

Value: Offers deeper tactical flexibility, allowing users to fit ships into tight spaces or create complex patterns to confuse the AI.

* Interactive Dual-Grid Interface

The game features two high-fidelity grids: "Friendly Waters" for fleet management and "Hostile Waters" for offensive strikes.

Value: The clear visual separation helps the user focus on the two different phases of the game—defense and offense—without cluttering the screen.

* Real-Time Combat Feedback & Animations

Utilizing CSS keyframes, the game triggers a "Screen Shake" on successful hits and a "Splash" animation for misses.

Value: This adds a layer of visceral, "Elite" feel to the game, providing immediate emotional reward and clarity on whether an attack was successful.

* Adaptive Fleet Status HUD

A live tracking system in the status area that updates as ships are damaged or sunk, complete with a "strike-through" visual for destroyed vessels.

Value: Allows the user to quickly assess the "Health" of both their own fleet and the enemy's, helping them decide which ships to hunt next.

* Fully Responsive Mobile Design

The layout dynamically adjusts using CSS Media Queries to ensure the grids remain playable on smaller screens like iPhones.

Value: Crucial for our target audience of casual gamers, allowing them to play a high-quality strategy game on the go without losing UI functionality.

* Integrated Audio Controller

A custom music toggle with a browser-safe "unlocker" that allows users to enable or disable the cinematic soundtrack.

Value: Enhances the immersive atmosphere of naval warfare while giving the user control over their environment (e.g., playing silently in public).

#### Features Left to Implement

* Global Leaderboard & Turn Counter

Implementing a backend database to store the fewest number of turns taken to win.

Value: Adds a competitive element, encouraging users to return to the site to beat their own high scores or compete against the community.

* Custom Grid Sizes

An option for users to choose between a "Quick Skirmish" (7x7 grid) or an "Epic War" (12x12 grid).

Value: Increases the replayability of the game by allowing users to choose the length of their play session.
