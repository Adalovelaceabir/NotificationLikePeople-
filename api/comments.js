// Simulated comments database
let comments = [
    {
        id: '1',
        articleId: '1',
        author: 'John Doe',
        text: 'This is a great article! Very informative.',
        date: '2023-05-15T11:30:00Z'
    },
    {
        id: '2',
        articleId: '1',
        author: 'Jane Smith',
        text: 'I hope world leaders actually follow through on these commitments.',
        date: '2023-05-15T12:45:00Z'
    }
];

module.exports = (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        const { articleId } = req.query;
        
        if (articleId) {
            const articleComments = comments.filter(c => c.articleId === articleId);
            res.status(200).json(articleComments);
        } else {
            res.status(200).json(comments);
        }
    } else if (method === 'POST') {
        // Add new comment
        const newComment = req.body;
        newComment.id = (comments.length + 1).toString();
        newComment.date = new Date().toISOString();
        comments.push(newComment);
        res.status(201).json(newComment);
    } else if (method === 'DELETE') {
        // Delete comment (admin only)
        const { id } = req.query;
        comments = comments.filter(c => c.id !== id);
        res.status(204).end();
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
};
