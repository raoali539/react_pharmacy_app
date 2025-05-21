const GenderIcon = (color) => `
<svg width="32" height="32" viewBox="0 0 32 32" fill="${color}" xmlns="http://www.w3.org/2000/svg">
  <!-- Male symbol: arrow pointing to top-right -->
  <circle cx="14" cy="18" r="6" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19 13L25 7M25 7H21M25 7V11" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  
  <!-- Female symbol: cross below the circle -->
  <path d="M14 24V28M12 26H16" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default GenderIcon;
