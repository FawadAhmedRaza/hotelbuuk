import { AuthGuard } from "@/src/providers/auth/guard";
import ChatSidebar from "@/src/sections/chat-Section/chat-sidebar";

export default async function Layout({ children }) {
  return (
    <AuthGuard>
    <div className="h-screen">
      <div className="flex h-screen hide-scrollbar">
        <ChatSidebar />
        {children}
      </div>
    </div>
    </AuthGuard>
  );
}
