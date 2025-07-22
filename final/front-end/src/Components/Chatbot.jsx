// Chatbot.jsx
import React, { useState } from "react";
import axios from "axios";
import "../styles/Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    // Append the user's message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, sender: "user" },
    ]);

    try {
      // Here you would send a request to your AI model or API
      const response = await axios.post("/api/chat", { message: input });

      // Append the bot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.reply, sender: "bot" },
      ]);
      setInput(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === "bot" ? "bot" : "user"}`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="input-form">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
