exports.index = (req, res, next) => {
    // Get from model
    
    // Pass data to view to display
    res.render('account',{
        account_user:[
            {
                name: 'Nguyễn Văn A',
                email: 'nva123@gmail.com',
                registered_day: '29 November 2020',
                subscription: 'Premium'
            }
        ],
        payment_history:[
            {
                startDay: '29/11/2020',
                endDay: '28/12/2020',
                type: 'Premium',
                bill: '50.000 VND',
                current: 1
            },
            {
                startDay: '29/10/2020',
                endDay: '28/11/2020',
                type: 'Premium',
                bill: '50.000 VND',
                current: 0
            },
            {
                startDay: '29/09/2020',
                endDay: '28/10/2020',
                type: 'Premium',
                bill: '50.000 VND',
                current: 0
            },
            {
                startDay: '29/08/2020',
                endDay: '28/09/2020',
                type: 'Free',
                bill: '0 VND',
                current: 0
            }
        ],
        layout: 'dashboard/main', title: "Account", ID: 1
    });
};