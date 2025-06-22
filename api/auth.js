// Simulated users database
const users = [
    {
        id: '1',
        username: 'admin',
        password: 'securepassword', // In real app, store hashed passwords
        role: 'admin',
        name: 'Admin User'
    }
];

module.exports = (req, res) => {
    const { method } = req;

    if (method === 'POST') {
        if (req.url.endsWith('/login')) {
            // Login endpoint
            const { username, password } = req.body;
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // In a real app, generate a JWT token
                res.status(200).json({
                    token: 'simulated-jwt-token',
                    user: {
                        id: user.id,
                        name: user.name,
                        role: user.role
                    }
                });
            } else {
                res.status(401).json({ error: 'Invalid credentials' });
            }
        } else if (req.url.endsWith('/validate')) {
            // Token validation endpoint
            const token = req.headers.authorization;
            
            if (token === 'Bearer simulated-jwt-token') {
                res.status(200).json({
                    valid: true,
                    user: {
                        id: '1',
                        name: 'Admin User',
                        role: 'admin'
                    }
                });
            } else {
                res.status(401).json({ valid: false });
            }
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
};
