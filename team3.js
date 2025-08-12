import { AgentFactory } from '@virtron/agency';
import { TeamFactory } from '@virtron/agency';
import { webSearchTool } from '@virtron/agency-tools';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runTeam() {
    try {
        // Initialize AgentFactory
        const agentFactory = new AgentFactory({
            defaultProvider: 'gemini',
            apiKeys: {
                gemini: process.env.GEMINI_API_KEY,
            },
            baseDir: __dirname
        });

        // Register tools
        agentFactory.registerTool(webSearchTool);

        // Initialize TeamFactory
        const teamFactory = new TeamFactory({ agentFactory });

        // Load the team configuration
        const teamConfig = JSON.parse(await readFile(new URL(path.join(__dirname, 'team3.json')), 'utf8'));
        const team = teamFactory.createTeamFromConfig(teamConfig, 'content-creation-team');

        // Run the team
        const results = await team.run();
        console.log('Team Results:', results);

    } catch (error) {
        console.error('Error running team:', error);
    }
}

runTeam();
