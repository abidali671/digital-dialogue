import { DataTable, Formula, In, Out } from "@/components/tools/ToolGuide";

const FEE_HELP = "https://support.upwork.com/hc/en-us/articles/211062538-Learn-about-the-Freelancer-Service-Fee";
const PRICING = "https://www.upwork.com/pricing/freelancer";
const PAID = "https://support.upwork.com/hc/en-us/articles/211060918-How-to-get-paid-on-Upwork";
const CLIENT = "https://www.upwork.com/pricing/client";
const PLUS = "https://support.upwork.com/hc/en-us/articles/30915724346387";
const LEGAL = "https://www.upwork.com/legal";

export default function FeeGuide() {
  return (
    <div className="fee-guide">
      <h2 className="fee-section">How to use the Upwork fee calculator</h2>
      <ol>
        <li>
          <strong>Choose hourly or fixed price.</strong> For hourly, enter your rate and the hours. For fixed price, enter the contract amount or the milestone.
        </li>
        <li>
          <strong>Enter the fee percentage on your contract.</strong> Upwork shows it on the job offer or proposal, and later in the contract details and transaction summaries. Type it in, or tap one of the quick buttons (0%, 5%, 10% or 15%). The example starts at 10% because that is a common value.
        </li>
        <li>
          <strong>Add withdrawal or transfer costs (optional).</strong> Open “Add withdrawal or transfer costs” and enter a flat amount per withdrawal (for example $0.99 for Direct to Local Bank), a percentage your bank or payment provider charges, or both.
        </li>
        <li>
          <strong>Pick a currency (optional).</strong> For PKR, keep entering amounts in US dollars (USD), then enter the exchange rate you get. The field shows the State Bank of Pakistan (SBP) weighted average and its date as a reference. Until you enter a rate, results stay in USD. Other currencies only change the symbol and number format.
        </li>
        <li>
          <strong>Read the result.</strong> You see the amount billed, the service fee, your additional costs, the effective deduction as a percentage, and what you keep.
        </li>
      </ol>

      <h2 className="fee-section">How the Upwork fee is calculated</h2>
      <p>
        Upwork takes its fee from each payment you receive on a contract. That includes hourly payments, fixed-price milestones and bonuses. For a longer explanation, see{" "}
        <In href="/blogs/freelancing/upwork-fees-how-much-do-freelancers-earn">how Upwork fees work</In>.
      </p>
      <Formula>{`Upwork fee      = amount billed × fee %
After the fee   = amount billed − Upwork fee
Take-home pay   = after the fee − withdrawal and other costs`}</Formula>
      <p>
        <strong>Working backwards: what to charge for a target take-home.</strong> The calculator works forwards, from what you bill to what you keep. To work backwards by hand, divide the amount you want to keep by what is left after the fee:
      </p>
      <Formula>{`Amount to bill = (take-home you want + fixed withdrawal cost) ÷ (1 − fee %)`}</Formula>
      <p>
        Dividing is not the same as adding the percentage. Adding 10% to $500 gives $550, but 10% of $550 is $55, which leaves you $495. Dividing $500 by 0.90 gives $555.56, which leaves exactly $500.
      </p>
      <p>
        Upwork uses the same idea in its own example. To earn $20 an hour at a 10% fee, you would charge $22.22. Upwork rounds to the nearest cent, so the final numbers can be a cent or two off.
      </p>
      <p>
        For an hourly rate that covers a monthly income goal, the{" "}
        <In href="/tools/freelance-rate-calculator">freelance rate calculator</In> does this sum for you.
      </p>

      <h2 className="fee-section">Worked examples</h2>
      <p>The numbers below are made up to show the method. They are not real client contracts.</p>
      <h3>Example 1: hourly contract, 10% fee, local bank withdrawal</h3>
      <DataTable
        numeric
        caption="Hourly contract at 10% with a local bank withdrawal"
        columns={["Step", "Amount"]}
        rows={[
          ["20 hours × $30 an hour", "$600.00"],
          ["Upwork fee (10%)", "−$60.00"],
          ["After the fee", "$540.00"],
          ["Direct to Local Bank fee", "−$0.99"],
          ["Take-home", "$539.01"],
          ["Total deduction", "10.17%"],
        ]}
      />
      <h3>Example 2: fixed-price contract, 15% fee, three ways to withdraw</h3>
      <p>
        A $1,200 fixed-price contract at a 15% fee leaves $1,020.00 after the fee ($180 fee). What you keep then depends on how you withdraw it:
      </p>
      <DataTable
        numeric
        caption="Take-home from a $1,200 contract at 15% by withdrawal method"
        columns={["Withdrawal method (fee listed by Upwork)", "Fee", "Take-home"]}
        rows={[
          ["Direct to Local Bank ($0.99)", "−$0.99", "$1,019.01"],
          ["Direct to U.S. Bank (ACH) with an international tax address ($2.99, effective 1 Sep 2026)", "−$2.99", "$1,017.01"],
          ["U.S. Dollar Wire ($50)", "−$50.00", "$970.00"],
        ]}
      />
      <p>
        To try each one, enter the fee as the flat amount in the calculator. These fees are per withdrawal, not a percentage. So a few larger withdrawals usually cost less than many small ones. At $1,020, the $50 wire takes 4.9% of the payment.
      </p>
      <h3>Example 3: working backwards</h3>
      <p>You want to keep $500 from a fixed-price job. The fee on the offer is 12%, and you pay $0.99 to withdraw.</p>
      <ul>
        <li>Amount to bill = ($500 + $0.99) ÷ 0.88 = <strong>$569.31</strong></li>
        <li>Check: the 12% fee is $68.32, which leaves $500.99. Take away $0.99 and you keep $500.00.</li>
      </ul>
      <h3>Example 4: take-home in PKR</h3>
      <p>
        Take Example 1’s $539.01 at an example rate of 280 PKR per USD: $539.01 × 280 = <strong>Rs 150,922.80</strong>. The 280 rate is made up for this example. In the calculator, enter the rate your bank or wallet actually gives you. The SBP weighted average and its date are shown next to the field as a reference. Upwork’s User Agreement says that if you withdraw in a currency other than USD, a currency conversion charge applies, and your bank may give a better rate.
      </p>

      <h2 className="fee-section">How much Upwork takes on $1,000</h2>
      <DataTable
        numeric
        caption="Upwork fee and amount to bill on $1,000"
        columns={["Fee on your contract", "Upwork fee", "You get (before withdrawal)", "To keep $1,000, bill"]}
        rows={[
          ["0%", "$0", "$1,000.00", "$1,000.00"],
          ["5%", "$50", "$950.00", "$1,052.63"],
          ["10%", "$100", "$900.00", "$1,111.11"],
          ["15%", "$150", "$850.00", "$1,176.47"],
        ]}
      />

      <h2 className="fee-section">Upwork fees by contract type</h2>
      <DataTable
        caption="Freelancer fee by contract type"
        columns={["Contract type", "Freelancer fee (official)"]}
        rows={[
          ["Marketplace contracts (jobs you find on Upwork)", "0%–15%, set per contract. Locked when the proposal, offer or contract is sent."],
          ["Direct Contracts (clients you bring yourself)", "Reduced fee. The pricing page lists 5% on Basic and 0% on Freelancer Plus."],
          ["Any Hire", "0%"],
          ["Upwork Payroll", "0%"],
          ["Enterprise clients", "Typically 10%, but can be customised"],
        ]}
      />
      <p>
        Upwork used to charge a flat 10%. New contracts now have a variable fee of 0%–15% (Upwork made the change in 2025). Each contract keeps the fee that was locked when it was sent.
      </p>

      <h2 className="fee-section">Fees the client pays (not taken from your pay)</h2>
      <p>
        Clients pay their own fees on top of your rate. These do not reduce your take-home, but they do change the client’s total cost. See{" "}
        <In href="/blogs/freelancing/how-much-does-upwork-cost-fees-for-freelancers-and-clients">what Upwork costs freelancers and clients</In>.
      </p>
      <ul>
        <li>
          <strong>Contract Initiation Fee:</strong> a one-time $0.99 to $14.99 for each new contract.
        </li>
        <li>
          <strong>Marketplace fee:</strong> clients pay a marketplace fee of about 5% to 10%, depending on their plan. Upwork’s{" "}
          <Out href={CLIENT}>client pricing page</Out> lists 5% on the Basic plan, and <Out href={PLUS}>Business Plus</Out> is 10%. Eligible U.S. bank payments can be lower. The client sees the exact amount at checkout.
        </li>
      </ul>

      <h2 className="fee-section">Other things that change what you keep</h2>
      <ul>
        <li>
          <strong>Refunds:</strong> if you refund a client, Upwork also refunds its fee on that amount. For example, a $100 refund on a 10% contract costs you $90, not $100.
        </li>
        <li>
          <strong>When you can withdraw:</strong> hourly earnings are usually available 10 days after the billing week ends, and fixed-price payments 5 days after the client approves them. A new withdrawal method takes 3 days to become active.
        </li>
        <li>
          <strong>Your bank and wallet:</strong> PayPal, Payoneer, local banks and mobile wallets may charge their own fees or use their own exchange rate. Upwork doesn’t list a fixed fee for PayPal or Payoneer on its “How to get paid” page, so check with them directly.
        </li>
        <li>
          <strong>Freelancer Plus:</strong> costs $19.99 a month. Upwork’s pricing page does not list a lower fee for marketplace contracts on this plan. What it changes is the Direct Contracts fee (0% instead of 5%), and it includes 100 Connects a month.
        </li>
        <li>
          <strong>Tax:</strong> the calculator does not include income tax. Your tax depends on where you live. Upwork says its fees may count as deductible business expenses. Ask a tax adviser in your country.
        </li>
      </ul>

      <h2 className="fee-section">Tips to keep more of each contract</h2>
      <ol>
        <li>
          <strong>Check the fee before you apply.</strong> It is shown on the offer or proposal and locked once it is sent, so compare it with your expected margin.
        </li>
        <li>
          <strong>Price from take-home, not from the rate.</strong> Decide what you want to keep, then use the backwards formula above. See{" "}
          <In href="/blogs/freelancing/how-much-to-charge-for-a-website-as-a-freelancer">how much to charge for a website</In>.
        </li>
        <li>
          <strong>Withdraw in fewer, larger amounts</strong> when your method has a flat fee.
        </li>
        <li>
          <strong>Compare exchange rates, not just fees.</strong> A low transfer fee can still cost more if the exchange rate is poor.
        </li>
        <li>
          <strong>Bring repeat clients through Direct Contracts.</strong> The fee is lower there: 5% on Basic, 0% on Freelancer Plus.
        </li>
        <li>
          <strong>Count Connects as a cost too.</strong> The <In href="/tools/upwork-connects-calculator">Upwork Connects calculator</In> shows what each contract costs you to win. See also{" "}
          <In href="/blogs/freelancing/upwork-connects-when-a-job-is-worth-the-cost">when a job is worth the Connects</In>.
        </li>
      </ol>

      <h2 className="fee-section">Sources</h2>
      <p className="fee-sources">
        <strong>Fees checked 29 Oct 2026</strong> against Upwork’s own pages: <Out href={FEE_HELP}>Freelancer Service Fee</Out>
        {" · "}
        <Out href={PRICING}>Freelancer pricing</Out>
        {" · "}
        <Out href={PAID}>How to get paid</Out>
        {" · "}
        <Out href={CLIENT}>Client pricing</Out>
        {" · "}
        <Out href={PLUS}>Business Plus fees</Out>
        {" · "}
        <Out href={LEGAL}>User Agreement</Out>. Upwork can change fees at any time, so check your contract.
      </p>
    </div>
  );
}
