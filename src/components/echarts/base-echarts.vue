<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
// 使用setup最新版
import { ref, onMounted, watchEffect, nextTick } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from './hooks/useEcharts'
const emits = defineEmits(['handleEcharts']);
// 定义prpos
const props = withDefaults(
  defineProps<{
    option: EChartsOption
    width?: string
    height?: string
    defaultSelect?: any
  }>(),
  {
    width: '100%',
    height: '100%',
  }
)

const echartDivRef = ref<HTMLElement>()
onMounted(() => {
  nextTick(()=>{
      const { setOption } = useEchart(echartDivRef.value!)
      const { echartInstance } = useEchart(echartDivRef.value!)
      const { updataSize } = useEchart(echartDivRef.value!)
      echartInstance.on('click', (p) => {
          emits('handleEcharts', { option: echartInstance.getOption(), selectItem: p })
      })
      const selectDefault = (config) => {
          if (!config) return
          echartInstance.dispatchAction(config)
      }
      watchEffect(() => {
          setOption(props.option)
          selectDefault(props.defaultSelect)
      })
  })
})

</script>

<style lang="scss" scoped>
.base-echart {
  width: 100%;
  height: 100%;
  -webkit-tap-highlight-color: transparent; //解决移动端点击图表出现蓝色背景
}

</style>
