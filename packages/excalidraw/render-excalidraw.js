// Render Excalidraw files as static SVG images
// This script loads .excalidraw JSON files and renders them as SVG

(async function() {
  // Wait for Excalidraw to be available
  if (typeof window === 'undefined') return;
  
  // Import Excalidraw utilities
  const { exportToSvg } = await import("https://esm.sh/@excalidraw/excalidraw@0.18.0");
  
  // Find all elements with data-excalidraw attribute
  const excalidrawElements = document.querySelectorAll('[data-excalidraw]');
  
  for (const element of excalidrawElements) {
    const filePath = element.getAttribute('data-excalidraw');
    if (!filePath) continue;
    
    try {
      // Fetch the Excalidraw JSON file
      const response = await fetch(filePath);
      if (!response.ok) {
        console.error(`Failed to load Excalidraw file: ${filePath}`);
        continue;
      }
      
      const excalidrawData = await response.json();
      
      // Extract elements and appState (filter out deleted elements)
      const elements = (excalidrawData.elements || []).filter(el => !el.isDeleted);
      const appState = excalidrawData.appState || {};
      
      if (elements.length === 0) {
        console.warn(`No elements found in Excalidraw file: ${filePath}`);
        continue;
      }
      
      // Export to SVG with minimal padding to reduce white space
      const svg = await exportToSvg({
        elements: elements,
        appState: {
          ...appState,
          exportWithDarkMode: false,
          viewBackgroundColor: appState.viewBackgroundColor || "#ffffff"
        },
        files: excalidrawData.files || {},
        exportPadding: 5 // Minimal padding around the content
      });
      
      // Get the SVG's viewBox to understand the content dimensions
      const viewBox = svg.getAttribute('viewBox');
      
      // Set SVG attributes for proper scaling with minimal white space
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', 'auto');
      svg.style.maxWidth = '100%';
      svg.style.height = 'auto';
      svg.style.display = 'block';
      svg.style.margin = '0'; // Remove margins to reduce white space
      
      // If we have a viewBox, ensure preserveAspectRatio is set
      if (viewBox) {
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      }
      
      // Replace the element's content with the SVG
      element.innerHTML = '';
      element.appendChild(svg);
      
    } catch (error) {
      console.error(`Error rendering Excalidraw file ${filePath}:`, error);
      // Show error message
      element.innerHTML = `<div style="padding: 2rem; color: #d32f2f; background: #ffebee; border: 1px solid #ef5350; border-radius: 4px;">
        <p>Error loading Excalidraw diagram: ${error.message}</p>
      </div>`;
    }
  }
})();

