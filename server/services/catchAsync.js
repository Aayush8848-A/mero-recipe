module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.log(err);
      return res.status(500).json({
        //for development
        message: err.message,
        fullError: err,

        //for production
        //message:"something went wrong"
      });
    });
  };
};
