const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    importance: {
      type: Schema.Types.ObjectId,
      ref: "Importance",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Note", schema);
