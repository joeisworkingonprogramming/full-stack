const express = require("express");
const serverResponses = require("../utils/helpers/responses");
const messages = require("../config/messages");
const router = express.Router();
const { Resume } = require("../models/resume");

router.get("/resumes", (req, res) => {
  Resume.find({}, { __v: 0 })
    .then((resumes) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, resumes);
    })
    .catch((e) => {
      console.error(e);
      serverResponses.sendError(res, messages.BAD_REQUEST);
    });
});

router.get("/resumes/:id", (req, res) => {
  const id = req.params.id;
  Resume.findById(id, (err, doc) => {
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

router.post("/resumes", (req, res) => {
  const name = req.body.name;

  if (!name) {
    return serverResponses.sendError(res, {
      code: 400,
      message: "no name provided",
    });
  }
  Resume.find({ name: name }, (err, doc) => {
    if (err) {
      console.error(err);
      serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
    } else if (doc.length === 0) {
      const resume = new Resume(req.body);
      resume
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

router.delete("/resumes/:id", (req, res) => {
  const id = req.params.id;
  Resume.findById(id, (err, doc) => {
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
