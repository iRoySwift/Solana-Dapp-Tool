import Chart from "@/components/Chart";
import { useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

let areaChartOptions = {
    title: {
        show: false,
        text: "Unique Visitor",
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "cross",
            label: {
                backgroundColor: "#6a7985",
            },
        },
    },
    legend: {
        show: true,
        bottom: 10,
        data: ["Page Views", "Sessions"],
        itemStyle: {
            opacity: 0,
        },
    },
    toolbox: {
        show: false,
        feature: {
            saveAsImage: {},
        },
    },
    grid: {
        top: "5%",
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
    ],
    yAxis: [
        {
            type: "value",
        },
    ],
    series: [
        {
            name: "Page Views",
            type: "line",
            // stack: 'Total',
            itemStyle: {
                opacity: 0,
            },
            areaStyle: {
                opacity: 0.3,
            },
            smooth: true,
            emphasis: {
                focus: "series",
            },
            data: [31, 40, 28, 51, 42, 109, 100],
        },
        {
            name: "Sessions",
            type: "line",
            // stack: 'Total',
            itemStyle: {
                opacity: 0,
            },
            areaStyle: {
                opacity: 0.3,
            },
            smooth: true,
            emphasis: {
                focus: "series",
            },
            data: [11, 32, 45, 32, 34, 52, 41],
        },
    ],
};

interface Props {
    slot: string;
}
const UniqueVisitor: React.FC<Props> = ({ slot }) => {
    const theme = useTheme();
    const [options, setOptions] = useState(areaChartOptions);

    useEffect(() => {
        setOptions(prevState => ({
            ...prevState,
            color: [theme.palette.primary.main, theme.palette.primary[700]],
            xAxis: [
                {
                    ...prevState.xAxis[0],
                    data:
                        slot === "month"
                            ? [
                                  "Jan",
                                  "Feb",
                                  "Mar",
                                  "Apr",
                                  "May",
                                  "Jun",
                                  "Jul",
                                  "Aug",
                                  "Sep",
                                  "Oct",
                                  "Nov",
                                  "Dec",
                              ]
                            : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
            ],
            series: [
                {
                    name: "Page Views",
                    type: "line",
                    // stack: 'Total',
                    itemStyle: {
                        opacity: 0,
                    },
                    areaStyle: {
                        opacity: 0.3,
                    },
                    smooth: true,
                    emphasis: {
                        focus: "series",
                    },
                    data:
                        slot === "month"
                            ? [
                                  76, 85, 101, 98, 87, 105, 91, 114, 94, 86,
                                  115, 35,
                              ]
                            : [31, 40, 28, 51, 42, 109, 100],
                },
                {
                    name: "Sessions",
                    type: "line",
                    // stack: 'Total',
                    itemStyle: {
                        opacity: 0,
                    },
                    areaStyle: {
                        opacity: 0.3,
                    },
                    smooth: true,
                    emphasis: {
                        focus: "series",
                    },
                    data:
                        slot === "month"
                            ? [110, 60, 150, 35, 60, 36, 26, 45, 65, 52, 53, 41]
                            : [11, 32, 45, 32, 34, 52, 41],
                },
            ],
        }));
    }, [theme, slot]);

    return <Chart options={options} height={450} />;
};
export default UniqueVisitor;
