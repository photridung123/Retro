exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('analytics',
    {
        public_boards: [
            {
                boardID: 1,
                boardName: 'Project OOP',
                date_created: new Date(),
                boardURL: 'https://www.google.com/',
                total_card: 5,
                votes: 4,
                wroters: 2,
                voters: 3
            },
            {
                boardID: 2,
                boardName: 'Project Android',
                date_created: new Date(),
                boardURL: 'https://www.google.com/',
                total_card: 2,
                votes: 0,
                wroters: 1,
                voters: 0
            }
        ],
        team: [
            {
                teamID: 2,
                teamName: 'DTeam',
                owner: 3,
                team_boards: [
            
                    {
                        boardID: 4,
                        teamID: 2,
                        boardName: 'Project Web',
                        date_created: new Date(),
                        total_card: 2,
                        votes: 0,
                        wroters: 1,
                        voters: 0,
                        participation: '66%'
                    }
                ]
            }
        ],  
        layout: 'dashboard/main', 
        title: "Analytics", 
        ID: 1,
        username: res.locals.user.user_name
    })
};