const jwt = require('jsonwebtoken'); 
const Player = require('../models/player'); 
const Question = require('../models/questions') 
 
// Secret key for JWT 
const secretKey = 'your_secret_key'; 
 
// Fetch questions 
exports.getQuestions = async (req, res) => { 
  try { 
    const playerId = req.playerId; 
 
    // Fetch player record 
    const player = await Player.findById(playerId); 
    if (!player) { 
      return res.status(404).json({ error: 'Player not found' }); 
    } 
 
    // Get the progress index to fetch the next question 
    const progressIndex = player.progress; 
 
    // Fetch the next question 
    const question = await Question.findOne().skip(progressIndex).exec(); 
    if (!question) { 
      // No more questions, you can handle this case as needed 
      return res.json({ message: 'No more questions' }); 
    } 
 
    // Increment the progress index for the next request 
    player.progress += 1; 
    await player.save(); 
 
    res.json({ question }); 
  }catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
}; 
 
// Start the game 
exports.startGame = async (req, res) => { 
  try { 
    const { email } = req.body; 
    const player = await Player.create({ email, startTime: new Date() }); 
 
    // Create JWT token 
    const token = jwt.sign({ playerId: player._id }, secretKey, { expiresIn: '16m' }); // Expires in 16 minutes 
 
    res.cookie('jwt_token', token, { httpOnly: true }); 
    res.status(201).json({ playerId: player._id }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  } 
};
 
// Manually submit answers 
exports.submitAnswers = async (req, res) => { 
  try { 
    const playerId = req.playerId; 
    const { questionId , playerAnswers } = req.body; 
 
    // Get questions to check against answers 
    const question = await Question.findById(questionId); 
    if (!question) { 
      return res.status(404).json({ error: 'Question not found' }); 
    } 
 
    // Check if the player's answer matches the correct answer sequence 
    const isCorrect = (playerAnswer === question.answerSequence);


    // Update player's answers and store correctness 
    const player = await Player.findById(playerId); 
    if (!player) { 
      return res.status(404).json({ error: 'Player not found' }); 
    } 
 
    player.sequenceAnswers.push({
      questionId,
      correctAnswer:question.answerSequence,
      playerAnswer,
      isCorrect
    }); 
    player.submittedAt = new Date(); 
    player.duration = Math.round((player.submittedAt - player.startTime) / 1000); // Duration in seconds 
    await player.save();
 
    res.json({ message: 'Answers submitted successfully' }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  } 
};