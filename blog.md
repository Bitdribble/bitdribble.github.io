---
layout: default
title: Blog
pagination:
  enabled: true
---

<div class="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-12">
    <div class="flex flex-col lg:flex-row gap-8 lg:items-start">
        <!-- Main Content -->
        <main class="lg:w-0 lg:flex-1">
            <!-- Header -->
            <header class="mb-12 pb-8 border-b border-gray-200">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                <p class="text-gray-600 text-xl leading-relaxed">
                    Technical insights, tutorials, and thoughts on AI
                </p>
            </header>
            <div class="divide-y divide-gray-200">
            {% for post in paginator.posts %}
                <article class="py-8 first:pt-0">
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
                                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                                    <a href="{{ post.url | relative_url }}" class="text-gray-900 hover:text-blue-600 transition-colors">
                                        {{ post.title }}
                                    </a>
                                </h2>
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
            
            {% if paginator.posts.size == 0 %}
                <div class="text-center py-12">
                    <p class="text-gray-600 text-lg">No blog posts available yet.</p>
                </div>
            {% endif %}
            
            <!-- Pagination -->
            {% if paginator.total_pages > 1 %}
                <nav class="mt-12 pt-8 border-t border-gray-200" aria-label="Blog pagination">
                    <div class="flex items-center justify-between">
                        {% if paginator.previous_page %}
                            <a href="{{ paginator.previous_page_path | relative_url }}" 
                               class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                                Previous
                            </a>
                        {% else %}
                            <div></div>
                        {% endif %}
                        
                        <div class="flex items-center gap-2">
                            {% for page in (1..paginator.total_pages) %}
                                {% if page == paginator.page %}
                                    <span class="px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
                                        {{ page }}
                                    </span>
                                {% elsif page == 1 %}
                                    <a href="{{ site.baseurl }}/blog/" 
                                       class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                        {{ page }}
                                    </a>
                                {% else %}
                                    <a href="{{ site.baseurl }}/blog/page/{{ page }}/" 
                                       class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                        {{ page }}
                                    </a>
                                {% endif %}
                            {% endfor %}
                        </div>
                        
                        {% if paginator.next_page %}
                            <a href="{{ paginator.next_page_path | relative_url }}" 
                               class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                                Next
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            </a>
                        {% else %}
                            <div></div>
                        {% endif %}
                    </div>
                </nav>
            {% endif %}
            </div>
        </main>

        <!-- Sidebar - Hidden on mobile -->
        <aside class="hidden lg:block w-80 flex-shrink-0">
            {% include blog-sidebar.html %}
        </aside>
    </div>
</div>
