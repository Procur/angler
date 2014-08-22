module.exports = {
  verifyEmail: verifyEmail
};

function verifyEmail(req, res) {
  res.send(200, {
    emailVerified: true
  });
}