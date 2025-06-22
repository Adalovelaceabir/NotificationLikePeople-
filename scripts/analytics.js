// Simple Analytics Tracking
document.addEventListener('DOMContentLoaded', () => {
    // Track page view
    trackPageView();
    
    // Track outbound links
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && !link.href.startsWith(window.location.origin)) {
            trackOutboundLink(link.href);
        }
    });
    
    // Track article reads (for article pages)
    if (window.location.pathname.includes('article.html')) {
        trackArticleRead();
    }
});

// Track Page View
function trackPageView() {
    const pageUrl = window.location.pathname + window.location.search;
    const referrer = document.referrer || 'direct';
    
    // In a real app, send this to your analytics backend
    console.log(`Page View: ${pageUrl}, Referrer: ${referrer}`);
    
    // Example: Send to your API
    // fetch('/api/analytics/pageview', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         url: pageUrl,
    //         referrer,
    //         timestamp: new Date().toISOString()
    //     }),
    // });
}

// Track Outbound Link
function trackOutboundLink(url) {
    console.log(`Outbound Link: ${url}`);
    
    // In a real app, send this to your analytics backend
    // fetch('/api/analytics/outbound', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         destination: url,
    //         source: window.location.href,
    //         timestamp: new Date().toISOString()
    //     }),
    // });
}

// Track Article Read
function trackArticleRead() {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId) {
        // Track that the article was viewed
        console.log(`Article Read: ${articleId}`);
        
        // In a real app, send this to your backend
        // fetch(`/api/analytics/article/${articleId}/view`, {
        //     method: 'POST',
        // });
        
        // Track reading time (simple implementation)
        let startTime = new Date();
        let timeSpent = 0;
        
        const trackTime = () => {
            const now = new Date();
            timeSpent = (now - startTime) / 1000; // in seconds
            
            // Send update every 30 seconds
            if (timeSpent > 0 && timeSpent % 30 === 0) {
                console.log(`Time spent on article: ${timeSpent} seconds`);
                
                // In a real app:
                // fetch(`/api/analytics/article/${articleId}/time`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify({
                //         seconds: timeSpent
                //     }),
                // });
            }
        };
        
        // Update every second
        const interval = setInterval(trackTime, 1000);
        
        // Clear interval when user leaves the page
        window.addEventListener('beforeunload', () => {
            clearInterval(interval);
            console.log(`Total time spent on article: ${timeSpent} seconds`);
            
            // Send final time to backend
            // fetch(`/api/analytics/article/${articleId}/time`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         seconds: timeSpent,
            //         completed: timeSpent > 60 // Mark as "read" if spent more than 1 minute
            //     }),
            // });
        });
    }
}
