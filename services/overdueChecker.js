const cron = require("node-cron");
const { sendEmail } = require("./emailService");
const Borrower = require("../models/Borrower");

const checkOverdue = async () => {
  try {
    const overdueItems = await Borrower.aggregate([
      {
        $unwind: "$borrowedItems",
      },
      {
        $match: {
          "borrowedItems.returnedDate": null,
          "borrowedItems.dueDate": { $lt: new Date() },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "borrowedItems.item",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      {
        $project: {
          borrower: "$fullName",
          email: 1,
          itemName: { $arrayElemAt: ["$itemDetails.itemName", 0] },
          dueDate: "$borrowedItems.dueDate",
        },
      },
    ]);

    overdueItems.forEach((item) => {
      sendEmail({
        to: item.email,
        subject: "Overdue Item Alert",
        text: `Dear ${item.borrower},\n\nPlease return "${
          item.itemName
        }" which was due on ${item.dueDate.toDateString()}.`,
      });
    });
  } catch (error) {
    console.error("Overdue check failed:", error);
  }
};

cron.schedule("0 9 * * *", checkOverdue, {
  scheduled: true,
  timezone: "UTC",
});
