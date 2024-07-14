const signupInput = require("@muse/common-app");

const { success } = signupInput.safeParse({
  email: "heheh",
  password: "password",
  name: "a",
});
if (!success) {
  c.status(400);
  console.log(object)("error: invalid input");
}
