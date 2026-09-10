# Web Prototype: Car Audio Inventory

This is a working prototype that implements the Singleton, Factory, and MVC design patterns in the context of an inventory management system for car audio equipment.

## Technologies Used
* **Framework:** Next.js (App Router)
* **UI Library:** React + Tailwind CSS
* **Language:** TypeScript

## Implemented Design Patterns and Location

1. **Singleton (State Management)**
   * **File:** `lib/DatabaseConnection.ts`
   * **Line:** 15 (`public static getInstance()`)
   * **Usage:** Maintains a single instance in memory to simulate a persistent database connection.

2. **Factory (Component Creation)**
   * **File:** `lib/AudioComponentFactory.ts`
   * **Line:** 22 (`static create(...)`)
   * **Usage:** Centralizes the creation of various audio devices with base specifications.

3. **MVC (Layer Architecture)**
   * **Model:** `models/InventoryModel.ts` (Line 10) - Handles data persistence.
   * **Controller:** `controllers/InventoryController.ts` (Line 3) - Performs business validation.
   * **View:** `app/page.tsx` (Line 5) - Presents the pure graphical interface.

## Running Instructions
1. Make sure you have Node.js installed.
2. Clone the repository and navigate to the root folder.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the development environment.
5. Open `http://localhost:3000` in your browser.
