router.route("/insertdata").post(function(req, res) {
  book.insertMany(
      [
        { name: "Manoj" },
        { email: "manoj@gmail.com" },
        { password: "1234" },
        { name: "Ajay" },
        { email: "ajay@gmail.com" },
        { password: "134234" },
        { name: "Sumit" },
        { email: "sumit@gmail.com" },
        { password: "23323" }
      ],
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  });