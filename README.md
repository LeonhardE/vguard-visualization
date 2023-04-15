# ECE1770 Course Project: V-Guard Visualization

## The scope and design of the project

The project aims to address the complexities of understanding distributed algorithms and reduce the difficulty of comprehending [V-Guard](https://github.com/vguardbc/vguardbft) [1], particularly with its intricate dynamic configuration.

We decide to use a web-based approach to implement desired features. The V-Guard code will serve as middleware, while our system will be built using JavaScript, React, Flask and V-GuardBFT.

## Artifacts that help run the code and reproduce the results

### How to Build

#### Build V-Guard instance
```shell
// Compile the code in "vguardbft" using the build script
cd ./backend/vguardbft
./scripts/build.sh
```

#### Install python packages
```
// you can use pip to install Flask and Flask-CORS to your python environment
pip install -U Flask
pip install -U flask-cors
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

### How to Use the System

The main page of our visualization system looks like this:

![mainpage](https://LeonhardE.github.io/static/files/vguard-visual/mainpage.png)

In this page, you can choose cars from 10 candidates. To start the ordering or consensus phase, you need to choose 4 cars to form a **booth**. The booth will have a proposer. The default proposer of a booth is the first selected car. You may also set another car in the booth as the proposer.

When you select a valid booth, the button for "ORDERING" will be activated. You may click the ordering button to start the ordering phase:

![start-order](https://LeonhardE.github.io/static/files/vguard-visual/start-order.png)

Before the start of ordering phase, an ordering target need to be provided through an input box. After you provide a target, you can click "START" and wait for the button "NEXT STEP" to be activated.

![order-target](https://LeonhardE.github.io/static/files/vguard-visual/order-target.png)

Then you can click "NEXT STEP" to observe the message passing process in V-Guard. There are 7 steps for this phase. The message can be unfold by clicking the arrow to see the entire message content.

![msg](https://LeonhardE.github.io/static/files/vguard-visual/msg.png)

When you finish all the seven steps, you can click "EXIT" to return to the main page. The ordering target you just entered will appear in the order log of all members in the booth. You can click the car to see the corresponding order log.

![orderlog](https://LeonhardE.github.io/static/files/vguard-visual/orderlog.png)

With a valid order log, we can start the consensus phase. The consensus phase also need a booth of 4 cars, and the proposer must have at least one record in the order log. The first record in the proposer's order log will become the consensus target. When you select a valid booth, the button "CONSENSUS" will be activated. You can click this button to enter the consensus phase. Be aware that **the consensus phase can be initiated with a different booth of the ordering phase**. In this case, we can select any cars from the previous booth as the proposer to start the consensus phase on this record. Other cars in the booth may not have this record in their order log.

![consensus](https://LeonhardE.github.io/static/files/vguard-visual/consensus.png)

Here we choose car0, car5, car6, and car1 as a booth for consensus phase. The ordering target is the transaction we just finished in the ordering phase. Car1, car5, and car6 are all not in the previous ordering booth. We can click "START" to visualize the consensus phase. When the process ends, this record will appear in the committed log of the car in the booth.

![commitlog](https://LeonhardE.github.io/static/files/vguard-visual/commitlog.png)

The cars in the booth can be crashed in both ordering and consensus phase. You can click the button "CLICK TO CRASH" to do this. You can crash **any car at any time** to test the crash fault tolerance of V-Guard. One case of crashing a validator during the consensus phase is shown below.

![crash1](https://LeonhardE.github.io/static/files/vguard-visual/crash1.png)

Enjoy your journey of exploring the world of V-Guard!

## References

[1] Gengrui Zhang, Yunhao Mao, Shiquan Zhang, Shashank Motepalli, Fei Pan, and Hans-Arno Jacobsen. V-guard: An efficient permissioned blockchain for achieving consensus under dynamic memberships in v2x networks. _arXiv preprint arXiv:2301.06210_, 2023.
