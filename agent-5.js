import { AgentFactory } from '@virtron/agency';
import { webSearchTool } from '@virtron/agency-tools';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runAgent() {
    try {
        // Initialize AgentFactory with API keys from environment variables
        const factory = new AgentFactory({
            defaultProvider: 'gemini', // Or any other default provider you prefer
            apiKeys: {
                gemini: process.env.GEMINI_API_KEY,
                anthropic: process.env.ANTHROPIC_API_KEY,
                openai: process.env.OPENAI_API_KEY,
                groq: process.env.GROQ_API_KEY,
                openrouter: process.env.OPENROUTER_API_KEY,
                mistral: process.env.MISTRAL_API_KEY
            },
            baseDir: __dirname // Set baseDir to the current directory
        });

        // Register the webSearchTool
        factory.registerTool(webSearchTool);

        // Load agent configuration
        const agentConfig = factory.loadConfig('agent-5.json');
        console.log('Loaded Agent Configuration:', JSON.stringify(agentConfig, null, 2));

        // Create the agent
        const agents = factory.createAgents(agentConfig);
        const destinationSuggester = agents['destinationSuggester'];

        if (destinationSuggester) {
            console.log(`Agent "${destinationSuggester.name}" created successfully.`);
            console.log('Agent Description:', destinationSuggester.description);
            console.log('Agent Role:', destinationSuggester.role);
            console.log('Agent Goals:', destinationSuggester.goals);

            // Run the agent with a placeholder prompt
            const travelerPreferences = {
                travelerPreferences: {
                    numberOfTravelers: 2,
                    ages: [25, 30],
                    interests: ["hiking", "beaches"],
                    budget: "moderate",
                    tripDuration: "7 days",
                    destinationIdeas: ["Europe", "Asia"]
                }
            };

            console.log('\nRunning Destination Suggestion Agent...');
            const result = await destinationSuggester.run(JSON.stringify(travelerPreferences));
            console.log('\nAgent Result:', result);
        } else {
            console.error('Agent "destinationSuggester" not found in the loaded configuration.');
        }

    } catch (error) {
        console.error('Error running agent:', error);
    }
}

runAgent();
