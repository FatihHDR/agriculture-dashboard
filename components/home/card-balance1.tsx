import React from 'react';
import {Card, Text} from '@nextui-org/react';
import {Flex} from '../styles/flex';
import {datasetInfo} from '../../lib/nlp-data';

export const CardDatasetInfo = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$blue600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}} align="center">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C7.03 2 3 4.24 3 7V17C3 19.76 7.03 22 12 22C16.97 22 21 19.76 21 17V7C21 4.24 16.97 2 12 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 7C3 9.76 7.03 12 12 12C16.97 12 21 9.76 21 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12C3 14.76 7.03 17 12 17C16.97 17 21 14.76 21 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}} weight="semibold">
                     {datasetInfo.name}
                  </Text>
                  <Text span css={{color: 'rgba(255,255,255,0.7)'}} size={'$xs'}>
                     Dataset Pertanian
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
               <Text
                  span
                  size={'$xl'}
                  css={{color: 'white'}}
                  weight={'semibold'}
               >
                  {datasetInfo.totalDocsAugmented}
               </Text>
               <Text span css={{color: '$green400'}} size={'$sm'}>
                  +{datasetInfo.totalDocsAugmented - datasetInfo.totalDocs} augmented
               </Text>
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
               <Flex direction="column">
                  <Text span size={'$xs'} css={{color: 'rgba(255,255,255,0.6)'}}>
                     Dokumen Asli
                  </Text>
                  <Text span size={'$sm'} css={{color: 'white'}} weight="semibold">
                     {datasetInfo.totalDocs}
                  </Text>
               </Flex>
               <Flex direction="column">
                  <Text span size={'$xs'} css={{color: 'rgba(255,255,255,0.6)'}}>
                     Kategori
                  </Text>
                  <Text span size={'$sm'} css={{color: 'white'}} weight="semibold">
                     {datasetInfo.categories}
                  </Text>
               </Flex>
               <Flex direction="column">
                  <Text span size={'$xs'} css={{color: 'rgba(255,255,255,0.6)'}}>
                     Fitur TF-IDF
                  </Text>
                  <Text span size={'$sm'} css={{color: 'white'}} weight="semibold">
                     1000
                  </Text>
               </Flex>
            </Flex>
         </Card.Body>
      </Card>
   );
};
