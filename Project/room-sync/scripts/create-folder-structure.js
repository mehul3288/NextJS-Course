const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  "app/(auth)/login/page.tsx": "export default function LoginPage() {\n  return <main>Login</main>;\n}\n",
  "app/(auth)/register/page.tsx": "export default function RegisterPage() {\n  return <main>Register</main>;\n}\n",
  "app/(user)/layout.tsx": "export default function UserLayout({ children }: { children: React.ReactNode }) {\n  return children;\n}\n",
  "app/(user)/rooms/page.tsx": "export default function RoomsPage() {\n  return <main>Rooms</main>;\n}\n",
  "app/(user)/rooms/[roomId]/page.tsx": "export default function RoomDetailsPage() {\n  return <main>Room Details</main>;\n}\n",
  "app/(user)/my-meetings/page.tsx": "export default function MyMeetingsPage() {\n  return <main>My Meetings</main>;\n}\n",
  "app/(user)/profile/page.tsx": "export default function ProfilePage() {\n  return <main>Profile</main>;\n}\n",
  "app/admin/layout.tsx": "export default function AdminLayout({ children }: { children: React.ReactNode }) {\n  return children;\n}\n",
  "app/admin/dashboard/page.tsx": "export default function AdminDashboardPage() {\n  return <main>Admin Dashboard</main>;\n}\n",
  "app/admin/rooms/page.tsx": "export default function AdminRoomsPage() {\n  return <main>Admin Rooms</main>;\n}\n",
  "app/admin/meetings/page.tsx": "export default function AdminMeetingsPage() {\n  return <main>Admin Meetings</main>;\n}\n",
  "app/admin/users/page.tsx": "export default function AdminUsersPage() {\n  return <main>Admin Users</main>;\n}\n",
  "app/error.tsx": "\"use client\";\n\nexport default function ErrorPage() {\n  return <main>Something went wrong.</main>;\n}\n",
  "app/not-found.tsx": "export default function NotFoundPage() {\n  return <main>Page not found.</main>;\n}\n",
  "components/common/Header.tsx": "export default function Header() {\n  return <header>Header</header>;\n}\n",
  "components/common/Sidebar.tsx": "export default function Sidebar() {\n  return <aside>Sidebar</aside>;\n}\n",
  "components/common/Loader.tsx": "export default function Loader() {\n  return <div>Loading...</div>;\n}\n",
  "components/common/EmptyState.tsx": "export default function EmptyState() {\n  return <div>No data found.</div>;\n}\n",
  "components/room/RoomCard.tsx": "export default function RoomCard() {\n  return <article>Room Card</article>;\n}\n",
  "components/room/RoomFilters.tsx": "export default function RoomFilters() {\n  return <div>Room Filters</div>;\n}\n",
  "components/room/RoomTimeline.tsx": "export default function RoomTimeline() {\n  return <div>Room Timeline</div>;\n}\n",
  "components/room/RoomForm.tsx": "export default function RoomForm() {\n  return <form>Room Form</form>;\n}\n",
  "components/booking/BookingModal.tsx": "export default function BookingModal() {\n  return <div>Booking Modal</div>;\n}\n",
  "components/booking/BookingTable.tsx": "export default function BookingTable() {\n  return <div>Booking Table</div>;\n}\n",
  "components/admin/DashboardStats.tsx": "export default function DashboardStats() {\n  return <section>Dashboard Stats</section>;\n}\n",
  "components/admin/UserTable.tsx": "export default function UserTable() {\n  return <div>User Table</div>;\n}\n",
  "components/admin/MeetingTable.tsx": "export default function MeetingTable() {\n  return <div>Meeting Table</div>;\n}\n",
  "components/auth/LoginForm.tsx": "export default function LoginForm() {\n  return <form>Login Form</form>;\n}\n",
  "components/auth/RegisterForm.tsx": "export default function RegisterForm() {\n  return <form>Register Form</form>;\n}\n",
  "services/auth.service.ts": "export const authService = {};\n",
  "services/room.service.ts": "export const roomService = {};\n",
  "services/booking.service.ts": "export const bookingService = {};\n",
  "services/user.service.ts": "export const userService = {};\n",
  "lib/api-client.ts": "export const apiClient = {};\n",
  "lib/errors.ts": "export class AppError extends Error {}\n",
  "providers/AuthProvider.tsx": "export default function AuthProvider({ children }: { children: React.ReactNode }) {\n  return children;\n}\n",
  "hooks/useAuth.ts": "export function useAuth() {\n  return {};\n}\n",
  "hooks/useModal.ts": "export function useModal() {\n  return {};\n}\n",
  "utils/availability.ts": "export function getAvailability() {\n  return [];\n}\n",
  "utils/date.ts": "export function formatDate(value: Date | string) {\n  return new Date(value).toLocaleDateString();\n}\n",
  "utils/get-error-message.ts": "export function getErrorMessage(error: unknown) {\n  return error instanceof Error ? error.message : \"Something went wrong\";\n}\n",
  "types/room.ts": "export type Room = {\n  id: string;\n  name: string;\n};\n",
  "types/booking.ts": "export type Booking = {\n  id: string;\n  roomId: string;\n};\n",
  "types/user.ts": "export type User = {\n  id: string;\n  name: string;\n};\n",
  "constants/routes.ts": "export const routes = {\n  home: \"/\",\n  login: \"/login\",\n  register: \"/register\",\n  rooms: \"/rooms\",\n  myMeetings: \"/my-meetings\",\n  profile: \"/profile\",\n  adminDashboard: \"/admin/dashboard\",\n} as const;\n",
};

let created = 0;
let skipped = 0;

for (const [relativePath, content] of Object.entries(files)) {
  const filePath = path.join(root, relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  if (fs.existsSync(filePath)) {
    skipped += 1;
    continue;
  }

  fs.writeFileSync(filePath, content, "utf8");
  created += 1;
}

console.log(`Folder structure ready. Created ${created} files, skipped ${skipped} existing files.`);
