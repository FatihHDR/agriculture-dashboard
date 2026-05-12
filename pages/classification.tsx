import type {NextPage} from 'next';
import React from 'react';
import {Text, Card, Badge} from '@nextui-org/react';
import {Box} from '../components/styles/box';
import {Flex} from '../components/styles/flex';
import {classificationResults, categoryDistribution} from '../lib/nlp-data';
import dynamic from 'next/dynamic';
import {TextClassifier} from '../components/home/text-classifier';

const ClassificationMetricsChart = dynamic(
   () => import('../components/charts/classification-metrics-chart').then((mod) => mod.ClassificationMetricsChart),
   {ssr: false}
);

const ClassificationPage: NextPage = () => {
   const {tfidf} = classificationResults;
   const metrics = [
      {label: 'Accuracy', value: tfidf.accuracy, color: '#6366f1'},
      {label: 'Precision', value: tfidf.precision, color: '#8b5cf6'},
      {label: 'Recall', value: tfidf.recall, color: '#06b6d4'},
      {label: 'F1-Score', value: tfidf.f1Score, color: '#10b981'},
   ];

   return (
      <Box css={{overflow: 'hidden', height: '100%', py: '$10', px: '$12'}}>
         <Text h2 css={{mb: '$2'}}>Hasil Klasifikasi</Text>
         <Text css={{color: '$accents7', mb: '$10'}}>
            Evaluasi performa model klasifikasi teks pada dataset ICAR Agriculture
         </Text>

         {/* ── Text Classification Playground ── */}
         <Text h3 css={{mb: '$2'}}>🧪 Classification Playground</Text>
         <Text css={{color: '$accents7', mb: '$6', fontSize: '$sm'}}>
            Masukkan kalimat bebas — model akan menentukan kategorinya secara otomatis.
         </Text>
         <TextClassifier />

         {/* Divider */}
         <Box css={{my: '$12', borderTop: '1px solid $accents2'}} />

         {/* Overall Metrics */}
         <Text h3 css={{mb: '$6'}}>Metrik Keseluruhan — TF-IDF + SVM</Text>
         <Flex css={{gap: '$8', flexWrap: 'wrap', mb: '$12'}} direction={'row'}>
            {metrics.map((m) => (
               <Card
                  key={m.label}
                  css={{
                     flex: '1',
                     minWidth: '180px',
                     borderRadius: '$xl',
                     bg: '$accents0',
                     borderTop: `3px solid ${m.color}`,
                  }}
               >
                  <Card.Body css={{py: '$8', px: '$8', textAlign: 'center'}}>
                     <Text
                        css={{
                           fontSize: '2.5rem',
                           fontWeight: 700,
                           background: `linear-gradient(135deg, ${m.color}, ${m.color}99)`,
                           WebkitBackgroundClip: 'text',
                           WebkitTextFillColor: 'transparent',
                           lineHeight: 1,
                           mb: '$2',
                        }}
                     >
                        {(m.value * 100).toFixed(1)}%
                     </Text>
                     <Text css={{color: '$accents6', fontSize: '$sm'}}>
                        {m.label}
                     </Text>
                     {/* Progress bar */}
                     <Box css={{mt: '$4', bg: '$accents2', borderRadius: '$full', height: '6px', overflow: 'hidden'}}>
                        <Box
                           css={{
                              height: '100%',
                              width: `${m.value * 100}%`,
                              background: m.color,
                              borderRadius: '$full',
                           }}
                        />
                     </Box>
                  </Card.Body>
               </Card>
            ))}
         </Flex>

         {/* Per-class metrics chart */}
         <Text h3 css={{mb: '$6'}}>Metrik Per Kelas</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12'}}>
            <Card.Body css={{py: '$6', px: '$6'}}>
               <ClassificationMetricsChart />
            </Card.Body>
         </Card>

         {/* Per-class Table */}
         <Text h3 css={{mb: '$6'}}>Detail Klasifikasi Per Kelas</Text>
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$12'}}>
            <Card.Body css={{p: 0, overflow: 'hidden'}}>
               <table style={{width: '100%', borderCollapse: 'collapse', fontFamily: 'Inter, sans-serif'}}>
                  <thead>
                     <tr style={{borderBottom: '1px solid var(--nextui-colors-border)'}}>
                        {['Kelas', 'Precision', 'Recall', 'F1-Score', 'Support', 'Status'].map((h) => (
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
                     {tfidf.perClass.map((cls, i) => (
                        <tr
                           key={cls.label}
                           style={{
                              borderBottom: i < tfidf.perClass.length - 1 ? '1px solid var(--nextui-colors-border)' : 'none',
                           }}
                        >
                           <td style={{padding: '14px 20px'}}>
                              <Flex align={'center'} css={{gap: '$3'}}>
                                 <Box css={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    background: categoryDistribution.find(c => c.name === cls.label || cls.label.includes(c.name.split(' ')[0]))?.color || '#6366f1',
                                    flexShrink: 0,
                                 }} />
                                 <span style={{fontWeight: 600, color: 'var(--nextui-colors-accents9)', fontSize: '13px'}}>
                                    {cls.label}
                                 </span>
                              </Flex>
                           </td>
                           <td style={{padding: '14px 20px'}}>
                              <Flex align={'center'} css={{gap: '$3'}}>
                                 <span style={{fontWeight: 600, color: 'var(--nextui-colors-accents9)'}}>
                                    {(cls.precision * 100).toFixed(0)}%
                                 </span>
                                 <Box css={{width: '60px', height: '4px', bg: '$accents2', borderRadius: '$full', overflow: 'hidden'}}>
                                    <Box css={{width: `${cls.precision * 100}%`, height: '100%', background: '#6366f1', borderRadius: '$full'}} />
                                 </Box>
                              </Flex>
                           </td>
                           <td style={{padding: '14px 20px'}}>
                              <Flex align={'center'} css={{gap: '$3'}}>
                                 <span style={{fontWeight: 600, color: 'var(--nextui-colors-accents9)'}}>
                                    {(cls.recall * 100).toFixed(0)}%
                                 </span>
                                 <Box css={{width: '60px', height: '4px', bg: '$accents2', borderRadius: '$full', overflow: 'hidden'}}>
                                    <Box css={{width: `${cls.recall * 100}%`, height: '100%', background: '#10b981', borderRadius: '$full'}} />
                                 </Box>
                              </Flex>
                           </td>
                           <td style={{padding: '14px 20px', fontWeight: 700, color: 'var(--nextui-colors-accents9)'}}>
                              {(cls.f1 * 100).toFixed(0)}%
                           </td>
                           <td style={{padding: '14px 20px', color: 'var(--nextui-colors-accents7)'}}>
                              {cls.support}
                           </td>
                           <td style={{padding: '14px 20px'}}>
                              <span style={{
                                 padding: '3px 10px',
                                 borderRadius: '12px',
                                 fontSize: '11px',
                                 fontWeight: 600,
                                 background: cls.f1 >= 0.85 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                                 color: cls.f1 >= 0.85 ? '#10b981' : '#f59e0b',
                              }}>
                                 {cls.f1 >= 0.85 ? 'Sangat Baik' : 'Baik'}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </Card.Body>
         </Card>

         {/* Confusion matrix note */}
         <Card css={{borderRadius: '$xl', bg: 'linear-gradient(135deg, #6366f110, #8b5cf610)', border: '1px solid #6366f130'}}>
            <Card.Body css={{py: '$6', px: '$8'}}>
               <Text b css={{mb: '$2', color: '$accents9'}}>ℹ️ Catatan Metodologi</Text>
               <Text css={{color: '$accents7', fontSize: '$sm', lineHeight: 1.6}}>
                  Hasil klasifikasi di atas menggunakan metode <strong>TF-IDF dengan 1000 fitur terpilih</strong> 
                  dikombinasikan dengan classifier SVM (Support Vector Machine). 
                  Dataset telah di-augmentasi menggunakan <strong>back-translation</strong> (ID→EN→ID) untuk menyeimbangkan 
                  distribusi kelas dari 159 menjadi 324 dokumen (54 per kelas).
               </Text>
            </Card.Body>
         </Card>
      </Box>
   );
};

export default ClassificationPage;
