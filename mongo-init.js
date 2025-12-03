db.createUser({
  user: "week11-user",
  pwd: "week11-pass",
  roles: [{ role: "readWrite", db: "week11" }]
});

db.createCollection("participants");

db.participants.insertOne({
  name: "Initial User",
  email: "initial@example.com",
  phone: "0900000000",
  status: "pending",
  createdAt: new Date()
});
