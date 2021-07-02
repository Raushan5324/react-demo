import "./styles.css";
import React from "react";
import axios from "axios";

export default function App() {
  const [text, setText] = React.useState("");
  const [dataList, setDataList] = React.useState([]);
  const setSearchData = (event) => {
    setText(event.target.value);
  };

  const searchData = () => {
    if (text) {
      axios
        .get(`https://api.github.com/search/repositories?q=${text}`)
        .then((response) => {
          if (response.status === 200) {
            setDataList(response.data.items);
          }
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    }
  };

  return (
    <div className="App">
      <h1>Enter search text</h1>
      <input type="text" onChange={setSearchData} name="text" value={text} />
      <br />
      <input type="button" name="submit" value="Submit" onClick={searchData} />
      <br />
      <table border="1px solid">
        <tr>
          <th>Sr.No.</th>
          <th>Name</th>
          <th>Stars</th>
          <th>Forks</th>
        </tr>
        {dataList.map((item, i) => (
          <>
            <tr>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.stargazers_count}</td>
              <td>{item.forks}</td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
}
