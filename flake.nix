{
  description = "meuPonteiro — ambiente de desenvolvimento reproduzível";

  inputs = {
    nixpkgs.url     = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          name = "meuponteiro-shell";

          packages = with pkgs; [
            nodejs_22        # Node.js 22 LTS — travado pelo flake.lock
            nodePackages.npm # npm compatível com Node 22
          ];

          shellHook = ''
            echo ""
            echo "  meuPonteiro dev shell"
            echo "  Node  $(node --version)"
            echo "  npm   $(npm --version)"
            echo ""

            # Instala dependências automaticamente se node_modules não existir
            if [ ! -d "node_modules" ]; then
              echo "  → Rodando npm install..."
              npm install
            fi
          '';
        };
      }
    );
}
