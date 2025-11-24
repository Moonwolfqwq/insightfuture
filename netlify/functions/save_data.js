/**
 * File: netlify/functions/save_data.js
 * 目的：接收前端 16 个维度分数，并写入 Google Sheets 的单行
 */
const { google } = require('googleapis'); 

// 导入环境变量
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// ⚠️ 关键常量：定义 Google Sheets 的写入顺序 (A:R 列)
const SCALES_ORDER = [
    // 荣格八维 (C 到 J)
    'Ne', 'Ni', 'Se', 'Si', 'Fe', 'Fi', 'Te', 'Ti',
    // 可发展领域 (K 到 R)
    '学习动机', '学习方式', '信息处理', '思维', '情绪', '社交沟通', '自我管理', '创造'
];

/**
 * 初始化 Google Sheets 客户端并进行身份验证
 */
async function getSheetClient() {
    const auth = new google.auth.JWT({
        email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
        // 确保私钥中的换行符正确处理
        key: process.env.GOOGLE_SHEET_PRIVATE_KEY.replace(/\\n/g, '\n'), 
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    
    await auth.authorize();
    
    return google.sheets({ auth, version: 'v4' });
}

// Netlify Function 的入口点
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const body = JSON.parse(event.body);
        const username = body.username || 'Anonymous';
        const scores = body.scores; // 包含 16 个维度分数的对象
        const timestamp = new Date().toISOString();

        if (!scores || typeof scores !== 'object' || Object.keys(scores).length !== 16) {
            return { statusCode: 400, body: 'Missing or invalid scores data. Expected 16 dimensions.' };
        }

        const sheets = await getSheetClient();
        
        // 1. 构建包含 16 个分数的数组，确保顺序正确
        const scoreValues = [];
        SCALES_ORDER.forEach(scaleName => {
            // 确保分数存在，否则默认为 0
            scoreValues.push(scores[scaleName] || 0);
        });

        // 2. 构建最终的单行数据：[Timestamp, Username, Ne, Ni, ..., 创造]
        // 对应 Google Sheet 的 A, B, C...R 列
        const dataRows = [
            [
                timestamp, // A 列
                username,  // B 列
                ...scoreValues // C 到 R 列
            ]
        ];

        // 3. 将数据附加到 Google Sheet
        const result = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            // ⚠️ 修正 Range 为 A:R，包含所有 18 列 (Timestamp, Username, 16 Scores)
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