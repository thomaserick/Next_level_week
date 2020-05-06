// create
exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please,fill all field");
    }

    return res.send(req.body);
  }
};

// update
exports.update = (req, res) => {};

// delete
exports.delete = (req, res) => {};
