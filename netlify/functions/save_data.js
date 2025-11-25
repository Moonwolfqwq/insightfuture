// 接收前端 16 个维度分数，并写入 Google Sheets 的单行 (A:R 列)
const { google } = require('googleapis'); 

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

const SCALES_ORDER = [
    'Ne', 'Ni', 'Se', 'Si', 'Fe', 'Fi', 'Te', 'Ti',
    '学习动机', '学习方式', '信息处理', '思维', '情绪', '社交沟通', '自我管理', '创造'
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
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const username = body.username || 'Anonymous';
        const scores = body.scores;
        const timestamp = new Date().toISOString();

        if (!scores || typeof scores !== 'object' || Object.keys(scores).length !== 16) {
            return { statusCode: 400, body: 'Missing or invalid scores data. Expected 16 dimensions.' };
        }

        const sheets = await getSheetClient();
        
        // 构建包含 16 个分数的数组，确保顺序与 SCALES_ORDER 严格一致
        const scoreValues = SCALES_ORDER.map(scaleName => scores[scaleName] || 0);

        // 构建最终的单行数据：[Timestamp (A), Username (B), 16 Scores (C:R)]
        const dataRows = [
            [
                timestamp,
                username,
                ...scoreValues
            ]
        ];

        // 将数据附加到 Google Sheet
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:R',
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
            body: JSON.stringify({ 
                error: 'Internal Server Error', 
                details: error.message 
            }),
        };
    }
};