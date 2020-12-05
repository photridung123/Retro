exports.index = (req, res, next) => {
    // Get from model

    // Pass data to view to display
    res.render('vwdashboard',
        {
            total_public_boards: 2,
            public_boards: [
                {
                    boardID: 1,
                    boardName: 'Project OOP',
                    date_created: new Date(),
                    boardURL: 'https://www.google.com/',
                    total_card: 5
                },
                {
                    boardID: 2,
                    boardName: 'Project Android',
                    date_created: new Date(),
                    boardURL: 'https://www.google.com/',
                    total_card: 2
                }
            ],
            team: [
                {
                    teamID: 1,
                    teamName: 'TeamD',
                    owner: 1,
                    total_team_boards: 1,
                },
                {
                    teamID: 2,
                    teamName: 'DTeam',
                    owner: 2,
                    total_team_boards: 1,
                }
            ],
      
            team_boards: [
                {
                    boardID: 3,
                    teamID: 1,
                    boardName: 'Project abc',
                    date_created: new Date(),
                    total_card: 4
                },
                {
                    boardID: 4,
                    teamID: 2,
                    boardName: 'Project Web',
                    date_created: new Date(),
                    total_card: 2
                }
            ],
            layout: 'dashboard/main', title: "Dashboard", ID: 1
        });
};