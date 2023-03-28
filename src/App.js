import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';

function App() {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const api = await fetch('https://swapi.dev/api/planets');
    const data = await api.json();

    const newData = data.results.map((obj) => {
      delete obj.residents;
      return obj;
    });

    setList(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <span>Star Wars - Planets List</span>
      <Table list={ list } />
    </>
  );
}

export default App;
