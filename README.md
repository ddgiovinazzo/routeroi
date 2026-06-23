# RouteROI

**RouteROI** is a client-side React/TypeScript application designed as a pre-shift tactical strategy tool and real-time pre-drive **Snap Decision Evaluator** for independent contractors, courier networks, and gig economy operators. 

Instead of tracking expenses after the fact, RouteROI computes the real-time physical vehicle Cost Per Mile (CPM) and factors in the driver's Target Hourly Wage to determine the absolute minimum acceptable payout per mile. Designed for extreme speed, the app flattens time into distance using an average speed (MPH) profile, allowing a single-input layout.

---

## 🚀 Key Features

* **Magic Multiplier Single-Input Evaluation**: Simply enter the **Route Miles** of a pending offer to instantly see the calculated **Required Target** payout. The app flattens target wages into a per-mile profit threshold:
  $$\text{Magic Multiplier} = \left(\frac{\text{Gas Price}}{\text{MPG}} + \text{Maintenance CPM}\right) + \frac{\text{Target Hourly Wage}}{\text{Average MPH}}$$
* **Optional Offer Verification**: Drivers can optionally input an actual payout offer value to run a detailed evaluation against the private external `@ddgiovinazzo/dispatch-math` package, returning:
  * **Net Profit** (incorporating exact vehicle CPM expenses and deadhead logic).
  * **Est. Hourly Rate** (based on computed travel duration).
* **Go/No-Go Verdict**: Instantly flags whether an offer is a "Go" (GREEN) or "No-Go" (RED) based on whether the estimated hourly rate meets or exceeds the target hourly wage.
* **Deadhead Return Toggle**: A giant toggle to mark whether they have to return empty, which instantly doubles the route mileage for cost calculations.
* **Smart State Hook**: Separates the **Vehicle Profile** (Gas Price, MPG, Maintenance CPM, Target Hourly Wage, and Average MPH) which persists in LocalStorage, from the transient **Active Offer** parameters (Miles, Actual Offer, Deadhead Toggle) which clear on reset.
* **Mobile-First Optimized UI**: High-contrast, dark mode interface tailored for quick readability while parked in a vehicle. Designed strictly for touch interactions with large active tap targets (>= 48px), iOS input zoom prevention, and a centered mobile app frame layout.

---

## 🛠️ Tech Stack & Dependencies

* **Framework & Tooling**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vite.dev/).
* **Styling**: [styled-components](https://styled-components.com/) utilizing design tokens from a custom centralized theme.
* **Math Engine**: [@ddgiovinazzo/dispatch-math](https://github.com/ddgiovinazzo/dispatch-math) for trip profitability calculation.
* **CI/CD Deployment**: Automated static-site compilation and deployment to GitHub Pages via custom GitHub Actions.

---

## 📦 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v20+ or v22+ recommended) and `npm` installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ddgiovinazzo/routeroi.git
   cd routeroi
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server locally:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build the application for production:
   ```bash
   npm run build
   ```

---

## ⚠️ Important Disclaimers

### Financial Disclaimer
> [!IMPORTANT]
> RouteROI is provided for informational and educational purposes only. It is designed to estimate front-line vehicle CPM and wage-based rate filters. It does not constitute professional financial, tax, investment, or legal advice. Users should consult a certified CPA or tax professional to handle business accounting, tax liabilities, and deductions.

### Safety Disclaimer
> [!WARNING]
> **DO NOT operate this application, input parameters, or interact with the Snap Decision Evaluator while operating a moving vehicle.** Safe driving is your primary responsibility. Always pull over to a safe, stationary location or configure your parameters before starting your shift.
