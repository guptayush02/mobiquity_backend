const req = {
  signup: {
    success_body: {
      name: "admin",
      email: "admin1@admin.com",
      password: "qwerty@123"
    },
    missing_params: {
      name: "",
      email: "",
      password: ""
    },
    user_already_exists: {
      name: "admin",
      email: "admin@admin.com",
      password: "qwerty@123"
    }
  },
  login : {
    success_body : {
      email: "admin@admin.com",
      password: "qwerty@123"
    },
    email_not_exists: {
      email: "admin1@admin.com",
      password: "qwerty@123"
    },
    password_not_match: {
      email: "admin1@admin.com",
      password: "qwerty@123"
    },
    params_not_exists: {
      email: "",
      password: ""
    }
  }
}

module.exports = req

