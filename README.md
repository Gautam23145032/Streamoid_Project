# 🛍️ Streamoid Product Catalog — CSV Upload & Product Management System

A modern **Product Management Web App** built using **Node.js, Express, MongoDB, EJS, and CSS**, allowing users to **upload product CSV files**, **validate and store them in MongoDB**, and **search/filter products** in a clean interface.

---

## 🔥 Features

### ✅ CSV Upload
- Upload product CSV files with columns:
sku, name, brand, color, size, mrp, price, quantity
- Server validates each row:
  - Required fields: `sku`, `name`, `brand`, `mrp`, `price`
  - `price` must be ≤ `mrp`
  - `quantity` defaults to 0 if empty
- Invalid rows are skipped and displayed on screen
- Valid rows are inserted into MongoDB
- Uploaded CSV file is automatically deleted after processing

### 🔍 Product Search & Filter
- Filter products dynamically by:
  - Brand
  - Color
  - Price range (`minPrice` and `maxPrice`)
- Sorted by newest first
- Displays count of results

### 📊 Product Listing
- Lists all products in a clean table with columns:
  - SKU, Name, Brand, Color, Size, MRP, Price, Quantity
- Updates dynamically after upload or search

### 🧰 Backend Features
- Robust error handling:
  - 404 not found
  - Invalid file uploads (non-CSV, too large)
  - Database insertion errors
- MongoDB indexes on `name`, `brand`, `color` for faster search

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB + Mongoose  
- **Frontend:** EJS Templates + CSS3  
- **File Upload:** Multer  
- **CSV Parsing:** csv-parser  
- **Logging:** Morgan  
- **Environment Management:** dotenv  

---

## 📁 Project Structure

📦 streamoid-product-manager
├── 📁 config
│ └── db.js   # MongoDB connection logic
├── 📁 controllers
│ └── viewController.js   # Handles CSV upload, validation, search, rendering
├── 📁 middleware
│ ├── errorMiddleware.js   # 404 + global error handlers
│ └── upload.js # Multer config for CSV upload
├── 📁 models
│ └── productModel.js   # Product schema definition (Mongoose)
├── 📁 routes
│ └── viewRoutes.js   # Routes for upload, search, and render
├── 📁 utils
│ └── csvValidator.js   # Validates each CSV row before insertion
├── 📁 views
│ └── home.ejs   # EJS view for upload + search + listing UI
├── 📁 public
│ └── style.css   # Styling for UI
├── 📁 uploads   # Temporary folder for uploaded CSVs (auto-deleted)
├── app.js   # Express app setup
├── server.js   # App entrypoint (loads env, connects DB, starts server)
├── .env   # Contains MONGODB_URI and PORT
└── package.json

---

## 🧠 How It Works

### 1️⃣ Uploading CSV
1. User selects a CSV file and submits
2. Multer middleware saves file temporarily in `uploads/`
3. `csv-parser` reads file row by row
4. Each row is validated by `csvValidator.js`
5. Valid rows are inserted into MongoDB (`Product` collection)
6. File is deleted after processing
7. Page renders:
   - Number of successful inserts
   - Failed rows with reasons
   - Updated product list

### 2️⃣ Searching & Filtering Products
1. User enters filters: brand, color, minPrice, maxPrice
2. `handleSearch()` builds a MongoDB query with regex (case-insensitive) and price range
3. Results are sorted by newest first and rendered in the table

### 3️⃣ Error Handling
- Non-CSV uploads → Error message displayed
- File size > 5MB → Error message displayed
- Duplicate SKUs or invalid rows → Skipped with error shown
- 404 routes → `notFound()` middleware
- Other errors → `errorHandler()` middleware logs and returns JSON

---

## 📦 Example CSV File

```csv
sku,name,brand,color,size,mrp,price,quantity
SKU123,Running Shoes,Nike,Black,42,5999,4999,10
SKU124,T-Shirt,Adidas,White,L,1999,1499,20
SKU125,Jeans,Levis,Blue,32,3999,2999,15
🌐 User Interface
Home page contains:

- CSV upload section

- Search/filter section

- Product listing table

- Success and error messages shown dynamically

- Clean responsive UI built with CSS

🚀 Installation & Setup
- Clone the repository
git clone https://github.com/yourusername/streamoid-product-manager.git
cd streamoid-product-manager

- Install dependencies
npm install

- Create .env file

MONGODB_URI=<your-mongodb-connection-string>
PORT=8000
- Start server

npm start
- Open in browser

http://localhost:8000

💡 Developer Notes
- Uploaded CSVs are stored temporarily and deleted automatically

- Failed rows are not inserted and are displayed in the UI

- MongoDB text index ensures faster searches for name, brand, and color

- Works fully with server-side rendering (no frontend frameworks needed)

👨‍💻 Author
Gautam Yadav
Made with 💙 by Gautam23145032
