# ECE1770 Course Project: V-Guard Visualization

## The scope and design of the project

The project aims to address the complexities of understanding distributed algorithms and reduce the difficulty of comprehending V-Guard [1], particularly with its intricate dynamic configuration.

We decide to use a web-based approach to implement desired features. The V-Guard code will serve as middleware, while our system will be built using JavaScript, React, Flask and V-GuardBFT.

## Artifacts that help run the code and reproduce the results

### How to build

#### Build V-Guard instance
```shell
// Compile the code in "vguardbft" using the build script
cd ./backend/vguardbft
./scripts/build.sh
```

### How to Run

This project needs to run with [yarn](https://yarnpkg.com/getting-started/install). The backend requires Python3 and Flask.

```shell
// install dependencies of the React frontend
yarn install
// concurrently initiate the frontend and backend
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the frontend in your browser.

The backend is run on [http://localhost:8000](http://localhost:8000)

## References

[1] Gengrui Zhang, Yunhao Mao, Shiquan Zhang, Shashank Motepalli, Fei Pan, and Hans-Arno Jacobsen. V-guard: An efficient permissioned blockchain for achieving consensus under dynamic memberships in v2x networks. _arXiv preprint arXiv:2301.06210_, 2023.
