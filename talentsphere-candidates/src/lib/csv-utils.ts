export interface Competency {
  id: number;
  name: string;
  description: string;
  sampleQuestions?: string[];
  questionTime?: number;
}

export async function loadCompetencies(): Promise<Competency[]> {
  try {
    // In a real application, you would fetch this from an API or file system
    // For now, we'll return the data directly since we can't easily read CSV in browser
    const competencies: Competency[] = [
      { id: 1, name: 'Analytical Thinking', description: 'The ability to systematically examine information, identify patterns and relationships, and draw logical conclusions using data-driven approaches and analytical tools' },
      { id: 2, name: 'Conceptual Thinking', description: 'The capacity to understand complex ideas, see connections between abstract concepts, and simplify complicated information into understandable frameworks' },
      { id: 3, name: 'Problem Solving', description: 'The skill of identifying issues, analyzing root causes, evaluating alternatives, and implementing effective solutions to overcome challenges' },
      { id: 4, name: 'Decision Making', description: 'The ability to assess options, weigh trade-offs, and make timely choices based on available information and sound judgment' },
      { id: 5, name: 'Learning Agility', description: 'The capacity to quickly acquire new knowledge and skills, learn from experiences, and apply insights to novel situations' },
      { id: 6, name: 'Self Awareness', description: 'The ability to understand one\'s own strengths, weaknesses, emotions, and impact on others, using this insight to improve effectiveness' },
      { id: 7, name: 'Self Development', description: 'The commitment to continuously improve one\'s capabilities through deliberate learning activities and seeking growth opportunities' },
      { id: 8, name: 'Adaptability', description: 'The flexibility to adjust approach, behavior, and priorities in response to changing circumstances and new demands' },
      { id: 9, name: 'Handling Uncertainty', description: 'The ability to remain effective and make progress despite ambiguous information, unclear direction, or unpredictable conditions' },
      { id: 10, name: 'Resilience', description: 'The capacity to recover quickly from setbacks, maintain composure under pressure, and persist through adversity' },
      { id: 11, name: 'Courage', description: 'The willingness to face difficult situations, speak truth to power, and take calculated risks despite potential negative consequences' },
      { id: 12, name: 'Trustworthiness', description: 'The consistency between words and actions that builds confidence in one\'s reliability, integrity, and ethical behavior' },
      { id: 13, name: 'Business Ethics', description: 'The understanding and application of moral principles and professional standards in business contexts to ensure ethical conduct' },
      { id: 14, name: 'Effective Communication', description: 'The ability to convey information clearly, listen actively, and facilitate meaningful dialogue across various audiences and channels' },
      { id: 15, name: 'Emotional Intelligence', description: 'The capacity to recognize, understand, and manage emotions in oneself and others to enhance relationships and performance' },
      { id: 16, name: 'Persuasion', description: 'The skill of influencing others through compelling arguments, negotiation, and finding mutually beneficial outcomes' },
      { id: 17, name: 'Interpersonal Relationship Management', description: 'The ability to build rapport, maintain positive professional relationships, and navigate social dynamics effectively' },
      { id: 18, name: 'Promoting Collaboration', description: 'The capability to foster teamwork, encourage cooperation, and create environments where people work together effectively' },
      { id: 19, name: 'Conflict Management', description: 'The skill of addressing disagreements constructively, finding common ground, and facilitating resolution between opposing viewpoints' },
      { id: 20, name: 'Developing and Empowering People', description: 'The commitment to helping others grow professionally through coaching, mentoring, and providing developmental opportunities' },
      { id: 21, name: 'Building Inclusivity', description: 'The ability to create environments where diverse perspectives are valued, respected, and leveraged for organizational benefit' },
      { id: 22, name: 'Team Building', description: 'The capability to form cohesive groups, clarify roles and goals, and develop high-performing teams' },
      { id: 23, name: 'Building Employee Engagement', description: 'The skill of creating conditions where employees feel motivated, valued, and emotionally invested in their work' },
      { id: 24, name: 'Building Networks', description: 'The ability to establish and maintain professional relationships across boundaries that provide mutual value and support' },
      { id: 25, name: 'Business Acumen', description: 'The understanding of how businesses operate, including market dynamics, competitive forces, and industry trends' },
      { id: 26, name: 'Financial Acumen', description: 'The ability to understand, analyze, and make decisions based on financial data, budgets, and economic implications' },
      { id: 27, name: 'Holistic Insights', description: 'The capacity to understand global perspectives, cultural differences, and interconnected systems affecting the organization' },
      { id: 28, name: 'Customer Orientation', description: 'The focus on understanding and meeting customer needs, anticipating expectations, and delivering superior value' },
      { id: 29, name: 'Stakeholder Management', description: 'The ability to identify, engage, and balance the needs of various internal and external constituencies' },
      { id: 30, name: 'Knowledge Management', description: 'The systematic approach to capturing, organizing, sharing, and leveraging organizational knowledge and expertise' },
      { id: 31, name: 'Change Management', description: 'The capability to guide individuals and organizations through transitions while maintaining productivity and morale' },
      { id: 32, name: 'Organizational Governance', description: 'The understanding and implementation of policies, procedures, and oversight mechanisms that ensure ethical and compliant operations' },
      { id: 33, name: 'Organizational Intelligence', description: 'The ability to navigate organizational culture, politics, and informal networks to achieve objectives effectively' },
      { id: 34, name: 'Utilizing Technology', description: 'The capacity to leverage digital tools, platforms, and emerging technologies to enhance productivity and innovation' },
      { id: 35, name: 'Risk Management', description: 'The systematic identification, assessment, and mitigation of potential threats to organizational objectives' },
      { id: 36, name: 'Crisis Management', description: 'The ability to prepare for, respond to, and lead through emergency situations that threaten organizational stability' },
      { id: 37, name: 'Driving Business Competitiveness', description: 'The focus on building and leveraging organizational capabilities that create sustainable competitive advantage' },
      { id: 38, name: 'Strategic Thinking', description: 'The ability to see the big picture, anticipate future trends, and align current actions with long-term objectives' },
      { id: 39, name: 'Initiative and Innovation', description: 'The proactive pursuit of new ideas, creative solutions, and breakthrough approaches to improve outcomes' },
      { id: 40, name: 'Inspiring and Visionary Leadership', description: 'The ability to articulate a compelling future vision and motivate others to work toward shared aspirations' },
      { id: 41, name: 'Maintaining Focus', description: 'The discipline to concentrate on priorities, minimize distractions, and sustain attention on important tasks' },
      { id: 42, name: 'Attention to Detail', description: 'The thoroughness in ensuring accuracy, completeness, and quality in all aspects of work output' },
      { id: 43, name: 'Planning and Organizing', description: 'The ability to structure activities, allocate resources, and sequence tasks to achieve objectives efficiently' },
      { id: 44, name: 'Taking Action', description: 'The bias toward initiating activity, seizing opportunities, and driving momentum rather than waiting for direction' },
      { id: 45, name: 'Managing Resources', description: 'The capability to optimize the allocation and utilization of people, budget, time, and materials' },
      { id: 46, name: 'Managing Work', description: 'The skill of coordinating tasks, monitoring progress, and ensuring successful completion of assignments' },
      { id: 47, name: 'Driving Commitment', description: 'The ability to foster accountability, ownership, and follow-through on responsibilities and promises' },
      { id: 48, name: 'Outcome-Driven', description: 'The relentless focus on achieving results and delivering value despite obstacles or competing priorities' },
      { id: 49, name: 'Process Improvement', description: 'The systematic approach to identifying inefficiencies and implementing changes that enhance productivity and quality' },
      { id: 50, name: 'Quality Orientation', description: 'The commitment to meeting and exceeding standards through continuous improvement and defect prevention' }
    ];

    return competencies;
  } catch (error) {
    console.error('Error loading competencies:', error);
    return [];
  }
}

// Function to parse CSV content (for future use when implementing actual CSV reading)
export function parseCSV(csvContent: string): Competency[] {
  const lines = csvContent.split('\n');
  const headers = lines[0].split(',');
  const competencies: Competency[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const values = line.split(',');
      if (values.length >= 4) {
        competencies.push({
          id: parseInt(values[0]),
          name: values[1],
          category: values[2],
          description: values[3]
        });
      }
    }
  }

  return competencies;
}
