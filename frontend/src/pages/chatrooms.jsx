import { useEffect, useState } from "react";
import axios from "axios";
import "./pages.css";
import socket from '../socket.js';

async function fetchChatrooms() {

  try {
    const token = "Bearer " + localStorage.getItem('authToken');

    const response = await axios.get(
      "http://localhost:3000/chatrooms",
      { headers: { Authorization: token } }
    )

    return response.data;
  } catch (error) {
    console.error("Couldn't fetch chatrooms: ", error);
    return [];
  }

}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3-3" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}


function Chatrooms() {

  const [chatrooms, setChatrooms] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");

  const sendMessage = async () => {
    if (!msg.trim() || !selectedId) return;

    try {
      const token = "Bearer " + localStorage.getItem("authToken");

      const response = await axios.post(
        `http://localhost:3000/chatrooms/${selectedId}/messages`,
        {
          message: msg
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log("Message sent:", response.data);

      setMsg("");
    } catch (error) {
      console.error("Couldn't send message:", error);
    }
  }

  //Loading chatrooms
  useEffect(() => {

    async function loadChatrooms() {

      const rooms = await fetchChatrooms();

      setChatrooms(rooms);

      if (rooms.length > 0) {
        setSelectedId(rooms[0].id);
      }
    }

    loadChatrooms();

  }, []);


  //Loading messages
  useEffect(() => {
    async function loadMessages() {
      if (!selectedId) {
        setMessages([]);
        return;
      }

      try {
        const token = "Bearer " + localStorage.getItem("authToken");

        const response = await axios.get(
          `http://localhost:3000/chatrooms/${selectedId}/messages`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setMessages(response.data);
      } catch (error) {
        console.error("Couldn't fetch messages:", error);
        setMessages([]);
      }
    }

    loadMessages();
  }, [selectedId]);


  //Socket.io new messages
  useEffect(() => {
    if (!selectedId) return;

    socket.emit("joinRoom", selectedId);

    return () => {
      socket.emit("leaveRoom", selectedId);
    }

  }, [selectedId])

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage
      ])
    }

    socket.on("sendMessage", handleNewMessage);

    return () => {
      socket.off("sendMessage", handleNewMessage);
    };
  }, [])


  //Filtering rooms
  useEffect(() => { }, [])
  const filtered = chatrooms.filter((room) => {

    const matchesSearch =
      room.name.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "system" && room.type === "SYSTEM") ||
      (filter === "user" && room.type === "USER");

    return matchesSearch && matchesFilter;
  });

  const selected = chatrooms.find((r) => r.id === selectedId) ?? filtered[0];

  return (
    <div className="page page-chatrooms">
      <header className="page-header">
        <div className="page-header-inner">
          <span className="page-eyebrow">Campus Connect</span>
          <h1 className="page-title">Chatrooms</h1>
          <p className="page-subtitle">
            Join floor chats, block groups, and student-created rooms across campus.
          </p>
        </div>
      </header>

      <main className="page-body">
        <div className="page-toolbar">
          <div className="search-wrap">
            <SearchIcon />
            <input
              className="search-input"
              type="search"
              placeholder="Search chatrooms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-pills">
            {[
              { key: "all", label: "All" },
              { key: "system", label: "System" },
              { key: "user", label: "Student" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                className={`filter-pill${filter === key ? " is-active" : ""}`}
                onClick={() => setFilter(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <SearchIcon />
            <h3>No chatrooms found</h3>
            <p>Try a different search or filter.</p>
          </div>
        ) : (
          <div className="chatrooms-layout">
            <aside className="chatrooms-sidebar">
              <div className="chatrooms-sidebar-header">
                <h2>{filtered.length} room{filtered.length !== 1 ? "s" : ""}</h2>
              </div>
              <ul className="room-list">
                {filtered.map((room) => (
                  <li key={room.id}>
                    <button
                      type="button"
                      className={`room-item${selected?.id === room.id ? " is-selected" : ""}`}
                      onClick={() => setSelectedId(room.id)}
                    >
                      <span className="room-avatar">{room.name.charAt(0)}</span>
                      <span className="room-info">
                        <p className="room-name">{room.name}</p>
                        <p className="room-detail">
                          {room.type === "SYSTEM"
                            ? `Block ${room.block} · Floor ${room.floor}`
                            : "Student room"}
                        </p>
                      </span>
                      <span className={`badge badge-${room.type === "SYSTEM" ? "system" : "user"}`}>
                        {room.type === "SYSTEM" ? "System" : "Student"}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <section className="chatrooms-main">
              {selected ? (
                <>
                  <div className="chat-preview-header">
                    <div>
                      <h2 className="chat-preview-title">
                        {selected.name}
                      </h2>

                      <p className="chat-preview-sub">
                        {selected.type === "SYSTEM"
                          ? `Block ${selected.block}, Floor ${selected.floor}`
                          : "Created by students"}
                      </p>
                    </div>

                    <span className="badge badge-live">● Live</span>
                  </div>

                  <div className="chat-preview-body">
                    {messages.length > 0 ? (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`message-bubble ${msg.userId === Number(localStorage.getItem("userId"))
                            ? "me"
                            : "them"
                            }`}
                        >
                          <div className="message-author">
                            {msg.senderName}
                          </div>

                          {msg.message}
                        </div>
                      ))
                    ) : (
                      <p className="no-messages">
                        No messages yet. Start the conversation!
                      </p>
                    )}
                  </div>

                  <div className="chat-input-bar">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                    />

                    <button type="button" className="btn btn-primary" onClick={sendMessage}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="chat-welcome">
                  <div className="chat-welcome-icon">
                    <ChatIcon />
                  </div>

                  <h2>Select a chatroom</h2>

                  <p>
                    Pick a room from the sidebar to view messages and join the conversation.
                  </p>
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

export default Chatrooms;
