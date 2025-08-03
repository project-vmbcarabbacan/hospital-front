import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { is_auth } = useSelector(state => state.auth);

    if (!is_auth) {
        return <Navigate to="/login" />;
    }

    return children;
};