import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import ThemeToggle from './components/ThemeToggle';
import Toast from './components/Toast';
import { Layout } from 'lucide-react';
import './styles/globals.css';

const App = () => {
  return (
    <TaskProvider>
      <div className="dashboard-container">
        <Toast />
        <header>
          <div className="logo">
            <div style={{ background: 'var(--primary)', color: 'white', padding: '6px', borderRadius: '8px', display: 'flex' }}>
              <Layout size={20} />
            </div>
            <span>TaskFlow</span>
          </div>
          <ThemeToggle />
        </header>

        <main>
          <TaskForm />

          <div className="flex justify-between items-center" style={{ marginBottom: '20px' }}>
            <FilterTabs />
            <div className="text-muted hidden-mobile" style={{ fontWeight: 500 }}>
              Dashboard
            </div>
          </div>

          <TaskList />
        </main>

        <footer style={{ marginTop: '80px', textAlign: 'center', opacity: 0.8 }}>
          <p className="text-muted" style={{ fontSize: '0.8rem' }}>
            Powered by modern React patterns. Drag to prioritize.
          </p>
        </footer>
      </div>
    </TaskProvider>
  );
};

export default App;
