import CategoryTree from "./components/CategoryTree";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  return (
    <>
      <div>
        <Header />
        <CategoryTree />
      </div>
    </>
  );
}

export default App;
