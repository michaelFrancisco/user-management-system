var store = new Vuex.Store({
  state: {
    lastname: "",
    firstname: "",
    middlename: "",
    nickname: "",
    birthday: "",
    email: "",
    role: "",
    selected: 0,
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
        role_id: 2,
        active: false,
        deleted: false,
      },
      {
        ID: 1,
        lastname: "Bermudez",
        firstname: "Kim",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "kim@school.edu",
        role_id: 1,
        active: false,
        deleted: false,
      },
      {
        ID: 2,
        lastname: "Dela Fuente",
        firstname: "Lorenz",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "lorenz@school.edu",
        role_id: 2,
        active: true,
        deleted: false,
      },
      {
        ID: 3,
        lastname: "Laureles",
        firstname: "Kim",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "kim@school.edu",
        role_id: 3,
        active: true,
        deleted: false,
      },
      {
        ID: 4,
        lastname: "Lim",
        firstname: "Erik",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "erik@school.edu",
        role_id: 4,
        active: false,
        deleted: false,
      },
      {
        ID: 5,
        lastname: "Lleva",
        firstname: "Nicole",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "nicole@school.edu",
        role_id: 2,
        active: false,
        deleted: false,
      },
      {
        ID: 6,
        lastname: "Pamintuan",
        firstname: "Patricia",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "patricia@school.edu",
        count: 0,
        role_id: 1,
        active: true,
        deleted: false,
      },
    ],

    roles: [
      {
        id: 1,
        name: "ADMINISTRATOR",
      },

      {
        id: 2,
        name: "TEACHER",
      },

      {
        id: 3,
        name: "STUDENT",
      },

      {
        id: 4,
        name: "PARTICIPANT",
      },
    ],
  },
  mutations: {
    SET_LASTNAME(state, lastname) {
      state.users[state.selectedUser].lastname = lastname;
    },
    SET_FIRSTNAME(state, firstname) {
      state.users[state.selectedUser].firstname = firstname;
    },
    SET_MIDDLENAME(state, middlename) {
      state.users[state.selectedUser].middlename = middlename;
    },
    SET_NICKNAME(state, nickname) {
      state.users[state.selectedUser].nickname = nickname;
    },
    SET_BIRTHDAY(state, birthday) {
      state.users[state.selectedUser].birthday = birthday;
    },
    SET_EMAIL(state, email) {
      state.users[state.selectedUser].email = email;
    },
    SET_ROLE(state, role) {
      state.users[state.selectedUser].role_id = role;
    },
    SET_ACTIVE(state, active) {
      state.users[state.selectedUser].active = active;
    },
    SET_SELECTED(state, selected) {
      state.selected = selected;
    },
    SET_SELECTEDUSER(state, selectedUser) {
      state.selectedUser = selectedUser;
    },
    DELETE_USER(state) {
      state.users[state.selectedUser].deleted = true;
    },
    ADD_USER(state) {
      state.users.push({
        ID: state.users.length,
        lastname: "New User",
        firstname: "",
        middlename: "",
        nickname: "",
        birthday: "",
        email: "",
        role_id: state.selected,
        active: false,
      });
    },
  },
  getters: {
    filteredUsers: (state) => {
      return state.users.filter(
        (user) => user.role_id == state.selected && !user.deleted
      );
    },
    isActive: (state) => (ID) => {
      if (ID > -1) {
        if (state.users[ID].active) return "This User is Active";
        else return "This user is Inactive";
      }
    },
  },
});

var app = new Vue({
  el: "#root",
  store: store,
  data: {
    selected: "All",
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
  },
  computed: {
    roles() {
      return this.$store.state.roles;
    },
    filteredUsers() {
      return this.$store.getters.filteredUsers;
    },
    isActive() {
      return this.$store.getters.isActive(this.selectedUser);
    },
    isDuplicate() {
      if (this.selectedUser > 0) {
        var count = 0;
        var i;
        for (i = 0; i < this.$store.state.users.length; i++) {
          if (this.email == this.$store.state.users[i].email) {
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
  },
  methods: {
    changeRoleFilter() {
      store.commit("SET_SELECTED", this.selected);
    },
    loadValues(ID) {
      this.selectedUser = ID;
      this.firstname = this.$store.state.users[ID].firstname;
      this.lastname = this.$store.state.users[ID].lastname;
      this.nickname = this.$store.state.users[ID].nickname;
      this.birthday = this.$store.state.users[ID].birthday;
      this.email = this.$store.state.users[ID].email;
      this.role =
        this.$store.state.roles[this.$store.state.users[ID].role_id].id - 1;
      this.active = this.$store.state.users[ID].active;
      store.commit("SET_SELECTEDUSER", this.selectedUser);
    },

    deleteUser() {
      let ID = this.selectedUser;
      store.commit("DELETE_USER");
      this.firstname = "";
      this.lastname = "";
      this.middlename = "";
      this.nickname = "";
      this.birthday = "";
      this.email = "";
      this.role = "";
      this.active = false;
      this.selectedUser = -1;
      store.commit("SET_SELECTEDUSER", -1);
    },

    cancelChanges() {
      var ID = this.selectedUser;
      this.firstname = this.$store.state.users[ID].firstname;
      this.lastname = this.$store.state.users[ID].lastname;
      this.middlename = this.$store.state.users[ID].middlename;
      this.nickname = this.$store.state.users[ID].nickname;
      this.birthday = this.$store.state.users[ID].birthday;
      this.email = this.$store.state.users[ID].email;
      this.role = this.$store.state.users[ID].role;
      this.active = this.$store.state.users[ID].active;
    },

    saveChanges() {
      let ID = this.selectedUser;
      store.commit("SET_FIRSTNAME", this.firstname);
      store.commit("SET_LASTNAME", this.lastname);
      store.commit("SET_MIDDLENAME", this.middlename);
      store.commit("SET_NICKNAME", this.nickname);
      store.commit("SET_BIRTHDAY", this.birthday);
      store.commit("SET_EMAIL", this.email);
      store.commit("SET_ROLE", this.role);
      store.commit("SET_ACTIVE", this.active);
    },

    addUser() {
      store.commit("ADD_USER");
    },
  },
});
