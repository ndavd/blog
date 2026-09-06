{
  lib,
  ...
}:
{
  projectRootFile = "flake.nix";
  programs = {
    nixfmt.enable = true;
    deadnix.enable = true;
    statix.enable = true;
    biome.enable = true;
    rumdl-format.enable = true;
    yamlfmt.enable = true;
  };
  settings.formatter.biome.options = lib.mkForce [
    "check"
    "--write"
    "--no-errors-on-unmatched"
    "--config-path"
    "./biome.json"
  ];
}
