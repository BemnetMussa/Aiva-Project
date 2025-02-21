import { ChatNav } from "../components/ChatPageComponet/ChatNav";
import { ChatWindow } from "../components/ChatPageComponet/ChatWindow";

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
