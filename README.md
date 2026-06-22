# RouteROI

**RouteROI** is a client-side React/TypeScript application designed as a pre-shift tactical strategy tool for independent contractors, courier networks, and gig economy operators. 

Instead of tracking expenses after the fact, RouteROI is a front-line utility that computes the real-time physical vehicle Cost Per Mile (CPM) and factors in the driver's Target Hourly Wage to determine the absolute minimum acceptable payout per mile. All long-term business accounting (taxes, CPA fees, subscriptions) is shifted to external sheets, keeping the app focused strictly on front-line order filtering.

---

## 🚀 Key Features

* **Minimum Payout Per Mile**: Computes the required rate per mile needed to cover vehicle operational costs and earn your target net hourly wage based on average active traffic speed.
* **Physical Vehicle CPM (Breakeven)**: Calculates the physical cost of driving one mile (fuel cost based on MPG and gas price + maintenance CPM).
* **Quick Trip Calculator**: A real-time, touch-friendly trip payout estimator. Drivers can input the distance of a pending offer from delivery platforms to instantly see:
  * **Target Minimum**: The minimum payout needed to cover vehicle wear and hit their target wage.
  * **Do Not Accept Below**: The strict physical vehicle cost breakeven limit, below which they are losing money on the drive.
* **Mobile-Only Optimized UI**: A high-contrast, dark mode interface tailored for readability while mounted in a vehicle. Designed strictly for touch interactions with large active tap targets (>= 48px), iOS input zoom prevention, and a centered mobile app frame layout on desktop.

---

## 🛠️ Tech Stack

* **Framework & Tooling**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vite.dev/) for high-speed compilation and builds.
* **Styling**: [styled-components](https://styled-components.com/) utilizing design tokens from a custom centralized theme, featuring mobile-native active touch feedback.
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
> **DO NOT operate this application, input parameters, or interact with the Quick Trip Calculator while operating a moving vehicle.** Safe driving is your primary responsibility. Always pull over to a safe, stationary location or configure your parameters before starting your shift.
