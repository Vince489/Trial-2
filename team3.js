import { AgentFactory } from '@virtron/agency';
import { TeamFactory } from '@virtron/agency';
import { webSearchTool } from '@virtron/agency-tools';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

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
        const teamConfig = JSON.parse(await readFile(path.join(__dirname, 'team3.json'), 'utf8'));
        const team = teamFactory.createTeamFromConfig(teamConfig, 'content-creation-team');

        // Import the Agency class
        const { Agency } = await import('@virtron/agency/Agency.js');

        // Create a real Agency object
        const agency = new Agency({
            name: 'Content Creation Agency',
            description: 'An agency for managing content creation teams and jobs.'
        });

        // Add agents to the agency
        Object.values(team.agents).forEach(agent => {
            agency.addAgent(agent.id, agent);
        });

        // Run the team with context including the real agency
        const results = await team.run({}, { agency });
        console.log('Team Results:', results);

    } catch (error) {
        console.error('Error running team:', error);
    }
}

runTeam();
