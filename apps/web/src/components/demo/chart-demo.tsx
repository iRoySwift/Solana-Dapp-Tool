import { ChartAreaDemo } from "./chart-area-demo";
import { ChartBarDemo } from "./chart-bar-demo";
import { ChartBarMixed } from "./chart-bar-mixed";

export function ChartDemo() {
  return (
    <div className="flex w-full max-w-screen-xl flex-col flex-wrap gap-4 *:data-[slot=card]:flex-1 md:flex-row">
      <ChartAreaDemo />
      <ChartBarDemo />
      <ChartBarMixed />
    </div>
  );
}
