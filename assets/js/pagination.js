// Pagination utility for archives and categories pages
class Pagination {
    constructor(container, items, itemsPerPage = 10) {
        this.container = container;
        this.items = items;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(items.length / itemsPerPage);
        
        this.init();
    }
    
    init() {
        // Get page from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        if (pageParam) {
            this.currentPage = parseInt(pageParam);
            if (this.currentPage < 1 || this.currentPage > this.totalPages) {
                this.currentPage = 1;
            }
        }
        
        this.render();
    }
    
    getCurrentItems() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.items.slice(start, end);
    }
    
    render() {
        const currentItems = this.getCurrentItems();
        
        // Clear container
        this.container.innerHTML = '';
        
        // Render items
        currentItems.forEach(item => {
            this.container.appendChild(item);
        });
        
        // Render pagination controls
        if (this.totalPages > 1) {
            this.renderPagination();
        }
    }
    
    renderPagination() {
        const paginationContainer = document.createElement('nav');
        paginationContainer.className = 'mt-12 pt-8 border-t border-gray-200';
        paginationContainer.setAttribute('aria-label', 'Pagination');
        
        const paginationContent = document.createElement('div');
        paginationContent.className = 'flex items-center justify-between';
        
        // Previous button
        const prevButton = this.createPaginationButton(
            this.currentPage > 1 ? this.getPageUrl(this.currentPage - 1) : null,
            'Previous',
            'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors',
            true
        );
        
        // Page numbers
        const pageNumbers = document.createElement('div');
        pageNumbers.className = 'flex items-center gap-2';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = this.createPaginationButton(
                this.getPageUrl(i),
                i.toString(),
                i === this.currentPage 
                    ? 'px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md'
                    : 'px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors'
            );
            pageNumbers.appendChild(pageButton);
        }
        
        // Next button
        const nextButton = this.createPaginationButton(
            this.currentPage < this.totalPages ? this.getPageUrl(this.currentPage + 1) : null,
            'Next',
            'inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors',
            false
        );
        
        paginationContent.appendChild(prevButton);
        paginationContent.appendChild(pageNumbers);
        paginationContent.appendChild(nextButton);
        paginationContainer.appendChild(paginationContent);
        
        this.container.appendChild(paginationContainer);
    }
    
    createPaginationButton(url, text, className, isPrev = false) {
        const button = document.createElement(url ? 'a' : 'div');
        
        if (url) {
            button.href = url;
            button.className = className;
        } else {
            button.className = className + ' opacity-50 cursor-not-allowed';
        }
        
        if (isPrev) {
            button.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                ${text}
            `;
        } else if (text === 'Next') {
            button.innerHTML = `
                ${text}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
            `;
        } else {
            button.textContent = text;
        }
        
        return button;
    }
    
    getPageUrl(page) {
        const url = new URL(window.location);
        url.searchParams.set('page', page);
        return url.toString();
    }
}

// Initialize pagination when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle deep linking first
    const urlParams = new URLSearchParams(window.location.search);
    const month = urlParams.get('month');
    const category = urlParams.get('category');
    
    // If we have deep link parameters, don't initialize pagination for archives/categories
    if (month || category) {
        return;
    }
    
    // Initialize pagination for archives page
    const archivesContainer = document.querySelector('[data-pagination="archives"]');
    if (archivesContainer) {
        const allContent = archivesContainer.querySelector('#all-content');
        if (allContent) {
            const items = Array.from(allContent.children);
            new Pagination(allContent, items, 5);
        }
    }
    
    // Initialize pagination for categories page
    const categoriesContainer = document.querySelector('[data-pagination="categories"]');
    if (categoriesContainer) {
        const allContent = categoriesContainer.querySelector('#all-content');
        if (allContent) {
            const items = Array.from(allContent.children);
            new Pagination(allContent, items, 5);
        }
    }
});