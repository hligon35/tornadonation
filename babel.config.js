module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            '@tornado-nation/ui': './packages/ui/src',
            '@tornado-nation/shared': './packages/shared/src',
          },
        },
      ],
    ],
  };
};
