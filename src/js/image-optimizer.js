/**
 * IMAGE OPTIMIZER SCRIPT
 * 
 * Este script otimiza imagens para uso em websites, reduzindo tamanho
 * e mantendo qualidade visual adequada.
 * 
 * Requisitos:
 * - npm install sharp --save-dev
 * 
 * Uso:
 * - node src/js/image-optimizer.js [pasta-origem] [pasta-destino]
 * - Se não especificar pastas, usa src/images/gallery/ por padrão
 * 
 * Exemplo:
 * - node src/js/image-optimizer.js src/images/gallery src/images/gallery-optimized
 * 
 * @author BeWater Website
 * @version 1.0.0
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ===============================
// CONFIGURAÇÕES DE OTIMIZAÇÃO
// ===============================

const CONFIG = {
    // Dimensões máximas para imagens web
    MAX_WIDTH: 1200,
    MAX_HEIGHT: 800,
    
    // Qualidade de compressão (0-100)
    JPEG_QUALITY: 85,
    PNG_QUALITY: 85,
    WEBP_QUALITY: 85,
    
    // Extensões suportadas
    SUPPORTED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp'],
    
    // Criar backup das imagens originais
    CREATE_BACKUP: true,
    
    // Sobrescrever imagens existentes
    OVERWRITE_ORIGINALS: false
};

// ===============================
// FUNÇÕES PRINCIPAIS
// ===============================

/**
 * Otimiza uma única imagem
 * @param {string} inputPath - Caminho da imagem original
 * @param {string} outputPath - Caminho da imagem otimizada
 * @returns {Object|null} - Estatísticas da otimização ou null em caso de erro
 */
async function optimizeImage(inputPath, outputPath) {
    try {
        // Obter metadados da imagem
        const metadata = await sharp(inputPath).metadata();
        console.log(`📸 Processando: ${path.basename(inputPath)} (${metadata.width}×${metadata.height})`);

        // Determinar se precisa redimensionar
        const needsResize = metadata.width > CONFIG.MAX_WIDTH || metadata.height > CONFIG.MAX_HEIGHT;
        
        // Criar pipeline de processamento
        let pipeline = sharp(inputPath);
        
        // Aplicar redimensionamento se necessário
        if (needsResize) {
            pipeline = pipeline.resize({
                width: CONFIG.MAX_WIDTH,
                height: CONFIG.MAX_HEIGHT,
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        // Aplicar compressão baseada no formato
        const ext = path.extname(inputPath).toLowerCase();
        switch (ext) {
            case '.jpg':
            case '.jpeg':
                pipeline = pipeline.jpeg({ 
                    quality: CONFIG.JPEG_QUALITY, 
                    progressive: true 
                });
                break;
            case '.png':
                pipeline = pipeline.png({ 
                    quality: CONFIG.PNG_QUALITY, 
                    compressionLevel: 9 
                });
                break;
            case '.webp':
                pipeline = pipeline.webp({ 
                    quality: CONFIG.WEBP_QUALITY 
                });
                break;
        }

        // Salvar imagem otimizada
        await pipeline.toFile(outputPath);
        
        // Calcular estatísticas
        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
        
        console.log(`✅ ${path.basename(inputPath)}: ${formatFileSize(originalSize)} → ${formatFileSize(optimizedSize)} (${savings}% redução)`);
        
        return { 
            originalSize, 
            optimizedSize, 
            savings: parseFloat(savings),
            needsResize
        };
        
    } catch (error) {
        console.error(`❌ Erro ao processar ${path.basename(inputPath)}:`, error.message);
        return null;
    }
}

/**
 * Cria backup das imagens originais
 * @param {string} sourceDir - Diretório fonte
 * @param {Array} imageFiles - Lista de arquivos de imagem
 */
function createBackup(sourceDir, imageFiles) {
    const backupDir = path.join(sourceDir, 'backup');
    
    if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
        console.log(`📁 Diretório de backup criado: ${backupDir}`);
    }

    for (const file of imageFiles) {
        const sourcePath = path.join(sourceDir, file);
        const backupPath = path.join(backupDir, file);
        
        if (!fs.existsSync(backupPath)) {
            fs.copyFileSync(sourcePath, backupPath);
        }
    }
    
    console.log(`💾 Backup de ${imageFiles.length} imagens criado\n`);
}

/**
 * Processa todas as imagens de um diretório
 * @param {string} sourceDir - Diretório fonte
 * @param {string} targetDir - Diretório destino
 */
async function processDirectory(sourceDir, targetDir) {
    console.log('🖼️  OTIMIZADOR DE IMAGENS PARA WEB');
    console.log('=====================================\n');
    
    // Verificar se diretório fonte existe
    if (!fs.existsSync(sourceDir)) {
        console.error(`❌ Diretório não encontrado: ${sourceDir}`);
        return;
    }

    // Criar diretório destino se não existir
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`📁 Diretório destino criado: ${targetDir}\n`);
    }

    // Encontrar arquivos de imagem
    const files = fs.readdirSync(sourceDir);
    const imageFiles = files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return CONFIG.SUPPORTED_EXTENSIONS.includes(ext) && 
               !file.includes('_optimized') && 
               !file.startsWith('temp_');
    });

    if (imageFiles.length === 0) {
        console.log('❌ Nenhuma imagem encontrada para processar.');
        return;
    }

    console.log(`📊 Encontradas ${imageFiles.length} imagens para processar:`);
    imageFiles.forEach(file => console.log(`   • ${file}`));
    console.log('');

    // Criar backup se habilitado
    if (CONFIG.CREATE_BACKUP && sourceDir === targetDir) {
        createBackup(sourceDir, imageFiles);
    }

    // Processar cada imagem
    let totalOriginalSize = 0;
    let totalOptimizedSize = 0;
    let processedCount = 0;
    let resizedCount = 0;

    for (const file of imageFiles) {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = CONFIG.OVERWRITE_ORIGINALS && sourceDir === targetDir
            ? path.join(targetDir, file)
            : path.join(targetDir, file.replace(/(\.[^.]+)$/, '_optimized$1'));

        const result = await optimizeImage(sourcePath, targetPath);
        
        if (result) {
            totalOriginalSize += result.originalSize;
            totalOptimizedSize += result.optimizedSize;
            processedCount++;
            if (result.needsResize) resizedCount++;
        }
    }

    // Exibir resumo final
    if (processedCount > 0) {
        const totalSavings = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(2);
        
        console.log('\n🎉 OTIMIZAÇÃO CONCLUÍDA!');
        console.log('========================');
        console.log(`📊 Imagens processadas: ${processedCount}/${imageFiles.length}`);
        console.log(`📐 Imagens redimensionadas: ${resizedCount}`);
        console.log(`📦 Tamanho original: ${formatFileSize(totalOriginalSize)}`);
        console.log(`🗜️  Tamanho otimizado: ${formatFileSize(totalOptimizedSize)}`);
        console.log(`💾 Economia total: ${totalSavings}%`);
        
        if (CONFIG.CREATE_BACKUP && sourceDir === targetDir) {
            console.log(`📁 Backups salvos em: ${path.join(sourceDir, 'backup')}`);
        }
        
        if (!CONFIG.OVERWRITE_ORIGINALS && sourceDir === targetDir) {
            console.log(`💡 Imagens otimizadas salvas com sufixo "_optimized"`);
        }
    }
}

