const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const authSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: { type: String, required: true },
    location: { type: String, default: "Nigeria" },
    profession: { type: String, default: "Student" },
    interests: [String],

    emailAddress: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    enrolledCourses: [
			{
				course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
				lastStudiedAt: { type: Date, default: null },
        progress: { type: Number, default: 0 },
        completedChapters: [Number],
			},
		],
		// createdCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
	
    stripeAccountId: String,
		stripeOnboardingComplete: { type: Boolean, default: false },
    transactions: [
			{
				type: {
					type: String,
					enum: ["purchase", "payout", "balanceTransfer"],
				},
				amount: Number,
				status: String,
				courseId: { type: Schema.Types.ObjectId, ref: "Course" },
				stripeTransactionId: String,
				createdAt: { type: Date, default: Date.now },
			},
		],
    photo: {
      type: String,
      default:
        "https://images.pexels.com/photos/15818869/pexels-photo-15818869/free-photo-of-person-riding-extremely-packed-bike.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    phone: {
      type: String,
      default: "+234",
    },
    gender: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: "subscriber",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    socialMediaLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
    },
    hasBooked: {
      type: Boolean,
      default: false
    },

    bookedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],

    tag: {
      type: String,
      enum: ["mentor", "mentee", "none"],
      default: "none",
    },
    expertise: [String],
    availableTimes: [String],
    available: {
    type: Boolean,
    default: true,
  },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", authSchema);
module.exports = User;
