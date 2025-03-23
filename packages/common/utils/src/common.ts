import { isString } from "lodash-es";

/**
 * 获取嵌套对象值
 * @param obj
 * @param path
 * @param defaultValue
 * @returns console.log(getNestedValue(obj, "home.title")); // 输出: "标题"
 */
export function getNestedValue<T>(obj: any, path: T) {
  let label = "";
  let str = (path as string).split(".").reduce((acc, key) => acc?.[key], obj);
  if (isString(str)) {
    label = str;
  }
  return label || path;
}
