const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,

  // Soft delete fields
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, { timestamps: true });

/**
 * 🔥 Middleware: Exclude deleted docs in all find queries
 */
function excludeDeleted(next) {
  this.where({ isDeleted: false });
  next();
}

// Apply to all query types
userSchema.pre("find", excludeDeleted);
userSchema.pre("findOne", excludeDeleted);
userSchema.pre("findOneAndUpdate", excludeDeleted);
userSchema.pre("countDocuments", excludeDeleted);

/**
 * 🔥 Override delete methods (soft delete)
 */

// Instead of deleteOne → update isDeleted
userSchema.methods.softDelete = function () {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

// Static method (delete by ID)
userSchema.statics.softDeleteById = function (id) {
  return this.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
      deletedAt: new Date()
    },
    { new: true }
  );
};

// Restore method
userSchema.statics.restoreById = function (id) {
  return this.findByIdAndUpdate(
    id,
    {
      isDeleted: false,
      deletedAt: null
    },
    { new: true }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;