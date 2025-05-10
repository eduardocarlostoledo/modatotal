import { useState, useRef, useEffect } from "react";
import "../styles/ChatBot.css"; // Importamos los estilos CSS

export const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: "Hola! Soy el Sabrina. ¿En qué puedo ayudarte?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // //para q la ventana vaya directo al bot
  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);


    


    try {
      const response = await fetch(`${import.meta.env.VITE_APP_BACK}/chat/chatpost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "bot" }]);
    } catch (error) {
      setMessages((prev) => [...prev, { text: "Hubo un error. Inténtalo de nuevo.", sender: "bot" }]);
    }

    setIsTyping(false);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">💬 Chat Moda Total</div>

      {/* Chat Messages */}
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">✍️ Escribiendo...</div>}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Box */}
      <div className="chat-input">
        <input
          type="text"
          className="input-field"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-button" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

