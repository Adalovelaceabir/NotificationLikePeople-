// Simulated database
let articles = [
    {
        id: '1',
        title: 'Global Summit Addresses Climate Change Concerns',
        excerpt: 'World leaders gather to discuss urgent climate action plans and set new emission targets.',
        content: '<p>World leaders from over 100 countries convened in Geneva this week for the annual Global Climate Summit. The summit focused on setting more aggressive emission reduction targets and establishing a framework for international cooperation.</p><p>Keynote speaker Dr. Emma Richardson emphasized the urgency of the situation: "We are at a critical juncture. The decisions we make in the next five years will determine the trajectory of our planet for centuries to come."</p><p>New agreements included a commitment from developed nations to provide $100 billion annually in climate financing to developing countries by 2025.</p>',
        category: 'politics',
        author: 'Sarah Johnson',
        date: '2023-05-15T10:30:00Z',
        image: '/images/climate-summit.jpg',
        tags: ['climate', 'summit', 'environment']
    },
    {
        id: '2',
        title: 'Tech Giant Unveils Revolutionary AI Assistant',
        excerpt: 'The new AI system can understand and respond to complex human emotions and contextual cues.',
        content: '<p>At its annual developer conference, TechCorp unveiled its next-generation AI assistant, named "EVA". The system represents a significant leap forward in natural language processing and emotional intelligence.</p><p>"EVA can not only answer questions but also understand the emotional context of conversations," explained CTO Michael Chen. "This allows for more natural and helpful interactions."</p><p>The AI assistant will be available in beta next month, with a full release planned for early next year. Early demonstrations showed EVA helping with everything from technical support to mental health check-ins.</p>',
        category: 'technology',
        author: 'David Kim',
        date: '2023-05-14T14:15:00Z',
        image: '/images/ai-assistant.jpg',
        tags: ['technology', 'ai', 'innovation']
    },
    // Add more articles as needed
];

module.exports = (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        const { id, category, exclude, limit } = req.query;
        
        if (id) {
            // Get single article
            const article = articles.find(a => a.id === id);
            if (article) {
                res.status(200).json(article);
            } else {
                res.status(404).json({ error: 'Article not found' });
            }
        } else {
            // Get multiple articles with filters
            let filteredArticles = [...articles];
            
            if (category) {
                filteredArticles = filteredArticles.filter(a => a.category === category);
            }
            
            if (exclude) {
                filteredArticles = filteredArticles.filter(a => a.id !== exclude);
            }
            
            if (limit) {
                filteredArticles = filteredArticles.slice(0, parseInt(limit));
            }
            
            res.status(200).json(filteredArticles);
        }
    } else if (method === 'POST') {
        // Create new article (admin only)
        const newArticle = req.body;
        newArticle.id = (articles.length + 1).toString();
        newArticle.date = new Date().toISOString();
        articles.unshift(newArticle);
        res.status(201).json(newArticle);
    } else if (method === 'PUT') {
        // Update article (admin only)
        const { id } = req.query;
        const updatedArticle = req.body;
        const index = articles.findIndex(a => a.id === id);
        
        if (index !== -1) {
            articles[index] = { ...articles[index], ...updatedArticle };
            res.status(200).json(articles[index]);
        } else {
            res.status(404).json({ error: 'Article not found' });
        }
    } else if (method === 'DELETE') {
        // Delete article (admin only)
        const { id } = req.query;
        articles = articles.filter(a => a.id !== id);
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
};
