import typescript from "@rollup/plugin-typescript";
import pkg from "./package.json" with { type: 'json' };

const external = Object.keys(pkg.dependencies || {})

module.exports = [
    {
        input: './src/index.ts',
        output: [
            {
                name: pkg.name,
                file: `dist/index.js`,
                format: 'cjs',
                sourcemap: true
            },
            {
                name: pkg.name,
                file: `dist/index.esm.js`,
                format: 'esm',
                sourcemap: true
            }
        ],
        external: external,
        plugins: [
            typescript({ tsconfig: './tsconfig.lib.json' })
        ]
    }
];
