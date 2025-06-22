// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu');
const nav = document.querySelector('nav');
const newsGrid = document.querySelector('.news-grid');
const featuredArticle = document.querySelector('.featured-article');
const trendingList = document.querySelector('.trending');
const articleContainer = document.querySelector('.main-article');
const relatedArticles = document.querySelector('.related-articles');
const commentsList = document.querySelector('.comments-list');
const commentForm = document.querySelector('.comment-form');

// API Base URL
const API_BASE_URL = 'https://your-vercel-app-api.vercel.app/api';

// Toggle Mobile Menu
if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// Fetch Articles
async function fetchArticles(category = null, limit = 10) {
    try {
        let url = `${API_BASE_URL}/articles?limit=${limit}`;
        if (category) {
            url += `&category=${category}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        return [];
    }
}

// Fetch Single Article
async function fetchArticle(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/articles/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching article:', error);
        return null;
    }
}

// Fetch Related Articles
async function fetchRelatedArticles(category, excludeId, limit = 3) {
    try {
        const response = await fetch(
            `${API_BASE_URL}/articles?category=${category}&exclude=${excludeId}&limit=${limit}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching related articles:', error);
        return [];
    }
}

// Fetch Comments
async function fetchComments(articleId) {
    try {
        const response = await fetch(`${API_BASE_URL}/comments?articleId=${articleId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
}

// Post Comment
async function postComment(articleId, commentText) {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                articleId,
                text: commentText,
                author: 'Anonymous', // In a real app, use logged-in user
                date: new Date().toISOString()
            }),
        });
        return response.ok;
    } catch (error) {
        console.error('Error posting comment:', error);
        return false;
    }
}

// Render Articles
function renderArticles(articles, isFeatured = false) {
    if (!articles || articles.length === 0) {
        return '<p>No articles found.</p>';
    }

    if (isFeatured) {
        const featured = articles[0];
        return `
            <div class="article-card">
                <div class="article-image">
                    <img src="${featured.image || '/images/default-news.jpg'}" alt="${featured.title}">
                </div>
                <div class="article-content">
                    <span class="article-category">${featured.category}</span>
                    <h2 class="article-title"><a href="/article.html?id=${featured.id}">${featured.title}</a></h2>
                    <p class="article-excerpt">${featured.excerpt}</p>
                    <div class="article-meta">
                        <span>By ${featured.author}</span>
                        <span>${new Date(featured.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `;
    } else {
        return articles.map(article => `
            <div class="article-card">
                <div class="article-image">
                    <img src="${article.image || '/images/default-news.jpg'}" alt="${article.title}">
                </div>
                <div class="article-content">
                    <span class="article-category">${article.category}</span>
                    <h3 class="article-title"><a href="/article.html?id=${article.id}">${article.title}</a></h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-meta">
                        <span>By ${article.author}</span>
                        <span>${new Date(article.date).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Render Trending Articles
function renderTrendingArticles(articles) {
    if (!articles || articles.length === 0) {
        return '<p>No trending articles.</p>';
    }

    return articles.map(article => `
        <div class="trending-article">
            <div class="trending-image">
                <img src="${article.image || '/images/default-news.jpg'}" alt="${article.title}">
            </div>
            <div class="trending-title">
                <a href="/article.html?id=${article.id}">${article.title}</a>
            </div>
        </div>
    `).join('');
}

// Render Single Article
function renderArticle(article) {
    if (!article) {
        return '<p>Article not found.</p>';
    }

    return `
        <div class="article-header">
            <span class="article-category">${article.category}</span>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <span>By ${article.author}</span>
                <span>${new Date(article.date).toLocaleDateString()}</span>
            </div>
        </div>
        <div class="article-image">
            <img src="${article.image || '/images/default-news.jpg'}" alt="${article.title}">
        </div>
        <div class="article-content">
            ${article.content || '<p>No content available.</p>'}
        </div>
        <div class="article-tags">
            ${article.tags ? article.tags.map(tag => `<a href="/category.html?tag=${tag}">${tag}</a>`).join('') : ''}
        </div>
    `;
}

// Render Related Articles
function renderRelatedArticles(articles) {
    if (!articles || articles.length === 0) {
        return '<p>No related articles.</p>';
    }

    return articles.map(article => `
        <div class="related-article">
            <div class="related-image">
                <img src="${article.image || '/images/default-news.jpg'}" alt="${article.title}">
            </div>
            <div class="related-title">
                <a href="/article.html?id=${article.id}">${article.title}</a>
            </div>
        </div>
    `).join('');
}

// Render Comments
function renderComments(comments) {
    if (!comments || comments.length === 0) {
        return '<p>No comments yet. Be the first to comment!</p>';
    }

    return comments.map(comment => `
        <div class="comment">
            <div class="comment-avatar">
                <img src="/images/default-avatar.jpg" alt="${comment.author}">
            </div>
            <div class="comment-content">
                <p class="comment-author">${comment.author}</p>
                <p class="comment-date">${new Date(comment.date).toLocaleString()}</p>
                <p class="comment-text">${comment.text}</p>
                <p class="comment-reply">Reply</p>
            </div>
        </div>
    `).join('');
}

// Load Home Page Content
async function loadHomePage() {
    if (featuredArticle && newsGrid && trendingList) {
        const articles = await fetchArticles();
        if (articles.length > 0) {
            featuredArticle.innerHTML = renderArticles([articles[0]], true);
            newsGrid.innerHTML = renderArticles(articles.slice(1));
            
            // Get trending articles (in a real app, this would be based on views/comments)
            const trending = await fetchArticles(null, 5);
            trendingList.innerHTML = renderTrendingArticles(trending);
        }
    }
}

// Load Article Page
async function loadArticlePage() {
    if (articleContainer && relatedArticles && commentsList) {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id');
        
        if (articleId) {
            const article = await fetchArticle(articleId);
            if (article) {
                // Update page title and meta tags for SEO
                document.title = `${article.title} - Global News Network`;
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) {
                    metaDesc.content = article.excerpt || article.title;
                }
                
                // Render article
                articleContainer.innerHTML = renderArticle(article);
                
                // Load related articles
                const related = await fetchRelatedArticles(article.category, article.id);
                relatedArticles.innerHTML = renderRelatedArticles(related);
                
                // Load comments
                const comments = await fetchComments(articleId);
                commentsList.innerHTML = renderComments(comments);
            } else {
                articleContainer.innerHTML = '<p>Article not found.</p>';
            }
        } else {
            articleContainer.innerHTML = '<p>Invalid article ID.</p>';
        }
    }
}

// Load Category Page
async function loadCategoryPage() {
    if (newsGrid) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('cat');
        
        if (category) {
            // Update page title for SEO
            document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} News - Global News Network`;
            
            const articles = await fetchArticles(category);
            newsGrid.innerHTML = articles.length > 0 
                ? renderArticles(articles) 
                : `<p>No articles found in ${category} category.</p>`;
        } else {
            newsGrid.innerHTML = '<p>No category specified.</p>';
        }
    }
}

// Handle Comment Submission
if (commentForm) {
    commentForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const textarea = commentForm.querySelector('textarea');
        const commentText = textarea.value.trim();
        
        if (commentText) {
            const urlParams = new URLSearchParams(window.location.search);
            const articleId = urlParams.get('id');
            
            if (articleId) {
                const success = await postComment(articleId, commentText);
                if (success) {
                    // Reload comments
                    const comments = await fetchComments(articleId);
                    commentsList.innerHTML = renderComments(comments);
                    textarea.value = '';
                } else {
                    alert('Failed to post comment. Please try again.');
                }
            }
        }
    });
}

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path === '/' || path === '/index.html') {
        loadHomePage();
    } else if (path === '/article.html') {
        loadArticlePage();
    } else if (path === '/category.html') {
        loadCategoryPage();
    }
    
    // Initialize ads
    if (typeof adsbygoogle !== 'undefined') {
        adsbygoogle.push({});
    }
});
