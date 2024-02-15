const User = require("./user");
const Drawing = require("./drawing");
const Answer = require("./answer");

// Drawing to User associations
Drawing.belongsTo(User, {
    onDelete: "CASCADE"
});
User.hasMany(Drawing);

// Drawing to Answer associations
Drawing.belongsTo(Answer, {
    onDelete: "CASCADE"
});
Answer.hasMany(Drawing);

// User friend association
User.belongsToMany(User, {
    through: "Friendship",
    as: "Friends",
    foreignKey: "UserId",
    otherKey: "FriendId"
})

module.exports = {
    User,
    Drawing,
    Answer
}
