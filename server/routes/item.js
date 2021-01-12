var express = require("express");
var router = express.Router();
const Item = require("../models/Item");

router.get("/", (req, res, next) => {
  Item.find()
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", (req, res, next) => {
  Item.findById(req.params.id)
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/burgers/{some-id}
router.patch("/:id", (req, res, next) => {
  Item.findByIdAndUpdate(req.params.id, req.body)
    .then((itemDocument) => {
      res.status(200).json(itemDocument);
      // There's a trap !
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/burgers
router.post("/", (req, res, next) => {
  // Create a burger
  Item.create(req.body)
    .then((itemDocument) => {
      res.status(201).json(itemDocument);
    })
    .catch((error) => {
      next(error);
    });
});

// http://localhost:4000/api/burgers/{some-id}
router.delete("/:id", (req, res, next) => {
  // Deletes a burger
  Item.findByIdAndDelete(req.params.id)
    .then((burgerDocument) => {
      // res.sendStatus(204)
      res.status(204).json({
        message: "Successfuly deleted !",
      });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
