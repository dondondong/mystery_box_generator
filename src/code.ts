// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

import { createRectangles } from "./rectangle-module"

import * as fs from 'fs'
// const fs = require('@types/node/fs');

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// 插件外壳的大小
figma.ui.resize(415, 530)

// let _bytes:any = null;
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];
    for (let i = 0; i < msg.count; i++) {
      // const rect = figma.createRectangle();
      // rect.x = i * 150;
      // rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      // figma.currentPage.appendChild(rect);
      // nodes.push(rect);
      createRectangles(i, nodes)
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }



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
      // figma.notify('已下载')
      // const image = figma.createImage(bytes)

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

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.

  // figma.closePlugin();
};
