import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import './ErrorToast.css';

interface ErrorContextType {
    showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
    const [error, setError] = useState<string | null>(null);

    const showError = useCallback((message: string) => {
        setError(message);
        setTimeout(() => setError(null), 5000);
    }, []);

    return (
        <ErrorContext.Provider value={{ showError }}>
            {children}
            {error && (
                <div className="error-toast" role="alert">
                    <span className="error-icon">⚠️</span>
                    <span className="error-message">{error}</span>
                    <button
                        className="error-dismiss"
                        onClick={() => setError(null)}
                        aria-label="Dismiss"
                    >
                        ×
                    </button>
                </div>
            )}
        </ErrorContext.Provider>
    );
};

export const useError = () => {
    const context = useContext(ErrorContext);
    if (context === undefined) {
        throw new Error('useError must be used within an ErrorProvider');
    }
    return context;
};
