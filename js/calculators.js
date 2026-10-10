// Joplin Geotechnical Calculators Engine
// Calibrated for Ozark Limestone & Cherty Clay Soils

document.addEventListener('DOMContentLoaded', () => {
  initPierCalculator();
  initDeflectionDiagnostic();
});

function initPierCalculator() {
  const wallInput = document.getElementById('calcWallLength');
  const structureSelect = document.getElementById('calcStructureType');
  const soilSelect = document.getElementById('calcSoilZone');
  const pierTypeSelect = document.getElementById('calcPierType');
  const calcBtn = document.getElementById('runPierCalc');

  const updateResults = () => {
    const wallLen = parseFloat(wallInput?.value) || 35;
    const structure = structureSelect?.value || 'brick-veneer';
    const soil = soilSelect?.value || 'joplin-central';
    const pierType = pierTypeSelect?.value || 'push-pier';

    // 1. Pier spacing rule: 6 ft for brick/masonry, 7 ft for wood frame
    let spacing = 6.0;
    if (structure === 'single-frame') spacing = 7.0;
    if (structure === 'commercial-masonry') spacing = 5.0;

    const pierCount = Math.max(3, Math.round(wallLen / spacing) + 1);

    // 2. Depth expectations based on Joplin geology
    let minDepth = 20, maxDepth = 25;
    if (soil === 'carthage-limestone') { minDepth = 12; maxDepth = 18; }
    if (soil === 'shoal-creek') { minDepth = 15; maxDepth = 22; }
    if (soil === 'webb-city-mining') { minDepth = 24; maxDepth = 35; }

    const avgDepth = (minDepth + maxDepth) / 2;
    const totalSteel = Math.round(pierCount * avgDepth);

    // 3. Investment estimate
    let costPerPier = 1800; // baseline for push pier driven to Ozark bedrock
    if (pierType === 'helical-pier') costPerPier = 1650;
    if (structure === 'commercial-masonry') costPerPier = 2400;

    const minCost = pierCount * (costPerPier * 0.9);
    const maxCost = pierCount * (costPerPier * 1.2);

    document.getElementById('resPierCount').innerText = `${pierCount} Piers`;
    document.getElementById('resDepthRange').innerText = `${minDepth} – ${maxDepth} Feet`;
    document.getElementById('resTotalSteel').innerText = `${totalSteel} Linear Feet`;
    document.getElementById('resPriceRange').innerText = `$${Math.round(minCost).toLocaleString()} – $${Math.round(maxCost).toLocaleString()}`;
  };

  calcBtn?.addEventListener('click', updateResults);
  wallInput?.addEventListener('input', updateResults);
  structureSelect?.addEventListener('change', updateResults);
  soilSelect?.addEventListener('change', updateResults);
  pierTypeSelect?.addEventListener('change', updateResults);
}

function initDeflectionDiagnostic() {
  const bowSelect = document.getElementById('calcBowInches');
  const crackSelect = document.getElementById('calcCrackPattern');
  const waterSelect = document.getElementById('calcWaterLevel');
  const calcBtn = document.getElementById('runDeflectionCalc');

  const updateDiag = () => {
    const bow = bowSelect?.value || '1-to-2';
    const crack = crackSelect?.value || 'horizontal';
    const water = waterSelect?.value || 'damp';

    const badge = document.getElementById('diagRiskBadge');
    const title = document.getElementById('diagRiskTitle');
    const desc = document.getElementById('diagRiskDesc');
    const proto = document.getElementById('diagProtocol');

    if (bow === 'over-2' || crack === 'corner-shear') {
      badge.style.background = 'rgba(240,114,106,0.2)';
      badge.style.color = '#f0726a';
      badge.innerText = 'CRITICAL SEVERITY • RISK OF SHEARING COLLAPSE';
      title.innerText = 'Emergency Foundation Stabilization Required';
      desc.innerText = 'Walls deflected over 2 inches have suffered structural mortar shear. The foundation is in danger of cave-in during the next heavy rainfall without immediate temporary shoring.';
      proto.innerText = 'Heavy Structural Steel I-Beam Soldiers anchored into floor joists & concrete slab floor, or complete foundation rebuild with helical tiebacks.';
    } else if (bow === '1-to-2') {
      badge.style.background = 'rgba(242,180,90,0.2)';
      badge.style.color = '#f59e0b';
      badge.innerText = 'MODERATE TO HIGH RISK • ACTIVE DEFLECTION';
      title.innerText = 'Active Hydrostatic Soil Pressure';
      desc.innerText = 'Deflection between 1 and 2 inches confirms that lateral soil pressure exceeds masonry strength. The wall cannot self-correct and will worsen every wet season.';
      proto.innerText = 'Carbon Fiber Kevlar Straps bonded with structural epoxy, paired with exterior French drains to relieve hydrostatic groundwater pressure.';
    } else {
      badge.style.background = 'rgba(95,211,154,0.2)';
      badge.style.color = '#5fd39a';
      badge.innerText = 'EARLY STAGE • PREVENTIVE ACTION';
      title.innerText = 'Early Foundation Settlement & Mortar Cracking';
      desc.innerText = 'Deflection under 1 inch is manageable. Preventive crack injection and exterior water diversion can arrest structural movement before expensive reinforcement is needed.';
      proto.innerText = 'Epoxy Polyurethane Crack Stitching, Downspout Extensions, and Surface Grading Away from Footings.';
    }
  };

  calcBtn?.addEventListener('click', updateDiag);
  bowSelect?.addEventListener('change', updateDiag);
  crackSelect?.addEventListener('change', updateDiag);
  waterSelect?.addEventListener('change', updateDiag);
}
