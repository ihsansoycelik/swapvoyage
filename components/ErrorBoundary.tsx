import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#111] dark:bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-white/10 p-8 rounded-3xl backdrop-blur-xl border border-white/20 max-w-sm w-full mx-auto shadow-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-6 text-white/50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h1 className="text-2xl font-serif font-bold mb-4">Ups, bir şeyler ters gitti.</h1>
            <p className="text-white/60 mb-8 text-sm">Uygulamada beklenmeyen bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-white text-black py-4 rounded-full font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-transform"
            >
              Yenile
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

export default ErrorBoundary;
