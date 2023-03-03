/*
 * @Author: June
 * @Description:
 * @Date: 2023-02-21 23:42:31
 * @LastEditors: June
 * @LastEditTime: 2023-02-21 23:50:06
 */
export function getSession(key: string) {
    if (!key) throw new Error('key不能为空');
    const val = sessionStorage.getItem(key);
    return val ? JSON.parse(val) : null;
}

export function setSession(key: string, value: any) {
    if (!key || !value) throw new Error('key or value不能为空');
    return sessionStorage.setItem(key, JSON.stringify(value));
}

export function removeSession(key: string) {
    if (!key) throw new Error('key不能为空');
    return sessionStorage.removeItem(key);
}

export function clearSession() {
    return sessionStorage.clear();
}
