const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Le dossier contenant les fichiers audio
const musicDir = path.join(__dirname, 'Music');

// Fonction pour obtenir la durée d'un fichier MP3
function getAudioDuration(filePath) {
  try {
    const result = execSync(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${filePath}"`);
    return parseFloat(result.toString()).toFixed(2);  // Retourne la durée en secondes avec 2 décimales
  } catch (error) {
    console.error(`Erreur lors de l'obtention de la durée du fichier: ${filePath}`);
    return 0;
  }
}

// Lire le dossier "Music" et obtenir la liste des fichiers MP3
fs.readdir(musicDir, (err, files) => {
  if (err) {
    console.error('Erreur lors de la lecture du dossier Music:', err);
    return;
  }

  // Filtrer les fichiers pour ne garder que les .mp3
  const mp3Files = files.filter(file => path.extname(file).toLowerCase() === '.mp3');

  // Créer un tableau des musiques avec leurs informations
  const musicList = mp3Files.map(file => {
    const filePath = path.join(musicDir, file);
    return {
      name: path.basename(file, '.mp3'), // Nom sans l'extension
      file: `Music/${file}`,
      duration: getAudioDuration(filePath) // Durée du fichier
    };
  });

  // Enregistrer les données dans un fichier music.json
  fs.writeFile(path.join(__dirname, 'music.json'), JSON.stringify(musicList, null, 2), err => {
    if (err) {
      console.error('Erreur lors de l\'écriture de music.json:', err);
    } else {
      console.log('music.json généré avec succès');
    }
  });
});
