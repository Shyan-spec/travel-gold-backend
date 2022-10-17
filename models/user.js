import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_ROUNDS = 6

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, lowercase: true },
  password: String,
  profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true,
})

userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password
    return ret
  },
})

userSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  // New user / changed user password
  bcrypt.hash(user.password, SALT_ROUNDS)
  .then(hash => {
    user.password = hash
    next()
  })
  .catch(err => {
    console.log(err)
    next(err)
  })
})

const User = mongoose.model('User', userSchema)

export { User }
