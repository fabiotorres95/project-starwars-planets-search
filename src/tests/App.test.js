import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';

beforeEach( async () => {
  global.fetch = () => {
    return Promise.resolve({
      json: () => Promise.resolve(testData),
    })
  }

  render(<App />)
});

describe('tests for App component', () => {
  it('check if the table appears on screen', async () => {
    const tatooine = await screen.findByText('Tatooine');
    const kamino = await screen.findByText('Kamino');
    const table = await screen.findAllByRole('row');

    expect(tatooine).toBeInTheDocument();
    expect(kamino).toBeInTheDocument();
    expect(table.length).toStrictEqual(11);
  })

  it('check if after applied a numerical filter, the table changes', async () => {
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const filter = screen.getByTestId('button-filter');
    
    const dagobah = await screen.findByText('Dagobah');
    expect(dagobah).toBeInTheDocument();
    
    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'maior que')
    userEvent.type(value, '10000');
    userEvent.click(filter);

    const table = await screen.findAllByRole('row');
    expect(table.length).toStrictEqual(8);
    expect(dagobah).not.toBeInTheDocument();
  })

  it('check if after applied multiple filters, the table changes correctly', async () => {
    const name = screen.getByTestId('name-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const filter = screen.getByTestId('button-filter');

    const hoth = await screen.findByText('Hoth');
    const bespin = await screen.findByText('Bespin');
    expect(hoth).toBeInTheDocument();
    expect(bespin).toBeInTheDocument();

    userEvent.selectOptions(column, 'surface_water');
    userEvent.selectOptions(comparison, 'menor que')
    userEvent.type(value, '10');
    userEvent.click(filter);

    const firstTable = await screen.findAllByRole('row');
    expect(hoth).not.toBeInTheDocument();
    expect(firstTable.length).toStrictEqual(6);

    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'igual a')
    userEvent.clear(value);
    userEvent.type(value, '402');
    userEvent.click(filter);

    const secondTable = await screen.findAllByRole('row');
    expect(bespin).not.toBeInTheDocument();
    expect(secondTable.length).toStrictEqual(2);

    userEvent.type(name, 't');
    const thirdTable = await screen.findAllByRole('row');
    expect(thirdTable.length).toStrictEqual(1);

    const deleteButtons = screen.getAllByText('delete');
    userEvent.click(deleteButtons[1]);
    const fourthTable = await screen.findAllByRole('row');
    expect(fourthTable.length).toStrictEqual(2);
  })

  it('check if remove all filters button works', async () => {
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const filter = screen.getByTestId('button-filter');

    userEvent.type(value, '2000');
    userEvent.click(filter);

    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(comparison, 'menor que')
    userEvent.clear(value);
    userEvent.type(value, '25');
    userEvent.click(filter);

    userEvent.selectOptions(comparison, 'igual a')
    userEvent.clear(value);
    userEvent.type(value, '5110');
    userEvent.click(filter);

    const bespin = await screen.findByText('Bespin');
    expect(bespin).toBeInTheDocument();

    const deleteButtons = screen.getAllByText('delete');
    userEvent.click(deleteButtons[1]);
  
    const deleteAll = screen.getByTestId('button-remove-filters');
    userEvent.click(deleteAll);
    const table = await screen.findAllByRole('row');
    expect(table.length).toStrictEqual(11);
  })
})
