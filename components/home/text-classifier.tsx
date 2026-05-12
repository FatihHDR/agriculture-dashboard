import React, { useState, useCallback } from 'react';
import { Card, Text, Button, Textarea, Loading } from '@nextui-org/react';
import { Box } from '../styles/box';
import { Flex } from '../styles/flex';
import { categoryDistribution } from '../../lib/nlp-data';

interface ClassScore {
   label: string;
   probability: number;
   color: string;
}

// ──────────────────────────────────────────────────────────────────────
// UI Component
// ──────────────────────────────────────────────────────────────────────
const EXAMPLES: { label: string; text: string }[] = [
   {
      label: "Indian Farming",
      text: "Guidelines for authors regarding Indian Farming, focusing on crop cultivation and agricultural practices.",
   },
   {
      label: "Indian Horticulture",
      text: "Advancements in horticulture, including fruit orchards, vegetables, and new tomato cultivation techniques.",
   },
   {
      label: "Books",
      text: "This book publication reflects on startups in agricultural research, featuring multiple chapters and indexes.",
   },
   {
      label: "Traditional Knowledge",
      text: "Tribal farmers in the district use traditional knowledge and local plant leaves for water treatment.",
   },
   {
      label: "Annual Reports",
      text: "new wheat variety developed high yield resistant disease maturity days suitable madhya pradesh farmers production",
   },
];

