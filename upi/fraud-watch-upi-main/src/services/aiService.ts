import { pipeline } from "@huggingface/transformers";
import { AI_CONFIG } from "../config/aiConfig";

let textClassifier: any = null;
let modelLoaded = false;
let modelLoadingError = false;

export async function initializeAI() {
  if (modelLoaded || modelLoadingError) return;
  
  try {
    // Set the API token globally for all HF requests
    // This is the proper way to set the API key for the @huggingface/transformers package
    if (AI_CONFIG.API_KEY) {
      // @ts-ignore - We're using the internal API which might not be properly typed
      globalThis.HF_TOKEN = AI_CONFIG.API_KEY;
    }
    
    textClassifier = await pipeline(
      "text-classification",
      AI_CONFIG.MODEL_NAME
      // Remove the unsupported waitForModel option
    );
    console.log("AI model loaded successfully");
    modelLoaded = true;
    modelLoadingError = false;
  } catch (error) {
    console.error("Error loading AI model:", error);
    modelLoadingError = true;
    modelLoaded = false;
  }
}

export async function analyzeText(text: string) {
  try {
    if (!modelLoaded && !modelLoadingError) {
      await initializeAI();
    }
    
    if (modelLoadingError || !textClassifier) {
      console.log("Using fallback pattern matching for analysis");
      return analyzeFallback(text);
    }
    
    const result = await textClassifier(text, {
      max_length: 512,
      truncation: true
    });
    
    // Enhanced fraud detection with confidence threshold
    const isSuspicious = result[0].score > 0.6;
    console.log(`AI Analysis result for "${text}":`, result);
    return isSuspicious;
  } catch (error) {
    console.error("Error analyzing text:", error);
    return analyzeFallback(text);
  }
}

function analyzeFallback(text: string): boolean {
  const suspiciousPatterns = [
    /scam|fake|fraud|invalid|bogus|phishing/i,
    /test\d*|dummy|random\d+/i,
    /[0-9]{6,}/,  // Suspicious number sequences
    /free|winner|lucky|gift/i,
    /urgent|emergency|immediate/i
  ];
  
  return suspiciousPatterns.some(pattern => pattern.test(text));
}

export async function getChatResponse(message: string): Promise<string> {
  try {
    if (!modelLoaded && !modelLoadingError) {
      await initializeAI();
    }

    // Check for mathematical expressions first
    const mathMatch = message.match(/(\d+)\s*[+\-*/]\s*(\d+)/);
    if (mathMatch) {
      return calculateMath(message);
    }

    if (modelLoadingError || !textClassifier) {
      return getFallbackResponse(message);
    }

    const result = await textClassifier(message, {
      max_length: 512,
      truncation: true
    });

    console.log("AI Response for:", message, "Result:", result);

    // Generate a contextual response based on the message content
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('upi') || lowerMessage.includes('payment')) {
      return "For safe UPI transactions: 1) Verify recipient's ID 2) Never share OTP/PIN 3) Check transaction amount carefully 4) Use official apps only.";
    }
    
    if (lowerMessage.includes('fraud') || lowerMessage.includes('scam')) {
      return "To avoid fraud: 1) Don't click suspicious links 2) Verify payment requests 3) Never share sensitive info 4) Report suspicious activity to your bank.";
    }

    // If it's a general question about what the bot can do
    if (lowerMessage.includes('help') || lowerMessage.includes('what') || lowerMessage.includes('how')) {
      return "I can help you with: 1) UPI payment safety tips 2) Fraud prevention 3) Basic calculations 4) General banking questions. Feel free to ask anything!";
    }

    // Use the AI model's classification for more natural responses
    if (result[0].score > 0.7) {
      return generateDetailedResponse(message, result[0].label);
    }

    // Default response for other queries
    return "I understand you're asking about '" + message + "'. I'm primarily focused on helping with UPI payments, fraud prevention, and basic calculations. Could you please rephrase your question in that context?";

  } catch (error) {
    console.error("Error getting chat response:", error);
    return "I apologize, but I'm having trouble processing your request. Please try asking your question again.";
  }
}

function calculateMath(expression: string): string {
  try {
    // Remove any spaces and validate the expression
    const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
    if (!sanitizedExpression) {
      return "Please provide a valid mathematical expression.";
    }
    
    // Evaluate the expression safely
    const result = Function('"use strict";return (' + sanitizedExpression + ')')();
    return `${expression} = ${result}`;
  } catch (error) {
    return "Sorry, I couldn't calculate that. Please use simple arithmetic expressions (e.g., 2+2, 10*5).";
  }
}

function getFallbackResponse(message: string): string {
  const responses = {
    upi: "For UPI safety, always verify the recipient's ID and never share your PIN. Double-check all payment details before confirming.",
    fraud: "If you suspect fraud, immediately contact your bank and report the transaction. Don't share OTPs or sensitive information.",
    default: "I can help you with UPI payment safety and fraud prevention. Could you please be more specific about your question?"
  };

  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('upi')) return responses.upi;
  if (lowerMessage.includes('fraud') || lowerMessage.includes('scam')) return responses.fraud;
  return responses.default;
}

function generateDetailedResponse(message: string, aiLabel: string): string {
  const responses = {
    banking: "For banking related queries, always ensure you're using official banking channels and verified UPI IDs.",
    security: "Your security is important! Always verify transaction details and never share sensitive information.",
    general: "I'm here to help with any UPI or payment related questions. What specific information do you need?",
    calculation: "I can help you with basic calculations. Just type the math expression (e.g., 2+2).",
  };

  // Map AI labels to response categories
  const category = aiLabel.toLowerCase().includes('bank') ? 'banking' 
    : aiLabel.toLowerCase().includes('secure') ? 'security'
    : aiLabel.toLowerCase().includes('math') ? 'calculation'
    : 'general';

  return responses[category];
}
