const RestaurantUserCart = require("../models/Cart.js");
const RestaurantCustomization = require("../models/Customization.js");

const RestaurantUserCartAdd = async (req, res) => {
  try {
    const { items } = req.body;

    const restaurantusercarts = await RestaurantUserCart.findOne({
      user: req.user._id,
      status: "Visible",
    });

    if (restaurantusercarts) {
      // Push all new items to the existing items array
      restaurantusercarts.items = [...restaurantusercarts.items, ...items];
      await restaurantusercarts.save();

      return res.status(200).json({
        success: true,
        data: restaurantusercarts,
        message: "Cart updated successfully with new items.",
      });
    }

    const restaurantusercart = new RestaurantUserCart({
      ...req.body,
    });

    await restaurantusercart.save();
    return res.status(201).json({ success: true, data: restaurantusercart });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: error, message: error.message });
  }
};

const RestaurantUserCartsGet = async (req, res) => {
  try {
    const existingRestaurantUserCart = await RestaurantUserCart.findOne({
      user: req.user._id,
      status: "Visible",
    }).populate("items.item");

    if (!existingRestaurantUserCart) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant User Cart data does not exist.",
      });
    }

    let totalQuantity = 0;
    let finalTotalPrice = 0;

    const items = await Promise.all(
      existingRestaurantUserCart.items.map(async (item) => {
        const customizationList = await Promise.all(
          item.customizationList.map(async (customizationId) => {
            // Use aggregation to find matching customization item
            const customizationItem = await RestaurantCustomization.aggregate([
              { $unwind: "$list" }, // Flatten the list array
              {
                $match: {
                  "list._id": customizationId, // Match the customization ID
                },
              },
              { $project: { _id: 0, list: 1 } }, // Return only the list field
            ]);

            return {
              id: customizationId,
              details: customizationItem[0]?.list || null, // Return the matched list or null
            };
          })
        );

        const totalExtraRate = customizationList.reduce(
          (sum, customization) => sum + (customization.details?.extraRate || 0),
          0
        );

        const basePrice = item.item.price + totalExtraRate;
        const discountValue = (basePrice * item.item.discount) / 100;
        const finalPrice = basePrice - discountValue;

        const totalPrice = finalPrice * item.quantity;
        totalQuantity += item.quantity;
        finalTotalPrice += totalPrice;
        return {
          name: item.item.name,
          price: totalPrice,
          image: item.item.image,
          quantity: item.quantity,
        };
      })
    );
    const cgst = (finalTotalPrice * 2.5) / 100; // CGST is 2.5%
    const sgst = (finalTotalPrice * 2.5) / 100; // SGST is 2.5%

    // Calculate Payable Amount
    const payableAmount = Math.round(finalTotalPrice + cgst + sgst);

    return res.status(200).json({
      success: true,
      data: {
        _id: existingRestaurantUserCart._id,
        user: existingRestaurantUserCart.user,
        items: items,
        totalItems: items.length,
        totalQuantity: totalQuantity,
        total: finalTotalPrice,
        cgst: cgst,
        sgst: sgst,
        payableAmount: payableAmount,
        status: existingRestaurantUserCart.status,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantUserCartGet = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurantusercarts = await RestaurantUserCart.findById(id);
    if (!restaurantusercarts) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant Cart data does not exist.",
      });
    }
    return res.status(200).json({ success: true, data: restaurantusercarts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const RestaurantUserCartDelete = async (req, res) => {
  try {
    const { itemsId } = req.body;
    const restaurantusercarts = await RestaurantUserCart.findOne({
      user: req.user._id,
    });
    if (!restaurantusercarts) {
      return res.status(400).json({
        success: false,
        message: "The Restaurant Cart data does not exist.",
      });
    }
    restaurantusercarts.items = restaurantusercarts.items.filter((item) => {
      // Check if the item._id is not in the itemsId array
      return !itemsId.includes(item._id.toString());
    });

    // If the cart still contains items, save the updated cart
    await restaurantusercarts.save();

    return res.status(200).json({
      success: true,
      data: "Item successfully deleted from the cart.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  RestaurantUserCartAdd,
  RestaurantUserCartsGet,
  RestaurantUserCartGet,
  RestaurantUserCartDelete,
};
