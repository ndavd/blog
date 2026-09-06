{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    treefmt-nix = {
      url = "github:numtide/treefmt-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      treefmt-nix,
      ...
    }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "aarch64-darwin"
      ];
      forEachSystem = nixpkgs.lib.genAttrs systems;
      perSystem = forEachSystem (
        system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
          treefmtEval = treefmt-nix.lib.evalModule pkgs ./treefmt.nix;
        in
        {
          fmt = treefmtEval.config.build.check self;
          formatter = treefmtEval.config.build.wrapper;
          devShell = pkgs.mkShell {
            buildInputs = with pkgs; [
              bun
            ];
          };
        }
      );
    in
    {
      devShells = forEachSystem (system: {
        default = perSystem.${system}.devShell;
      });
      checks = forEachSystem (system: {
        inherit (perSystem.${system}) fmt;
      });
      formatter = forEachSystem (system: perSystem.${system}.formatter);
    };
}
