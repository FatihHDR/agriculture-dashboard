import React from 'react';
import {Text} from '@nextui-org/react';
import {Box} from '../styles/box';
import dynamic from 'next/dynamic';
import {Flex} from '../styles/flex';
import {TableWrapper} from '../table/table';
import {CardDatasetInfo} from './card-balance1';
import {CardEmbeddingModels} from './card-balance2';
import {CardClassificationScore} from './card-balance3';
import {CardPipelineStatus} from './card-agents';
import {CardEmbeddingStats} from './card-transactions';

const Chart = dynamic(
   () => import('../charts/steam').then((mod) => mod.CategoryDistributionChart),
   {
      ssr: false,
   }
);

export const Content = () => (
   <Box css={{overflow: 'hidden', height: '100%'}}>
      <Flex
         css={{
            'gap': '$8',
            'pt': '$5',
            'height': 'fit-content',
            'flexWrap': 'wrap',
            '@lg': {
               flexWrap: 'nowrap',
            },
            '@sm': {
               pt: '$10',
            },
         }}
         justify={'center'}
      >
         <Flex
            css={{
               'px': '$12',
               'mt': '$8',
               '@xsMax': {px: '$10'},
               'gap': '$12',
            }}
            direction={'column'}
         >
            {/* Card Section Top */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@sm': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Ringkasan Pipeline NLP
               </Text>
               <Flex
                  css={{
                     'gap': '$10',
                     'flexWrap': 'wrap',
                     'justifyContent': 'center',
                     '@sm': {
                        flexWrap: 'nowrap',
                     },
                  }}
                  direction={'row'}
               >
                  <CardDatasetInfo />
                  <CardEmbeddingModels />
                  <CardClassificationScore />
               </Flex>
            </Box>

            {/* Chart */}
            <Box>
               <Text
                  h3
                  css={{
                     'textAlign': 'center',
                     '@lg': {
                        textAlign: 'inherit',
                     },
                  }}
               >
                  Distribusi Kategori Dataset
               </Text>
               <Box
                  css={{
                     width: '100%',
                     backgroundColor: '$accents0',
                     boxShadow: '$lg',
                     borderRadius: '$2xl',
                     px: '$10',
                     py: '$10',
                  }}
               >
                  <Chart />
               </Box>
            </Box>
         </Flex>

         {/* Right Section */}
         <Box
            css={{
               'px': '$12',
               'mt': '$8',
               'height': 'fit-content',
               '@xsMax': {px: '$10'},
               'gap': '$6',
               'overflow': 'hidden',
            }}
         >
            <Text
               h3
               css={{
                  'textAlign': 'center',
                  '@lg': {
                     textAlign: 'inherit',
                  },
               }}
            >
               Detail Model
            </Text>
            <Flex
               direction={'column'}
               justify={'center'}
               css={{
                  'gap': '$8',
                  'flexDirection': 'row',
                  'flexWrap': 'wrap',
                  '@sm': {
                     flexWrap: 'nowrap',
                  },
                  '@lg': {
                     flexWrap: 'nowrap',
                     flexDirection: 'column',
                  },
               }}
            >
               <CardPipelineStatus />
               <CardEmbeddingStats />
            </Flex>
         </Box>
      </Flex>

      {/* Top TF-IDF Features Table */}
      <Flex
         direction={'column'}
         justify={'center'}
         css={{
            'width': '100%',
            'py': '$10',
            'px': '$10',
            'mt': '$8',
            '@sm': {px: '$20'},
         }}
      >
         <Flex justify={'between'} wrap={'wrap'}>
            <Text
               h3
               css={{
                  'textAlign': 'center',
                  '@lg': {
                     textAlign: 'inherit',
                  },
               }}
            >
               Top 15 Fitur TF-IDF
            </Text>
         </Flex>
         <TableWrapper />
      </Flex>
   </Box>
);
