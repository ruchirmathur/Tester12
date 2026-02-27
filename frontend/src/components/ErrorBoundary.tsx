import React from 'react'

type State = { hasError: boolean }

export default class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In production, forward error to logging service
    // console.error(error, info)
  }
  render() {
    if (this.state.hasError) return <div>Something went wrong.</div>
    return this.props.children
  }
}
