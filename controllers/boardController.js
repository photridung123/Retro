exports.index = (req, res, next) => {
    // Get from model

    // Pass data to view to display
    res.render('board',
        {
            board_name: "Project CNPM",
            max_vote: 6,
            total_columns: 3,
            columns:
                [
                    {
                        column_name: "Todo",
                        task:
                            [
                                {
                                    task_name: "Xây dựng website",
                                    task_owner: "Nguyễn Văn A",
                                    total_vote: 0,
                                    total_comment: 0
                                }

                            ],
                    },
                    {
                        column_name: "Doing",
                        task:
                            [
                                {
                                    task_name: "Xây dựng prototype website",
                                    task_owner: "Trần Thị B",
                                    total_vote: 0,
                                    total_comment: 0
                                }

                            ],
                    },
                    {
                        column_name: "Done",
                        task:
                            [
                                {
                                    task_name: "Thiết kế use case",
                                    task_owner: "Phạm Văn C",
                                    total_vote: 0,
                                    total_comment: 1,
                                    comment: [
                                        {
                                            comment_owner: "Phạm Văn C",
                                            comment_text: "Mọi người check với"
                                        }
                                    ]
                                },
                                {
                                    task_name: "Thiết kế use case",
                                    task_owner: "Phạm Văn C",
                                    total_vote: 0,
                                    total_comment: 1,
                                    comment: [
                                        {
                                            comment_owner: "Phạm Văn C",
                                            comment_text: "Mọi người check với"
                                        }
                                    ]
                                }

                            ],
                    },
                    
                ],
            layout: 'dashboard/main', title: "Board", ID: 1
        });
};