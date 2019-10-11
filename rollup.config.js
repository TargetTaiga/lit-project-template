import del from 'rollup-plugin-delete';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';

export default [
    {
        input: 'src/bootstrap.ts',
        output: {
            format: 'iife',
            entryFileNames: '[name].js',
            name: 'bootstrap',
            dir: 'dist'
        },
        treeshake: true,
        plugins: [
            del({targets: 'dist/**/*.js'}),
            resolve(),
            typescript(),
            // minify({comments: false})
        ]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                entryFileNames: '[name].js',
                chunkFileNames: '[name].js',
                dir: 'dist',
                format: 'system',
                sourcemap: true
            }
        ],
        plugins: [
            resolve(),
            typescript(),
            // minify({comments: false}),
            copy({targets: [{src: 'src/index.html', dest: 'dist'}]}),
            replace({
                'process.env.NODE_ENV': JSON.stringify('development')
            })
        ]
    }];