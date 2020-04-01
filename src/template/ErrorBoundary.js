import React from "react";

/**
 * Top level error boundary.
 *
 * This will catch programming errors done in any lifecycle and rendering
 * cycles of react. I.e accessing a property on a null variable etc.
 *
 * It will not catch errors in event handlers (which a lot of the logic is)
 * but those errors does not crash the page for the user.
 *
 * With time we could add links to where to add feedback/bugs or contact info
 * together with more of the error information.
 *
 * We can add more specific error boundaries in other components so that we
 * can keep more of the look and feel from the view where the error happened (e.g. top navigation bar)
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("Error: %o Info: %o", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2>Uppps</h2>;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
