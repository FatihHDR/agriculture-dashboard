import type {NextPage} from 'next';
import React from 'react';
import {Text, Card, Badge} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import {topFeaturesTFIDF, categoryDistribution, augmentationImpact} from '../lib/nlp-data';
import dynamic from 'next/dynamic';

const TopFeaturesChart = dynamic(
   () => import('../components/charts/top-features-chart').then((mod) => mod.TopFeaturesChart),
   {ssr: false}
);

const FeaturesPage: NextPage = () => {
   return (
      <Box css={{overflow: 'hidden', height: '100%', py: '$10', px: '$12'}}>
         <Text h2 css={{mb: '$2'}}>Ekstraksi Fitur</Text>
         <Text css={{color: '$accents7', mb: '$10'}}>
            Analisis fitur TF-IDF, BoW, dan dampak augmentasi data pada dataset ICAR Agriculture
         </Text>

         {/* Stats row */}
         <Flex css={{gap: '$8', flexWrap: 'wrap', mb: '$12'}} direction={'row'}>
            {[
               {label: 'Total Fitur TF-IDF', value: '1,000', sub: 'Fitur dipilih', color: '#6366f1'},
               {label: 'Fitur Teratas', value: 'yield', sub: 'Score: 0.04536', color: '#8b5cf6'},
               {label: 'Metode Seleksi', value: 'Mean TF-IDF', sub: 'Top-k selection', color: '#06b6d4'},
               {label: 'N-gram Range', value: '(1,2)', sub: 'Unigram + Bigram', color: '#10b981'},
            ].map((stat) => (
               <Card
                  key={stat.label}
                  css={{
                     flex: '1',
                     minWidth: '180px',
                     borderRadius: '$xl',
                     bg: '$accents0',
                     borderTop: `3px solid ${stat.color}`,
                  }}
               >
                  <Card.Body css={{py: '$8', px: '$8'}}>
                     <Text css={{
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: stat.color,
                        lineHeight: 1,
                        mb: '$2',
                     }}>
                        {stat.value}
                     </Text>
                     <Text b css={{color: '$accents9', fontSize: '$sm', mb: '$1'}}>
                        {stat.label}
                     </Text>
                     <Text css={{color: '$accents6', fontSize: '$xs'}}>
                        {stat.sub}
                     </Text>
                  </Card.Body>
               </Card>
            ))}
         </Flex>

         {/* Top Features Chart */}
         <Text h3 css={{mb: '$6'}}>Top 15 Fitur berdasarkan Mean TF-IDF Score</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12'}}>
            <Card.Body css={{py: '$6', px: '$6'}}>
               <TopFeaturesChart />
            </Card.Body>
         </Card>

         {/* Augmentation impact */}
         <Text h3 css={{mb: '$4'}}>Dampak Augmentasi pada Distribusi Fitur</Text>
         <Text css={{color: '$accents7', mb: '$8', fontSize: '$sm'}}>
            Perbandingan jumlah kemunculan fitur sebelum dan sesudah augmentasi back-translation
         </Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12'}}>
            <Card.Body css={{p: 0, overflow: 'hidden'}}>
               <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif'}}>
                  <thead>
                     <tr style={{borderBottom: '1px solid var(--nextui-colors-border)'}}>
                        {['Fitur', 'N-gram', 'Sebelum', 'Sesudah', 'Perubahan', 'Trend'].map((h) => (
                           <th key={h} style={{
                              padding: '14px 20px',
                              textAlign: 'left',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: 'var(--nextui-colors-accents7)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                           }}>
                              {h}
                           </th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {augmentationImpact.map((row, i) => (
                        <tr
                           key={row.feature}
                           style={{
                              borderBottom: i < augmentationImpact.length - 1 ? '1px solid var(--nextui-colors-border)' : 'none',
                           }}
                        >
                           <td style={{padding: '14px 20px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--nextui-colors-accents9)'}}>
                              {row.feature}
                           </td>
                           <td style={{padding: '14px 20px'}}>
                              <span style={{
                                 padding: '2px 8px',
                                 borderRadius: '8px',
                                 fontSize: '11px',
                                 background: 'rgba(6, 182, 212, 0.1)',
                                 color: '#06b6d4',
                                 fontWeight: 600,
                              }}>
                                 {row.ngramSize}-gram
                              </span>
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)'}}>
                              {row.before}
                           </td>
                           <td style={{padding: '14px 20px', fontWeight: 600, color: 'var(--nextui-colors-accents9)'}}>
                              {row.after}
                           </td>
                           <td style={{padding: '14px 20px'}}>
                              <span style={{
                                 fontWeight: 700,
                                 color: row.change > 100 ? '#ef4444' : '#10b981',
                              }}>
                                 +{row.change.toFixed(1)}%
                              </span>
                           </td>
                           <td style={{padding: '14px 20px'}}>
                              <Box css={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '6px',
                              }}>
                                 <Box css={{
                                    flex: 1,
                                    height: '6px',
                                    bg: '$accents2',
                                    borderRadius: '$full',
                                    overflow: 'hidden',
                                    maxWidth: '80px',
                                 }}>
                                    <Box css={{
                                       width: `${Math.min(row.change / 3, 100)}%`,
                                       height: '100%',
                                       background: row.change > 100 ? '#ef4444' : '#10b981',
                                       borderRadius: '$full',
                                    }} />
                                 </Box>
                              </Box>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card.Body>
         </Card>

         {/* BoW Info */}
         <Card css={{
            borderRadius: '$xl',
            bg: '$accents0',
            border: '1px solid $accents2',
         }}>
            <Card.Body css={{py: '$6', px: '$8'}}>
               <Text b css={{mb: '$3', color: '$accents9'}}>Tentang Ekstraksi Fitur</Text>
               <Flex css={{gap: '$8', flexWrap: 'wrap'}}>
                  <Flex direction={'column'} css={{flex: 1, minWidth: '200px', gap: '$2'}}>
                     <Text b css={{color: '$accents8', fontSize: '$sm'}}>TF-IDF</Text>
                     <Text css={{color: '$accents6', fontSize: '$xs', lineHeight: 1.6}}>
                        Term Frequency-Inverse Document Frequency. Mengukur kepentingan kata 
                        dalam dokumen relatif terhadap seluruh corpus. 1000 fitur teratas dipilih.
                     </Text>
                  </Flex>
                  <Flex direction={'column'} css={{flex: 1, minWidth: '200px', gap: '$2'}}>
                     <Text b css={{color: '$accents8', fontSize: '$sm'}}>Bag of Words (BoW)</Text>
                     <Text css={{color: '$accents6', fontSize: '$xs', lineHeight: 1.6}}>
                        Representasi teks berdasarkan frekuensi kemunculan kata. 
                        Digunakan bersama n-gram (1,2) untuk menangkap konteks antar kata.
                     </Text>
                  </Flex>
                  <Flex direction={'column'} css={{flex: 1, minWidth: '200px', gap: '$2'}}>
                     <Text b css={{color: '$accents8', fontSize: '$sm'}}>N-gram Analysis</Text>
                     <Text css={{color: '$accents6', fontSize: '$xs', lineHeight: 1.6}}>
                        Analisis unigram dan bigram untuk menangkap pasangan kata yang sering 
                        muncul bersama dan meningkatkan konteks fitur teks.
                     </Text>
                  </Flex>
               </Flex>
            </Card.Body>
         </Card>
      </Box>
   );
};

export default FeaturesPage;
