import { Outlet } from "react-router-dom";

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

export function Layout() {
    return (
        <ErrorBoundary>
            <Outlet />
        </ErrorBoundary>
    )
}