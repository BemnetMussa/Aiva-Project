import { ChatNav } from "../components/ChatNav";
import { ChatWindow } from "../components/ChatWindow";

export default function ChatPage() {
  return (
    <div className="h-screen w-full flex justify-between">
      {/* left nav */}
      <ChatNav />
      {/* right content */}
      <ChatWindow />
    </div>
  );
}
