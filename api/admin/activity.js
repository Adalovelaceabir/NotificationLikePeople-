module.exports = (req, res) => {
    // In a real app, fetch these from your database
    const activities = [
        {
            id: '1',
            icon: 'newspaper',
            message: 'New article "Global Summit Addresses Climate Change Concerns" was published',
            date: '2023-05-15T10:35:00Z'
        },
        {
            id: '2',
            icon: 'comment',
            message: 'John Doe commented on "Global Summit Addresses Climate Change Concerns"',
            date: '2023-05-15T11:30:00Z'
        },
        {
            id: '3',
            icon: 'user',
            message: 'New user Jane Smith registered',
            date: '2023-05-14T09:15:00Z'
        },
        {
            id: '4',
            icon: 'ad',
            message: 'New advertisement campaign was created',
            date: '2023-05-13T14:20:00Z'
        }
    ];
    
    res.status(200).json(activities);
};
