import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "./liveblocks.config.js";
import { useOthers } from "./liveblocks.config.js";
import { useUpdateMyPresence } from "./liveblocks.config.js";



function App() {
  
  const userCount = useOthers((others) => others.length);
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();

  // Basic cursor component
 function Cursor({ x, y }) {
  return (
    <img
      style={{
        position: "absolute",
        transform: `translate(${x}px, ${y}px)`,
      }}
      src="https://icons.iconarchive.com/icons/svengraph/daft-punk/24/Daft-Punk-Guyman-Off-icon.png"
    />
  );
  }
 

  return (
  
    <div style={{ width: "100vw", height: "100vh" }}
      onPointerMove={(e) =>
        updateMyPresence({ cursor: { x: e.clientX, y: e.clientY } })
      }
      onPointerLeave={() => updateMyPresence({ cursor: null })}>
      

      <center>
      There are {userCount} other users with you in the room.
      </center>

      <>
      {others.map(({ connectionId, presence }) =>
        presence.cursor ? (
          <Cursor
            key={connectionId}
            x={presence.cursor.x}
            y={presence.cursor.y}
          />
        ) : null
      )}
      </>
    </div>
    
  );
}


function Index() {
  return (
    <RoomProvider id="my-room-id" initialPresence={{ cursor: null }}>
      <ClientSideSuspense fallback={<div>Loading...</div>}>
        {() => <App />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);


