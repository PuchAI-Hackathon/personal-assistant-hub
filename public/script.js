document.getElementById("summarizeBtn").addEventListener("click", async () => {
  const notes = document.getElementById("meetingNotes").value;
  const res = await fetch("/api/meeting-summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notes })
  });
  const data = await res.json();
  document.getElementById("meetingSummary").innerText = data.summary || "No summary generated.";
});
document.getElementById("explainBtn").addEventListener("click", async () => {
  const code = document.getElementById("codeInput").value;
  const res = await fetch("/api/code-explain", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
  });
  const data = await res.json();
  document.getElementById("codeExplanation").innerText = data.explanation || "No explanation available.";
});
document.getElementById("faqBtn").addEventListener("click", async () => {
  const question = document.getElementById("faqQuestion").value;
  const res = await fetch("/api/faq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question })
  });
  const data = await res.json();
  document.getElementById("faqAnswer").innerText = data.answer || "No answer found.";
});
document.getElementById("addTodoBtn").addEventListener("click", async () => {
  const task = document.getElementById("todoTask").value;
  await fetch("/api/todo/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });
  loadTodos();
});

async function loadTodos() {
  const res = await fetch("/api/todo/list");
  const data = await res.json();
  document.getElementById("todoList").innerHTML = data.todos.map(t => `<li>${t}</li>`).join("");
}

document.addEventListener("DOMContentLoaded", loadTodos);
document.getElementById("sentimentBtn").addEventListener("click", async () => {
  const text = document.getElementById("sentimentInput").value;
  const res = await fetch("/api/sentiment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  const data = await res.json();
  document.getElementById("sentimentResult").innerText = `Sentiment: ${data.sentiment || "Unknown"}`;
});
document.getElementById("weatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("weatherCity").value;
  const res = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
  const data = await res.json();
  document.getElementById("weatherResult").innerText = 
    data.error ? `Error: ${data.error}` : `${city}: ${data.temp}°C, ${data.condition}`;
});
