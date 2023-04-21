function n(l = []) {
  return function(i) {
    l.forEach((f) => {
      typeof f == "function" || typeof f.install == "function" ? i.use(f) : i.component(`${f.name}`, f);
    });
  };
}
export {
  n as buildInstall
};
//# sourceMappingURL=create.mjs.map
