// DOM Elements
const statsElements = {
    totalArticles: document.getElementById('total-articles'),
    totalVisitors: document.getElementById('total-visitors'),
    newComments: document.getElementById('new-comments'),
    adRevenue: document.getElementById('ad-revenue')
};

const activityList = document.getElementById('activity-list');
const visitorChartCtx = document.getElementById('visitor-chart');
const categoryChartCtx = document.getElementById('category-chart');

// API Base URL
const API_BASE_URL = 'https://your-vercel-app-api.vercel.app/api/admin';

// Fetch Admin Stats
async function fetchAdminStats() {
    try {
        const response = await fetch(`${API_BASE_URL}/stats`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        return null;
    }
}

// Fetch Recent Activity
async function fetchRecentActivity() {
    try {
        const response = await fetch(`${API_BASE_URL}/activity`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recent activity:', error);
        return [];
    }
}

// Render Stats
function renderStats(stats) {
    if (!stats) return;

    if (statsElements.totalArticles) {
        statsElements.totalArticles.textContent = stats.totalArticles.toLocaleString();
    }
    if (statsElements.totalVisitors) {
        statsElements.totalVisitors.textContent = stats.totalVisitors.toLocaleString();
    }
    if (statsElements.newComments) {
        statsElements.newComments.textContent = stats.newComments.toLocaleString();
    }
    if (statsElements.adRevenue) {
        statsElements.adRevenue.textContent = `$${stats.adRevenue.toLocaleString()}`;
    }
}

// Render Recent Activity
function renderRecentActivity(activities) {
    if (!activityList || !activities) return;

    activityList.innerHTML = activities.map(activity => `
        <li class="activity-item">
            <div class="activity-icon">
                <i class="fas fa-${activity.icon || 'bell'}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <small>${new Date(activity.date).toLocaleString()}</small>
            </div>
        </li>
    `).join('');
}

// Initialize Visitor Chart
function initVisitorChart(data) {
    if (!visitorChartCtx || !data) return;

    const visitorChart = new Chart(visitorChartCtx, {
        type: 'line',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Visitors',
                data: data.visitors,
                borderColor: 'rgba(52, 152, 219, 1)',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize Category Chart
function initCategoryChart(data) {
    if (!categoryChartCtx || !data) return;

    const categoryChart = new Chart(categoryChartCtx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(46, 204, 113, 0.7)',
                    'rgba(155, 89, 182, 0.7)',
                    'rgba(241, 196, 15, 0.7)',
                    'rgba(231, 76, 60, 0.7)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Load Admin Dashboard
async function loadAdminDashboard() {
    // Fetch and render stats
    const stats = await fetchAdminStats();
    renderStats(stats);
    
    // Fetch and render recent activity
    const activities = await fetchRecentActivity();
    renderRecentActivity(activities);
    
    // Initialize charts with sample data (in a real app, fetch from API)
    initVisitorChart({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        visitors: [1200, 1900, 1700, 2100, 2300, 2500]
    });
    
    initCategoryChart({
        labels: ['Politics', 'Technology', 'Business', 'Sports', 'Entertainment'],
        values: [35, 25, 20, 15, 5]
    });
}

// Initialize Admin Page
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    
    if (path.includes('dashboard.html')) {
        loadAdminDashboard();
    }
    
    // Add any other admin page initializations here
});
