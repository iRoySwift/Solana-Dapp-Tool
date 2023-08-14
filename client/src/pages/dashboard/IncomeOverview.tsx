import Chart from "@/components/Chart";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

let areaChartOptions = {
    title: {
        show: false,
        text: "Income Overview",
    },
    tooltip: {
        show: true,
    },
    grid: {
        top: "5%",
        left: "-2%",
        right: "2%",
        bottom: "5%",
        containLabel: true,
    },
    xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
            show: false,
        },
        axisLine: {
            show: false,
        },
    },
    yAxis: {
        show: false,
        type: "value",
    },
    series: [
        {
            data: [80, 95, 70, 42, 65, 55, 78],
            type: "bar",
            barWidth: 30,
            itemStyle: {
                borderRadius: 4,
            },
        },
    ],
};

interface Props {}
const IncomeAreaChart: React.FC<Props> = () => {
    const theme = useTheme();
    const info = theme.palette.info.light;

    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions(prevState => ({
            ...prevState,
            color: [info],
        }));
    }, [info]);

    return <Chart options={options} height={360} />;
};
export default IncomeAreaChart;
