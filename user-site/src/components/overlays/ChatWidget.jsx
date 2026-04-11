import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi there! 👋 How can we help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [showActions, setShowActions] = useState(true);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setShowActions(false);
    setMessages(prev => [...prev, { type: 'user', text }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: 'Thank you for your message. A support agent will be with you shortly!' }]);
    }, 1000);
  };

  const quickAction = (text) => {
    sendMessage(text);
  };

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            <div>
              <h4>China Sky Support</h4>
              <p>We typically reply in minutes</p>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: '#fff' }}><X size={20} /></button>
          </div>

          {showActions && (
            <div className="chat-quick-actions">
              <button className="chat-quick-btn" onClick={() => quickAction('Track My Order')}>Track My Order</button>
              <button className="chat-quick-btn" onClick={() => quickAction('Product Availability')}>Product Availability</button>
              <button className="chat-quick-btn" onClick={() => quickAction('Store Locations')}>Store Locations</button>
              <button className="chat-quick-btn agent" onClick={() => quickAction('Talk to an Agent')}>Talk to an Agent →</button>
            </div>
          )}

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.type}`}>
                <div className="bubble">{msg.text}</div>
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            />
            <button onClick={() => sendMessage(input)}><Send size={18} /></button>
          </div>
        </div>
      )}

      <button className="chat-widget-btn" onClick={() => setOpen(!open)}>
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
