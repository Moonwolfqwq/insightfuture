const { google } = require('googleapis'); 

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// 1. 定义准确的 14 个维度顺序
const SCALES_ORDER = [
    'Intrinsic', 'Integrated', 'Identified', 'Introjected', 'External', 'Amotivation',
    'Ne', 'Ni', 'Se', 'Si', 'Fe', 'Fi', 'Te', 'Ti'
];

async function getSheetClient() {
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n'), 
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    await auth.authorize();
    return google.sheets({ auth, version: 'v4' });
}

exports.handler = async (event, context) => {
    try {
        const body = JSON.parse(event.body);
        const username = body.username || 'Anonymous';
        const scores = body.scores; // 接收前端传来的 14 个维度分数
        const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

        // 校验维度数量（14个）
        if (!scores || Object.keys(scores).length !== 14) {
            return { statusCode: 400, body: '数据维度不匹配，需包含14个得分项' };
        }

        const sheets = await getSheetClient();
        
        // 按照顺序提取分数
        const scoreValues = SCALES_ORDER.map(name => scores[name] || 0);

        // 构建行数据：时间戳 (A), 用户名 (B), 14个分数 (C-P)
        const dataRows = [[timestamp, username, ...scoreValues]];

        await sheets.spreadsheets.values.append({
			spreadsheetId: SPREADSHEET_ID,
			range: 'Sheet1!A:P', // A列时间, B列姓名, C-P列为14个维度，正好到P列
			valueInputOption: 'USER_ENTERED',
			requestBody: { values: dataRows },
		});

        return { statusCode: 200, body: JSON.stringify({ message: '保存成功' }) };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};