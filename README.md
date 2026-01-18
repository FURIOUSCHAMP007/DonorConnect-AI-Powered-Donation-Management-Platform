# DonorConnect

![Hero Image](https://images.unsplash.com/photo-1553989577-14e950184619?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb21tdW5pdHklMjBkaXZlcnNlfGVufDB8fHx8MTc2ODQ1ODI5OXww&ixlib=rb-4.1.0&q=80&w=1080)

**DonorConnect** is a revolutionary platform that uses AI to optimize the blood, organ, and tissue donation process, ensuring critical supplies are always available. It provides a seamless connection between donors, hospitals, and patients in need.

## Key Features

The application is divided into two main portals: one for donors and one for administrators.

### Donor Portal

-   **Dashboard**: A personalized overview for donors showing eligibility status, availability, personalized health insights, and alerts for emergency requests.
-   **Profile Management**: Donors can update their personal information, contact details, and registered donation types (blood, organs, tissues).
-   **Donation History**: A comprehensive record of all past and scheduled donations, including a "Donation Journey" feature to track the impact of their contribution.
-   **Blood Drive Locator**: A map-based tool to find and RSVP for upcoming blood drives in the local area.
-   **Gamification & Rewards**: Earn badges and celebrate milestones for donation activities to encourage community engagement.
-   **Settings**: Manage notification preferences for appointments, updates, and emergency alerts.

### Admin Portal

-   **Dashboard**: A high-level view of critical metrics, including a blood inventory heatmap, a signal trigger for urgent requests, predictive demand forecasts, and automated inventory alerts.
-   **Inventory Management**: Detailed tables for managing blood, organ, and tissue inventories with real-time status and levels.
-   **Request Management**: A centralized page to view, manage, and track all incoming donation requests.
-   **Analytics**: In-depth analytics with interactive charts on donation trends, request statuses, inventory levels, and donor demographics.
-   **Campaign Management**: A tool for creating and managing targeted donation campaigns to meet specific goals and engage the community.

### AI-Powered Functionality

-   **Smart Matching**: An AI agent that finds the most suitable donors for emergency requests based on compatibility, availability, and location.
-   **Predictive Demand**: Machine learning models forecast future demand for specific blood types to proactively prevent shortages.
-   **Chatbot Support**: An AI-powered chatbot to assist users with common questions about the donation process and eligibility.

## Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **UI**: [React](https://react.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Component Library**: [ShadCN UI](https://ui.shadcn.com/)
-   **Generative AI**: [Genkit](https://firebase.google.com/docs/genkit)
-   **Charting**: [Recharts](https://recharts.org/)
-   **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/FURIOUSCHAMP007/DonorConnect-AI-Powered-Donation-Management-Platform
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```

### Running the Application

Execute the following command to start the development server:

```sh
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Folder Structure

The project follows the standard Next.js App Router structure.

-   `src/app/`: Contains all the application routes.
    -   `src/app/(public)/`: Publicly accessible pages like the landing page.
    -   `src/app/dashboard/`: Routes for the donor-facing dashboard.
    -   `src/app/admin/`: Routes for the administrative portal.
-   `src/components/`: Shared React components, including UI components from ShadCN.
-   `src/lib/`: Utility functions, data types, and mock data.
-   `src/ai/`: Contains Genkit flows and AI-related logic.
-   `public/`: Static assets.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**. Please refer to the project's contributing guidelines for more information.
