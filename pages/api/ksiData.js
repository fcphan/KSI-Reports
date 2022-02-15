import { connectToDatabase } from "../../utils/mongodb";

export default async function getData(req, res) {
  try {
    let { db } = await connectToDatabase();
    let dataset;

    const collection = req.query.collection;
    const year = req.query.year;
    const prev_year = (year - 1).toString();
    const shop = req.query.shop;

    if (collection == "Time Availability Data and Time Analysis Data") {
      dataset = await db
        .collection(collection)
        .find({
          $or: [
            { year: prev_year, month_num: { $gt: 6 } },
            { year: year, month_num: { $lt: 7 } },
          ],
          shop: shop,
        })
        .project({
          total_reg_hours: 1,
          total_overtime_hours: 1,
          reactive_hours: 1,
          project_hours: 1,
          pm_hours: 1,
          standing_hours: 1,
          admin_hours: 1,
          leave_hours: 1,
          month: 1,
          _id: 0,
        })
        .sort({ month_num: 1 })
        .toArray();
    }
    if (collection == "Work Order Phase Analysis") {
      dataset = await db
        .collection(collection)
        .find({
          $or: [
            { year: prev_year, month_num: { $gt: 6 } },
            { year: year, month_num: { $lt: 7 } },
          ],
          shop: shop,
        })
        .project({
          asg_created: 1,
          asg_open: 1,
          asg_completed: 1,
          asg_cancelled: 1,
          asg_closed: 1,
          asg_standing: 1,
          asg_planned: 1,
          unasg_created: 1,
          unasg_open: 1,
          unasg_completed: 1,
          unasg_cancelled: 1,
          unasg_closed: 1,
          unasg_standing: 1,
          unasg_planned: 1,
          month: 1,
          _id: 0,
        })
        .sort({ month_num: 1 })
        .toArray();
    }
    if (collection == "PM WO Data") {
      dataset = await db
        .collection(collection)
        .find({
          $or: [
            { year: prev_year, month_num: { $gt: 6 } },
            { year: year, month_num: { $lt: 7 } },
          ],
          shop: shop,
        })
        .project({
          asg_created: 1,
          asg_open: 1,
          asg_completed: 1,
          asg_cancelled: 1,
          asg_closed: 1,
          unasg_created: 1,
          unasg_open: 1,
          unasg_completed: 1,
          unasg_cancelled: 1,
          unasg_closed: 1,
          month: 1,
          _id: 0,
        })
        .sort({ month_num: 1 })
        .toArray();
    }
    if (collection == "Project WO Data") {
      dataset = await db
        .collection(collection)
        .find({
          $or: [
            { year: prev_year, month_num: { $gt: 6 } },
            { year: year, month_num: { $lt: 7 } },
          ],
          shop: shop,
        })
        .project({
          asg_created: 1,
          asg_completed: 1,
          asg_cancelled: 1,
          asg_closed: 1,
          unasg_created: 1,
          unasg_completed: 1,
          unasg_cancelled: 1,
          unasg_closed: 1,
          month: 1,
          _id: 0,
        })
        .sort({ month_num: 1 })
        .toArray();
    }
    if (collection == "Reactive WO Data") {
      dataset = await db
        .collection(collection)
        .find({
          $or: [
            { year: prev_year, month_num: { $gt: 6 } },
            { year: year, month_num: { $lt: 7 } },
          ],
          shop: shop,
        })
        .project({
          avg_days: 1,
          month: 1,
          _id: 0,
        })
        .sort({ month_num: 1 })
        .toArray();
    }
    if (collection == "Total Hours by Employee") {
      dataset = await db
        .collection(collection)
        .find({
          $or: [
            { year: prev_year, month_num: { $gt: 6 } },
            { year: year, month_num: { $lt: 7 } },
          ],
          shop: shop,
        })
        .project({
          shop_person: 1,
          admin_hrs: 1,
          proj_hrs: 1,
          react_prev_hrs: 1,
          month: 1,
          _id: 0,
        })
        .sort({ month_num: 1 })
        .toArray();
    }

    return res.json({
      message: JSON.parse(JSON.stringify(dataset)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
