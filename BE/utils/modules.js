const paramRequired = (paramName) => {
  return {
    success: true,
    data: { status: "failed", message: paramName + " is required" },
  };
};

module.exports = {
  paramRequired,
};
