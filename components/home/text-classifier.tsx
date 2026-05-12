import React, {useState, useCallback} from 'react';
import {Card, Text, Button, Textarea, Loading} from '@nextui-org/react';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';
import {categoryDistribution} from '../../lib/nlp-data';

// ──────────────────────────────────────────────────────────────────────
// Lightweight keyword-based scoring (mimics TF-IDF + SVM)
// Each class has weighted keywords; longer / more relevant phrases score higher.
// ──────────────────────────────────────────────────────────────────────
const CLASS_KEYWORDS: Record<string, Array<{term: string; weight: number}>> = {
   Books: [
      {term: 'book', weight: 3}, {term: 'chapter', weight: 3}, {term: 'edition', weight: 3},
      {term: 'author', weight: 3}, {term: 'publication', weight: 2}, {term: 'volume', weight: 2},
      {term: 'library', weight: 2}, {term: 'handbook', weight: 3}, {term: 'textbook', weight: 3},
      {term: 'manual', weight: 2}, {term: 'printed', weight: 1}, {term: 'isbn', weight: 3},
      {term: 'publisher', weight: 2}, {term: 'encyclopedia', weight: 3}, {term: 'monograph', weight: 3},
      {term: 'buku', weight: 3}, {term: 'referensi', weight: 2},
   ],
   Reports: [
      {term: 'report', weight: 3}, {term: 'annual', weight: 2}, {term: 'survey', weight: 2},
      {term: 'assessment', weight: 2}, {term: 'findings', weight: 2}, {term: 'data', weight: 1},
      {term: 'analysis', weight: 2}, {term: 'statistics', weight: 2}, {term: 'executive summary', weight: 3},
      {term: 'recommendation', weight: 2}, {term: 'laporan', weight: 3}, {term: 'hasil', weight: 1},
      {term: 'review', weight: 2}, {term: 'evaluation', weight: 2}, {term: 'monitoring', weight: 2},
      {term: 'indicator', weight: 2}, {term: 'dashboard', weight: 1}, {term: 'progress', weight: 1},
   ],
   'Indian Farming': [
      {term: 'farming', weight: 3}, {term: 'farmer', weight: 3}, {term: 'crop', weight: 3},
      {term: 'wheat', weight: 2}, {term: 'rice', weight: 2}, {term: 'paddy', weight: 3},
      {term: 'irrigation', weight: 2}, {term: 'soil', weight: 2}, {term: 'harvest', weight: 2},
      {term: 'yield', weight: 2}, {term: 'india', weight: 1}, {term: 'kharif', weight: 3},
      {term: 'rabi', weight: 3}, {term: 'sowing', weight: 2}, {term: 'pesticide', weight: 2},
      {term: 'fertilizer', weight: 2}, {term: 'petani', weight: 3}, {term: 'lahan', weight: 2},
      {term: 'sawah', weight: 3}, {term: 'pertanian', weight: 3},
   ],
   'Indian Horticulture': [
      {term: 'horticulture', weight: 3}, {term: 'vegetable', weight: 3}, {term: 'fruit', weight: 3},
      {term: 'mango', weight: 3}, {term: 'tomato', weight: 2}, {term: 'banana', weight: 2},
      {term: 'flower', weight: 2}, {term: 'nursery', weight: 2}, {term: 'grafting', weight: 3},
      {term: 'pruning', weight: 2}, {term: 'orchard', weight: 3}, {term: 'plantation', weight: 2},
      {term: 'papaya', weight: 2}, {term: 'pepper', weight: 2}, {term: 'spice', weight: 2},
      {term: 'hortikultura', weight: 3}, {term: 'sayuran', weight: 3}, {term: 'buah', weight: 3},
      {term: 'tomat', weight: 2}, {term: 'kebun', weight: 2},
   ],
   'Annual Reports': [
      {term: 'annual report', weight: 4}, {term: 'fiscal year', weight: 3}, {term: 'financial', weight: 2},
      {term: 'budget', weight: 2}, {term: 'expenditure', weight: 2}, {term: 'revenue', weight: 2},
      {term: 'quarter', weight: 2}, {term: 'ministry', weight: 2}, {term: 'government', weight: 1},
      {term: 'policy', weight: 2}, {term: 'scheme', weight: 2}, {term: 'programme', weight: 2},
      {term: 'department', weight: 1}, {term: 'laporan tahunan', weight: 4}, {term: 'anggaran', weight: 3},
      {term: 'kementerian', weight: 3}, {term: 'kebijakan', weight: 2},
   ],
   'Traditional Knowledge': [
      {term: 'traditional', weight: 3}, {term: 'indigenous', weight: 3}, {term: 'folk', weight: 3},
      {term: 'heritage', weight: 2}, {term: 'ritual', weight: 2}, {term: 'community', weight: 2},
      {term: 'ancestral', weight: 3}, {term: 'medicinal plant', weight: 3}, {term: 'herbal', weight: 3},
      {term: 'local knowledge', weight: 4}, {term: 'cultural', weight: 2}, {term: 'tribe', weight: 2},
      {term: 'ethnic', weight: 2}, {term: 'pengetahuan lokal', weight: 4}, {term: 'tradisional', weight: 3},
      {term: 'adat', weight: 3}, {term: 'kearifan lokal', weight: 4}, {term: 'tanaman obat', weight: 3},
      {term: 'herbal', weight: 3}, {term: 'masyarakat adat', weight: 4},
   ],
};

