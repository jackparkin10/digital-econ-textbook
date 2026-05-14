const buildSteps = [
  {
    title: 'Draw the axes',
    description: 'Begin with the price and quantity axes.',
  },
  {
    title: 'Add the demand curve',
    description: 'Add the downward-sloping demand curve representing consumer demand.',
  },
  {
    title: 'Add the supply curve',
    description: 'Add the upward-sloping supply curve representing producer supply.',
  },
  {
    title: 'Mark equilibrium',
    description: 'Show where supply and demand intersect at the market equilibrium price and quantity.',
  },
  {
    title: 'Equilibrium price',
    description: 'The equilibrium price is $1.00.',
  },
  {
    title: 'Equilibrium quantity',
    description: 'The equilibrium quantity is 10 units.',
  },
];

const exploreStates = {
  low: {
    label: 'Low Price',
    summary: 'At a low price, quantity demanded exceeds quantity supplied. This creates a market shortage.',
  },
  equilibrium: {
    label: 'Equilibrium Price',
    summary: 'At equilibrium, supply equals demand and the market clears with no shortage or surplus.',
  },
  high: {
    label: 'High Price',
    summary: 'At a high price, quantity supplied exceeds quantity demanded. This creates a market surplus.',
  },
};

function drawBuildGraph(stage) {
  const buildGraphPanel = document.getElementById('build-graph-panel');
  buildGraphPanel.innerHTML = `
    <svg viewBox="0 0 620 360" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
      <rect width="100%" height="100%" rx="28" fill="#eef6ff" />
      <!-- Y-axis (Price) -->
      <line x1="90" y1="50" x2="90" y2="310" stroke="#3c4b5a" stroke-width="3" />
      <!-- X-axis (Quantity) -->
      <line x1="90" y1="310" x2="560" y2="310" stroke="#3c4b5a" stroke-width="3" />
      <!-- Axis labels -->
      <text x="60" y="35" fill="#4f5f72" font-size="16" font-weight="600">P</text>
      <text x="565" y="330" fill="#4f5f72" font-size="16" font-weight="600">Q</text>
      
      <!-- Y-axis tick labels (0, 0.5, 1, 1.5, 2) -->
      <text x="75" y="315" fill="#6b7280" font-size="12" text-anchor="end">0</text>
      <text x="75" y="245" fill="#6b7280" font-size="12" text-anchor="end">0.5</text>
      <text x="75" y="185" fill="#6b7280" font-size="12" text-anchor="end">1</text>
      <text x="75" y="115" fill="#6b7280" font-size="12" text-anchor="end">1.5</text>
      <text x="75" y="55" fill="#6b7280" font-size="12" text-anchor="end">2</text>
      
      <!-- X-axis tick labels (8, 9, 10, 11, 12) with break indicator -->
      <text x="90" y="325" fill="#6b7280" font-size="10" text-anchor="middle">···</text>
      <text x="90" y="345" fill="#6b7280" font-size="12" text-anchor="middle">8</text>
      <text x="207" y="345" fill="#6b7280" font-size="12" text-anchor="middle">9</text>
      <text x="325" y="345" fill="#6b7280" font-size="12" text-anchor="middle">10</text>
      <text x="442" y="345" fill="#6b7280" font-size="12" text-anchor="middle">11</text>
      <text x="560" y="345" fill="#6b7280" font-size="12" text-anchor="middle">12</text>
      
      ${stage >= 1 ? '<line x1="90" y1="80" x2="560" y2="285" stroke="#fb5353" stroke-width="5" stroke-linecap="round" /><text x="110" y="70" fill="#fb5353" font-size="14" font-weight="600">Demand</text>' : ''}
      ${stage >= 2 ? '<line x1="90" y1="285" x2="560" y2="50" stroke="#2f80ed" stroke-width="5" stroke-linecap="round" /><text x="440" y="60" fill="#2f80ed" font-size="14" font-weight="600">Supply</text>' : ''}
      ${stage >= 3 ? '<circle cx="325" cy="180" r="14" fill="#20c997" stroke="#fff" stroke-width="4" /><text x="340" y="185" fill="#154d3d" font-size="15" font-weight="600">E</text>' : ''}
      ${stage >= 3 ? '<line x1="325" y1="180" x2="325" y2="310" stroke="#20c997" stroke-dasharray="6 4" stroke-width="2" opacity="0.6" />' : ''}
      ${stage >= 3 ? '<line x1="325" y1="180" x2="90" y2="180" stroke="#20c997" stroke-dasharray="6 4" stroke-width="2" opacity="0.6" />' : ''}
      ${stage >= 4 ? '<text x="350" y="175" fill="#20c997" font-size="16" font-weight="700">P = $1.00</text>' : ''}
      ${stage >= 5 ? '<text x="330" y="330" fill="#20c997" font-size="16" font-weight="700">Q = 10</text>' : ''}
    </svg>
  `;
}

