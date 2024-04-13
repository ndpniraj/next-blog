import { Schema, Document, ObjectId, model, models, Model } from "mongoose";

interface PostDoc extends Document {
  title: string;
  body: string;
  slug: string;
  estimatedReadingTime: string;
  createdBy: ObjectId;
  thumbnail?: { url: string; id: string };
}

const postSchema = new Schema<PostDoc>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    estimatedReadingTime: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: Object,
      url: String,
      id: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = models.Post || model("Post", postSchema);
export default PostModel as Model<PostDoc>;
