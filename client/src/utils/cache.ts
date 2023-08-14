/**
 * 缓存
 * @param key
 * @param value
 */
export const storeCachedData = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/**
 * 获取缓存
 * @param key
 * @returns
 */
export const fetchCachedData = <T>(key: string): T | null => {
    const data: string | null = localStorage.getItem(key);
    if (data) {
        try {
            const object = JSON.parse(data) as T;
            if (object) {
                return object;
            }
        } catch (error) {
            console.error(error);
        }
    }
    return null;
};

/**
 * 删除缓存
 * @param key
 */
export const removeCachedData = (key: string) => {
    localStorage.removeItem(key);
};
