import orderModel from "../models/orderModel.js";

export const deleteOrderController=async(req,res)=>{
    try {
      const { id } = req.params;
      await orderModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Order Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting order",
        error,
      });
    }
  
  };

  