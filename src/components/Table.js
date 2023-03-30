import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Table({ list }) {
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [compareFilter, setCompareFilter] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);
  const [activeFilter, setActiveFilter] = useState([]);
  const [remainingColumns, setRemainingColums] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [finalList, setFinalList] = useState([]);

  useEffect(() => {
    setFinalList(list);
  }, [list]);

  const handleFilter = (paramList) => {
    const final = paramList.filter((obj) => {
      let result = false;
      if (compareFilter === 'maior que') {
        result = obj[columnFilter] > numberFilter;
      } else if (compareFilter === 'menor que') {
        result = obj[columnFilter] < numberFilter;
      } else if (compareFilter === 'igual a') {
        result = parseInt(obj[columnFilter], 10) === numberFilter;
      }
      return result;
    });

    setFinalList(final);

    const ten = 10;
    const newArray = [];
    activeFilter.map((obj) => newArray.push(obj));
    newArray.push({
      column: columnFilter,
      compare: compareFilter,
      number: numberFilter.toString(ten),
    });

    setActiveFilter(newArray);

    const anotherArray = [];
    remainingColumns.map((string) => anotherArray.push(string));
    const result = anotherArray.filter((string) => string !== columnFilter);

    setRemainingColums(result);
    setColumnFilter(result[0]);
  };

  const filteredList = finalList.filter((obj) => obj.name.includes(nameFilter));

  const deleteAllFilters = () => {
    setFinalList(list);
    setActiveFilter([]);
    setRemainingColums([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  return (
    <>
      <br />
      <input
        data-testid="name-filter"
        placeholder="filter by name"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />

      <select
        data-testid="column-filter"
        onChange={ ({ target }) => { setColumnFilter(target.value); } }
      >
        {remainingColumns.map((string) => (
          <option key={ string } value={ string }>{string}</option>
        )) }
      </select>

      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => { setCompareFilter(target.value); } }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        data-testid="value-filter"
        type="number"
        value={ numberFilter }
        onChange={ ({ target }) => { setNumberFilter(parseInt(target.value, 10)); } }
      />

      <button
        data-testid="button-filter"
        onClick={ () => handleFilter(finalList) }
      >
        Filter
      </button>

      { activeFilter.map((obj) => (
        <div key={ obj.column + obj.compare + obj.number } data-testid="filter">
          <p>
            {obj.column}
            {' '}
            {obj.compare}
            {' '}
            {obj.number}
          </p>
          <button>delete</button>
        </div>
      ))}

      <button
        data-testid="button-remove-filters"
        onClick={ () => deleteAllFilters() }
      >
        Remove all filters
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((obj) => (
            <tr key={ obj.name }>
              <td>{obj.name}</td>
              <td>{obj.rotation_period}</td>
              <td>{obj.orbital_period}</td>
              <td>{obj.diameter}</td>
              <td>{obj.climate}</td>
              <td>{obj.gravity}</td>
              <td>{obj.terrain}</td>
              <td>{obj.surface_water}</td>
              <td>{obj.population}</td>
              <td>{obj.films}</td>
              <td>{obj.created}</td>
              <td>{obj.edited}</td>
              <td>{obj.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

Table.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Table;
