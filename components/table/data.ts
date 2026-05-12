export const columns = [
   {name: '#', uid: 'rank'},
   {name: 'FITUR', uid: 'feature'},
   {name: 'SKOR TF-IDF', uid: 'score'},
   {name: 'RELEVANSI', uid: 'relevance'},
];

export const features = [
   {id: 1, feature: 'yield', score: 0.045361, relevance: 'high'},
   {id: 2, feature: 'farming', score: 0.036702, relevance: 'high'},
   {id: 3, feature: 'pradesh', score: 0.030826, relevance: 'high'},
   {id: 4, feature: 'days', score: 0.030401, relevance: 'medium'},
   {id: 5, feature: 'fruit', score: 0.030219, relevance: 'high'},
   {id: 6, feature: 'rice', score: 0.029290, relevance: 'high'},
   {id: 7, feature: 'varieties', score: 0.028661, relevance: 'high'},
   {id: 8, feature: 'cultivation', score: 0.025492, relevance: 'high'},
   {id: 9, feature: 'variety', score: 0.023897, relevance: 'medium'},
   {id: 10, feature: 'income', score: 0.022113, relevance: 'medium'},
   {id: 11, feature: 'wheat', score: 0.020548, relevance: 'high'},
   {id: 12, feature: 'millet', score: 0.020482, relevance: 'high'},
   {id: 13, feature: 'fruits', score: 0.020011, relevance: 'medium'},
   {id: 14, feature: 'leaf', score: 0.019976, relevance: 'medium'},
   {id: 15, feature: 'plants', score: 0.018340, relevance: 'medium'},
];

// Keep original users export for compatibility
export const users = features.map((f) => ({
   id: f.id,
   name: f.feature,
   role: f.score.toFixed(5),
   team: f.relevance,
   status: f.relevance === 'high' ? 'active' : 'paused',
   age: String(f.id),
   avatar: '',
   email: '',
}));
