import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { Routing } from "./Routing";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://dummyjson.com/products");
      console.log(res.data.products);
      setData(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(text.toLowerCase())
  );

  const highlightText = (title, searchText) => {
    if (!searchText) return title;

    const regex = new RegExp(`(${searchText})`, "gi");

    return title.split(regex).map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? (
        <span
          key={index}
          className="highlight"
          style={{ backgroundColor: "yellow" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    // <div className="container mt-3">
    //   <input
    //     type="text"
    //     className="form-control mb-3"
    //     placeholder="Type to highlight..."
    //     value={text}
    //     onChange={(e) => setText(e.target.value)}
    //   />
    //   {data.map((item) => (
    //     <p key={item.id}>{highlightText(item.title, text)}</p>
    //   ))}
    // </div>

    <Routing />
  );
}

export default App;
