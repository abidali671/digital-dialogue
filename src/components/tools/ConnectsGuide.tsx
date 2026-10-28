import { DataTable, Formula, In, Out } from "@/components/tools/ToolGuide";

const CONNECTS_HELP = "https://support.upwork.com/hc/en-us/articles/211062898-Understanding-and-using-Connects";
const PRICING = "https://www.upwork.com/pricing/freelancer";

export default function ConnectsGuide() {
  return (
    <div className="fee-guide">
      <h2 className="fee-section">How to use the Upwork Connects calculator</h2>
      <ol>
        <li>
          <strong>Enter your price per Connect.</strong> The example starts at $0.15, the price Upwork lists for extra Connects. The calculator doesn’t assume a price, so change it to what you actually pay.
        </li>
        <li>
          <strong>Enter Connects per proposal.</strong> Use the average from your recent proposals. Each job post shows how many Connects it needs, and the number can change while the job is open.
        </li>
        <li>
          <strong>Enter the number of proposals</strong> for the period you are checking, for example the last 30 days.
        </li>
        <li>
          <strong>Add your results:</strong> replies, interviews and contracts won in the same period. Use 0 if you have none yet.
        </li>
        <li>
          <strong>Add other proposal costs (optional),</strong> as one dollar amount. For example, part of your Freelancer Plus fee or tools you use for proposals.
        </li>
        <li>
          <strong>Read the results:</strong> cost per contract (the main figure), total acquisition cost, Connects used and spending, cost per contract for Connects only, cost per reply, cost per interview, and your reply rate and contract rate. To see rupees, choose PKR and enter your exchange rate. Until you do, results stay in US dollars.
        </li>
      </ol>
      <p>
        New to Upwork? Read <In href="/blogs/freelancing/upwork-for-beginners-what-to-do-before-the-first-proposals">what to do before your first proposals</In>.
      </p>

      <h2 className="fee-section">How the calculator works</h2>
      <Formula>{`Connects used     = Connects per proposal × proposals
Connects spend    = Connects used × price per Connect
Total spend       = Connects spend + other costs
Cost per contract = total spend ÷ contracts won
Reply rate        = replies ÷ proposals
Contract rate     = contracts ÷ proposals`}</Formula>
      <p>
        Cost per reply and cost per interview work the same way: divide the total spend by the number of replies or interviews. Cost per contract is shown twice, with other costs (the main figure) and for Connects only.
      </p>

      <h2 className="fee-section">Worked example</h2>
      <p>These numbers are made up to show the method. They are not anyone’s real results. The table at the top of this page is a separate 40-proposal example.</p>
      <DataTable
        numeric
        caption="Worked example inputs"
        columns={["Input", "Value"]}
        rows={[
          ["Proposals sent", "30"],
          ["Average Connects per proposal", "16"],
          ["Price per Connect", "$0.15"],
          ["Replies / interviews / contracts", "6 / 3 / 1"],
        ]}
      />
      <DataTable
        numeric
        caption="Worked example results"
        columns={["Result", "Value"]}
        rows={[
          ["Connects used", "480"],
          ["Connects spend", "$72.00"],
          ["Cost per reply", "$12.00"],
          ["Cost per interview", "$24.00"],
          ["Cost per contract", "$72.00"],
          ["Reply rate", "20%"],
          ["Contract rate", "3.3%"],
        ]}
      />
      <p>
        <strong>Is $72 a contract a lot?</strong> Compare it with what the contract pays you. If the contract leaves you $450 after the Upwork fee, the Connects took 16% of it. A long-term client who comes back makes that cost much smaller. A one-off $100 job does not. Use the{" "}
        <In href="/tools/upwork-fee-calculator">Upwork fee calculator</In> to get the after-fee number first.
      </p>
      <p>
        <strong>Same spend in PKR:</strong> at an example rate of 280 PKR per USD, $72 is Rs 20,160. The 280 rate is made up. In the calculator, enter your own rate. The State Bank of Pakistan (SBP) weighted average and its date are shown next to the field as a reference. Upwork charges Connects in US dollars, so the rupee amount you pay depends on your card or bank’s exchange rate and charges.
      </p>

      <h2 className="fee-section">Buying Connects vs Freelancer Plus</h2>
      <DataTable
        caption="Buying Connects compared with Freelancer Plus and the Basic plan"
        columns={["Option", "What you get", "Cost per Connect (simple maths)"]}
        rows={[
          ["Buy extra Connects", "Sold in bundles at $0.15 each", "$0.15"],
          ["Freelancer Plus", "100 Connects a month plus other features, $19.99 a month", "about $0.20 if you only count the Connects"],
          ["Basic plan", "Upwork’s pricing page lists 0 monthly Connects, with up to 10 a month for completing certain tasks", "$0 for those, but only a few"],
        ]}
      />
      <p>
        Freelancer Plus is not just Connects. It also includes a 0% Direct Contracts fee, proposal insights and other features, so the “cost per Connect” line is only part of the picture. Upwork’s pages currently disagree on Basic: the pricing page says 0 monthly Connects, while another Upwork page says Basic “may include 10 Connects per month”. Check your own account.
      </p>

      <h2 className="fee-section">When Connects come back (and when they don’t)</h2>
      <p>Upwork gives Connects back, as Connects and not as cash, when:</p>
      <ul>
        <li>the client cancels the job before hiring anyone (expired posts don’t count), or</li>
        <li>Upwork removes the job post.</li>
      </ul>
      <p>You do not get them back when your proposal is declined, the client hires someone else, the job expires, or you withdraw your proposal.</p>

      <h2 className="fee-section">Ways to get free Connects</h2>
      <p>Upwork lists several, and some depend on your account:</p>
      <ul>
        <li>a one-time bonus for new users (Upwork lists 50),</li>
        <li>tasks during onboarding and profile set-up,</li>
        <li>earning certain badges (up to 90 Connects in total),</li>
        <li>Connects for some interviews with established clients,</li>
        <li>10 Connects for your first successful boost,</li>
        <li>a reward Upwork is testing: 12 Connects for sending 3 or more proposals that use 54 or more Connects, up to twice a month.</li>
      </ul>

      <h2 className="fee-section">Tips to lower your cost per contract</h2>
      <ol>
        <li>
          <strong>Track your numbers for a month</strong> before you change anything. One good or bad week tells you very little.
        </li>
        <li>
          <strong>Apply where you fit closely.</strong> A high-Connect job is worth it when you match the brief well. See{" "}
          <In href="/blogs/freelancing/upwork-connects-when-a-job-is-worth-the-cost">when an Upwork job is worth the Connects</In>. Web developers can also read{" "}
          <In href="/blogs/freelancing/how-to-choose-upwork-jobs-as-a-web-developer">how to choose Upwork jobs as a web developer</In>.
        </li>
        <li>
          <strong>Fix replies before volume.</strong> If your reply rate is low, a better first two lines in your proposal helps more than sending more. See{" "}
          <In href="/blogs/freelancing/how-to-write-an-upwork-proposal-that-wins-jobs">how to write an Upwork proposal that wins jobs</In> and an{" "}
          <In href="/blogs/freelancing/upwork-proposal-template-for-a-website-project">Upwork proposal template for a website project</In>.
        </li>
        <li>
          <strong>Boost only with a reason.</strong> A boost uses extra Connects. Add them to your average Connects per proposal and see if your interview count changes.
        </li>
        <li>
          <strong>Follow up with past clients.</strong> Repeat work costs no Connects. See{" "}
          <In href="/blogs/freelancing/customer-follow-up-get-the-next-job-from-the-same-upwork-client">how to get the next job from the same Upwork client</In>.
        </li>
      </ol>

      <h2 className="fee-section">Sources</h2>
      <p>
        <strong>Checked 29 Oct 2026</strong> against Upwork’s own pages: <Out href={CONNECTS_HELP}>Understanding and using Connects</Out>
        {" · "}
        <Out href={PRICING}>Freelancer pricing</Out>. Upwork changes Connects rules from time to time, so check your account.
      </p>
    </div>
  );
}
