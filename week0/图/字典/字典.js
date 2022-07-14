class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;//用于将键值转换为字符串
        this.table={}//;存放键值对,保存为table[key]={key,value}
    }
    hasKey(key) {//判断字典是否含有key
        return  this.table[this.toStrFn(key)] != null;//将传入键字符串化后查看table[key]是否存在
    }
    set(key,value) {//根据键值对设置键和值
        if(key!=null&&value!=null) {
            const tableKey=this.toStrFn(key);//字符串化key值
            this.table[tableKey]=new ValuePair(tableKey,value);//给table对象设置table属性
            return true;
        }
        return false;//传入值不正确返回false
    }
    remove(key) {//从字典里删除键值对
        if(this.hasKey(this.toStrFn(key))) {
            delete this.table[this.toStrFn(key)];//删除table中的key属性
            return true
        }
        return false;//找不到要删除的key值就return false
    }
    get(key) {//从字典中检索值
        const valuePair=this.table[this.toStrFn(key)];
        return valuePair==null? undefined : valuePair.value;
    }
    keyValues() {
        return Object.values(this.table);//ES7方法，返回table中所有ValuePair对象
    }
    keys() {
        return this.keyValues().map(valuePair => valuePair.key);//获取所有的key值
    }
    values() {
        return this.keyValues().map(valuePair => valuePair.value);//获取了所有的value值
    }
    forEach(callbackFn) {
        const valuePairs = this.keyValues(); // 获取全部键值对
        for (let i = 0; i < valuePairs.length; i++) { // 遍历每一个键值对
            const result = callbackFn(valuePairs[i].key, valuePairs[i].value); // 执行要对键值对进行的回调操作
            if (result === false) {
                break; // 出现错误即退出
            }
        }
    }
    size() {
        return Object.keys(this.table).length;//返回字典中值的个数
    }
    isEmpty() {
        return this.size() === 0;//判断字典是否为空
    }
    clear() {
        this.table = {};//清空字典
    }
    toString() {
        if (this.isEmpty()) {//如果为空则返回空字符串
            return '';
        }
        const valuePairs = this.keyValues();//获取全部键值对
        let objString = `${valuePairs[0].toString()}`; // 对第一个键值对字符串化
        for (let i = 1; i < valuePairs.length; i++) {
            objString = `${objString},${valuePairs[i].toString()}`; // 将剩下的键值对依次字符串化并拼接起来
        }
        return objString; // 返回拼接的结果
    }
}
//字符串转换函数
function defaultToString(key) {
    if(key===null) {
        return "NULL"
    } else if(key === undefined) {
        return "UNDEFINED"
    } else if (typeof key === 'string' || key instanceof String) {
        return `${key}`;
    }
    return key.toString();
}
//ValuePair类
class ValuePair {
    constructor(key,value) {
        this.key=key;
        this.value=value;
    }
    toString() {
        return `#${this.key} : ${this.value}`//重写toString方法让其输出键值对
    }
}
