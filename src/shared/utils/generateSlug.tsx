const generateSlug = (text: string) => {
    // Mappa di caratteri accentati ai loro equivalenti non accentati
    const accentMap: { [key: string]: string } = {
      'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
      'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
      'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
      'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o',
      'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
      'ý': 'y', 'ÿ': 'y',
      'ñ': 'n',
      'ç': 'c'
    };
  
    // Normalizza il testo sostituendo i caratteri accentati
    const normalizedText = text.toLowerCase().split('').map(char => {
      return accentMap[char] || char;
    }).join('');
  
    // Sostituisce spazi con trattini e rimuove caratteri non desiderati
    return normalizedText
      .replace(/\s+/g, '-')           // sostituisce spazi con trattini
      .replace(/[^a-z0-9-]/g, '')     // rimuove caratteri non alfanumerici eccetto trattini
      .replace(/-+/g, '-')            // rimuove trattini multipli consecutivi
      .replace(/^-|-$/g, '');         // rimuove trattini all'inizio e alla fine
  };
export default generateSlug;