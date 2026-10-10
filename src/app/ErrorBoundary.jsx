// ErrorBoundary — catches uncaught render errors so a single broken
// component doesn't unmount the whole app (white-screen prevention).
// Usage: <ErrorBoundary><AppRoutes /></ErrorBoundary>

import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, send this to your error tracker (Sentry, etc.)
    console.error("Uncaught render error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-gray-100">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 9v4M12 17h.01M10.29 3.86l-8.18 14.18A2 2 0 003.83 21h16.34a2 2 0 001.72-2.96L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h1 className="mb-2 text-lg font-bold text-gray-900">
              Something went wrong
            </h1>
            <p className="mb-4 text-sm text-gray-500">
              The page hit an unexpected error. Try reloading — your data is safe.
            </p>
            <pre className="mb-4 max-h-32 overflow-auto rounded bg-gray-50 p-2 text-left text-xs text-red-700">
              {String(this.state.error?.message ?? this.state.error ?? "Unknown error")}
            </pre>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
