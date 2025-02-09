import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  gender: "male" | "female" | "other";
  dob: Date;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  agree: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: function (v: Date) {
          const age = new Date().getFullYear() - new Date(v).getFullYear();
          return age >= 13; // Age must be 13 or older
        },
        message: "User must be at least 13 years old.",
      },
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    agree: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  try {
    const password = enteredPassword.toString();
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
  } catch (error) {
    console.error("Error during password comparison:", error);
    throw new Error("Error comparing passwords");
  }
};

const User = mongoose.model("User", userSchema);

export default User;
