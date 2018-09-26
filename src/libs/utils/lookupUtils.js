// 转码功能
export function transformData(listItem, lookUpArr, codeKey, textKey, val='value',label="code") {
	if(!lookUpArr) return;
	lookUpArr.forEach((value) => {
        if (listItem[codeKey] == value[label]) {
            listItem[textKey] = value[val];
		}
	});
};