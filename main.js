Vue.component("user", {
  template: "<li><a href='#'><slot></slot></a></li>",
});

var app = new Vue({
  el: "#root",

  data: {
    lastname: "",
    firstname: "",
    middlename: "",
    nickname: "",
    birthday: "",
    email: "",
    role: "",
    selected: "All",
    userSearch: "",
    active: false,
    selectedUser: -1,
    users: [
      {
        ID: 0,
        lastname: "Alfaro",
        firstname: "Bjay",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "bjay@school.edu",
        role: "teacher",
        active: false,
      },
      {
        ID: 1,
        lastname: "Bermudez",
        firstname: "Kim",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "kim@school.edu",
        role: "student",
        active: false,
      },
      {
        ID: 2,
        lastname: "Dela Fuente",
        firstname: "Lorenz",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "lorenz@school.edu",
        role: "teacher",
        active: true,
      },
      {
        ID: 3,
        lastname: "Laureles",
        firstname: "Kim",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "kim@school.edu",
        role: "student",
        active: true,
      },
      {
        ID: 4,
        lastname: "Lim",
        firstname: "Erik",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "erik@school.edu",
        role: "teacher",
        active: false,
      },
      {
        ID: 5,
        lastname: "Lleva",
        firstname: "Nicole",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "nicole@school.edu",
        role: "student",
        active: false,
      },
      {
        ID: 6,
        lastname: "Pamintuan",
        firstname: "Patricia",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "patricia@school.edu",
        role: "teacher",
        active: true,
      },
    ],

    roles: [
      {
        id: 1,
        name: "Administrator",
      },

      {
        id: 2,
        name: "Teacher",
      },

      {
        id: 3,
        name: "Student",
      },

      {
        id: 4,
        name: "Participant",
      },
    ],
  },

  methods: {
    loadValues(ID) {
      this.firstname = this.users[ID].firstname;
      this.lastname = this.users[ID].lastname;
      this.middlename = this.users[ID].middlename;
      this.nickname = this.users[ID].nickname;
      this.birthday = this.users[ID].birthday;
      this.email = this.users[ID].email;
      this.role = this.users[ID].role;
      this.active = this.users[ID].active;
      this.selectedUser = ID;
    },

    deleteUser() {
      let ID = this.selectedUser;
      this.users.splice(ID, 1);
      this.firstname = "";
      this.lastname = "";
      this.middlename = "";
      this.nickname = "";
      this.birthday = "";
      this.email = "";
      this.role = "";
      this.active = false;
      this.selectedUser = -1;
    },

    saveChanges() {
      let ID = this.selectedUser;
      this.users[ID].firstname = this.firstname;
      this.users[ID].lastname = this.lastname;
      this.users[ID].middlename = this.middlename;
      this.users[ID].nickname = this.nickname;
      this.users[ID].birthday = this.birthday;
      this.users[ID].email = this.email;
      this.users[ID].role = this.role;
      this.users[ID].active = this.active;
    },

    addUser() {
      this.users.push({
        ID: this.users.length,
        lastname: "New User",
        firstname: "",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "",
        role: "",
        active: false,
      });
    },
  },

  computed: {
    isDuplicate() {
      if (this.selectedUser > 0) {
        let count = 0;
        for (i = 0; i < this.users.length; i++) {
          if (this.email == this.users[i].email) {
            count++;
          }
        }
        if (count > 1) {
          return "Email already taken!";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },

    isActive() {
      if (this.selectedUser < 0) {
        return "";
      } else {
        let ID = this.selectedUser;
        if (this.users[ID].active == false) {
          return "This user account is inactive";
        }
      }
    },

    filteredUsers() {
      if (this.selected == "student") {
        return this.users.filter((user) => user.role == "student");
      } else if (this.selected == "teacher") {
        return this.users.filter((user) => user.role == "teacher");
      } else {
        return this.users;
      }
    },
  },
});
