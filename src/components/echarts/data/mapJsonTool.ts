import { debounce } from '@/utils';
import { deepClone } from '@/utils/base';
import { ref } from 'vue';

const eagerImportModules = import.meta.globEager('./children_map_file/*.ts')

const keys = Object.keys(eagerImportModules) as any
// 执行批量替换操作
for (let path of keys) {
	// 裁剪字符串方式得到路径中的文件名（无扩展名）
	let name = eagerImportModules[path].default.name
	// 对原对象执行添加新的属性并删除旧属性达到处理效果
	eagerImportModules[name] = eagerImportModules[path].default.map;
	delete eagerImportModules[path];
}
const cacheMapJson = ref()
export const cacheMapJsonList = ref<any>([])
/**
 * @param mapName 地图名称
 * @returns map地图json数据
 */
export const getMapJson = debounce((mapName:string) =>{
    if (eagerImportModules[mapName]) {
        cacheMapJson.value = eagerImportModules[mapName]
        if (cacheMapJsonList.value[1]) {
            cacheMapJsonList.value[1] = eagerImportModules[mapName]
        }else{
            cacheMapJsonList.value.push(eagerImportModules[mapName])
        }
        return cacheMapJson.value
    }else if ( Array.isArray(cacheMapJson.value.features) && cacheMapJson.value.features.length > 0){
        let deepMapJson = deepClone(cacheMapJson.value)
        deepMapJson.features = cacheMapJson.value.features.filter((v)=>v.properties.name === mapName)
        console.log(deepMapJson);
        if (cacheMapJsonList.value[2]) {
            cacheMapJsonList.value[2] = deepMapJson
        }else{
            cacheMapJsonList.value.push(deepMapJson)
        }
        return deepMapJson
    }
},300,true)





