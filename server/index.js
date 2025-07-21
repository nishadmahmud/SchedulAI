const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ph-cluster.8kwdmtt.mongodb.net/?retryWrites=true&w=majority&appName=PH-Cluster`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    console.log("Connected to MongoDB");

    const db = client.db("ScheduleAi");
    const eventsCollection = db.collection("events");

    app.get("/events", async (req, res) => {
      const events = await eventsCollection.find({}).toArray();
      res.send(events);
    });

    app.post("/events", async (req, res) => {
      const event = req.body;
      
      // AI-like categorization logic
      const workKeywords = ["meeting", "project", "client", "deadline", "review"];
      const personalKeywords = ["birthday", "family", "party", "anniversary", "friend"];
      const healthKeywords = ["doctor", "appointment", "checkup", "medicine", "hospital"];
      const travelKeywords = ["flight", "hotel", "trip", "travel", "journey"];
      const financeKeywords = ["invoice", "payment", "salary", "bill", "finance"];
      const text = `${event.title} ${event.notes || ""}`.toLowerCase();
      let category = "Other";
      if (workKeywords.some((kw) => text.includes(kw))) category = "Work";
      else if (personalKeywords.some((kw) => text.includes(kw))) category = "Personal";
      else if (healthKeywords.some((kw) => text.includes(kw))) category = "Health";
      else if (travelKeywords.some((kw) => text.includes(kw))) category = "Travel";
      else if (financeKeywords.some((kw) => text.includes(kw))) category = "Finance";
      event.category = category;
      const result = await eventsCollection.insertOne(event);
      const insertedEvent = await eventsCollection.findOne({ _id: result.insertedId });
      res.send(insertedEvent);
    });

    app.put("/events/:id", async (req, res) => {
      const id = req.params.id;
      const event = req.body;
      const result = await eventsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: event }
      );
      res.send(result);
    });

    app.delete("/events/:id", async (req, res) => {
      const id = req.params.id;
      const result = await eventsCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


