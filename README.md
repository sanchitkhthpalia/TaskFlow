# TaskFlow — Modern React Task Manager

TaskFlow is a premium, SaaS-style task management application built with **React**, **Vite**, and **@dnd-kit**. It combines a high-end, minimalist aesthetic with powerful productivity features designed for a seamless user experience.

## ✨ Key Features

- **Premium SaaS UI**: A modern card-based layout with soft shadows, glassmorphism, and a refined color palette.
- **Real-Time Search**: Instantly find any task or category with high-performance real-time filtering.
- **Intelligent Sorting**: Organize your day by Newest, Oldest, or Completion status. Manual reordering via drag-and-drop is supported out-of-the-box.
- **Task Categories**: Built-in "Work", "Personal", and "Learning" categories with color-coded tags and dedicated filtering.
- **Productivity Dashboard**: A visual progress card that calculates your completion percentages in real-time.
- **Undo Delete**: Mistakenly removed a task? Restore it instantly with the high-visibility "Undo" action.
- **Inline Editing**: Double-click any task to edit its text directly with keyboard shortcuts (`Enter` to save, `Escape` to cancel).
- **Loading Skeletons**: Experience a smooth initial load with premium shimmer animation placeholders.
- **Modern Drag & Drop**: Buttery-smooth, vertically-stable task prioritization powered by `@dnd-kit`.
- **Dual-Theme Engine**: Seamless switching between Dark and Light modes with persistent user preference.

## 🛠️ Tech Stack

- **Core**: React 19, Vite
- **Styling**: Vanilla CSS (Custom tokens & Design System)
- **State Management**: React Context API
- **Icons**: Lucide React
- **Drag & Drop**: @dnd-kit
- **Typography**: Outfit via Google Fonts
- **Persistence**: localStorage Sync

## 📂 Project Structure

```text
src/
├── components/     # Modular UI elements (TaskForm, TaskItem, SearchBar, etc.)
├── context/        # TaskContext for global state & logic
├── hooks/          # Custom useLocalStorage for persistent state
├── styles/         # Central design system (globals.css)
├── App.jsx         # Layout & Provider integration
└── main.jsx        # Entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sanchitkhthpalia/TaskFlowTaskFlow.git
   ```

2. **Install dependencies**
   ```bash
   cd TaskFlow
   npm install
   ```

3. **Launch Dev Server**
   ```bash
   npm run dev
   ```

## 🎨 Design Philosophy

TaskFlow is designed to "WOW" the user from the first interaction. It uses:
- **Depth & Hierarchy**: Through the use of soft shadows and nested card logic.
- **Tactile Feedback**: Interactive elements scale and lift on hover and click.
- **Performance-First Animations**: All visual feedback is handled via high-performance CSS keyframes.

---

Developed with ❤️ for modern productivity.