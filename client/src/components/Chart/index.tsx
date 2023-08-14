import React, { useCallback, useEffect, useRef } from "react";
import * as echarts from "echarts";

interface Props {
    options: any;
    height?: number;
}
const Chart: React.FC<Props> = ({ options, height = 300 }) => {
    const chartRef = useRef<any>(null);
    let myChart: any = useRef(null);

    const init = useCallback(() => {
        if (!chartRef?.current) return;
        if (myChart?.current) return;

        myChart.current = echarts.init(chartRef.current);
    }, [chartRef]);

    const setOptions = useCallback(options => {
        if (!myChart?.current) return;
        myChart.current.setOption(options);
    }, []);

    useEffect(() => {
        init();
        return () => {
            myChart.current = null;
        };
    }, [init]);

    useEffect(() => {
        setOptions(options);
    }, [setOptions, options]);
    return <div ref={chartRef} style={{ height }}></div>;
};
export default Chart;
