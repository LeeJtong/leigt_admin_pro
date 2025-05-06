import { translateFont } from "@/components/base/echarts/hooks/useFontSize";
import * as echarts from "echarts";

/**
 *
 * @param yNumbar x轴对应的y轴有几组数据
 * @param xNumbar x轴的个数
 */
export const use3DPictorialBar = (yNumbar:number,xNumbar:number,rotate:number = 20) =>{
    console.log('yNumbar',yNumbar,xNumbar);
    const symbolWidth = yNumbar < 4 ? 20 : (1 / yNumbar * 100) - 5
    const symbolHeight = 10 / xNumbar * translateFont(7)
    const symbolRotate = - translateFont(rotate)
    return {
        symbolWidth,
        symbolHeight,
        symbolRotate
    }
}



type Series3DBarData  = {
    name:string
    data:number[] | string[]
    itemStyle:{
        color:string
    },
    [key: string]:any
}
/**
 * 3D柱状图的series
 * @param seriesData  格式化后的数据
 * @param currTotal 当前页条数
 * @param rotate 角度
 */
export const useSeries3DBarOption = (seriesData: Series3DBarData[],currTotal:number,rotate = 12): any => {
    let results: any = [];
    const {symbolWidth,symbolHeight,symbolRotate} = use3DPictorialBar(seriesData.length, currTotal,rotate)
    for (let i = 0; i < seriesData.length; i++) {
        const barTop = {
            name: seriesData[i].name,
            tooltip: {
                show: false,
            },
            type: "pictorialBar",
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                        offset: 0,
                        color: seriesData[i].itemStyle.color, // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: "#FFFFFF", // 100% 处的颜色
                    },
                ], false), // 控制顶部方形的颜色
            },
            barWidth:  symbolWidth + "%",
            symbol: "path://M 1 1 L 2 0 M 4 0 L 3 1 L 1 1 L 2 0 L 4 0",
            symbolSize: ['100%', translateFont(symbolHeight)], // 第一个值控制顶部方形大小
            symbolOffset: [0, -translateFont(symbolHeight/2)], // 控制顶部放行 左右和上下
            symbolRotate,
            symbolPosition: "end",
            data: seriesData[i].data.map((v) => {
                console.log(v);
                if (!v || v === "0") {
                    v = {
                        name: seriesData[i].name,
                        value: 0,
                        itemStyle: {
                            opacity: 0,
                        },
                    };
                }
                return v;
            }),
            barGap: "20%",
            z: 3,
            animationDelay: function(idx: any) {
                return idx * 10 + 100;
            },
        };
        results.push(barTop);
        const barLeft = {
            name: seriesData[i].name,
            tooltip: {
                show: true,
            },
            type: "bar",
            barWidth: symbolWidth + "%",
            itemStyle: {

                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                        offset: 0,
                        color: seriesData[i].itemStyle.color + "00", // 0% 处的颜色
                    },
                    {
                        offset: 1,
                        color: seriesData[i].itemStyle.color, // 100% 处的颜色
                    },
                ], false),
            },
            barGap: "20%",
            data: seriesData[i].data,
            animationDelay: function(idx: any) {
                return idx * 10 + 100;
            },
        };
        results.push(barLeft);
    }
    return results;
};
