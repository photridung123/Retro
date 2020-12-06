exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('team',
    {
        team: 
        [
            {
                owner           : "Vo Van Ba Dat",
                name            : "Dteam",
                member:
                [
                    {
                        name: "Pho Tri Dung",
                    },
                    {
                        name: "Nguyen Tri Dung",
                    }
                ]
            },
            {
                owner           : "Vo Nguc Duc",
                name            : "teamD",
                member:
                [
                    {
                        name: "Nguyen Phu Duy",
                    }
                ]
            }
        ],
        layout: 'dashboard/main', title: "Team", ID: 1
    })
};