import React from 'react';
import { useTasks } from '../context/TaskContext';
import { CheckCircle, Info, X } from 'lucide-react';

const Toast = () => {
    const { toast } = useTasks();

    if (!toast) return null;

    const isSuccess = toast.type === 'success';

    return (
        <div className="toast-container">
            <div className={`toast ${isSuccess ? 'toast-success' : 'toast-info'} task-entry`}>
                {isSuccess ? <CheckCircle size={18} /> : <Info size={18} />}
                <span className="toast-message">{toast.message}</span>
            </div>
        </div>
    );
};

export default Toast;
