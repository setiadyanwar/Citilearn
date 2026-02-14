import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * ErrorBoundary
 * Catches React errors and displays user-friendly error UI
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Log to error reporting service in production
        console.error('ErrorBoundary caught error:', error, errorInfo);
    }

    reset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4">
                    <div className="max-w-md w-full space-y-4 text-center">
                        <div className="flex justify-center">
                            <AlertCircle className="w-16 h-16 text-red-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-main">Oops! Something went wrong</h1>
                        <p className="text-gray-600">
                            An unexpected error occurred. Please try refreshing the page.
                        </p>
                        {import.meta.env.DEV && (
                            <details className="mt-4 p-3 bg-red-50 border border-red-200 rounded text-left text-sm">
                                <summary className="cursor-pointer font-semibold text-red-900">
                                    Error details
                                </summary>
                                <pre className="mt-2 text-red-800 overflow-auto max-h-48">
                                    {this.state.error?.toString()}
                                </pre>
                            </details>
                        )}
                        <button
                            onClick={this.reset}
                            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
