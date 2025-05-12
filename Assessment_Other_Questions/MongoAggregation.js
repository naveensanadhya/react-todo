// Lets Consider db as mongoDB Instance

db.sales.aggregate([
  // 1. Unwind the 'items' array so each item becomes a separate document
  {
    $unwind: "$items",
  },
  // 2. Project necessary fields and compute year-month and revenue per item
  {
    $project: {
      store: 1,
      month: { $dateToString: { format: "%Y-%m", date: "$date" } },
      price: "$items.price",
      revenue: { $multiply: ["$items.quantity", "$items.price"] },
    },
  },
  // 3. Group by store and month to compute total revenue and prepare for avg price
  {
    $group: {
      _id: { store: "$store", month: "$month" },
      totalRevenue: { $sum: "$revenue" },
      totalPrice: { $sum: "$price" },
      itemCount: { $sum: 1 },
    },
  },
  // 4. Project final result with averagePrice
  {
    $project: {
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: { $divide: ["$totalPrice", "$itemCount"] },
      _id: 0,
    },
  },
  // 5. Sort by store and month
  {
    $sort: { store: 1, month: 1 },
  },
]);
