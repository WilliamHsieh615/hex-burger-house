# HexBurgerHouse

gh-pages 上傳時請注意 .output/public/.nojekyll，要有 .nojekyll 才能使 github 不忽略 _底線開頭的檔案

```bash
npm run generate
touch .output/public/.nojekyll
npx gh-pages -d .output/public -b gh-pages -r https://github.com/WilliamHsieh615/hex-burger-house.git -f --dotfiles
