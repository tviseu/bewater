# 🖼️ Otimizador de Imagens para Web

Este script otimiza imagens para uso em websites, reduzindo drasticamente o tamanho dos arquivos mantendo qualidade visual adequada.

## 📋 Pré-requisitos

```bash
npm install sharp --save-dev
```

## 🚀 Como usar

### Uso básico (otimizar galeria padrão):
```bash
node src/js/image-optimizer.js
```

### Especificar pasta origem:
```bash
node src/js/image-optimizer.js src/images/photos
```

### Especificar pasta origem e destino:
```bash
node src/js/image-optimizer.js src/images/photos src/images/photos-web
```

### Ver ajuda:
```bash
node src/js/image-optimizer.js --help
```

## ⚙️ Configurações

O script pode ser configurado editando o objeto `CONFIG` no arquivo:

```javascript
const CONFIG = {
    MAX_WIDTH: 1200,        // Largura máxima em pixels
    MAX_HEIGHT: 800,        // Altura máxima em pixels
    JPEG_QUALITY: 85,       // Qualidade JPEG (0-100)
    PNG_QUALITY: 85,        // Qualidade PNG (0-100)
    WEBP_QUALITY: 85,       // Qualidade WebP (0-100)
    CREATE_BACKUP: true,    // Criar backup das originais
    OVERWRITE_ORIGINALS: false  // Sobrescrever imagens originais
};
```

## 📊 Exemplo de resultado

```
🖼️  OTIMIZADOR DE IMAGENS PARA WEB
=====================================

📊 Encontradas 8 imagens para processar:
   • gallery3.jpg
   • gallery4.jpg
   • gallery5.jpg
   • gallery6.jpg
   • gallery7.jpg
   • gallery8.jpg
   • gallery9.jpg
   • gallery10.jpg

📸 Processando: gallery3.jpg (4480×6720)
✅ gallery3.jpg: 13.40 MB → 58.42 KB (99.58% redução)

📸 Processando: gallery4.jpg (6720×4480)
✅ gallery4.jpg: 14.42 MB → 132.15 KB (99.10% redução)

...

🎉 OTIMIZAÇÃO CONCLUÍDA!
========================
📊 Imagens processadas: 8/8
📐 Imagens redimensionadas: 8
📦 Tamanho original: 92.96 MB
🗜️  Tamanho otimizado: 1.00 MB
💾 Economia total: 98.92%
📁 Backups salvos em: src/images/gallery/backup
```

## 🔧 Funcionalidades

- ✅ **Redimensionamento inteligente**: Mantém proporção original
- ✅ **Compressão otimizada**: Diferentes algoritmos por tipo de imagem
- ✅ **Backup automático**: Preserva imagens originais
- ✅ **Suporte múltiplos formatos**: JPG, PNG, WebP
- ✅ **Estatísticas detalhadas**: Mostra economia de espaço
- ✅ **Configuração flexível**: Fácil personalização
- ✅ **Uso como módulo**: Pode ser importado em outros scripts

## 📁 Estrutura de arquivos

```
src/
├── js/
│   ├── image-optimizer.js          # Script principal
│   └── README-image-optimizer.md   # Esta documentação
└── images/
    └── gallery/
        ├── backup/                 # Backups das originais
        │   ├── gallery3.jpg       # (13.40 MB)
        │   └── gallery4.jpg       # (14.42 MB)
        ├── gallery3.jpg           # (58 KB - otimizada)
        └── gallery4.jpg           # (132 KB - otimizada)
```

## 💡 Dicas de uso

1. **Primeira vez**: Execute com backup habilitado para segurança
2. **Diferentes projetos**: Use pastas origem/destino separadas
3. **Múltiplas execuções**: O script ignora imagens já otimizadas
4. **Personalização**: Ajuste qualidade conforme necessidade
5. **Integração**: Pode ser chamado de outros scripts Node.js

## 🔄 Histórico de versões

- **v1.0.0**: Versão inicial com todas as funcionalidades
  - Otimização automática
  - Backup de segurança
  - Estatísticas detalhadas
  - Configuração flexível 