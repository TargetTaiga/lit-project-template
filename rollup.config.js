import del from 'rollup-plugin-delete';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';

export default [
    {
        input: 'src/bootstrap.js',
        output: {
            format: 'iife',
            entryFileNames: '[name].js',
            filename: 'bootstrap.js',
            dir: 'dist'
        },
        treeshake: true,
        plugins: [
            del({targets: 'dist/**/*.js'}),
            resolve(),
            minify({comments: false})
        ]
    },
    {
        input: ['src/index.js'],
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
            // minify({comments: false}),
            copy({targets: [{src: 'src/index.html', dest: 'dist'}]}),
            replace({
                'process.env.NODE_ENV': JSON.stringify('development')
            })
        ]
    }];