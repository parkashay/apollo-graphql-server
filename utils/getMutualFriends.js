const { Users } = require("../data");

function getMutualFriends(firstUserID, secondUserID) {
  const friendsOfFirstUser = Users.find(
    (user) => user.id == firstUserID
  ).friends;

  const friendsOfSecondUser = Users.find(
    (user) => user.id == secondUserID
  ).friends;

  const mutualFriendsIDs = friendsOfFirstUser.filter((friendID) =>
    friendsOfSecondUser.includes(friendID)
  );

  return Users.filter((user) => mutualFriendsIDs.includes(user.id));
}

module.exports = { getMutualFriends };
