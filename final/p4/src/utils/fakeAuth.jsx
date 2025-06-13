let users = [];

export const registerUser = (user) => {
  users.push(user);
};

export const loginUser = ({ email, password }) => {
  return users.find(user => user.email === email && user.password === password);
};
