import { google } from 'googleapis';
import { NextResponse } from 'next/server';

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

export async function GET() {
  try {
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '1GzOr8mNp7EZTu0I4sdU9kSYdLQZ9WYjP1vLifEyAnG8',
      range: 'BookLog!A:C', // Adjust this range based on your sheet structure
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    // Skip header row and process data
    const books = rows.slice(1).map((row: any[]) => ({
      title: row[0] || '',
      author: row[1] || '',
      genre: row[2] || '',
      // Add more fields as needed based on your sheet structure
    }));

    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 