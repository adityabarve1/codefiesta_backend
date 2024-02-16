const jwt = require('jsonwebtoken'); 
const Player = require('../models/player'); 
const { getQuestions } = require('../data/question'); 
 
// Secret key for JWT 
const secretKey = 'your_secret_key'; 
 
// Fetch questions 
exports.getQuestions = (req, res) => { 
    try { 
        const questions = getQuestions().map(question => ({
            id:question.id,
            question:question.question,
            code:question.code,
        })); 
        res.json({ questions }); 
    }catch (err) { 
        res.status(500).json({ error: err.message }); 
    } 
}; 
 
// Submit answers and check sequence 
exports.submitAnswers = async (req, res) => { 
  try { 
    const playerId = req.playerId; 
    const { answers } = req.body; 
     
    // Get questions to check against answers 
    const questions = getQuestions(); 
 
    // Logic to check if the answers are in the correct sequence 
    const isCorrectSequence = questions.every((question, index) => { 
      return question.answer.toString() === answers[index]; 
    }); 
 
    // Update player's answers and calculate duration 
    const player = await Player.findById(playerId); 
    if (!player) { 
      return res.status(404).json({ error: 'Player not found' }); 
    } 
 
    player.answers = answers; 
    player.submittedAt = new Date(); 
    player.duration = Math.round((player.submittedAt - player.startTime) / 1000); // Duration in seconds 
    await player.save(); 
 
    res.json({ isCorrectSequence }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  } 
}; 
 
// Start the game 
exports.startGame = async (req, res) => { 
  try { 
    const { email } = req.body; 
    const player = await Player.create({ email, startTime: new Date() }); 
 
    // Create JWT token 
    const token = jwt.sign({ playerId: player._id }, secretKey, { expiresIn: '7m' }); // Expires in 7 minutes 
 
    res.cookie('jwt_token', token, { httpOnly: true }); 
    res.status(201).json({ playerId: player._id }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  } 
}; 
 
// Manually submit answers 
exports.manualSubmit = async (req, res) => { 
  try { 
    const playerId = req.playerId; 
    const { answers } = req.body; 
     
    // Update player's answers 
    const player = await Player.findById(playerId); 
    if (!player) { 
      return res.status(404).json({ error: 'Player not found' }); 
    } 
 
    player.answers = answers; 
    player.submittedAt = new Date(); 
    player.duration = Math.round((player.submittedAt - player.startTime) / 1000); // Duration in seconds 
    await player.save(); 
 
    res.json({ message: 'Answers submitted successfully' }); 
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  } 
};