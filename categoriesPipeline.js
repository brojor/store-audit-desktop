[
    {$lookup : {from : "category_points_info", localField : "_id", foreignField : "category", as : "categoryPoints"}},
    { $unwind: "$categoryPoints" },
    { $project: {num: "$_id", name: "$categoryName", "categoryPoints.num": "$categoryPoints.categoryPoint", "categoryPoints.name": "$categoryPoints.title"}},
    { $group: {_id: "$_id", num: { $first: "$num" }, name:{ $first: "$name" }, categoryPoints: { $push: { num: "$categoryPoints.num", name: "$categoryPoints.name" }}  }},
    { $sort: {num: 1}},
    { $project: {_id: 0}}
]