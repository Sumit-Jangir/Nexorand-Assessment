import mongoose from "mongoose";

const claimHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: true,
    },
    pointsAwarded: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
    username:{
      type: String,
    }
  },
  {
    timestamps: true, 
  }
);

const ClaimHistory = mongoose.model("ClaimHistory", claimHistorySchema);
export default ClaimHistory;
