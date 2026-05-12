import {Card, Text, Badge} from '@nextui-org/react';
import React from 'react';
import {Flex} from '../styles/flex';
import {pipelineSteps} from '../../lib/nlp-data';

export const CardPipelineStatus = () => {
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
                  Pipeline NLP
               </Text>
            </Flex>
            <Flex css={{gap: '$5'}} direction={'column'}>
               {pipelineSteps.map((step) => (
                  <Flex key={step.step} css={{gap: '$4'}} align={'center'} justify="between">
                     <Flex css={{gap: '$4'}} align={'center'}>
                        <Flex
                           align={'center'}
                           justify={'center'}
                           css={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: step.status === 'done' ? '$green500' : step.status === 'active' ? '$blue500' : '$accents3',
                              flexShrink: 0,
                           }}
                        >
                           <Text span size={'$xs'} css={{color: 'white'}} weight="semibold">
                              {step.step}
                           </Text>
                        </Flex>
                        <Flex direction={'column'}>
                           <Text span size={'$sm'} weight={'semibold'}>
                              {step.name}
                           </Text>
                           <Text span size={'$xs'} css={{color: '$accents7'}}>
                              {step.description}
                           </Text>
                        </Flex>
                     </Flex>
                     <Badge
                        variant="flat"
                        color={step.status === 'done' ? 'success' : step.status === 'active' ? 'primary' : 'default'}
                        size="xs"
                     >
                        {step.status === 'done' ? '✓' : step.status === 'active' ? 'Now' : '...'}
                     </Badge>
                  </Flex>
               ))}
            </Flex>
         </Card.Body>
      </Card>
   );
};
