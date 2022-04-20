const USERNAME = "BAKEOFF_USER";

const getBasicHeader = () => {
  if (localStorage.getItem("password") === null) {
    return "";
  }
  return `Basic ${localStorage.getItem("password")}`;
};

export { USERNAME, getBasicHeader };
