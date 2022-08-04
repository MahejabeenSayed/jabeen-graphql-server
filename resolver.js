const db = require("./db");

const Query = {
  students: () => db.students.list(),
  //resolver function for studentbyId
  studentById: (root, args, context, info) => {
    //args will contain parameter passed in query
    return db.students.get(args.id);
  },
  colleges: () => db.colleges.list(),
};

const Mutation = {
  createStudent: (root, args, context, info) => {
    const { collegeId, firstName, lastName, email } = args.studentData;
    const id = db.students.create({
      collegeId: collegeId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    return db.students.get(id);
  },
  createStudent_validation: (root, args, context, info) => {
    const { collegeId, firstName, lastName, email } = args.input;

    const emailExpression =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValidated = emailExpression.test(
      String(email).toLocaleLowerCase()
    );
    if (!emailValidated) {
      throw new Error("Invalid email id");
    }

    if (firstName.length < 5) {
      throw new Error("Atleast 5 characters required");
    }
    const id = db.students.create({
      collegeId: collegeId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    });
    // return db.students.get(id)
    return "success";
  },
};

const Student = {
  fullName: (root, args, context, info) => {
    return root.firstName + " " + root.lastName;
  },
  college: (root) => {
    return db.college.get(root.collegeId);
  },
};

module.exports = { Query, Mutation, Student };