/**
 * Formatar tamanho de arquivo em formato legível
 * @param {number} bytes - Tamanho em bytes
 * @returns {string} - Tamanho formatado
 */
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Exibir ajuda de uso
 */
function showHelp() {
    console.log('🖼️  OTIMIZADOR DE IMAGENS PARA WEB');
    console.log('=====================================\n');
    console.log('Uso:');
    console.log('  node src/js/image-optimizer.js [pasta-origem] [pasta-destino]');
    console.log('');
    console.log('Exemplos:');
    console.log('  node src/js/image-optimizer.js');
    console.log('  node src/js/image-optimizer.js src/images/gallery');
    console.log('  node src/js/image-optimizer.js src/images/photos src/images/photos-web');
    console.log('');
    console.log('Configurações atuais:');
    console.log(`  • Dimensão máxima: ${CONFIG.MAX_WIDTH}×${CONFIG.MAX_HEIGHT}px`);
    console.log(`  • Qualidade JPEG: ${CONFIG.JPEG_QUALITY}%`);
    console.log(`  • Criar backup: ${CONFIG.CREATE_BACKUP ? 'Sim' : 'Não'}`);
    console.log(`  • Sobrescrever originais: ${CONFIG.OVERWRITE_ORIGINALS ? 'Sim' : 'Não'}`);
}

// ===============================
// EXECUÇÃO PRINCIPAL
// ===============================

async function main() {
    const args = process.argv.slice(2);
    
    // Verificar se é pedido de ajuda
    if (args.includes('--help') || args.includes('-h')) {
        showHelp();
        return;
    }
    
    // Determinar diretórios
    const sourceDir = args[0] ? path.resolve(args[0]) : path.join(__dirname, '..', 'images', 'gallery');
    const targetDir = args[1] ? path.resolve(args[1]) : sourceDir;
    
    try {
        await processDirectory(sourceDir, targetDir);
    } catch (error) {
        console.error('❌ Erro durante a otimização:', error.message);
        process.exit(1);
    }
}

// Executar apenas se chamado diretamente
if (require.main === module) {
    main().catch(console.error);
}

// Exportar funções para uso em outros scripts
module.exports = {
    optimizeImage,
    processDirectory,
    CONFIG
}; 