export const TextClassifier = () => {
   const [inputText, setInputText] = React.useState('');
   const [loading, setLoading] = React.useState(false);
   const [results, setResults] = React.useState<ClassScore[] | null>(null);
   const [charCount, setCharCount] = React.useState(0);
   const [method, setMethod] = React.useState('tfidf');

   const handleClassify = useCallback(async () => {
      if (!inputText.trim()) return;
      setLoading(true);

      try {
         const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001';
         const response = await fetch(`${apiUrl}/classify`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText, method }),
         });

         if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
         }

         const data = await response.json();
         const colorMap: Record<string, string> = {
            'Books': '#6366f1',
            'Reports': '#8b5cf6',
            'Indian Farming': '#06b6d4',
            'Indian Horticulture': '#10b981',
            'Annual Reports': '#f59e0b',
            'Traditional Knowledge in Agriculture': '#ec4899',
            'Traditional Knowledge': '#ec4899'
         };
         
         const mappedScores = data.scores.map((score: ClassScore) => ({
            ...score,
            color: colorMap[score.label] || score.color
         }));
         setResults(mappedScores);
      } catch (error) {
         console.error('Error classifying text:', error);
         setResults([]); // Empty array signals failed/no result
      } finally {
         setLoading(false);
      }
   }, [inputText, method]);

   const handleExample = (text: string) => {
      setInputText(text);
      setCharCount(text.length);
      setResults(null);
   };

   const handleReset = () => {
      setInputText('');
      setCharCount(0);
      setResults(null);
   };

   const topResult = results?.[0];
   const hasResult = results !== null && results.length > 0;

   return (
      <Box>
         {/* Input area */}
         <Card css={{ borderRadius: '$xl', bg: '$accents0', mb: '$6', border: '1px solid $accents2' }}>
            <Card.Body css={{ py: '$6', px: '$8' }}>
               <Flex align={'center'} justify={'between'} css={{ mb: '$4' }}>
                  <Text b css={{ color: '$accents9', fontSize: '$md' }}>Teks Input</Text>
                  <Flex align={'center'} css={{ gap: '$4' }}>
                     <select
                        value={method}
                        onChange={(e) => {
                           setMethod(e.target.value);
                           setResults(null);
                        }}
                        style={{
                           padding: '6px 12px',
                           borderRadius: '8px',
                           border: '1px solid var(--nextui-colors-border)',
                           background: 'var(--nextui-colors-accents1)',
                           color: 'var(--nextui-colors-accents9)',
                           fontSize: '12px',
                           outline: 'none',
                           fontFamily: 'Montserrat, sans-serif',
                           cursor: 'pointer',
                        }}
                     >
                        <option value="tfidf">TF-IDF + SVM</option>
                        <option value="fasttext">FastText + SVM</option>
                        <option value="nb-tfidf">TF-IDF + Naive Bayes</option>
                     </select>
                     <Text span css={{ color: '$accents6', fontSize: '$xs' }}>{charCount} karakter</Text>
                  </Flex>
               </Flex>

               {/* Textarea wrapper using plain HTML since NextUI Textarea has controlled issues */}
               <Box css={{ position: 'relative', mb: '$4' }}>
                  <textarea
                     id="classifier-input"
                     value={inputText}
                     onChange={(e) => {
                        setInputText(e.target.value);
                        setCharCount(e.target.value.length);
                        setResults(null);
                     }}
                     placeholder="Ketik atau paste kalimat di sini untuk diklasifikasikan..."
                     rows={5}
                     style={{
                        width: '100%',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid var(--nextui-colors-border)',
                        background: 'var(--nextui-colors-accents1)',
                        color: 'var(--nextui-colors-accents9)',
                        fontSize: '14px',
                        lineHeight: 1.6,
                        resize: 'vertical',
                        fontFamily: 'Montserrat, sans-serif',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                     }}
                     onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                     onBlur={(e) => (e.target.style.borderColor = 'var(--nextui-colors-border)')}
                  />
               </Box>

               {/* Example chips */}
               <Text css={{ color: '$accents6', fontSize: '$xs', mb: '$2' }}>Contoh Kalimat:</Text>
               <Flex css={{ gap: '$2', flexWrap: 'wrap', mb: '$6' }}>
                  {EXAMPLES.map((ex, i) => (
                     <button
                        key={i}
                        onClick={() => handleExample(ex.text)}
                        style={{
                           padding: '4px 12px',
                           borderRadius: '20px',
                           border: '1px solid var(--nextui-colors-border)',
                           background: 'var(--nextui-colors-accents2)',
                           color: 'var(--nextui-colors-accents7)',
                           fontSize: '11px',
                           cursor: 'pointer',
                           fontFamily: 'Montserrat, sans-serif',
                           transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                           (e.target as HTMLElement).style.background = '#6366f120';
                           (e.target as HTMLElement).style.borderColor = '#6366f1';
                           (e.target as HTMLElement).style.color = '#6366f1';
                        }}
                        onMouseLeave={(e) => {
                           (e.target as HTMLElement).style.background = 'var(--nextui-colors-accents2)';
                           (e.target as HTMLElement).style.borderColor = 'var(--nextui-colors-border)';
                           (e.target as HTMLElement).style.color = 'var(--nextui-colors-accents7)';
                        }}
                     >
                        {ex.label}
                     </button>
                  ))}
               </Flex>

               {/* Action buttons */}
               <Flex css={{ gap: '$3' }} align={'center'}>
                  <button
                     id="classify-btn"
                     onClick={handleClassify}
                     disabled={!inputText.trim() || loading}
                     style={{
                        padding: '10px 28px',
                        borderRadius: '10px',
                        border: 'none',
                        background: inputText.trim() && !loading
                           ? '#3b82f6'
                           : 'var(--nextui-colors-accents3)',
                        color: inputText.trim() && !loading ? 'white' : 'var(--nextui-colors-accents6)',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: inputText.trim() && !loading ? 'pointer' : 'not-allowed',
                        fontFamily: 'Montserrat, sans-serif',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                     }}
                  >
                     {loading ? 'Menganalisis...' : 'Prediksi Kelas'}
                  </button>
                  {results !== null && (
                     <button
                        onClick={handleReset}
                        style={{
                           padding: '10px 20px',
                           borderRadius: '10px',
                           border: '1px solid var(--nextui-colors-border)',
                           background: 'transparent',
                           color: 'var(--nextui-colors-accents7)',
                           fontSize: '14px',
                           cursor: 'pointer',
                           fontFamily: 'Montserrat, sans-serif',
                        }}
                     >
                        Hapus
                     </button>
                  )}
               </Flex>
            </Card.Body>
         </Card>

         {/* Result area */}
         {loading && (
            <Card css={{ borderRadius: '$xl', bg: '$accents0', border: '1px solid $accents2' }}>
               <Card.Body css={{ py: '$10', textAlign: 'center' }}>
                  <Flex justify={'center'} align={'center'} direction={'column'} css={{ gap: '$4' }}>
                     <Loading size="lg" color="secondary" />
                     <Text css={{ color: '$accents6' }}>Model sedang memproses teks...</Text>
                  </Flex>
               </Card.Body>
            </Card>
         )}

         {!loading && results !== null && (
            <Card
               css={{
                  borderRadius: '$xl',
                  bg: '$accents0',
                  border: hasResult ? `1px solid ${topResult!.color}40` : '1px solid $accents2',
               }}
            >
               <Card.Body css={{ py: '$6', px: '$8' }}>
                  {/* Prediction Header */}
                  {hasResult ? (
                     <>
                        <Flex align={'center'} css={{ gap: '$4', mb: '$6' }}>
                           <Box
                              css={{
                                 width: '48px',
                                 height: '48px',
                                 borderRadius: '$lg',
                                 background: `${topResult!.color}20`,
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 color: topResult!.color,
                                 flexShrink: 0,
                              }}
                           >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M7 7H17V17H7V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M7 3V7M17 3V7M7 17V21M17 17V21M3 7H7M17 7H21M3 17H7M17 17H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </Box>
                           <Box>
                              <Text css={{ color: '$accents6', fontSize: '$xs', mb: '$1' }}>Prediksi Kelas</Text>
                              <Text
                                 b
                                 css={{
                                    fontSize: '$xl',
                                    color: topResult!.color,
                                 }}
                              >
                                 {topResult!.label}
                              </Text>
                           </Box>
                           <Box css={{ marginLeft: 'auto', textAlign: 'right' }}>
                              <Text css={{ color: '$accents6', fontSize: '$xs', mb: '$1' }}>Confidence</Text>
                              <Text
                                 b
                                 css={{ fontSize: '$xl', color: topResult!.color }}
                              >
                                 {(topResult!.probability * 100).toFixed(1)}%
                              </Text>
                           </Box>
                        </Flex>

                        {/* Confidence bar for all classes */}
                        <Text css={{ color: '$accents6', fontSize: '$xs', mb: '$3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                           Skor Per Kelas
                        </Text>
                        <Flex direction={'column'} css={{ gap: '$3' }}>
                           {results.map((r, i) => (
                              <Box key={r.label}>
                                 <Flex align={'center'} justify={'between'} css={{ mb: '$1' }}>
                                    <Flex align={'center'} css={{ gap: '$2' }}>
                                       <Box
                                          css={{
                                             width: '8px',
                                             height: '8px',
                                             borderRadius: '50%',
                                             background: r.color,
                                             flexShrink: 0,
                                          }}
                                       />
                                       <Text span css={{ fontSize: '$sm', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '$accents9' : '$accents7' }}>
                                          {r.label}
                                       </Text>
                                    </Flex>
                                    <Text span css={{ fontSize: '$sm', fontWeight: 600, color: r.color }}>
                                       {(r.probability * 100).toFixed(1)}%
                                    </Text>
                                 </Flex>
                                 <Box css={{ bg: '$accents2', borderRadius: '$full', height: '6px', overflow: 'hidden' }}>
                                    <Box
                                       css={{
                                          height: '100%',
                                          width: `${r.probability * 100}%`,
                                          background: r.color,
                                          borderRadius: '$full',
                                          transition: 'width 0.8s ease',
                                       }}
                                    />
                                 </Box>
                              </Box>
                           ))}
                        </Flex>
                     </>
                  ) : (
                     <Flex direction={'column'} align={'center'} css={{ gap: '$3', py: '$4' }}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--nextui-colors-accents4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <circle cx="12" cy="12" r="10"></circle>
                           <line x1="12" y1="8" x2="12" y2="12"></line>
                           <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <Text b css={{ color: '$accents8' }}>Teks tidak dapat diklasifikasikan</Text>
                        <Text css={{ color: '$accents6', fontSize: '$sm', textAlign: 'center' }}>
                           Coba tambahkan kata kunci yang lebih spesifik terkait kategori pertanian, laporan, atau pengetahuan tradisional.
                        </Text>
                     </Flex>
                  )}

                  {/* Disclaimer */}
                  <Box
                     css={{
                        mt: '$6',
                        pt: '$4',
                        borderTop: '1px solid $accents2',
                     }}
                  >
                     <Text css={{ color: '$accents5', fontSize: '11px' }}>
                        <em>Catatan: Menggunakan model {method.includes('fasttext') ? 'FastText + SVM' : method.includes('dt') ? method.replace('dt-', '').toUpperCase() + ' + Decision Tree' : method.includes('nb') ? method.replace('nb-', '').toUpperCase() + ' + Naive Bayes' : 'TF-IDF + SVM'} yang dilatih dengan ICAR Agriculture Dataset. Data dilayani via FastAPI.</em>
                     </Text>
                  </Box>
               </Card.Body>
            </Card>
         )}
      </Box>
   );
};
