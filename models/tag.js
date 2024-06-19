const { Mongoose } = require("../configs");

const tagSchema = new Mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const Tag = Mongoose.model("Tag", tagSchema);
module.exports = Tag;
