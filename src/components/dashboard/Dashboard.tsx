import ProtectedRoute from "../routes/ProtectedRoute.tsx";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Dashboard</h1>
    </ProtectedRoute>
  );
}
