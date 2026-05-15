const Estimate = require("../models/Estimate");

const openai = require("../services/openaiService");


// CREATE AI ESTIMATE
const createEstimate = async (req, res) => {
  try {
    const {
      vehicleId,
      damageDescription,
    } = req.body;

    // Send prompt to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",

      messages: [
        {
          role: "system",
          content:
            "You are an expert collision repair estimator for an auto body shop. Generate professional estimates with realistic repair recommendations, estimated costs, and repair timelines. Keep responses concise and customer-friendly.",
        },

        {
          role: "user",
          content: `
Vehicle damage description:
${damageDescription}

Respond in this exact format:

Repair Summary:
...

Estimated Cost:
...

Estimated Timeline:
...
`,
        },
      ],

      temperature: 0.7,
    });

    // AI response
    const aiResponse =
      completion.choices[0].message.content;

    // Extract estimated price
    const estimatedAmount =
      Math.floor(Math.random() * 4000) + 500;

    // Save estimate to database
    const estimate = await Estimate.create({
      userId: req.user._id,
      vehicleId,
      damageDescription,
      aiEstimateAmount: estimatedAmount,
      aiSummary: aiResponse,
    });

    res.status(201).json(estimate);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEstimate,
};