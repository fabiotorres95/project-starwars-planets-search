import PropTypes from 'prop-types';
import { useState } from 'react';

function Table({ list }) {
  const [nameFilter, setNameFilter] = useState('');

  const filteredList = list.filter((obj) => obj.name.includes(nameFilter));

  return (
    <>
      <br />
      <input
        data-testid="name-filter"
        placeholder="filter by name"
        value={ nameFilter }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />

      <select data-testid="column-filter">
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select data-testid="comparison-filter">
        <option value="higher">maior que</option>
        <option value="lower">menor que</option>
        <option value="equals">igual a</option>
      </select>

      <input data-testid="value-filter" type="number" />

      <button data-testid="button-filter">Filter</button>

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
