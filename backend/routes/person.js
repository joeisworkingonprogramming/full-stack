const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const router = express.Router();
const { Person } = require("../models/person");

router.get("/persons", (req, res) => {
  Person.find({}, { __v: 0 })
    .then((persons) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, persons);
    })
    .catch((e) => {
      console.error(e);
      serverResponses.sendError(res, messages.BAD_REQUEST);
    });
});

router.get("/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id, (err, doc) => {
    console.log("doc", doc);
    if (err) {
      console.error(err);
      serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
    } else if (!doc) {
      serverResponses.sendError(res, messages.NOT_FOUND);
    } else {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, doc);
    }
  });
});

router.post("/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  if (!name) {
    return serverResponses.sendError(res, {
      code: 400,
      message: "no name provided",
    });
  }
  if (!number) {
    return serverResponses.sendError(res, {
      code: 400,
      message: "no number provided",
    });
  }
  Person.find({ name: name }, (err, doc) => {
    if (err) {
      console.error(err);
      serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
    } else if (doc.length === 0) {
      const person = new Person({ name, number });
      person
        .save()
        .then((result) => {
          serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
        })
        .catch((e) => {
          console.error(e);
          serverResponses.sendError(res, messages.BAD_REQUEST);
        });
    } else {
      serverResponses.sendError(res, {
        code: 400,
        message: "Bad request. Name is already existed",
        success: false,
      });
    }
  });
});

// router.put("/persons/:id", (req, res) => {
//   const id =req.params.id;
//   const body = req.body;
//   if (!body.name || !body.number) {
//     return res.status(400).json({
//       error: "invalid name or number",
//     });
//   }
//   let person = persons.find((person) => person.id === id);
//   if (!person) {
//     return res.status(404).json({
//       error: `person with id ${id} not existed`,
//     });
//   }
//   person.name = body.name;
//   person.number = body.number;
//   return res.json({
//     id,
//     name: person.name,
//     number: person.number,
//   });
// });

router.delete("/persons/:id", (req, res) => {
  const id = req.params.id;
  Person.findById(id, (err, doc) => {
    if (err) {
      console.error(err);
      serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
    } else {
      doc.delete();
      serverResponses.sendSuccess(
        res,
        {
          code: 200,
          success: true,
          message: "Delete Successfully completed",
        },
        doc
      );
    }
  });
});

module.exports = router;
