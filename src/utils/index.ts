import { RouteRecordNormalized } from 'vue-router';
export function add(a: number, b: number) {
    return a + b;
}

export interface nameArrType {
    name: string;
    currentNameZH: string;
}

export function getTitle(name: string, routes: RouteRecordNormalized[], currentNameZH: string) {
    // console.log(name,routes, currentNameZH);

    // const names: string[] = [];
    // const namesZH: string[] = [];
    const nameArr: nameArrType[] = [];
    while (true) {
        // names.push(name);
        // namesZH.push(currentNameZH);
        nameArr.push({ name, currentNameZH });
        const currentRouterObj = routes.find((item) => item.name === name);
        const parentRouterObj = routes.find((item) => item.name === currentRouterObj?.meta?.parentRouter);
        if (parentRouterObj!.meta.title) {
            name = parentRouterObj!.name! as string;
            currentNameZH = parentRouterObj!.meta.title as string;
            continue;
        } else {
            break;
        }
    }
    return nameArr.reverse();
}
