db.createUser({
  user: "admin",
  pwd: "pass",
  roles: [
    {
      role: "readWrite",
      db: "unicode",
    },
  ],
});
db.createCollection("test"); //MongoDB creates the database when you first store data in that database
