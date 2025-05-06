export const useColor = () =>{
    const colorOption = [
        {
            color:'#23F8F1',
            value:1
        },
        {
            color:'#05CB7C',
            value:2
        },
        {
            color:'#F6CB58',
            value:3
        },
        {
            color:'#F97E1A',
            value:4
        },
        {
            color:'#DF3B31',
            value:5
        },
        {
            color:'#0363F8',
            value:6
        },
        {
            color:'#BEC6F5',
            value:7
        },
        {
            color:'#28E8F4',
            value:8
        },
        {
            color:'#34CCFF',
            value:9
        },
        {
            color:'#013283',
            value:10
        },
    ]
    function getRandomHexColor() {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    }
    const colorList = () =>{
        return colorOption.map(v=>v.color)
    }
    const getColor = (colorValue:number) =>{
        const finds = colorOption.find(v=>v.value === colorValue)
        if (finds) {
            return finds.color
        }else {
            return getRandomHexColor()
        }
    }
    return {
        colorList,
        colorOption,
        getColor,
        getRandomHexColor
    }
}
