
const JSONResult = {};
JSONResult.error = err => {
  if(!(err instanceof Error)){
    err = new Error(err);
  }
  return {
    success: false,
    error: {
      message: err.message,
      stack: err.stack,
    },
  };
};
JSONResult.success = data => {
  return {
    success: true,
    data,
  };
};
JSONResult.wrap = (err, data, ctx) => {
  ctx.body = err ? JSONResult.error(err) : JSONResult.success(data);
  ctx.status = 200;
};
module.exports = JSONResult;
