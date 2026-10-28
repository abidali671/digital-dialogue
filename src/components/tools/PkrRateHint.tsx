import { USD_PKR, usdPkrAsOfLabel } from "@/lib/usdPkr";

export default function PkrRateHint() {
  return (
    <>
      Enter today’s rate. Your bank’s rate may differ. Reference: the {USD_PKR.sourceName}{" "}
      weighted average is 1 USD = {USD_PKR.rate} PKR as of {usdPkrAsOfLabel()}.
    </>
  );
}
