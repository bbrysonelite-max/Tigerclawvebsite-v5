import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
            <div className="max-w-md text-center">
              <h1 className="text-3xl font-display tracking-wide mb-4">
                Something went sideways.
              </h1>
              <p className="text-muted-foreground text-sm">
                {this.state.error?.message ?? "Unknown error"}
              </p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
