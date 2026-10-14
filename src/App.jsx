
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [localItems, setLocalItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [message, setMessage] = useState("");

  // API URL - task-ku etha maari change pannu
  const API_URL = "https://jsonplaceholder.typicode.com/users";

  async function searchData() {
    if (!search.trim()) {
      setMessage("Enter something to search");
      setItems([]);
      return;
    }

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("API failed");
      }

      const data = await response.json();

      // API data-la search pannum
      const result = (Array.isArray(data) ? data : [data]).filter(
        (item) =>
          JSON.stringify(item)
            .toLowerCase()
            .includes(search.toLowerCase())
      );

      // API + namma add panna data
      const localResult = localItems.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );

      setItems([
        ...result.map((item) =>
          typeof item === "string" ? item : JSON.stringify(item)
        ),
        ...localResult,
      ]);

      setMessage(
        result.length + localResult.length
          ? ""
          : "No results found"
      );
    } catch {
      // API fail aana local data mattum search pannum
      const result = localItems.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );

      setItems(result);
      setMessage(
        result.length ? "API unavailable - showing local data" :
        "API unavailable. Add your own data below."
      );
    }
  }

  function addItem() {
    if (!newItem.trim()) return;

    setLocalItems([...localItems, newItem.trim()]);
    setNewItem("");
    setMessage("Item added successfully");
  }

  return (
    <div style={{ padding: 25 }}>
      <h1>Search Application</h1>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anything"
      />
      <button onClick={searchData}>Search</button>

      <h3>Add Your Own Data</h3>

      <input
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter a name or item"
      />
      <button onClick={addItem}>Add</button>

      <p>{message}</p>

      <h3>Search Results</h3>

      {items.map((item, index) => (
        <p key={index}>{item}</p>
      ))}

      <h3>My Added Data</h3>
      {localItems.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}

export default App;