interface ClassScore {
   label: string;
   score: number;
   probability: number;
   color: string;
}

function classifyText(text: string): ClassScore[] {
   const lower = text.toLowerCase();
   const scores: Record<string, number> = {};

   Object.entries(CLASS_KEYWORDS).forEach(([cls, terms]) => {
      let total = 0;
      terms.forEach(({term, weight}) => {
         // Count occurrences (overlapping)
         let pos = 0;
         while ((pos = lower.indexOf(term, pos)) !== -1) {
            total += weight;
            pos += term.length;
         }
      });
      scores[cls] = total;
   });

   const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

   return Object.entries(scores)
      .map(([label, score]) => ({
         label,
         score,
         probability: score / total,
         color: categoryDistribution.find((c) => c.name === label)?.color || '#6366f1',
      }))
      .sort((a, b) => b.score - a.score);
}

// ──────────────────────────────────────────────────────────────────────
// UI Component
// ──────────────────────────────────────────────────────────────────────
const EXAMPLES = [
   'The book describes cultivation techniques for wheat and rice farming in India.',
   'This annual report covers the ministry\'s budget and expenditure for the fiscal year.',
   'Traditional herbal knowledge passed down from ancestors in indigenous communities.',
   'Tomato and mango orchard management with modern pruning and grafting techniques.',
   'Survey findings and statistical analysis from monitoring agricultural progress.',
];

