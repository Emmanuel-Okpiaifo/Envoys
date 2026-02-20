// Google Apps Script for Envoys Anniversary Website Form Submissions
// Spreadsheet ID: 17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc

const SPREADSHEET_ID = '17TWU8JIXRTejsXGmY-9-7KaTG3abr6QPzdw2vQ8d1sc';
const SHEET_NAME = 'Responses'; // Change this if your sheet has a different name

/**
 * Main function that handles incoming POST requests from your website form
 * This is called when your website sends data to the deployed script URL
 */
function doPost(e) {
  try {
    // Parse incoming JSON data
    const payload = JSON.parse(e.postData.contents);
    
    // Validate required fields
    if (!payload.name || !payload.email || !payload.testimony) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: 'Missing required fields: name, email, or testimony'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get the spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      const newSheet = spreadsheet.insertSheet(SHEET_NAME);
      addHeaders(newSheet);
      return handleFormSubmission(newSheet, payload);
    }
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      addHeaders(sheet);
    }
    
    // Process the submission
    return handleFormSubmission(sheet, payload);
    
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error processing submission: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Add headers to the sheet
 */
function addHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Name',
    'Email',
    'Phone',
    'Testimony',
    'Share on Social',
    'Share Publicly',
    'User ID',
    'IP Address',
    'User Agent'
  ];
  
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#2D7A4A');
  headerRange.setFontColor('#FFFFFF');
  
  // Set column widths
  sheet.setColumnWidth(1, 150); // Timestamp
  sheet.setColumnWidth(2, 120); // Name
  sheet.setColumnWidth(3, 180); // Email
  sheet.setColumnWidth(4, 120); // Phone
  sheet.setColumnWidth(5, 400); // Testimony
  sheet.setColumnWidth(6, 100); // Share on Social
  sheet.setColumnWidth(7, 100); // Share Publicly
  sheet.setColumnWidth(8, 180); // User ID
  sheet.setColumnWidth(9, 150); // IP Address
  sheet.setColumnWidth(10, 200); // User Agent
}

/**
 * Process and store the form submission
 */
function handleFormSubmission(sheet, payload) {
  try {
    // Get the current timestamp in a readable format
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Extract data from payload (with fallbacks for optional fields)
    const row = [
      timestamp,
      payload.name || '',
      payload.email || '',
      payload.phone || '',
      payload.testimony || '',
      payload.shareOnSocial ? 'Yes' : 'No',
      payload.sharePublicly ? 'Yes' : 'No',
      payload.userId || '',
      payload.ipAddress || '',
      payload.userAgent || ''
    ];
    
    // Append row to sheet
    sheet.appendRow(row);
    
    // Apply conditional formatting to the new row for easy viewing
    const lastRow = sheet.getLastRow();
    const newRowRange = sheet.getRange(lastRow, 1, 1, row.length);
    newRowRange.setBackground('#F0F8F5');
    
    Logger.log('Response added: ' + JSON.stringify(row));
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Testimony received successfully!',
      timestamp: timestamp,
      rowNumber: lastRow
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error handling submission: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: 'Error saving to spreadsheet: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Function to test the script locally (for debugging)
 * Run this from the Apps Script editor to test
 */
function testSubmission() {
  const testPayload = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '+1234567890',
    testimony: 'This is a test testimony submission.',
    shareOnSocial: true,
    sharePublicly: false,
    userId: 'user-test-123',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testPayload)
    }
  };
  
  const result = doPost(e);
  Logger.log('Test result: ' + result.getContent());
}

/**
 * Optional: Deploy this as a web app
 * 1. Click "Deploy" > "New Deployment"
 * 2. Type: "Web app"
 * 3. Execute as: Your email
 * 4. Who has access: "Anyone"
 * 5. Click "Deploy"
 * 6. Copy the deployment URL
 * 7. Use this URL in your website form: updateTheWebhookUrl()
 */
