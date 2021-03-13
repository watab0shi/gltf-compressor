const glob = require('glob');
const fs = require('fs-extra');
const path = require('path');
const gltfPipeline = require('gltf-pipeline');

const srcDir = 'src';
const distDir = 'dist';

/**
 * glTFをDRACO圧縮
 * @param {string | string[]} globs 
 */
const compressGltfWithDraco = (globs) => {
  glob(globs, async (err, files) => {
    if (err) return;

    for (const file of files) {
      const filePath = path.resolve(file);
      const gltf = fs.readJsonSync(filePath);// gltfのJSONを読み込む
      const options = {
        resourceDirectory: path.dirname(filePath),// gltfのリソースディレクトリ（親フォルダ）
        dracoOptions: { compressionLevel: 10 }// DRACO圧縮率MAX
      };
      const { glb } = await gltfPipeline.gltfToGlb(gltf, options);// gltf -> glb
      const outFilePath = filePath.replace('.gltf', '-draco.glb').replace(srcDir, distDir);// 出力先
      await fs.mkdirp(path.dirname(outFilePath));// distディレクトリがなかったら作成
      await fs.writeFileSync(outFilePath, glb);// glbファイル出力
      console.log(`[draco] ${ outFilePath }`);
    }
  });
};

compressGltfWithDraco(`./${ srcDir }/**/*.gltf`);
