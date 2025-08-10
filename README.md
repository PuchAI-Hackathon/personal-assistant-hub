# AI Personal Assistant Hub – Multiple AI Tools in One MCP Server

## 📌 Overview
The **AI Personal Assistant Hub** is a Node.js + Express-based multi-tool platform that integrates multiple AI-powered utilities into one central MCP (Multi Capability Platform) server.  
It allows users to perform various AI tasks such as meeting note summarization, code explanation, sentiment analysis, to-do list management, FAQs answering, and real-time weather updates — all from a single hub.  

---

## 🚀 Features
✅ **Meeting Summarizer** – Upload meeting transcripts and get concise summaries  
✅ **Code Explainer** – Explain code snippets in plain language  
✅ **FAQ Bot** – AI answers frequently asked questions  
✅ **To-Do Manager** – Add and view tasks  
✅ **Sentiment Analyzer** – Detect emotions in text  
✅ **Weather Fetcher** – Get real-time weather by city name  
✅ **Voice Interaction** – Speak to interact with AI  

---

## 📂 Project Structure
```
AI-Personal-Assistant-Hub/
│── public/                  # Static frontend files (HTML, CSS, JS)
│── src/
│   ├── controllers/         # Business logic for each tool
│   ├── routes/               # API endpoints
│   ├── server.js             # Main server file
│── package.json              # Project dependencies
│── README.md                 # Documentation
```

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone https://github.com/YourUsername/AI-Personal-Assistant-Hub.git
cd AI-Personal-Assistant-Hub
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Add Environment Variables**
Create a `.env` file in the root folder and add:
```
PORT=3000
OPENAI_API_KEY=your_openai_api_key_here
WEATHER_API_KEY=your_openweather_api_key_here
```

### **4. Run the Server**
```bash
npm start
```
Server will run at:
```
http://localhost:3000
```

---

## 📡 API Endpoints
| Method | Endpoint                | Description |
|--------|------------------------|-------------|
| POST   | `/api/meeting-summarize` | Summarize meeting notes |
| POST   | `/api/code-explain`      | Explain code |
| POST   | `/api/faq`               | Answer FAQs |
| POST   | `/api/todo/add`          | Add a to-do task |
| GET    | `/api/todo/list`         | List all to-do tasks |
| POST   | `/api/sentiment`         | Analyze text sentiment |
| GET    | `/api/weather?city=NAME` | Get weather by city |

---

## 🛠 Technologies Used
- **Backend:** Node.js, Express.js  
- **AI:** OpenAI API  
- **Frontend:** HTML, CSS, JavaScript  
- **Other APIs:** OpenWeatherMap API  
- **Package Manager:** npm  

---

## 📌 Future Improvements
- Add chat history storage  
- User authentication & personalization  
- Support for more AI tools like translation, text-to-speech, image generation  
- Deploy on cloud (Render / Railway / Vercel)  

---

## 📜 License
This project is licensed under the **MIT License**.
