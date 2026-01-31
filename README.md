# Jeffrey Matthew | Portfolio

A modern, responsive portfolio website built to showcase projects and skills. This project features a React frontend, a Node.js/Express backend, and Supabase for authentication.

## 🚀 Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), vanilla CSS
- **Backend:** [Node.js](https://nodejs.org/), [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/)
- **Authentication:** [Supabase](https://supabase.com/) (Google OAuth)
- **Testing:** [Vitest](https://vitest.dev/)

## ✨ Features

- **Dynamic Theme:** System-aware Dark & Light mode switcher.
- **Authentication:** Google Sign-in integration for administrative access/future features.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Micro-interactions:** Smooth animations and hover effects for a premium feel.
- **Dashboard:** Protected route for content management (in progress).

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- Supabase account (for authentication)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Jeffrey-Matthew/home.git
    cd home
    ```

2.  **Install dependencies**
    ```bash
    # Install client dependencies
    cd client && npm install

    # Install server dependencies
    cd ../server && npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `client` directory with your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_project_url
    VITE_SUPABASE_ANON_KEY=your_anon_key
    ```

### Running the Application

1.  **Start the Client (Frontend)**
    ```bash
    cd client
    npm run dev
    ```

2.  **Start the Server (Backend)**
    ```bash
    cd server
    npm run dev
    ```

## 🗺️ Roadmap

Check out the [ROADMAP.md](./docs/ROADMAP.md) for future plans and upcoming features.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
