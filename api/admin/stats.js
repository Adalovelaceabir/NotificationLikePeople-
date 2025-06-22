module.exports = (req, res) => {
    // In a real app, fetch these from your database
    const stats = {
        totalArticles: 125,
        totalVisitors: 8432,
        newComments: 28,
        adRevenue: 1245.50
    };
    
    res.status(200).json(stats);
};
