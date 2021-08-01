// const MathOlympiad = require("../models/MathOlympiad.models");

const getPC = (req, res) => {
  res.render("prog-contest/registerTeam.ejs", { error: req.flash("error") });
};

const postPC = (req, res) => {
  const { name, category, contact, email, institution, tshirt } = req.body;
  console.log(institution);
  let registrationFee = 0;
  if (category == "School") {
    registrationFee = 250;
  } else if (category == "College") {
    registrationFee = 400;
  } else {
    registrationFee = 500;
  }
  const total = registrationFee;
  const paid = 0;
  const selected = false;
  let error = "";

  MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      error = "Participant with same name and contact exists";

      req.flash("error", error);
      res.redirect("/MathOlympiad/register");
    } else {
      const participant = new MathOlympiad({
        name,
        category,
        contact,
        email,
        institution,
        paid,
        total,
        selected,
        tshirt,
      });
      participant
        .save()
        .then(() => {
          error = "Participant has been registered successfully!!";
          req.flash("error", error);
          res.redirect("/MathOlympiad/register");
        })
        .catch(() => {
          error = "Unexpected error";
          req.flash("error", error);
          res.redirect("/MathOlympiad/register");
        });
    }
  });
  //   res.render('math-olympiad/register.ejs')
};

const getPCList = (req, res) => {
  let all_participant = [];
  let error = "";
  MathOlympiad.find()
    .then((data) => {
      all_participant = data;
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error"),
        participants: all_participant,
      });
    })
    .catch(() => {
      error = "Failed to fetch participants";
      res.render("math-olympiad/list.ejs", {
        error: req.flash("error", error),
        participants: all_participant,
      });
    });
  // res.render("math-olympiad/list.ejs");
};
const deletePC = (req, res) => {
  const id = req.params.id;
  console.log("id ", id);

  let error = "";
  MathOlympiad.deleteOne({ _id: req.params.id })
    .then(() => {
      error = "";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    })
    .catch(() => {
      error = "Failed to delete data!";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
  // res.render('math-olympiad/register.ejs')
};

const paymentDonePC = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;
      participant
        .save()
        .then(() => {
          let error = "Payment completed succesfully";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
          let error = "Data could not be updated";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        });
    })
    .catch(() => {
      let error = "Data could not be updated";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
};

const getEditPC = (req, res) => {
  const id = req.params.id;
  // const tshirt=req.params.tshirt
  console.log("wd ", id, "  ");
  let info = [];
  MathOlympiad.findOne({ _id: id })
    .then((data) => {
      info = data;
      // console.log("info ", info);
      res.render("math-olympiad/editParticipant.ejs", {
        error: req.flash("error"),
        participant: info,
      });
    })
    .catch((e) => {
      console.log(e);
      error = "Failed to fetch participants";
      res.render("math-olympiad/editParticipant.ejs", {
        error: req.flash("error", error),
        participant: info,
      });
    });
};

const postEditPC = async (req, res) => {
  const { name, contact, category, email, institution, tshirt } = req.body;

  const data = await MathOlympiad.findOneAndUpdate(
    { name: name, contact: contact },
    { category, email, institution, tshirt }
  );
  if (data) {
    console.log("findOneAndUpdate ", data);
    res.redirect("/MathOlympiad/list");
  }
};
const selectPC = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true;
      participant
        .save()
        .then(() => {
          let error = "Participant has been selected succesfully";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        })
        .catch(() => {
          let error = "Data could not be updated";
          req.flash("error", error);
          res.redirect("/MathOlympiad/list");
        });
    })
    .catch(() => {
      let error = "Data could not be updated";
      req.flash("error", error);
      res.redirect("/MathOlympiad/list");
    });
};

module.exports = {
  getPC,
  postPC,
  getPCList,
  deletePC,
  paymentDonePC,
  selectPC,
  getEditPC,
  postEditPC,
};
