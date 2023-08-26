

figma.showUI(__html__);

// 插件外壳的大小
figma.ui.resize(415, 530)

// 接收 figma message
figma.ui.onmessage = msg => {

  // 全局变量
  const mainBox4UI = `Generate_MysteryBox_Sides_Merge`;
  const coverBox4UI = `Generate_MysteryBox_Sides_Bottom_Merge`;
  const backgroundBox4UI = `Generate_MysteryBox_Background`;
  const reciveRendererBoxName = 'Generated_MysteryBox';
  const mainBox4Img = `盲盒_褪底图_1:1`;
  const allBox4Img = `盲盒_封面图_1:1`;
  const backgroundBox4Img = '盲盒_背景图_1:1';
  const scaleValue = 3; // 导出图片原始尺寸的倍数

  // 获取并在ui中渲染出盒子
  if (msg.type === 'renderer') {

    let mainBox = getItem(mainBox4UI)
    let coverBox = getItem(coverBox4UI)
    let backgroundBox = getItem(backgroundBox4UI)

    if (!mainBox || mainBox.length === 0) {
      figma.ui.postMessage({ type: 'sayMessage', msg: `主体盒子命名有误，找不到该Slice,请命名为${mainBox4UI}！` })
      return;
    }
    if (!coverBox || coverBox.length === 0) {
      figma.ui.postMessage({ type: 'sayMessage', msg: `盒子底部文件命名有误，找不到该Slice,请命名为${coverBox4UI}！` })
      return;
    }
    if (!backgroundBox || backgroundBox.length === 0) {
      figma.ui.postMessage({ type: 'sayMessage', msg: `背景文件命名有误，找不到该Slice,请命名为${backgroundBox4UI}！` })
      return;
    }

    let promise1 = mainBox?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },   // 导出图片分辨率
    })
    let promise2 = coverBox?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    })
    let promise3 = backgroundBox?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    })
    Promise.all([promise1, promise2, promise3]).then((bytes) => {
      figma.ui.postMessage({ type: 'redererBox', bytes })
      figma.notify('已生成')

      // 新增一个 Frame
      // const frame = figma.createFrame()
      // frame.x = 200
      // frame.resize(200, 230)
      // frame.fills = [{
      //   imageHash: image.hash,
      //   scaleMode: "FILL",
      //   scalingFactor: 1,
      //   type: "IMAGE",
      // }]
    })

  }

  function getItem(name: string) {
    let mainBox: any = []
    mytraverse([figma.currentPage], (item: any) => {
      return item.name === name //查找的字段
    }, mainBox);
    return mainBox[0]
  }

  // 递归取节点
  function mytraverse(arr: any[], fn: Function, result: any[]) {
    arr.forEach(item2 => {
      if (fn(item2)) {
        result.push(item2)
      }

      if ("children" in item2) {
        mytraverse(item2["children"], fn, result)
      }
    })
  }


  if (msg.type === 'generatorBlindBox') {
    const image1 = figma.createImage(msg.data)
    // console.log(image1)


    let findNodes: any = [];
    function mytraverse1(node: any) {
      // if (node.name === 'Generated_Box_Image') {
      //   findNodes.push(node);
      // }
      if ("children" in node) {
        for (const child of node.children) {
          if (child.name === reciveRendererBoxName) {
            findNodes.push(child)
          }
          mytraverse1(child)
        }
      }
    }
    mytraverse1(figma.currentPage)

    if (!findNodes || findNodes.length === 0) {
      figma.ui.postMessage({ type: 'sayMessage', msg: "背景文件命名有误，找不到该Sides,请命名为Generated_Box_Image！" })
      return;
    }

    for (let i = 0; i < findNodes.length; i++) {
      if (findNodes[i].type !== 'SLICE') {
        findNodes[i].fills = [{
          imageHash: image1.hash,
          scaleMode: "FILL",
          scalingFactor: 1,
          type: "IMAGE",
        }]
      }
    }
    // figma.notify('已生成')
  }

  if (msg.type === 'exportAllImg') {
    let list: string[] = []

    let singleBox = getItem(mainBox4Img)
    let backgroundBox = getItem(backgroundBox4Img)
    let allBox = getItem(allBox4Img)

    const singleBoxPromise = singleBox.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: scaleValue },
    })
    const backgroundBoxPromise = backgroundBox.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: scaleValue },
    })
    const allBoxPromise = allBox.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: scaleValue },
    })
    // Error! Type SceneNode is not assignable to type 'string'
    Promise.all([singleBoxPromise, backgroundBoxPromise, allBoxPromise]).then((bytes: any) => {

      figma.ui.postMessage({ type: 'downloadAllImgZip', bytes })
    })
  }

  // figma.closePlugin();
};
