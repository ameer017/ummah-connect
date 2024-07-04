const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contentSchema = new Schema({
	title: { type: String, required: true },
	type: { type: String, enum: ["article", "video", "audio"], required: true },
	fileUrl: { type: String },
	description: { type: String },
	topics: [
		{
			type: String,
			enum: [
				"Quran and Tafsir",
				"Fiqh (Islamic Jurisprudence)",
				"Hadith",
				"Aqeedah (Creed and Belief)",
				"Seerah (Biography of the Prophet Muhammad)",
				"Da'wah (Invitation to Islam)",
			],
		},
	],
	category: { type: Schema.Types.ObjectId, ref: "Category" },
	status: {
		type: String,
		enum: ["pending", "approved", "rejected"],
		default: "pending",
	},
	submittedBy: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

contentSchema.methods.approveContent = function () {
	this.status = "approved";
	return this.save();
};

contentSchema.methods.rejectContent = function () {
	this.status = "rejected";
	return this.save();
};

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