function drawExploreGraph(priceKey) {
  const exploreGraphPanel = document.getElementById('explore-graph-panel');
  const lines = {
    low: '<line x1="200" y1="250" x2="200" y2="310" stroke="#fb5353" stroke-width="3" /><line x1="90" y1="250" x2="200" y2="250" stroke="#fb5353" stroke-width="3" /><text x="210" y="280" fill="#fb5353" font-size="13">Qd</text><text x="60" y="255" fill="#fb5353" font-size="13">P₁</text>',
    equilibrium: '',
    high: '<line x1="420" y1="140" x2="420" y2="310" stroke="#2f80ed" stroke-width="3" /><line x1="90" y1="140" x2="420" y2="140" stroke="#2f80ed" stroke-width="3" /><text x="425" y="280" fill="#2f80ed" font-size="13">Qs</text><text x="60" y="145" fill="#2f80ed" font-size="13">P₃</text>',
  };
  const note = {
    low: '<text x="280" y="70" fill="#fb5353" font-size="16" font-weight="600">SHORTAGE</text><text x="220" y="100" fill="#fb5353" font-size="13">(Qd &gt; Qs)</text>',
    high: '<text x="270" y="70" fill="#2f80ed" font-size="16" font-weight="600">SURPLUS</text><text x="220" y="100" fill="#2f80ed" font-size="13">(Qs &gt; Qd)</text>',
    equilibrium: '<text x="250" y="70" fill="#20c997" font-size="16" font-weight="600">EQUILIBRIUM</text><text x="240" y="100" fill="#20c997" font-size="13">(Qd = Qs)</text>',
  };
  exploreGraphPanel.innerHTML = `
    <svg viewBox="0 0 620 360" preserveAspectRatio="xMidYMid meet" width="100%" height="100%">
      <rect width="100%" height="100%" rx="28" fill="#fbfeff" />
      <line x1="90" y1="50" x2="90" y2="310" stroke="#3c4b5a" stroke-width="3" />
      <line x1="90" y1="310" x2="560" y2="310" stroke="#3c4b5a" stroke-width="3" />
      <text x="65" y="35" fill="#4f5f72" font-size="16" font-weight="600">P</text>
      <text x="565" y="330" fill="#4f5f72" font-size="16" font-weight="600">Q</text>
      <path d="M 140 100 Q 240 150 340 200 Q 430 250 520 280" fill="none" stroke="#fb5353" stroke-width="5" stroke-linecap="round" opacity="0.7" />
      <path d="M 140 280 Q 240 230 340 160 Q 430 90 520 40" fill="none" stroke="#2f80ed" stroke-width="5" stroke-linecap="round" opacity="0.7" />
      <circle cx="305" cy="190" r="14" fill="#20c997" stroke="#fff" stroke-width="4" />
      <text x="318" y="195" fill="#154d3d" font-size="15" font-weight="600">E</text>
      ${lines[priceKey]}
      <text x="155" y="85" fill="#fb5353" font-size="13" font-weight="600">D</text>
      <text x="490" y="55" fill="#2f80ed" font-size="13" font-weight="600">S</text>
      ${note[priceKey]}
    </svg>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  let currentBuildIndex = 0;

  // Get all DOM elements
  const featureButtons = document.querySelectorAll('.feature-button');
  const featurePanes = document.querySelectorAll('.feature-pane');
  const buildNextButton = document.getElementById('build-next');
  const buildStepLabel = document.getElementById('build-step-label');
  const buildStepText = document.getElementById('build-step-text');
  const priceButtons = document.querySelectorAll('.price-button');
  const exploreSummary = document.getElementById('explore-summary');

  // Feature switcher
  function setActiveFeature(featureId) {
    featureButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.feature === featureId);
    });
    featurePanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === featureId);
    });

    if (featureId === 'build-view') {
      currentBuildIndex = 0;
      renderBuildStep();
    }

    if (featureId === 'explore-view') {
      selectPrice('equilibrium');
    }
  }

  // Build step renderer
  function renderBuildStep() {
    const step = buildSteps[currentBuildIndex];
    buildStepText.textContent = step.description;
    buildStepLabel.textContent = `Step ${currentBuildIndex + 1} of ${buildSteps.length}`;
    drawBuildGraph(currentBuildIndex);
  }

  // Price selector for Explore
  function selectPrice(priceKey) {
    priceButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.price === priceKey);
    });
    exploreSummary.textContent = exploreStates[priceKey].summary;
    drawExploreGraph(priceKey);
  }

  // Feature button click handlers
  featureButtons.forEach(button => {
    button.addEventListener('click', () => {
      setActiveFeature(button.dataset.feature);
    });
  });

  // Build next button
  if (buildNextButton) {
    buildNextButton.addEventListener('click', () => {
      currentBuildIndex = Math.min(buildSteps.length - 1, currentBuildIndex + 1);
      renderBuildStep();
    });
  }

  // Price button click handlers
  priceButtons.forEach(button => {
    button.addEventListener('click', () => {
      selectPrice(button.dataset.price);
    });
  });

  // Initialize
  setActiveFeature('book-view');
});
