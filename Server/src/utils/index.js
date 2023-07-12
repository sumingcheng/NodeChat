// 查找用户名
function findUserName(arr, username) {
  let user = arr.find((item) => item.username === username);
  return user ? user.username : null;
}

function replaceUser(array, newUser) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].username === newUser.username) {
      array[i] = newUser;
      break;
    }
  }
  return array;
}

module.exports = {
  findUserName,
  replaceUser
}
