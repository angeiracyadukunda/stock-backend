exports.borrowItem = async (req, res) => {
  try {
    const { itemId, borrowerId, dueDate } = req.body;
    
    const item = await Product.findById(itemId);
    const borrower = await Borrower.findById(borrowerId);

    item.status = 'Borrowed';
    item.currentBorrower = borrowerId;
    item.history.push({
      user: req.user._id,
      action: 'Borrowed',
      notes: `Due: ${new Date(dueDate).toDateString()}`
    });

    borrower.borrowedItems.push({
      item: itemId,
      borrowedDate: new Date(),
      dueDate
    });

    await Promise.all([item.save(), borrower.save()]);
    res.json({ message: 'Item borrowed successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; 