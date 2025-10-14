## **3. Create `/utils/exportDrawings.js`:**

export const exportManufacturingPackage = async (cabinet, designOption) => {
  // Create a comprehensive export package
  const exportData = {
    cabinetId: cabinet.id,
    name: cabinet.name,
    designOption,
    exportDate: new Date().toISOString(),
    
    // Part list with full specifications
    parts: cabinet.components.map(part => ({
      id: part.id,
      name: part.name,
      material: part.material,
      finish: part.finish,
      dimensions: `${part.dimensions.length}×${part.dimensions.width}×${part.dimensions.thickness}`,
      quantity: part.quantity,
      edgeBanding: part.edgeBanding.join(', '),
      drilling: part.drilling || []
    })),
    
    // Hafele hardware with links
    hardware: cabinet.hafeleHardware.map(hw => ({
      article: hw.article,
      name: hw.name,
      quantity: hw.quantity,
      specifications: hw.specifications,
      hafeleLink: `https://www.hafele.com/in/en/search/?q=${hw.article}`
    })),
    
    // Cut list
    cutList: cabinet.cutList,
    
    // Assembly steps
    assembly: cabinet.assemblySteps
  }
  
  // Generate CSV for parts
  const csvContent = generatePartsCSV(exportData.parts)
  
  // Generate hardware schedule
  const hardwareCSV = generateHardwareCSV(exportData.hardware)
  
  return {
    partsCSV: csvContent,
    hardwareCSV,
    json: JSON.stringify(exportData, null, 2)
  }
}

function generatePartsCSV(parts) {
  const header = 'Part ID,Name,Material,Finish,Dimensions,Quantity,Edge Banding\n'
  const rows = parts.map(p => 
    `${p.id},"${p.name}","${p.material}","${p.finish}",${p.dimensions},${p.quantity},"${p.edgeBanding}"`
  ).join('\n')
  return header + rows
}

function generateHardwareCSV(hardware) {
  const header = 'Article,Name,Quantity,Specifications,Hafele Link\n'
  const rows = hardware.map(h => 
    `${h.article},"${h.name}",${h.quantity},"${JSON.stringify(h.specifications).replace(/"/g, '""')}",${h.hafeleLink}`
  ).join('\n')
  return header + rows
}

export const downloadCSV = (content, filename) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadJSON = (data, filename) => {
  const blob = new Blob([data], { type: 'application/json' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
