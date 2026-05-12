import {Table} from '@nextui-org/react';
import React from 'react';
import {Box} from '../styles/box';
import {columns, features} from './data';
import {RenderCell} from './render-cell';

export const TableWrapper = () => {
   return (
      <Box
         css={{
            '& .nextui-table-container': {
               boxShadow: 'none',
            },
         }}
      >
         <Table
            aria-label="Top 15 Fitur TF-IDF"
            css={{
               height: 'auto',
               minWidth: '100%',
               boxShadow: 'none',
               width: '100%',
               px: 0,
            }}
            selectionMode="single"
         >
            <Table.Header columns={columns}>
               {(column) => (
                  <Table.Column
                     key={column.uid}
                     align={column.uid === 'rank' ? 'center' : 'start'}
                  >
                     {column.name}
                  </Table.Column>
               )}
            </Table.Header>
            <Table.Body items={features}>
               {(item) => (
                  <Table.Row key={item.id}>
                     {(columnKey) => (
                        <Table.Cell>
                           {RenderCell({user: item, columnKey: columnKey})}
                        </Table.Cell>
                     )}
                  </Table.Row>
               )}
            </Table.Body>
         </Table>
      </Box>
   );
};
