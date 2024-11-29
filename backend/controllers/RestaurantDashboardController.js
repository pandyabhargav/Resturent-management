const Restaurant = require("../models/Restaurant.js");
const RestaurantOrder = require("../models/Order.js");
const RestaurantCart = require("../models/Cart.js");

// const RestaurantDashboardGet = async (req, res) => {
//   try {
//     const restaurantOrders = await RestaurantOrder.find({
//       restaurant: req.user.restaurant,
//     });

//     const today = new Date();
//     const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Midnight today
//     const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of today

//     let totalPayableAmount = 0;
//     let totalOrdertoday = 0;
//     let dishes = new Set();
//     const averageCustomer = new Set(); // Use a Set for unique IDs
//     const todaysOrders = await restaurantOrders.filter(async (order) => {
//       const createdAt = new Date(order.createdAt);
//       if (createdAt >= startOfDay && createdAt <= endOfDay) {
//         averageCustomer.add(order.user.toString()); // Add unique user ID
//         totalOrdertoday += 1;

//         if (order.status === "Confirm") {
//           totalPayableAmount += order.payableAmount;
//         }
//         return true;
//       }
//       if (order.cart) {
//         const restaurantCart = await RestaurantCart.findById(
//           order.cart
//         ).populate("items.item");

//         if (restaurantCart?.items?.length > 0) {
//           restaurantCart.items.forEach((item) => {
//             if (item?.item) {
//               // console.log("Cart Item:", item.item);
//               dishes.add(item.item);
//             }
//           });
//         }
//       }

//       return false;
//     });

//     const groupedOrders = {};

//     restaurantOrders.forEach((order) => {
//       const createdAt = new Date(order.createdAt);
//       const year = createdAt.getFullYear();
//       const month = createdAt.getMonth() + 1; // Months are zero-indexed

//       const key = `${year}-${month}`;
//       if (!groupedOrders[key]) {
//         groupedOrders[key] = [];
//       }

//       groupedOrders[key].push(order);
//     });

//     // Convert grouped orders to an array and sort them by year and month
//     const sortedMonthWiseOrders = Object.entries(groupedOrders)
//       .map(([key, orders]) => {
//         const [year, month] = key.split("-").map(Number);
//         return {
//           year,
//           month,
//           customervisit: orders.length,
//         };
//       })
//       .sort((a, b) =>
//         a.year === b.year ? a.month - b.month : a.year - b.year
//       );

//       const dishesArray = Array.from(dishes);
//       console.log("dishesArray", dishesArray);

//     const data = {
//       totalOrdertoday: totalOrdertoday, // Orders created today
//       averageCustomer: averageCustomer.size,
//       todayRevenue: totalPayableAmount, // Total payable amount for today
//       monthWiseOrders: sortedMonthWiseOrders,
//       dishes: dishes, // Send cart items data as part of the response
//     };
//     res.status(200).json({ success: true, data });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const RestaurantDashboardGet = async (req, res) => {
  try {
    const { orderperiod } = req.query;

    // Fetch restaurant orders
    const restaurantOrders = await RestaurantOrder.find({
      restaurant: req.user.restaurant,
    });

    const today = new Date();
    let startOfPeriod, endOfPeriod;

    // Calculate start and end of the orderperiod based on the parameter
    if (orderperiod === "week") {
      const startOfWeek = today.getDate() - today.getDay(); // Get start of the week (Sunday)
      startOfPeriod = new Date(today.setDate(startOfWeek)).setHours(0, 0, 0, 0);
      endOfPeriod = new Date(today.setDate(startOfWeek + 6)).setHours(23, 59, 59, 999);
    } else if (orderperiod === "month") {
      startOfPeriod = new Date(today.getFullYear(), today.getMonth(), 1).setHours(0, 0, 0, 0);
      endOfPeriod = new Date(today.getFullYear(), today.getMonth() + 1, 0).setHours(23, 59, 59, 999);
    } else {
      // Default to "day" if no valid orderperiod is specified
      startOfPeriod = new Date(today.setHours(0, 0, 0, 0));
      endOfPeriod = new Date(today.setHours(23, 59, 59, 999));
    }
    
    let totalPayableAmount = 0;
    let totalOrderToday = 0;
    let totalParcelOrder = 0;
    let totalOnsiteOrder = 0;
    let dishes = new Set(); // Use a Set to ensure unique items
    const averageCustomer = new Set(); // Track unique customers

    // Process each order
    for (const order of restaurantOrders) {
      const createdAt = new Date(order.createdAt);

      // Check if the order is created today
      if (createdAt >= startOfDay && createdAt <= endOfDay) {
        averageCustomer.add(order.user.toString()); // Add unique user ID
        totalOrderToday += 1;

        if (order.status === "Confirm") {
          totalPayableAmount += order.payableAmount;
        }
      }

      if (order.type === "Parcel" && order.status === "Confirm") {
        totalParcelOrder += 1;
      }
      if (order.type === "Onsite" && order.status === "Confirm") {
        totalOnsiteOrder += 1;
      }

      // Process cart items if the order has a cart
      if (order.cart) {
        const restaurantCart = await RestaurantCart.findById(
          order.cart
        ).populate("items.item");

        if (restaurantCart?.items?.length > 0) {
          restaurantCart.items.forEach((item) => {
            if (item?.item) {
              dishes.add(JSON.stringify(item.item)); // Add unique item as string
            }
          });
        }
      }
    }

    // Convert Set to an array and parse back to objects
    const uniqueDishes = Array.from(dishes).map((dish) => JSON.parse(dish));

    // Group orders by year and month
    const groupedOrders = {};
    restaurantOrders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const year = createdAt.getFullYear();
      const month = createdAt.getMonth() + 1; // Months are zero-indexed
      const key = `${year}-${month}`;

      if (!groupedOrders[key]) {
        groupedOrders[key] = [];
      }

      groupedOrders[key].push(order);
    });

    // Convert grouped orders to an array and sort them by year and month
    const sortedMonthWiseOrders = Object.entries(groupedOrders)
      .map(([key, orders]) => {
        const [year, month] = key.split("-").map(Number);
        return {
          year,
          month,
          customervisit: orders.length,
        };
      })
      .sort((a, b) =>
        a.year === b.year ? a.month - b.month : a.year - b.year
      );

    // Prepare response data
    const data = {
      totalOrderToday, // Total orders created today
      averageCustomer: averageCustomer.size, // Unique customers today
      todayRevenue: totalPayableAmount, // Total revenue for today
      monthWiseOrders: sortedMonthWiseOrders, // Orders grouped by month
      totalParcelOrder,
      totalOnsiteOrder,
      popularDishes: uniqueDishes, // Unique cart items
    };

    res.status(200).json({ success: true, data });
  } catch (error) {
    // Handle errors and send a response
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantDashboardGet,
};
