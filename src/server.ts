import express from 'express';
import path from 'path';

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json());

// Add initial messages
const messages: string[] =
[
  "Hello!",
  "Welcome to the RESTful HTTP web-server!",
  "Feel free to add, edit or delete messages:)"
];

// get all messages
app.get('/api/messages', (_req, res) =>
{
  res.json(messages);
});

// add a new message
app.post('/api/messages', (req, res) =>
{
  const { message } = req.body;
  if (message)
  {
    messages.push(message);
    res.status(201).json({ message: "Message added successfully!" });
  }
  else
  {
    res.status(400).json({ error: "Message content is required!" });
  }
});

// update a selected message
app.put('/api/messages/:index', (req, res) =>
{
  const index = parseInt(req.params.index, 10);
  const { message } = req.body;

  if (message)
  {
    // Update the message at the specified index
    messages[index] = message;
    res.status(200).json({ message: "Message updated successfully!" });
  }
  else
  {
    res.status(400).json({ error: "Message content is required!" });
  }
});

// remove a message
app.delete('/api/messages/:index', (req, res) =>
{
  const index = parseInt(req.params.index, 10);
  messages.splice(index, 1);
  res.status(200).json({ message: "Message deleted successfully!" });
});

// serve index.html as the root page
app.get('/', (_req, res) =>
{
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// start the server
app.listen(port, () =>
{
  console.log(`Server running at http://localhost:${port}`);
});
