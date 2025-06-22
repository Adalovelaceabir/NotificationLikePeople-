// Simulated categories data
const categories = [
    { id: 'politics', name: 'Politics', description: 'Political news and analysis' },
    { id: 'technology', name: 'Technology', description: 'Tech news and innovations' },
    { id: 'business', name: 'Business', description: 'Business and financial news' },
    { id: 'sports', name: 'Sports', description: 'Sports news and updates' },
    { id: 'entertainment', name: 'Entertainment', description: 'Entertainment and celebrity news' }
];

module.exports = (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        res.status(200).json(categories);
    } else if (method === 'POST') {
        // Add new category (admin only)
        const newCategory = req.body;
        categories.push(newCategory);
        res.status(201).json(newCategory);
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
};
