[
  { $unwind: '$results' },
  {
    $lookup:
        {
          from: 'category_points_info',
          let: { res: '$results' },
          pipeline: [
            {
              $match:
                    {
                      $expr:
                        {
                          $and:
                                [
                                  { $eq: ['$category', '$$res.category'] },
                                  { $eq: ['$categoryPoint', '$$res.categoryPoint'] },
                                ],
                        },
                    },
            },
            {
              $project: {
                _id: 0, available: '$weight', earned: { $cond: [{ $eq: ['$$res.accepted', true] }, '$weight', 0] }, comment: 1,
              },
            },
          ],
          as: 'points',
        },
  },
  { $unwind: '$points' },
  {
    $project: {
      auditor: 1, date: 1, storeId: 1, 'results.category': 1, 'results.accepted': 1, 'results.categoryPoint': 1, 'results.points.earned': '$points.earned', 'results.points.available': '$points.available', 'results.comment': 1,
    },
  },
  {
    $group: {
      _id: {
        _id: '$_id', date: '$date', storeId: '$storeId', categoryNum: '$results.category',
      },
      totalEarned: { $sum: '$results.points.earned' },
      totalAvailable: { $sum: '$results.points.available' },
      categoryPoints: { $push: { categoryPoint: '$results.categoryPoint', accepted: '$results.accepted', comment: '$results.comment' } },
    },
  },
  {
    $addFields: {
      totalPerc: {
        $divide: [{ $multiply: [100, '$totalEarned'] },
          '$totalAvailable'],
      },
    },
  },
  { $sort: { '_id.categoryNum': 1 } },
  {
    $group: {
      _id: '$_id._id', date: { $first: '$_id.date' }, storeId: { $first: '$_id.storeId' }, totalAvailable: { $sum: '$totalAvailable' }, totalEarned: { $sum: '$totalEarned' }, categories: { $push: { categoryNum: '$_id.categoryNum', categoryPoints: '$categoryPoints', totalPerc: '$totalPerc' } },
    },
  },
  {
    $addFields: {
      totalPerc: {
        $divide: [{ $multiply: [100, '$totalEarned'] },
          '$totalAvailable'],
      },
    },
  },
  { $project: { totalAvailable: 0, totalEarned: 0 } },
];
