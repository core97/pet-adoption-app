'use client';

import { useState, useMemo } from 'react';
import debounce from 'just-debounce-it';
import {
  Box,
  Button,
  Input,
  Table as TableChakra,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  TableContainer,
} from '@chakra-ui/react';
import { TableProps, RowType } from './Table.interface';

export const Table = <T extends Record<string, RowType>>({
  columns,
  rows,
  total,
  enableGlobalFilter,
  isLoading,
  onClickRow,
  onChangePage,
  page,
}: TableProps<T>) => {
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState<{
    column: keyof T;
    type: 'desc' | 'asc';
    icon?: '🔼' | '🔽';
  }>();

  const totalPages = Math.ceil(Number(total) / rows.length);

  const handleClickColumn = (column: keyof T) => {
    setSorting(prev => {
      if (!prev || prev.column !== column) {
        return {
          column,
          type: 'asc',
          icon: '🔼',
        };
      }

      if (prev.type === 'asc') {
        return {
          column,
          type: 'desc',
          icon: '🔽',
        };
      }

      return undefined;
    });
  };

  const validRows = useMemo(() => {
    let updatedRows = rows.filter(row =>
      Object.values(row).join().toLowerCase().includes(query.toLowerCase())
    );

    if (sorting) {
      updatedRows = updatedRows.sort((a, b) => {
        if (sorting.type === 'asc') {
          return a[sorting.column] >= b[sorting.column] ? 1 : -1;
        }

        return a[sorting.column] >= b[sorting.column] ? -1 : 1;
      });
    }

    return updatedRows;
  }, [query, rows, sorting]);

  if (isLoading && !rows.length) {
    return <p>Cargando...</p>;
  }

  if (!isLoading && !rows.length) {
    return <p>No hay resultados</p>;
  }

  return (
    <TableContainer width="100%">
      {enableGlobalFilter && (
        <Input
          name="searcher"
          placeholder="Buscar"
          onChange={e => debounce(() => setQuery(e.target.value), 1000)}
        />
      )}
      <TableChakra mt={4}>
        <Thead>
          <Tr>
            {columns.map(column => (
              <Th
                key={column.toString()}
                onClick={() => handleClickColumn(column)}
                _hover={{ cursor: 'pointer' }}
              >
                {`${
                  sorting?.column === column ? sorting.icon : ' '
                } ${column.toString()}`}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {validRows.map((row, index) => (
            <Tr
              key={index}
              onClick={() => onClickRow?.(row)}
              transition="background 0.2s ease-out"
              _hover={{ cursor: 'pointer', backgroundColor: '#edf2f7' }}
            >
              {columns.map(column => (
                <Td key={column.toString()}>{row[column].toString()}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </TableChakra>
      <Box as="footer" mt={4}>
        {typeof page === 'number' && onChangePage && (
          <>
            <Button
              type="button"
              disabled={page === 0}
              onClick={() => onChangePage(page - 1)}
            >
              Anterior
            </Button>
            <Button
              type="button"
              disabled={page >= totalPages}
              onClick={() => onChangePage(page + 1)}
            >
              Siguiente
            </Button>
          </>
        )}
      </Box>
    </TableContainer>
  );
};
