import { genSalt, hash, compare } from "bcrypt";
import { Document, Schema, model, models, Model } from "mongoose";

interface UserDoc extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: { url: string; id: string };
  banner?: { url: string; id: string };
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDoc, {}, Methods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      url: String,
      id: String,
    },
    banner: {
      type: Object,
      url: String,
      id: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
    }
  } catch (error) {
    throw error;
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = models.User || model("User", userSchema);
export default UserModel as Model<UserDoc, {}, Methods>;
