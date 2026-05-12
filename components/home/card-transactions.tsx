import {Card, Text, Progress} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import {embeddingModels} from '../../lib/nlp-data';

export const CardEmbeddingStats = () => {
   return (
      <Card
         css={{
            mw: '375px',
            height: 'auto',
            bg: '$accents0',
            borderRadius: '$xl',
            justifyContent: 'start',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5', pb: '$4'}} justify={'center'}>
               <Text h3 css={{textAlign: 'center'}}>
                  Model Embedding
               </Text>
            </Flex>
            <Flex css={{gap: '$6'}} direction={'column'}>
               {embeddingModels.map((model) => (
                  <Flex key={model.name} css={{gap: '$3'}} direction={'column'}>
                     <Flex align={'center'} justify={'between'}>
                        <Flex css={{gap: '$3'}} align={'center'}>
                           <Flex
                              css={{
                                 width: '10px',
                                 height: '10px',
                                 borderRadius: '50%',
                                 background: model.color,
                                 flexShrink: 0,
                              }}
                           />
                           <Text span size={'$sm'} weight={'semibold'}>
                              {model.shortName}
                           </Text>
                        </Flex>
                        <Text span size={'$xs'} css={{color: '$accents7'}}>
                           {model.dimensions}D · {model.docs} docs
                        </Text>
                     </Flex>
                     <Text span size={'$xs'} css={{color: '$accents6'}}>
                        {model.description}
                     </Text>
                     <Progress
                        value={100}
                        color="primary"
                        size="xs"
                        css={{
                           '& .nextui-progress-bar': {
                              background: model.color,
                           },
                        }}
                     />
                  </Flex>
               ))}
            </Flex>
         </Card.Body>
      </Card>
   );
};
