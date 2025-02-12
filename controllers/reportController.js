exports.getInventorySummary = async (req, res) => {
  const summary = await Product.aggregate([
    { $group: {
      _id: '$category',
      total: { $sum: 1 },
      available: { $sum: { $cond: [{ $eq: ['$status', 'Available'] }, 1, 0] } },
      borrowed: { $sum: { $cond: [{ $eq: ['$status', 'Borrowed'] }, 1, 0] } },
      damaged: { $sum: { $cond: [{ $eq: ['$status', 'Damaged'] }, 1, 0] } }
    }}
  ]);
  res.json(summary);
};

exports.getOverdueItems = async (req, res) => {
  const overdue = await Borrower.aggregate([
    { $unwind: '$borrowedItems' },
    { $match: { 
      'borrowedItems.returnedDate': null,
      'borrowedItems.dueDate': { $lt: new Date() }
    }},
    { $project: {
      _id: 0,
      item: '$borrowedItems.item',
      borrower: '$fullName',
      dueDate: '$borrowedItems.dueDate'
    }}
  ]);
  res.json(overdue);
}; 