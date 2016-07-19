const KEY_TO_DISPLAY_KEY_MAP = {
	'companyName': '公司名称',
	'taxRegistrationNumber': '纳税人识别号',
	'phone': '电话（一般为座机）',
	'bankName': '开户银行',
	'bankAccount': '开户银行账号',
};

export let serialize = {
    toDisplayString: function(obj) {
        var list = [];
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                list.push(`${KEY_TO_DISPLAY_KEY_MAP[key]}:${obj[key]}`);
            }
        }

        return list.join('\n');
    },
};