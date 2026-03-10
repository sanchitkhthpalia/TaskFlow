import { useState, useEffect } from 'react';

/**
 * Standard persistent state hook.
 * Handles JSON serialization and safe initial load from storage.
 */
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (e) {
            // Return initial if parse fails
            console.error(`LocalStorage read error [${key}]:`, e);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (e) {
            console.error(`LocalStorage write error [${key}]:`, e);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;
