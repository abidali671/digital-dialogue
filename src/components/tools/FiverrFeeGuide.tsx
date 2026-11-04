import { Formula, In, Out } from "@/components/tools/ToolGuide";

const HOW_IT_WORKS = "https://help.fiverr.com/hc/en-us/articles/34069565843985";
const ORDER_PROCESS = "https://help.fiverr.com/hc/en-us/articles/360010639617";
const WITHDRAWALS = "https://help.fiverr.com/hc/en-us/articles/360010530058";
const EARLY_PAYOUT = "https://help.fiverr.com/hc/en-us/articles/4402267122449";

export default function FiverrFeeGuide() {
  return (
    <div className="fee-guide">
      <h2 className="fee-section">How to use the Fiverr fee calculator</h2>
      <ol>
        <li>
          <strong>Enter the Gig price.</strong> Use the package price you set. The service fee the buyer pays at checkout is added on their side and never reaches you, so leave it out.
        </li>
        <li>
          <strong>Add Gig extras or a tip (optional).</strong> Fiverr takes the same 20% from extras and tips, so both count towards the order total.
        </li>
        <li>
          <strong>Pick the clearance period.</strong> Most sellers wait 14 days after the order is marked complete. Seller Plus, Top Rated and Pro sellers wait 7. Add the completion date to see the day the money becomes available.
        </li>
        <li>
          <strong>Choose a payout method.</strong> The fee field fills in with the amount Fiverr lists for that method. Change it if your withdrawal screen shows something else.
        </li>
        <li>
          <strong>Pick a currency (optional).</strong> For PKR, keep entering amounts in US dollars, then enter the rate your bank or wallet gives you. Results stay in US dollars until you do.
        </li>
      </ol>

      <h2 className="fee-section">How the Fiverr fee is calculated</h2>
      <p>
        Fiverr keeps 20% of every order, and{" "}
        <Out href={HOW_IT_WORKS}>its help page for freelancers</Out> says the seller receives 80% of the cleared payment, including extras and tips. Levels do not change the percentage. For the full picture, including what buyers pay and how payments move, read{" "}
        <In href="/blogs/freelancing/fiverr-fees-for-sellers-what-you-keep-and-how-fiverr-payments-work-2026">Fiverr fees for sellers</In>.
      </p>
      <Formula>{`Order total     = Gig price + extras + tip
Fiverr fee      = order total × 20%
Your earnings   = order total − Fiverr fee
Amount withdrawn = your earnings − withdrawal fee`}</Formula>
      <p>
        <strong>Working backwards: what to charge for a set amount.</strong> Divide the amount you want by 0.80. To keep $50 from an order, price it at $50 ÷ 0.80 = $62.50. Adding 20% on top is not enough, because the fee is taken from the larger total. For an hourly or monthly goal, the{" "}
        <In href="/tools/freelance-rate-calculator">freelance rate calculator</In> does this sum for you.
      </p>

      <h2 className="fee-section">When the money reaches you</h2>
      <p>
        Earnings sit as pending until clearance ends, then move to your available balance. The{" "}
        <Out href={ORDER_PROCESS}>Fiverr order process page</Out> sets 14 days for most sellers and 7 for Seller Plus, Top Rated and Pro. A cancelled or disputed order can pause or reverse the payment, so treat the date as the earliest day, not a promise.
      </p>
      <p>
        After clearance, the time to reach your account depends on the method. Fiverr lists up to 24 hours for PayPal, up to 2 business days for a Payoneer account and longer for bank transfers; see{" "}
        <Out href={WITHDRAWALS}>withdrawing your earnings</Out>. Top Rated sellers and Seller Plus Premium members can use{" "}
        <Out href={EARLY_PAYOUT}>early payout</Out> for a 1% fee, which this calculator does not include. If no method is set up yet, see the steps for adding a{" "}
        <In href="/blogs/freelancing/how-to-add-a-payout-method-on-fiverr">Fiverr payout method</In>.
      </p>

      <h2 className="fee-section">What the calculator leaves out</h2>
      <ul>
        <li>Charges from PayPal, Payoneer or your bank after the money leaves Fiverr, including exchange rate margins.</li>
        <li>Income tax, which depends on where you live.</li>
        <li>Refunds, partial cancellations and order disputes.</li>
      </ul>
      <p>
        New to the platform? Start with{" "}
        <In href="/blogs/freelancing/what-is-fiverr-and-how-does-fiverr-work">how Fiverr works</In>.
      </p>
    </div>
  );
}
