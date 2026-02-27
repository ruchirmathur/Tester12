import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/NavBar'
import ErrorBoundary from './components/ErrorBoundary'

const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const AccountDashboard = lazy(() => import('./pages/AccountDashboard'))
const Transactions = lazy(() => import('./pages/Transactions'))
const Exports = lazy(() => import('./pages/Exports'))

export default function App() {
  return (
    <ErrorBoundary>
      <NavBar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/:accountId"
            element={
              <ProtectedRoute>
                <AccountDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions/:accountId"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exports"
            element={
              <ProtectedRoute>
                <Exports />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/account/demo-account" replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
