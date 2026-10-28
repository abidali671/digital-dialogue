import { DataTable, Formula, In, Out } from "@/components/tools/ToolGuide";

const FEE_HELP = "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";
const PRICING = "https://www.upwork.com/pricing/freelancer";
const FIVERR = "https://www.fiverr.com/start_selling";

export default function RateGuide() {
  return (
    <div className="fee-guide">
      <h2 className="fee-section">How to use the freelance rate calculator</h2>
      <ol>
        <li>
          <strong>Choose month or year, then enter the take-home pay you want.</strong> This is what you want left after platform fees and business costs, before tax.
        </li>
        <li>
          <strong>Enter your hours.</strong> Put in the hours you work in a week. Then enter either the hours you can bill or the billable percentage. Time spent on proposals, calls, admin and learning is work, but clients don’t pay for it.
        </li>
        <li>
          <strong>Enter the platform fee.</strong> On Upwork it is 0%–15% per contract. Use the fee you usually see, or 0% for direct clients.
        </li>
        <li>
          <strong>Open “Expenses and working weeks” (optional).</strong> Add your business expenses for the same period, for example software, internet and equipment.
        </li>
        <li>
          <strong>Set working weeks per year.</strong> If you leave it blank, the calculator uses 48, which leaves 4 weeks for holidays, illness and slow periods.
        </li>
        <li>
          <strong>Read the results:</strong> minimum hourly rate, day rate (5-day week), 10-hour project price, how much goes to fees, and what to bill each month. To see rupees, choose PKR and enter your exchange rate. Until you do, results stay in US dollars.
        </li>
      </ol>

      <h2 className="fee-section">The formula</h2>
      <Formula>{`Billable hours a month = billable hours a week × working weeks ÷ 12
Amount to bill         = (take-home + expenses) ÷ (1 − platform fee %)
Minimum hourly rate    = amount to bill ÷ billable hours a month
Day rate               = hourly rate × (billable hours a week ÷ 5)
Project price          = hourly rate × 10 hours`}</Formula>
      <p>
        <strong>Why divide by (1 − fee) instead of adding the fee?</strong> The platform takes its percentage from the full amount you bill, not from your target. At a 10% fee, adding 10% to $2,250 gives $2,475, and 10% of that is $247.50, which leaves $2,227.50, short of your target. Dividing by 0.90 gives $2,500, and 10% of $2,500 is $250, which leaves exactly $2,250.
      </p>

      <h2 className="fee-section">Worked example</h2>
      <p>These numbers are made up to show the method. They are not anyone’s real income. The table at the top of this page is a separate $1,500 example.</p>
      <DataTable
        numeric
        caption="Worked example inputs"
        columns={["Input", "Value"]}
        rows={[
          ["Take-home you want", "$2,000 a month"],
          ["Business expenses", "$250 a month"],
          ["Hours worked / billable", "40 / 24 a week (60% billable)"],
          ["Platform fee", "10%"],
          ["Working weeks", "46 a year"],
        ]}
      />
      <DataTable
        numeric
        caption="Worked example results"
        columns={["Step", "Result"]}
        rows={[
          ["Billable hours a month", "24 × 46 ÷ 12 = 92"],
          ["Amount to bill", "$2,250 ÷ 0.90 = $2,500"],
          ["Minimum hourly rate", "$2,500 ÷ 92 = $27.17"],
          ["Day rate (4.8 billable hours)", "$130.43"],
          ["10-hour project", "$271.74"],
        ]}
      />

      <h2 className="fee-section">How the platform fee changes your rate</h2>
      <p>
        Same inputs as above, only the fee changes. For how Upwork’s fee works, see{" "}
        <In href="/blogs/freelancing/upwork-fees-how-much-do-freelancers-earn">how Upwork fees work</In>.
      </p>
      <DataTable
        numeric
        caption="How the platform fee changes the minimum hourly rate"
        columns={["Fee", "Amount to bill a month", "Minimum hourly rate"]}
        rows={[
          ["0% (direct client, no platform)", "$2,250.00", "$24.46"],
          ["5%", "$2,368.42", "$25.74"],
          ["10%", "$2,500.00", "$27.17"],
          ["15% (top of Upwork’s range)", "$2,647.06", "$28.77"],
          ["20% (Fiverr’s seller fee)", "$2,812.50", "$30.57"],
        ]}
      />
      <p>
        Upwork’s 0%–15% range is from Upwork’s own pages, and Fiverr’s 20% seller fee (sellers keep 80% of each order) is from <Out href={FIVERR}>Fiverr’s selling page</Out>. Both checked 29 Oct 2026. Platforms change fees, so check before you rely on them.
      </p>

      <h2 className="fee-section">How billable hours change your rate</h2>
      <p>The same $2,250 goal at a 10% fee and 46 weeks:</p>
      <DataTable
        numeric
        caption="How billable hours change the minimum hourly rate"
        columns={["Billable hours a week", "Billable hours a month", "Minimum hourly rate"]}
        rows={[
          ["16 (40% of 40)", "61.3", "$40.76"],
          ["24 (60% of 40)", "92", "$27.17"],
          ["30 (75% of 40)", "115", "$21.74"],
        ]}
      />
      <p>Unpaid time often affects your rate more than the fee does. Be realistic about how much of your week clients actually pay for, especially when you are new.</p>

      <h2 className="fee-section">What the calculator does not include</h2>
      <ul>
        <li>
          <strong>Income tax.</strong> Tax rules depend on your country. If you know your rough tax rate, add the tax to your take-home goal, or ask a tax adviser. See{" "}
          <In href="/blogs/freelancing/accounting-vs-finance-for-freelancers">accounting vs finance for freelancers</In>.
        </li>
        <li>
          <strong>Withdrawal and exchange costs.</strong> Add your usual withdrawal fees as an expense. The <In href="/tools/upwork-fee-calculator">Upwork fee calculator</In> shows them per payment.
        </li>
        <li>
          <strong>Proposal costs.</strong> Connects you buy on Upwork are a business expense. Find your monthly figure with the <In href="/tools/upwork-connects-calculator">Upwork Connects calculator</In> and add it to expenses.
        </li>
        <li>
          <strong>What the market pays.</strong> The result is your minimum, worked out from your own costs. Compare it with rates in your niche before you set your price. See{" "}
          <In href="/blogs/freelancing/best-freelance-niches-for-beginners">best freelance niches for beginners</In> and more on{" "}
          <In href="/tags/freelance-rates">freelance rates</In>.
        </li>
      </ul>

      <h2 className="fee-section">Tips for setting your freelance rate</h2>
      <ol>
        <li>
          <strong>Start from the minimum, then price up.</strong> Never quote below the calculator’s number for long.
        </li>
        <li>
          <strong>Count every unpaid hour.</strong> Proposals, messages, revisions you don’t bill and learning all come out of your week.
        </li>
        <li>
          <strong>Keep a buffer week or two.</strong> Clients pause projects, and payments take time to clear.
        </li>
        <li>
          <strong>Quote projects by value, check them by hours.</strong> For fixed-price work, estimate the hours, multiply by your rate, then add room for changes. See{" "}
          <In href="/blogs/freelancing/how-much-to-charge-for-a-website-as-a-freelancer">how much to charge for a website as a freelancer</In>.
        </li>
        <li>
          <strong>Review your rate every few months.</strong> As your reviews and skills grow, your rate should too.
        </li>
        <li>
          <strong>Compare platforms by what you keep.</strong> A higher fee needs a higher rate for the same take-home. See{" "}
          <In href="/blogs/freelancing/which-freelance-platform-is-best-for-you">which freelance platform is best for you</In>.
        </li>
      </ol>

      <h2 className="fee-section">Sources</h2>
      <p>
        <strong>Platform fees checked 29 Oct 2026:</strong> Upwork <Out href={FEE_HELP}>Freelancer Service Fee</Out> (0%–15% per contract)
        {" · "}
        <Out href={PRICING}>Upwork freelancer pricing</Out>
        {" · "}
        Fiverr <Out href={FIVERR}>seller fee</Out> (20%). The examples use made-up numbers. Check the fee on your own contracts.
      </p>
    </div>
  );
}
