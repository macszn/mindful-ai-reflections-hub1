
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type ChatHistoryItem = {
  id: string;
  title: string;
  timestamp: Date;
  lastMessage?: string;
};

interface ChatHistorySidebarProps {
  activeChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
  chatList: Array<{ id: string; title: string; timestamp: Date; lastMessage?: string }>;
  onDeleteChat: (chatId: string) => void;
}

const ChatHistorySidebar = ({ activeChatId, onChatSelect, onNewChat, chatList, onDeleteChat }: ChatHistorySidebarProps) => {
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="h-full flex flex-col bg-secondary/20 border-r border-border">
      {/* New Chat Button */}
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-2" 
          variant="outline"
        >
          <Plus size={16} />
          New Chat
        </Button>
      </div>
      
      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto p-2">
        {chatList.length > 0 ? (
          <div className="space-y-1">
            {chatList.map((chat) => (
              <div key={chat.id} className="flex items-center group">
                <Button
                  variant={activeChatId === chat.id ? "secondary" : "ghost"}
                  className="w-full justify-start text-left h-auto py-2 px-3 flex-1"
                  onClick={() => onChatSelect(chat.id)}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare size={16} className="mt-1 shrink-0" />
                    <div className="truncate">
                      <div className="font-medium truncate">{chat.title}</div>
                      <div className="text-xs text-muted-foreground">{formatDate(new Date(chat.timestamp))}</div>
                    </div>
                  </div>
                </Button>
                <button
                  className="ml-2 p-1 rounded hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-opacity opacity-0 group-hover:opacity-100"
                  title="Delete chat"
                  onClick={() => onDeleteChat(chat.id)}
                  tabIndex={-1}
                >
                  <Trash size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 text-center text-muted-foreground text-sm">
            No chat history yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistorySidebar;
