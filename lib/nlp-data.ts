// NLP Dashboard Data - Hasil dari modeling dan klasifikasi ICAR dataset

export const datasetInfo = {
  name: 'ICAR Agriculture Dataset',
  totalDocs: 159,
  totalDocsAugmented: 324,
  categories: 6,
  augmentationMethod: 'Back Translation (ID→EN→ID)',
};

export const categoryDistribution = [
  { name: 'Books', original: 54, augmented: 54, color: '#2563eb' },
  { name: 'Reports', original: 47, augmented: 54, color: '#1d4ed8' },
  { name: 'Indian Farming', original: 23, augmented: 54, color: '#475569' },
  { name: 'Indian Horticulture', original: 18, augmented: 54, color: '#64748b' },
  { name: 'Annual Reports', original: 10, augmented: 54, color: '#3b82f6' },
  { name: 'Traditional Knowledge', original: 7, augmented: 54, color: '#334155' },
];

export const embeddingModels = [
  {
    name: 'Word2Vec CBOW',
    shortName: 'W2V-CBOW',
    dimensions: 100,
    algorithm: 'Continuous Bag of Words',
    windowSize: 5,
    minCount: 2,
    docs: 324,
    color: '#6366f1',
    file: 'doc_embeddings_w2v_cbow.csv',
    description: 'Menggunakan konteks sekitar untuk memprediksi kata target',
  },
  {
    name: 'Word2Vec Skip-gram',
    shortName: 'W2V-SG',
    dimensions: 100,
    algorithm: 'Skip-gram',
    windowSize: 5,
    minCount: 2,
    docs: 324,
    color: '#8b5cf6',
    file: 'doc_embeddings_w2v_skipgram.csv',
    description: 'Menggunakan kata target untuk memprediksi konteks sekitar',
  },
  {
    name: 'GloVe',
    shortName: 'GloVe',
    dimensions: 100,
    algorithm: 'Global Vectors',
    windowSize: 10,
    minCount: 1,
    docs: 324,
    color: '#06b6d4',
    file: 'doc_embeddings_glove.csv',
    description: 'Memanfaatkan statistik global co-occurrence kata',
  },
  {
    name: 'FastText',
    shortName: 'FastText',
    dimensions: 100,
    algorithm: 'FastText (Subword)',
    windowSize: 5,
    minCount: 1,
    docs: 324,
    color: '#10b981',
    file: 'doc_embeddings_fasttext.csv',
    description: 'Memperhitungkan subword/n-gram untuk representasi vektor',
  },
];

export const topFeaturesTFIDF = [
  { feature: 'yield', score: 0.04536 },
  { feature: 'farming', score: 0.03670 },
  { feature: 'pradesh', score: 0.03083 },
  { feature: 'days', score: 0.03040 },
  { feature: 'fruit', score: 0.03022 },
  { feature: 'rice', score: 0.02929 },
  { feature: 'varieties', score: 0.02866 },
  { feature: 'cultivation', score: 0.02549 },
  { feature: 'variety', score: 0.02390 },
  { feature: 'income', score: 0.02211 },
  { feature: 'wheat', score: 0.02055 },
  { feature: 'millet', score: 0.02048 },
  { feature: 'fruits', score: 0.02001 },
  { feature: 'leaf', score: 0.01998 },
  { feature: 'plants', score: 0.01834 },
];

export const augmentationImpact = [
  { feature: 'prac', ngramSize: 1, before: 0, after: 244, change: 100 },
  { feature: 'nicgw', ngramSize: 1, before: 45, after: 181, change: 302.2 },
  { feature: 'cas', ngramSize: 1, before: 111, after: 242, change: 118.0 },
  { feature: 'mon', ngramSize: 1, before: 107, after: 195, change: 82.2 },
  { feature: 'qdty', ngramSize: 1, before: 0, after: 80, change: 100 },
  { feature: 'ingr', ngramSize: 1, before: 163, after: 229, change: 40.5 },
  { feature: 'mtu', ngramSize: 1, before: 188, after: 244, change: 29.8 },
  { feature: 'singh', ngramSize: 1, before: 4023, after: 4076, change: 1.3 },
];

// Simulated classification results based on typical NLP pipeline results 
// (akan diupdate ketika ada hasil aktual dari notebook)
export const classificationResults = {
  tfidf: {
    method: 'TF-IDF + SVM',
    accuracy: 0.847,
    precision: 0.841,
    recall: 0.847,
    f1Score: 0.843,
    perClass: [
      { label: 'Annual Reports', precision: 0.89, recall: 0.85, f1: 0.87, support: 11 },
      { label: 'Indian Farming', precision: 0.82, recall: 0.88, f1: 0.85, support: 11 },
      { label: 'Indian Horticulture', precision: 0.91, recall: 0.82, f1: 0.86, support: 11 },
      { label: 'Books', precision: 0.79, recall: 0.82, f1: 0.80, support: 11 },
      { label: 'Reports', precision: 0.88, recall: 0.90, f1: 0.89, support: 11 },
      { label: 'Traditional Knowledge', precision: 0.77, recall: 0.73, f1: 0.75, support: 11 },
    ],
  },
};

export const pipelineSteps = [
  { step: 1, name: 'Data Collection', status: 'done', description: '159 dokumen ICAR' },
  { step: 2, name: 'Preprocessing', status: 'done', description: 'Tokenisasi, stopword removal, stemming' },
  { step: 3, name: 'Augmentation', status: 'done', description: 'Back translation → 324 dokumen' },
  { step: 4, name: 'Feature Extraction', status: 'done', description: 'TF-IDF, BoW, n-gram' },
  { step: 5, name: 'Word Embedding', status: 'done', description: 'W2V, GloVe, FastText' },
  { step: 6, name: 'Classification', status: 'active', description: 'SVM, Naive Bayes, dll' },
];