export const TextClassifier = () => {
   const [inputText, setInputText] = useState('');
   const [results, setResults] = useState<ClassScore[] | null>(null);
   const [loading, setLoading] = useState(false);
   const [charCount, setCharCount] = useState(0);

   const handleClassify = useCallback(() => {
      if (!inputText.trim()) return;
      setLoading(true);
      // Simulate a short processing delay for UX realism
      setTimeout(() => {
         setResults(classifyText(inputText));
         setLoading(false);
      }, 700);
   }, [inputText]);

   const handleExample = (example: string) => {
      setInputText(example);
      setCharCount(example.length);
      setResults(null);
   };

   const handleReset = () => {
      setInputText('');
      setCharCount(0);
      setResults(null);
   };

   const topResult = results?.[0];
   const hasResult = results !== null && topResult !== undefined && topResult.score > 0;

   return (
      <Box>
         {/* Input area */}
         <Card css={{borderRadius: '$xl', bg: '$accents0', mb: '$6', border: '1px solid $accents2'}}>
            <Card.Body css={{py: '$6', px: '$8'}}>
               <Flex align={'center'} justify={'between'} css={{mb: '$4'}}>
                  <Text b css={{color: '$accents9', fontSize: '$md'}}>✏️ Masukkan Teks</Text>
                  <Text span css={{color: '$accents6', fontSize: '$xs'}}>{charCount} karakter</Text>
               </Flex>

               {/* Textarea wrapper using plain HTML since NextUI Textarea has controlled issues */}
               <Box css={{position: 'relative', mb: '$4'}}>
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
                        fontFamily: 'Inter, sans-serif',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                        boxSizing: 'border-box',
                     }}
                     onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                     onBlur={(e) => (e.target.style.borderColor = 'var(--nextui-colors-border)')}
                  />
               </Box>

               {/* Example chips */}
               <Text css={{color: '$accents6', fontSize: '$xs', mb: '$2'}}>💡 Coba contoh:</Text>
               <Flex css={{gap: '$2', flexWrap: 'wrap', mb: '$6'}}>
                  {EXAMPLES.map((ex, i) => (
                     <button
                        key={i}
                        onClick={() => handleExample(ex)}
                        style={{
                           padding: '4px 12px',
                           borderRadius: '20px',
                           border: '1px solid var(--nextui-colors-border)',
                           background: 'var(--nextui-colors-accents2)',
                           color: 'var(--nextui-colors-accents7)',
                           fontSize: '11px',
                           cursor: 'pointer',
                           fontFamily: 'Inter, sans-serif',
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
                        Contoh {i + 1}
                     </button>
                  ))}
               </Flex>

               {/* Action buttons */}
               <Flex css={{gap: '$3'}} align={'center'}>
                  <button
                     id="classify-btn"
                     onClick={handleClassify}
                     disabled={!inputText.trim() || loading}
                     style={{
                        padding: '10px 28px',
                        borderRadius: '10px',
                        border: 'none',
                        background: inputText.trim() && !loading
                           ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                           : 'var(--nextui-colors-accents3)',
                        color: inputText.trim() && !loading ? 'white' : 'var(--nextui-colors-accents6)',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: inputText.trim() && !loading ? 'pointer' : 'not-allowed',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                     }}
                  >
                     {loading ? '⏳ Menganalisis...' : '🔍 Klasifikasikan'}
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
                           fontFamily: 'Inter, sans-serif',
                        }}
                     >
                        ↺ Reset
                     </button>
                  )}
               </Flex>
            </Card.Body>
         </Card>

         {/* Result area */}
         {loading && (
            <Card css={{borderRadius: '$xl', bg: '$accents0', border: '1px solid $accents2'}}>
               <Card.Body css={{py: '$10', textAlign: 'center'}}>
                  <Flex justify={'center'} align={'center'} direction={'column'} css={{gap: '$4'}}>
                     <Loading size="lg" color="secondary" />
                     <Text css={{color: '$accents6'}}>Model sedang memproses teks...</Text>
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
               <Card.Body css={{py: '$6', px: '$8'}}>
                  {/* Prediction Header */}
                  {hasResult ? (
                     <>
                        <Flex align={'center'} css={{gap: '$4', mb: '$6'}}>
                           <Box
                              css={{
                                 width: '48px',
                                 height: '48px',
                                 borderRadius: '$lg',
                                 background: `linear-gradient(135deg, ${topResult!.color}, ${topResult!.color}99)`,
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 fontSize: '22px',
                                 flexShrink: 0,
                              }}
                           >
                              🏷️
                           </Box>
                           <Box>
                              <Text css={{color: '$accents6', fontSize: '$xs', mb: '$1'}}>Prediksi Kelas</Text>
                              <Text
                                 b
                                 css={{
                                    fontSize: '$xl',
                                    background: `linear-gradient(135deg, ${topResult!.color}, ${topResult!.color}99)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                 }}
                              >
                                 {topResult!.label}
                              </Text>
                           </Box>
                           <Box css={{marginLeft: 'auto', textAlign: 'right'}}>
                              <Text css={{color: '$accents6', fontSize: '$xs', mb: '$1'}}>Confidence</Text>
                              <Text
                                 b
                                 css={{fontSize: '$xl', color: topResult!.color}}
                              >
                                 {(topResult!.probability * 100).toFixed(1)}%
                              </Text>
                           </Box>
                        </Flex>

                        {/* Confidence bar for all classes */}
                        <Text css={{color: '$accents6', fontSize: '$xs', mb: '$3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em'}}>
                           Skor Per Kelas
                        </Text>
                        <Flex direction={'column'} css={{gap: '$3'}}>
                           {results.map((r, i) => (
                              <Box key={r.label}>
                                 <Flex align={'center'} justify={'between'} css={{mb: '$1'}}>
                                    <Flex align={'center'} css={{gap: '$2'}}>
                                       <Box
                                          css={{
                                             width: '8px',
                                             height: '8px',
                                             borderRadius: '50%',
                                             background: r.color,
                                             flexShrink: 0,
                                          }}
                                       />
                                       <Text span css={{fontSize: '$sm', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '$accents9' : '$accents7'}}>
                                          {r.label}
                                       </Text>
                                    </Flex>
                                    <Text span css={{fontSize: '$sm', fontWeight: 600, color: r.color}}>
                                       {(r.probability * 100).toFixed(1)}%
                                    </Text>
                                 </Flex>
                                 <Box css={{bg: '$accents2', borderRadius: '$full', height: '6px', overflow: 'hidden'}}>
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
                     <Flex direction={'column'} align={'center'} css={{gap: '$3', py: '$4'}}>
                        <Text css={{fontSize: '2rem'}}>🤔</Text>
                        <Text b css={{color: '$accents8'}}>Teks tidak dapat diklasifikasikan</Text>
                        <Text css={{color: '$accents6', fontSize: '$sm', textAlign: 'center'}}>
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
                     <Text css={{color: '$accents5', fontSize: '11px'}}>
                        ⚠️ <em>Demo menggunakan keyword scoring (simulasi TF-IDF+SVM). Untuk hasil aktual, hubungkan ke model terlatih via API.</em>
                     </Text>
                  </Box>
               </Card.Body>
            </Card>
         )}
      </Box>
   );
};
