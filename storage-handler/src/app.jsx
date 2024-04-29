import * as React from "react";
import "./style/Main.css";

// hooks:
import fetchProperties from "./hooks/fetchProperties.jsx";
import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";

// Components:
import Header from "./components/Header.jsx";
import ShowProduct from "./components/ShowProduct.jsx";
import Properties from "./components/Properties.jsx";

function Main() {
  // States:
  const [searchValue, setSearchValue] = useState("");
  const [id, setId] = useState(null);
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);

  // Da fetch para o componente properties:
  useEffect(() => {
    fetchProperties(id, setData);
    console.log("RELOADING EVERYTHING !!!");
  }, [load]);

  return (
    <div className="Main">
      <div className="Main_left">
        <Header
          setSearchValue={setSearchValue}
          reLoad={setLoad} // Para re-renderizar a página
        />
        <ShowProduct
          setId={setId}
          reLoad={setLoad}
          loadValue={load}
          searchValue={searchValue}
        />
      </div>
      <div className="Main_right">
        {data == null ? (
          <div>
            <h1>Selecione um produto</h1>
          </div>
        ) : (
          <Properties
            name={data.name}
            storage={data.storage}
            price={data.price}
            description={data.description}
            id={id}
            reLoad={setLoad}
            loadValue={load}
          />
        )}
      </div>
      {/* <button onClick={() => {console.log(data, id)}}>Click</button> */}
    </div>
  );
}

// Renderizando Componente principal (Main) no div root no index.html
const root = createRoot(document.getElementById("root"));
root.render(<Main />);
