// Importa o multer
import multer from 'multer';
// Importa do node 
import path from 'path';

export default {
    // diskStorage: diz que vai salvar em algum canto no projeto
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        // Altera o nome para salvar na pasta
        filename: (req, file, cb) => {
            // Pega a extenção do arquivo
            const ext = path.extname(file.originalname);
            // Pega o nome do arquivo
            const name = path.basename(file.originalname, ext);
            //Null caso de algum erro
            cb(null,`${name}-${Date.now()}${ext}`) // Monta o nome do arquivo para não se repetir colocando uma data no meio
        },
    })
};