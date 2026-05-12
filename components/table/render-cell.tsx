import {Col, Row, Text, Tooltip, Badge} from '@nextui-org/react';
import React from 'react';
import {features} from './data';
import {StyledBadge} from './table.styled';

interface Props {
   user: typeof features[number];
   columnKey: string | React.Key;
}

export const RenderCell = ({user, columnKey}: Props) => {
   switch (columnKey) {
      case 'rank':
         return (
            <Text b size={14} css={{color: '$accents7', textAlign: 'center'}}>
               #{user.id}
            </Text>
         );
      case 'feature':
         return (
            <Col>
               <Row>
                  <Text
                     b
                     size={14}
                     css={{
                        fontFamily: 'monospace',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '0.05em',
                     }}
                  >
                     {user.feature}
                  </Text>
               </Row>
            </Col>
         );
      case 'score':
         return (
            <Col>
               <Row>
                  <Text b size={14} css={{color: '$accents9', fontVariantNumeric: 'tabular-nums'}}>
                     {user.score.toFixed(5)}
                  </Text>
               </Row>
               <Row>
                  <div style={{
                     width: `${(user.score / 0.046) * 100}%`,
                     height: '4px',
                     borderRadius: '2px',
                     background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
                     marginTop: '4px',
                     transition: 'width 0.3s ease',
                  }} />
               </Row>
            </Col>
         );
      case 'relevance':
         return (
            // @ts-ignore
            <StyledBadge type={user.relevance === 'high' ? 'active' : 'paused'}>
               {user.relevance === 'high' ? 'Tinggi' : 'Sedang'}
            </StyledBadge>
         );
      default:
         // @ts-ignore
         return user[columnKey];
   }
};
