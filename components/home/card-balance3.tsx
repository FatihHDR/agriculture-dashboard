import {Card, Text} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';

export const CardClassificationScore = () => {
   return (
      <Card
         css={{
            mw: '375px',
            bg: '$green700',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}} align="center">
               <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5C15 6.10457 14.1046 7 13 7H11C9.89543 7 9 6.10457 9 5Z" stroke="white" strokeWidth="1.5"/>
                  <path d="M9 12H15" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M9 16H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
               </svg>
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}} weight="semibold">
                     Klasifikasi Teks
                  </Text>
                  <Text span css={{color: 'rgba(255,255,255,0.7)'}} size={'$xs'}>
                     TF-IDF + SVM
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
                  84.7%
               </Text>
               <Text span css={{color: '$green400'}} size={'$sm'}>
                  Accuracy
               </Text>
            </Flex>
            <Flex css={{gap: '$10'}} align={'center'}>
               <Flex direction="column">
                  <Text span size={'$xs'} css={{color: 'rgba(255,255,255,0.6)'}}>
                     Precision
                  </Text>
                  <Text span size={'$sm'} css={{color: 'white'}} weight="semibold">
                     84.1%
                  </Text>
               </Flex>
               <Flex direction="column">
                  <Text span size={'$xs'} css={{color: 'rgba(255,255,255,0.6)'}}>
                     Recall
                  </Text>
                  <Text span size={'$sm'} css={{color: 'white'}} weight="semibold">
                     84.7%
                  </Text>
               </Flex>
               <Flex direction="column">
                  <Text span size={'$xs'} css={{color: 'rgba(255,255,255,0.6)'}}>
                     F1-Score
                  </Text>
                  <Text span size={'$sm'} css={{color: 'white'}} weight="semibold">
                     84.3%
                  </Text>
               </Flex>
            </Flex>
         </Card.Body>
      </Card>
   );
};
