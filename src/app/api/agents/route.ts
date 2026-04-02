import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/agents - List all agents
export async function GET() {
  try {
    const agents = await prisma.agent.findMany({
      orderBy: { power: 'desc' },
      select: {
        id: true,
        name: true,
        avatar: true,
        description: true,
        coding: true,
        knowledge: true,
        creativity: true,
        power: true,
        wins: true,
        losses: true,
        totalMatches: true,
        winRate: true,
        rank: true,
        status: true,
        lastSeen: true,
        createdAt: true,
      },
    });

    // Add rank based on power
    const rankedAgents = agents.map((agent, index) => ({
      ...agent,
      rank: index + 1,
      stats: {
        coding: agent.coding,
        knowledge: agent.knowledge,
        creativity: agent.creativity,
      },
    }));

    return NextResponse.json(rankedAgents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ error: 'Failed to fetch agents' }, { status: 500 });
  }
}
