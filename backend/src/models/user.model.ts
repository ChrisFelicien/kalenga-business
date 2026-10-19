import mongoose from 'mongoose';
import { UserRoles, UserType } from '@/types';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema<UserType>(
  {
    firstName: {
      type: String,
      required: [true, 'User must have a name'],
      minlength: [3, 'First name cannot be less than 3 characters'],
      maxLength: [30, 'Fist name cannot exceed 30 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'User must have a name'],
      minlength: [3, 'Last name cannot be less than 3 characters'],
      maxLength: [30, 'Last name cannot exceed 30 characters'],
      trim: true,
    },
    email: {
      type: String,
      unique: [true, 'This email is already in use'],
      required: [true, 'User email is required'],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'User password is required'],
      minlength: [12, 'User password must have at lest 12 characters'],
      select: false,
      trim: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.CASHIER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

UserSchema.virtual('FullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Methods
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return; // No need to add next
  this.password = await bcrypt.hash(this.password, 12);

  return; // No need to add next
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<UserType>('User', UserSchema);

export default User;
