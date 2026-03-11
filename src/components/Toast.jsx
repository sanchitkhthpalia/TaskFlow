import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle, Info, X } from 'lucide-react';

const Toast = () => {
    const { toast } = useTasks();

    if (!toast) return null;

    const isSuccess = toast.type === 'success';

    return (
        <div className="toast-container">
            <div className={`toast ${isSuccess ? 'toast-success' : 'toast-info'} task-entry`} style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {isSuccess ? <CheckCircle size={18} /> : <Info size={18} />}
                    <span className="toast-message">{toast.message}</span>
                </div>
                {toast.onUndo && (
                    <button 
                        onClick={toast.onUndo}
                        className="btn-undo"
                    >
                        Undo
                    </button>
                )}
            </div>
        </div>
    );
};

export default Toast;
