const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Responsive breakpoints for Salgueiro image
const RESPONSIVE_SIZES = [
  { suffix: 'mobile', width: 300, quality: 75 },
  { suffix: 'tablet', width: 400, quality: 80 },
  { suffix: 'desktop', width: 500, quality: 85 }
];

async function optimizeImageResponsive(inputPath, outputDir, filename) {
  const nameWithoutExt = path.parse(filename).name;
  const results = [];

  // Create WebP versions for each size
  for (const size of RESPONSIVE_SIZES) {
    const outputFilename = `${nameWithoutExt}_${size.suffix}.webp`;
    const outputPath = path.join(outputDir, outputFilename);
    
    try {
      const info = await sharp(inputPath)
        .resize(size.width, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: size.quality })
        .toFile(outputPath);
      
      const stats = await fs.stat(outputPath);
      results.push({
        size: size.suffix,
        width: info.width,
        height: info.height,
        fileSize: stats.size,
        filename: outputFilename
      });
      
      console.log(`✅ ${size.suffix}: ${info.width}x${info.height} → ${(stats.size / 1024).toFixed(1)}KB`);
    } catch (error) {
      console.error(`❌ Error creating ${size.suffix} version:`, error.message);
    }
  }
  
  return results;
}

async function main() {
  const inputFile = 'src/images/general/salgueiro split.png';
  const outputDir = 'src/images/general/images-optimized';
  
  console.log('🖼️  RESPONSIVE IMAGE OPTIMIZER - SALGUEIRO');
  console.log('==========================================');
  
  try {
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    console.log('📸 Processing: salgueiro split.png');
    const results = await optimizeImageResponsive(inputFile, outputDir, 'salgueiro split.png');
    
    console.log('\n🎉 RESPONSIVE OPTIMIZATION COMPLETE!');
    console.log('=====================================');
    results.forEach(result => {
      console.log(`📱 ${result.size}: ${result.filename} (${result.width}x${result.height})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

if (require.main === module) {
  main();
} 