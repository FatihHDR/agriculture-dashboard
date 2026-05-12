import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import {embeddingModels} from '../../lib/nlp-data';

export const CardEmbeddingModels = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$purple600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}} align="center">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="5" r="2" stroke="white" strokeWidth="1.5"/>
                  <circle cx="19" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="19" r="2" stroke="white" strokeWidth="1.5"/>
                  <circle cx="12" cy="12" r="2" stroke="white" strokeWidth="1.5"/>
                  <line x1="7" y1="12" x2="10" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="14" y1="12" x2="17" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="12" y1="7" x2="12" y2="10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="12" y1="14" x2="12" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
               </svg>
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}} weight="semibold">
                     Word Embeddings
                  </Text>
                  <Text span css={{color: 'rgba(255,255,255,0.7)'}} size={'$xs'}>
                     Model Representasi Vektor
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
                  {embeddingModels.length}
               </Text>
               <Text span css={{color: 'rgba(255,255,255,0.7)'}} size={'$sm'}>
                  Model Diimplementasikan
               </Text>
            </Flex>
            <Flex css={{gap: '$8', flexWrap: 'wrap'}} align={'center'}>
               {embeddingModels.map((m) => (
                  <Box key={m.shortName}>
                     <Text span size={'$xs'} css={{color: 'rgba(255,255,255,0.6)'}}>
                        {m.shortName}
                     </Text>
                  </Box>
               ))}
            </Flex>
         </Card.Body>
      </Card>
   );
};
