export type Ratio = { value: number | null; reason: string | null };

export type ConnectsInput = {
  costPerConnect: number;
  connectsPerProposal: number;
  proposals: number;
  replies: number;
  interviews: number;
  contracts: number;
  otherCosts: number;
};

export type ConnectsPair = { connects: Ratio; total: Ratio };

export type ConnectsResult = {
  totalConnects: number;
  spend: number;
  other: number;
  total: number;
  rates: { reply: Ratio; interview: Ratio; contract: Ratio };
  steps: { reply: Ratio; interview: Ratio; contract: Ratio };
  perProposal: ConnectsPair;
  perReply: ConnectsPair;
  perInterview: ConnectsPair;
  perContract: ConnectsPair;
  funnel: { label: string; count: number; share: number | null }[];
};

const REASONS = {
  proposal: "Add at least 1 proposal.",
  reply: "Add at least 1 client reply.",
  interview: "Add at least 1 interview.",
  contract: "Add at least 1 contract.",
};

function ratio(num: number, den: number, reason: string): Ratio {
  return den > 0 ? { value: num / den, reason: null } : { value: null, reason };
}

function percent(num: number, den: number, reason: string): Ratio {
  const result = ratio(num, den, reason);
  return result.value == null ? result : { value: result.value * 100, reason: null };
}

export function computeConnects(input: ConnectsInput): { value: ConnectsResult | null; reason: string | null } {
  const numbers = [
    input.costPerConnect,
    input.connectsPerProposal,
    input.proposals,
    input.replies,
    input.interviews,
    input.contracts,
    input.otherCosts,
  ];
  if (!numbers.every((n) => Number.isFinite(n) && n >= 0)) {
    return { value: null, reason: "Enter a valid number in every required field." };
  }

  const totalConnects = input.connectsPerProposal * input.proposals;
  const spend = totalConnects * input.costPerConnect;
  const other = input.otherCosts;
  const total = spend + other;
  const per = (den: number, reason: string): ConnectsPair => ({
    connects: ratio(spend, den, reason),
    total: ratio(total, den, reason),
  });

  return {
    value: {
      totalConnects,
      spend,
      other,
      total,
      rates: {
        reply: percent(input.replies, input.proposals, REASONS.proposal),
        interview: percent(input.interviews, input.proposals, REASONS.proposal),
        contract: percent(input.contracts, input.proposals, REASONS.proposal),
      },
      steps: {
        reply: percent(input.replies, input.proposals, REASONS.proposal),
        interview: percent(input.interviews, input.replies, REASONS.reply),
        contract: percent(input.contracts, input.interviews, REASONS.interview),
      },
      perProposal: per(input.proposals, REASONS.proposal),
      perReply: per(input.replies, REASONS.reply),
      perInterview: per(input.interviews, REASONS.interview),
      perContract: per(input.contracts, REASONS.contract),
      funnel: [
        ["Proposals", input.proposals],
        ["Client replies", input.replies],
        ["Interviews", input.interviews],
        ["Contracts won", input.contracts],
      ].map(([label, count]) => ({
        label: String(label),
        count: Number(count),
        share: input.proposals > 0 ? Math.min(100, (Number(count) / input.proposals) * 100) : null,
      })),
    },
    reason: null,
  };
}
