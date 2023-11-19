const qaData = require('../data/response-arabic.json');

exports.createChat = async (req, res) => {
  const userQuery = req.body.query.toLowerCase();
  const language = req.body.language.toLowerCase();

  let botResponse;

  if (qaData[language] && qaData[language][userQuery]) {
    botResponse = qaData[language][userQuery];
  } else {
    botResponse = 'I do not have an answer to that question.';
  }

  res.json({ response: botResponse });
}