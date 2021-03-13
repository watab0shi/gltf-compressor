# gltf-compressor

install packages

```
$yarn
```

Put `.gltf` (+ `.bin` + textures) files in `src` directory.

## Compress with DRACO

```
$ yarn draco
```

`[filename]-draco.glb` will saved to `dist` directory.

## Compress with meshopt

```
$ yarn meshopt
```

`[filename]-meshopt.glb` will saved to `dist` directory.
