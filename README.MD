If you need more explanations about how to setup your VS Code you can visit https://github.com/aenhancers/types-for-adobe

# 1. Requirements
1. Mac OS, Linux, Windows with WSL2 installed
2. Git
3. Node
4. Visual Studio Code with extensions: 
    - Remote WSL - for Windows users to open folders directly in WSL subsystem
    - Adobe Script Runner -to run Adobe Scripts
    - Docker - to work with Docker from VS Code
    - Remote-Containers - to attach VS Code to container easily

# 2. Installing with Docker

## 1. Clone repository

## 2. Build Image from Dockerfile
```sh
docker image build -t adobescripts
```

## 3. Run Container from image created in previous step
```sh
docker container run -d -it --mount type=bind,source="$(pwd)"/src,target=/app/src --name adobescripts adobescripts
```

# 3. Open in VS Code with Docker

1. Switch to Docker extension and find `Individual Containers` in `Containers` panel

2. Right click on `adobescripts` container and choose `Attach Visual Studio Code`

3. Select `/adobescripts` container and accept with Enter

4. New VS Code window with content of `adobescripts` should open

5. Select `File > Open folder` and find `/app` folder

6. Content of this folder should appear. `src` folder contains all code available on your host in project folder. All changes made in container will be reflected on host and vice versa.

7. To Build JS file from TS file select `Terminal > Run Build Task` and select `tsc:build`

# 4. Installing without Docker with Node installed

1. Clone repository

2. Go into app folder 
```sh
cd adobe-scripts
```

3. Install dependencies
```sh
npm i
```

4. Open folder with VS Code

5. To Build JS file from TS file select `Terminal > Run Build Task` and select `tsc:build`