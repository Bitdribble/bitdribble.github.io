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
      
      // Extract elements and appState
      const elements = excalidrawData.elements || [];
      const appState = excalidrawData.appState || {};
      
      if (elements.length === 0) {
        console.warn(`No elements found in Excalidraw file: ${filePath}`);
        continue;
      }
      
      // Export to SVG
      const svg = await exportToSvg({
        elements: elements,
        appState: appState,
        files: excalidrawData.files || {}
      });
      
      // Set SVG attributes for proper scaling
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', 'auto');
      svg.setAttribute('style', 'max-width: 100%; height: auto;');
      
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

