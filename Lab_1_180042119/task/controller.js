const getUserID = async (req, res) => {
  const userId = req.params.id;
  // Use the userId to fetch user data or perform some action
  res.send(`User ID: ${userId}`);
};

module.exports = { getUserID };
