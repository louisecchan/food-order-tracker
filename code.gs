// Function to process incoming emails
function processIncomingEmails() {
  // Get the Gmail threads with DoorDash and pickup order confirmations
  const doorDashThreads = GmailApp.search('(from:no-reply@doordash.com subject:"Order Confirmation") OR (subject:"pickup order is ready!")');
  
  // Get the Gmail threads with Deliveroo orders
  const deliverooThreads = GmailApp.search('from:deliveroo');
  
  // Process DoorDash orders
  processDoorDashOrders(doorDashThreads);
  
  // Process Deliveroo orders
  processDeliverooOrders(deliverooThreads);
}

// Function to process DoorDash orders
function processDoorDashOrders(threads) {
  // Get or create the spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('DoorDash Orders') || ss.insertSheet('DoorDash Orders');
  
  // Set up headers if they don't exist
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Restaurant', 'Total']);
  }
  
  // Process each thread
  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const subject = message.getSubject();
      const date = message.getDate();
      const body = message.getPlainBody();
      
      let restaurant = 'Unknown Restaurant';
      let total = 'N/A';
      
      // Handle DoorDash format
      if (subject.includes('Order Confirmation')) {
        const restaurantMatch = subject.match(/from (.*?)$/i);
        restaurant = restaurantMatch ? restaurantMatch[1].trim() : 'Unknown Restaurant';
        
        // Extract total from email body
        const totalMatch = body.match(/Estimated Total\s*\$\s*(\d+\.\d+)/i);
        if (totalMatch) {
          total = totalMatch[1];
        }
      }
      // Handle pickup order format: "Your [Restaurant] pickup order is ready!"
      else if (subject.includes('pickup order is ready!')) {
        const restaurantMatch = subject.match(/Your (.*?) pickup order/i);
        restaurant = restaurantMatch ? restaurantMatch[1].trim() : 'Unknown Restaurant';
      }
      
      // Add row to spreadsheet
      sheet.appendRow([date, restaurant, total]);
      
      // Mark the message as read
      message.markRead();
    });
  });
}

// Function to process Deliveroo orders
function processDeliverooOrders(threads) {
  // Get or create the spreadsheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Deliveroo Orders') || ss.insertSheet('Deliveroo Orders');
  
  // Set up headers if they don't exist
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Date', 'Restaurant', 'Total']);
  }
  
  // Process each thread
  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const date = message.getDate();
      const body = message.getPlainBody();
      
      let restaurant = 'Unknown Restaurant';
      let total = 'N/A';
      
      // Extract restaurant name from email body: "[Restaurant] has your order!"
      const restaurantMatch = body.match(/(.*?)\s+has your order!/i);
      if (restaurantMatch) {
        restaurant = restaurantMatch[1].trim();
      }
      
      // Extract total from email body
      const totalMatch = body.match(/Total\s+£\s*(\d+\.\d+)/i);
      if (totalMatch) {
        total = totalMatch[1];
      }
      
      // Add row to spreadsheet
      sheet.appendRow([date, restaurant, total]);
      
      // Mark the message as read
      message.markRead();
    });
  });
}

// Create a time-based trigger to run the script periodically
function createTimeTrigger() {
  // Delete any existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => ScriptApp.deleteTrigger(trigger));
  
  // Create a new trigger to run every hour
  ScriptApp.newTrigger('processIncomingEmails')
    .timeBased()
    .everyHours(1)
    .create();
}

// Function to run manually
function runManually() {
  processIncomingEmails();
}
