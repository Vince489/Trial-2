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
        const agentConfig = factory.loadConfig('agent-4.json');
        console.log('Loaded Agent Configuration:', JSON.stringify(agentConfig, null, 2));

        // Create the agent
        const agents = factory.createAgents(agentConfig);
        const agent4 = agents['agent-4'];

        if (agent4) {
            console.log(`Agent "${agent4.name}" created successfully.`);
            console.log('Agent Description:', agent4.description);
            console.log('Agent Role:', agent4.role);
            console.log('Agent Goals:', agent4.goals);

            // Run the agent with a prompt
            console.log('\nRunning Agent 4...');
            const result = await agent4.run('Find the latest news about Kendrick Lamar.');
            console.log('\nAgent 4 Result:', result);
        } else {
            console.error('Agent "agent-4" not found in the loaded configuration.');
        }

    } catch (error) {
        console.error('Error running agent:', error);
    }
}

runAgent();
