---
layout: default
title: Archives
---

<div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-12">
    <div class="flex flex-col lg:flex-row gap-8 lg:items-start">
        <!-- Main Content -->
        <main class="lg:w-0 lg:flex-1">
            <!-- Header -->
            <header class="mb-12 pb-8 border-b border-gray-200">
                <p class="text-gray-600 text-xl leading-relaxed">
                    Browse blog posts by month
                </p>
            </header>
            <div data-pagination="archives">
                <!-- Filtered content will be shown/hidden by JavaScript -->
                <div id="filtered-view" style="display: none;">
                    <div class="mb-6">
                        <h2 id="filtered-title" class="text-2xl font-bold text-gray-900"></h2>
                        <p class="text-gray-600 mt-2">
                            <a href="{{ site.baseurl }}/archives" class="text-blue-600 hover:text-blue-800">← Back to all archives</a>
                        </p>
                    </div>
                    <div id="filtered-posts" class="space-y-6"></div>
                </div>
                
                <!-- Show all months -->
                <div id="all-content">
                    {% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
                    {% for year in posts_by_year %}
                        <div class="mb-12">
                            <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ year.name }}</h2>
                            
                            {% assign posts_by_month = year.items | group_by_exp: "post", "post.date | date: '%B %Y'" %}
                            {% for month in posts_by_month %}
                                <div class="mb-8 month-section" id="{{ month.name | slugify }}" data-month="{{ month.name }}">
                                    <h3 class="text-xl font-semibold text-gray-800 mb-4">
                                        <a href="{{ site.baseurl }}/archives?month={{ month.name | url_encode }}" 
                                           class="text-gray-800 hover:text-blue-600 transition-colors">
                                            {{ month.name }}
                                        </a>
                                    </h3>
                                    
                                    <div class="space-y-6">
                                        {% for post in month.items %}
                                            <article class="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                                                <div class="flex flex-col md:flex-row gap-6">
                                                    <div class="md:w-1/3 flex-shrink-0">
                                                        {%- if post.image -%}
                                                            <div class="aspect-video bg-gray-50 rounded-lg overflow-hidden">
                                                                <img src="{{ post.image | relative_url }}" alt="{{ post.title | escape }}" class="w-full h-full object-contain p-2">
                                                            </div>
                                                        {%- else -%}
                                                            <div class="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
                                                                <svg class="w-12 h-12 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-1"/>
                                                                </svg>
                                                            </div>
                                                        {%- endif -%}
                                                    </div>
                                                    <div class="flex-1">
                                                        <header class="mb-4">
                                                            <h4 class="text-lg md:text-xl font-bold text-gray-900 mb-2">
                                                                <a href="{{ post.url | relative_url }}" class="text-gray-900 hover:text-blue-600 transition-colors">
                                                                    {{ post.title }}
                                                                </a>
                                                            </h4>
                                                            <div class="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                                                                <time datetime="{{ post.date | date: '%Y-%m-%d' }}">
                                                                    {{ post.date | date: '%B %d, %Y' }}
                                                                </time>
                                                                {% if post.categories %}
                                                                    <span class="text-gray-400">•</span>
                                                                    <div class="flex flex-wrap gap-2">
                                                                        {% for category in post.categories %}
                                                                            <span class="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                                                                                {{ category | replace: '_', ' ' | capitalize }}
                                                                            </span>
                                                                        {% endfor %}
                                                                    </div>
                                                                {% endif %}
                                                            </div>
                                                        </header>
                                                        
                                                        {% if post.excerpt %}
                                                            <div class="text-gray-700 leading-relaxed mb-4">
                                                                {{ post.excerpt | strip_html | truncate: 200 }}
                                                            </div>
                                                        {% endif %}
                                                        
                                                        <footer>
                                                            <a href="{{ post.url | relative_url }}" 
                                                               class="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                                                Read more
                                                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                                                </svg>
                                                            </a>
                                                        </footer>
                                                    </div>
                                                </div>
                                            </article>
                                        {% endfor %}
                                    </div>
                                </div>
                            {% endfor %}
                        </div>
                    {% endfor %}
                </div>
            </div>
            
            {% if site.posts.size == 0 %}
                <div class="text-center py-12">
                    <p class="text-gray-600 text-lg">No blog posts available yet.</p>
                </div>
            {% endif %}
        </main>

        <!-- Sidebar - Hidden on mobile -->
        <aside class="hidden lg:block w-80 flex-shrink-0">
            {% include blog-sidebar.html %}
        </aside>
    </div>
</div>

<script>
// Handle URL parameters for filtering and deep linking to specific months
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const month = urlParams.get('month');
    
    if (month) {
        // Find the month section
        const monthSections = document.querySelectorAll('.month-section');
        let targetSection = null;
        
        for (const section of monthSections) {
            if (section.dataset.month === month) {
                targetSection = section;
                break;
            }
        }
        
        if (targetSection) {
            // Show filtered view
            const filteredView = document.getElementById('filtered-view');
            const allContent = document.getElementById('all-content');
            const filteredTitle = document.getElementById('filtered-title');
            const filteredPosts = document.getElementById('filtered-posts');
            
            // Hide all content and show filtered view
            allContent.style.display = 'none';
            filteredView.style.display = 'block';
            
            // Set the title
            filteredTitle.textContent = month;
            
            // Copy the posts from the target section
            const postsContainer = targetSection.querySelector('.space-y-6');
            if (postsContainer) {
                filteredPosts.innerHTML = postsContainer.innerHTML;
            }
        } else {
            // Month not found, show all content (fallback)
            console.warn('Month not found:', month);
        }
    }
});
</script>