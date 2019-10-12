import del from 'rollup-plugin-delete';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-babel-minify';
import copy from 'rollup-plugin-copy';
import replace from 'rollup-plugin-replace';
import typescript from 'rollup-plugin-typescript';
import stringifyJsx from 'rollup-plugin-stringify-jsx';

const production = false;

const systemConfig = {
    input: 'src/system.ts',
    output: {
        format: 'iife',
        entryFileNames: '[name].js',
        name: 'system',
        dir: 'dist'
    },
    treeshake: true,
    plugins: [
        del({ targets: ['dist/**/*.js', 'dist/**/*.map'] }),
        resolve(),
        typescript(),
        replace({
            'console.log': '' /* replacing annoying logging from systemjs  */
        })
    ]
};

const bundleConfig = {
    input: 'src/index.ts',
    output: [
        {
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
            dir: 'dist',
            format: 'system',
            sourcemap: !production
        }
    ],
    plugins: [
        resolve(),
        typescript(),
        stringifyJsx({
            parserOptions: { sourceType: 'module', plugins: ['jsx', 'dynamicImport'] },
            customAttributeReplacementFn: (nodePath, defaultReplacement) => {
                if (defaultReplacement) {
                    return defaultReplacement;
                }
                const attribute = nodePath.node.name;
                if (attribute.startsWith('a-')) {
                    return '@' + attribute.slice(2);
                }
                if (attribute.startsWith('d-')) {
                    return '.' + attribute.slice(2);
                }
                if (attribute.startsWith('q-')) {
                    return '?' + attribute.slice(2);
                }
                return attribute;
            }
        }),
        copy({ targets: [{ src: 'src/index.html', dest: 'dist' }] }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development')
        })
    ]
};

if (production) {
    bundleConfig.plugins.push(minify({ comments: false }));
    systemConfig.plugins.push(minify({ comments: false }));
}

export default [systemConfig, bundleConfig];