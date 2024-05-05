import React from 'react';

interface Props {
  percent: number;
}
const PriceChange: React.FC<Props> = (props) => {
  const { percent } = props;
  const newPercent = percent.toString().match(/\d*\.[0]*\d{2}/);
  if (percent > 0) {
    return (
      <div className="flex bg-[#1abc9c1a] px-1">
        <span className="text-[#1abc9cb3]">+{newPercent}%</span>
      </div>
    );
  }
  return (
    <div className="flex bg-[#da493f14] px-1">
      <span className="text-[#da493f]">{newPercent}%</span>
    </div>
  );
};
export default PriceChange;
