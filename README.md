Sure! Here's a simple, beginner-friendly README for your Gmail-to-Google-Sheets order tracking script:

---

# 📦 Food Order Tracker for Gmail (DoorDash & Deliveroo)

This Google Apps Script helps you automatically track your food orders from **DoorDash** and **Deliveroo** by extracting details from your email and saving them to a **Google Sheet**.

---

## ✨ What It Does

* 📥 Reads your Gmail inbox for emails from DoorDash and Deliveroo.
* 🧠 Extracts key details:

  * **Date of order**
  * **Restaurant name**
  * **Total amount**
* 📊 Saves this information in a Google Sheet with two tabs:

  * `DoorDash Orders`
  * `Deliveroo Orders`
* 🔁 Runs automatically every hour to check for new emails.

---

## ✅ Requirements

1. A **Gmail** account with order confirmation emails from:

   * `no-reply@doordash.com`
   * `deliveroo` (any Deliveroo sender)
2. A **Google Sheet** where the order data will be stored.

---

## 🛠️ Setup Instructions (No Coding Needed!)

1. **Open Google Sheets**
   Create a new Google Sheet (or open an existing one).

2. **Open the Script Editor**
   In your Google Sheet, click:

   * `Extensions` → `Apps Script`

3. **Paste the Script**
   Delete any code there and paste the full script you received.

4. **Save**
   Click the disk icon 💾 or press `Ctrl + S` / `Cmd + S`. Give your project a name.

5. **Run Initial Setup**

   * In the toolbar, click the dropdown next to the ▶️ button.
   * Select `createTimeTrigger` and click ▶️ to run it.
   * The first time, it will ask for permissions. Allow access to your Gmail and Sheets.

6. **Done!**
   The script will now check for order confirmation emails **every hour** and update your Google Sheet automatically.

---

## 📒 Manual Use (Optional)

You can also run it manually:

* In the Apps Script editor, select `runManually` and click ▶️.

---

## ⚠️ Notes

* Only new emails will be processed. Once an email is read, it won’t be processed again.
* Make sure your order emails follow standard formats (like “Order Confirmation” or “pickup order is ready!” for DoorDash).

---

## 💬 Need Help?

If something doesn’t work as expected:

* Make sure your emails are still in your inbox.
* Check if the Gmail search terms match your actual email subjects and senders.
* You can view any errors by clicking **“Executions”** in the left menu of the Apps Script editor.

---

Enjoy your automated food order tracker! 🍔📈

---
