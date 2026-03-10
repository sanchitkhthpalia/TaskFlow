# TaskFlow — Modern React Task Manager

TaskFlow is a premium, SaaS-style task management application built with React and Vite. It combines a minimalist, high-end aesthetic with powerful features like drag-and-drop reordering, persistent state, and a dual-theme system.

![TaskFlow Header](https://via.placeholder.com/800x400?text=TaskFlow+Dashboard+Preview)

## 🌟 Features

- **Intuitive Task Management**: Effortlessly add, toggle, and delete tasks.
- **Drag & Drop Reordering**: Fluid task prioritization using `@hello-pangea/dnd`.
- **Global State**: Seamless state management via React Context API (no prop drilling).
- **Persistent Storage**: Automatic syncing with `localStorage` via a custom hook.
- **Dual-Theme Support**: Sleek Dark and Light modes with persistent user preference.
- **Premium UI/UX**: SaaS-style card layout, glassmorphism, and responsive design.
- **Fluid Animations**: Pure CSS transitions and keyframes for high performance.
- **Optimized Performance**: Leverages `React.memo`, `useCallback`, and `useMemo`.

## 🛠️ Tech Stack

- **Frontend**: React (Functional Components + Hooks), Vite
- **State Management**: Context API
- **Icons**: Lucide React
- **Animations**: Pure CSS (transitions & keyframes)
- **Drag & Drop**: `@hello-pangea/dnd`
- **Typography**: Inter via Google Fonts

## 🏗️ Architecture

TaskFlow follows a modular, component-based architecture designed for scalability and maintainability.

- **State Syncing**: A custom `useLocalStorage` hook acts as a bridge between React state and the browser's persistent storage.
- **Context Provider**: `TaskContext` centralizes all logic (CRUD, reordering, filtering, theming), providing a clean interface for UI components.
- **Separation of Concerns**: UI components are kept "dumb" and focused on presentation, while logical operations are abstracted into hooks and context.

## 📂 Folder Structure

```text
src/
├── components/     # UI components (TaskForm, TaskItem, TaskList, etc.)
├── context/        # TaskContext for global state management
├── hooks/          # Custom useLocalStorage for persistence
├── styles/         # Global CSS variables and SaaS theme
├── App.jsx         # Main application layout and provider wrapping
└── main.jsx        # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/taskflow.git
   ```

2. Navigate to the project directory:
   ```bash
   cd taskflow
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📸 Screenshots

| Light Mode | Dark Mode |
| :---: | :---: |
| ![Light Mode](https://via.placeholder.com/300x200?text=Light+Mode) | ![Dark Mode](https://via.placeholder.com/300x200?text=Dark+Mode) |

