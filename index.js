const express = require("express");
const { ServerConfig } = require("./configs");
const { StatusCodes } = require("http-status-codes");

const app = express();

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({
    success: true,
    message: "Server is running!",
    data: {},
    error: {},
  });
});

app.use("/api", require("./routes"));

// global catch-all route
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Route not found!",
    data: {},
    error: {},
  });
});

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is running on port ${ServerConfig.PORT}`);
});
