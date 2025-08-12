# Team and Workflow Execution System

This project demonstrates how to run a team of agents in a specific order using a workflow configuration and the AgencyFactory.

## Overview

The system allows you to define a workflow within a team's configuration and execute that workflow using the AgencyFactory. The workflow can include both sequential and parallel job execution.

## Key Components

1. **Team Configuration**: Defined in JSON files (e.g., `team-1.json`) that specify agents, jobs, and workflows.
2. **AgencyFactory**: Creates and manages agencies with multiple teams.
3. **TeamFactory**: Creates teams from configuration objects.
4. **AgentFactory**: Creates individual agents.

## Workflow Structure

The workflow is defined as an array in the team configuration. It can include:

1. **Sequential Jobs**: Simple job IDs that execute one after another.
2. **Parallel Jobs**: Objects with a `type: "parallel"` property that execute multiple jobs concurrently.

## How to Run a Team with a Workflow

1. **Define the Team and Workflow**: Create a configuration file (e.g., `team-1.json`) that defines:
   - The agency name and description
   - The agents and their configurations
   - The jobs and their inputs
   - The workflow array that defines the execution order

2. **Create the Agency**: Use the AgencyFactory to create an agency instance from your configuration.

3. **Execute the Workflow**: Use the AgencyFactory.executeWorkflow method to run the workflow.

## Example Usage

The `team-2.js` file demonstrates how to:

1. Initialize the AgentFactory with API keys
2. Register tools
3. Create an AgencyFactory instance
4. Load the team configuration
5. Create an agency with the team
6. Execute the workflow

## Running the Example

To run the example workflow:

```bash
node team-2.js
```

## Workflow Execution Details

The AgencyFactory.executeWorkflow method:

1. Gets the team from the agency
2. Processes each step in the workflow:
   - For sequential jobs: Executes one job at a time
   - For parallel jobs: Executes multiple jobs concurrently
3. Resolves input references between jobs
4. Returns the final results

## Configuration Structure

The team configuration file should include:

- `agency`: Agency name and description
- `agents`: Agent configurations
- `team`: Team configurations including:
  - `name` and `description`
  - `agents`: List of agent IDs
  - `jobs`: Job definitions
  - `workflow`: Array defining execution order
- `brief`: Input data for the workflow

## Dependencies

- `@virtron/agency`: Core agency framework
- `@virtron/agency-tools`: Additional tools for agents
- `dotenv`: For loading environment variables
