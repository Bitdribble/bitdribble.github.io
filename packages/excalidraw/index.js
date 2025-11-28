// Excalidraw initialization script
// This script initializes the Excalidraw component in the browser

import React from "react";
import { createRoot } from "react-dom/client";
import { Excalidraw } from "https://esm.sh/@excalidraw/excalidraw@0.18.0";

// Initialize when DOM is ready
function init() {
  const appElement = document.getElementById("app");
  
  if (!appElement) {
    console.error("Excalidraw: #app element not found");
    return;
  }

  try {
    // Create React root and render Excalidraw
    const root = createRoot(appElement);
    root.render(
      React.createElement(Excalidraw, {
        onChange: (elements, appState, files) => {
          // Optional: Handle changes (save to localStorage, etc.)
          console.log("Excalidraw changed", { elements, appState, files });
        },
        onCollabButtonClick: () => {
          // Optional: Handle collaboration button click
          window.alert("Collaboration feature can be implemented here");
        },
      })
    );
  } catch (error) {
    console.error("Error initializing Excalidraw:", error);
    appElement.innerHTML = `<div style="padding: 2rem; color: red;">
      <h2>Error loading Excalidraw</h2>
      <p>${error.message}</p>
      <p>Please check the browser console for more details.</p>
    </div>`;
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

