// 导入 Google Sheets 库 (需要在您的 package.json 中添加 "googleapis")
const { GoogleSheets } = require('googleapis');

// 导入环境变量
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// 初始化 Google Sheets 客户端
async function getSheetClient() {
    // 使用服务账户凭证
    const auth = new GoogleSheets.auth.JWT({
        email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
        key: process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n'), // 替换换行符
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    await auth.authorize();
    
    return GoogleSheets({ auth, version: 'v4' });
}

// Netlify Function 的入口点
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const username = body.username || 'Anonymous';
        const scores = body.scores; // 这是一个包含 { dimension: score } 的对象
        const timestamp = new Date().toISOString();

        if (!scores || typeof scores !== 'object') {
            return { statusCode: 400, body: 'Missing or invalid scores data.' };
        }

        const sheets = await getSheetClient();
        const dataRows = [];
        
        // 将分数对象转换为 Google Sheets 需要的行格式
        for (const dimension in scores) {
            if (scores.hasOwnProperty(dimension)) {
                // 每行格式：[Timestamp, Username, Dimension, Score]
                dataRows.push([
                    timestamp,
                    username,
                    dimension,
                    scores[dimension] // 标准化分数 (0.0 - 10.0)
                ]);
            }
        }

        // 将数据附加到 Google Sheet 的 "Sheet1" 表格中
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:D', // 假设您的数据从 A 到 D 列
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: dataRows,
            },
        });

        console.log(`Successfully appended ${result.data.updates.updatedCells} cells.`);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Results saved to Google Sheets.', timestamp }),
        };

    } catch (error) {
        console.error('Error saving data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
        };
    }
};