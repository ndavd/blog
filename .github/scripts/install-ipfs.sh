#!/usr/bin/env bash

version="$(curl -s "https://dist.ipfs.tech/kubo/versions" | tail -n 1)"
filename="kubo_${version}_linux-amd64.tar.gz"
wget "https://dist.ipfs.tech/kubo/${version}/${filename}"
tar -xvzf "$filename"
cd kubo
sudo bash install.sh
ipfs --version
