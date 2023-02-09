// import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

//comment will belong to user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})
//post will have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
})

module.exports = {
  User,
  Post,
  Comment
};