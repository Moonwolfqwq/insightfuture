const { google } = require('googleapis'); 

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
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

exports.handler = async (event) => {
    try {
        const { username, scores } = JSON.parse(event.body);
        const timestamp = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

        // 严格校验维度数量
        if (!scores || Object.keys(scores).length !== 14) {
            return { statusCode: 400, body: '维度不匹配' };
        }

        const sheets = await getSheetClient();
        const scoreValues = SCALES_ORDER.map(name => scores[name] || 0);
        const dataRows = [[timestamp, username || 'Anonymous', ...scoreValues]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:P', // 时间 + 姓名 + 14维度 = 16列 (A-P)
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: dataRows },
        });

        return { statusCode: 200, body: JSON.stringify({ message: 'Success' }) };
    } catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
};