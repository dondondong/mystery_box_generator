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
figma.ui.resize(500, 620)

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
      console.log(i, nodes)
      createRectangles(i, nodes)
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // 获取并在ui中渲染出盒子
  if (msg.type === 'renderer') {
    // 通过名字匹配
    let mainBox: any = []
    mytraverse([figma.currentPage], (item: any) => {
      return item.name === 'Generate_MysteryBox_Sides_Merge' //查找的字段
    }, mainBox);

    let coverBox: any = []
    mytraverse([figma.currentPage], (item: any) => {
      return item.name === 'Generate_MysteryBox_Sides_Bottom_Merge' //查找的字段
    }, coverBox);

    console.log(coverBox, 1, figma.currentPage, figma.currentPage.selection);

    if (!mainBox || mainBox.length === 0) {
      figma.ui.postMessage({ type: 'sayMessage', msg: "主体盒子命名有误，找不到该Sides,请命名为Generate_MysteryBox_Sides_Merge！" })
      return;
    }
    if (!coverBox || coverBox.length === 0) {
      figma.ui.postMessage({ type: 'sayMessage', msg: "盒子底部文件命名有误，找不到该Sides,请命名为Generate_MysteryBox_Sides_Bottom_Merge！" })
      return;
    }

    let promise1 = mainBox[0]?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },   // 导出图片分辨率
    })
    let promise2 = coverBox[0]?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    })
    Promise.all([promise1, promise2]).then((bytes) => {
      // _bytes = bytes;
      figma.ui.postMessage({ type: 'redererBox', bytes })
      console.log(bytes);
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


    // three 的
    let boxA = getItem('Generate_MysteryBox_Sides_Main_A')
    let boxB = getItem('Generate_MysteryBox_Sides_Main_B')
    let boxC = getItem('Generate_MysteryBox_Sides_Main_C')

    let promiseMainA = boxA?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },   // 导出图片分辨率
    })
    let promiseMainB = boxB?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    })
    let promiseMainC = boxC?.exportAsync({
      format: 'PNG',
      constraint: { type: 'SCALE', value: 3 },
    })

    Promise.all([promiseMainA, promiseMainB, promiseMainC]).then((bytes) => {
      // _bytes = bytes;
      figma.ui.postMessage({ type: 'redererBoxThree', bytes })
      console.log(bytes);
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

  function getItem(name:string){
    let mainBox: any = []
    mytraverse([figma.currentPage], (item: any) => {
      return item.name === name //查找的字段
    }, mainBox);
    return mainBox[0]
  }

  // 递归取节点
  function mytraverse(arr: any[], fn: Function, result: any[]) {
    arr.forEach(item2 => {
      if ("children" in item2) {
        mytraverse(item2["children"], fn, result)
      } else {
        if (fn(item2)) {
          result.push(item2)
        }
      }
    })
  }

  let findNodes = [];
  function mytraverse1(node: any) {
    console.log(node)
    if (node.name === 'Generated_Box_Image') {
      findNodes.push(node);
    }
    if ("children" in node) {
      for (const child of node.children) {
        if (child.name === 'Generated_Box_Image') {
          findNodes.push(node)
        }
        mytraverse1(child)
      }
    }
  }

  if (msg.type === 'generatorBlindBox') {
    console.log(msg);
    // if (_bytes === null) {
    //   figma.ui.postMessage({type : 'sayMessage' , msg:"UI中未执行渲染！"})
    //   return;
    // }
    const image1 = figma.createImage(msg.data)
    // const image2 = figma.createImage(_bytes[1])

    console.log(figma.currentPage);

    let findNodes:any = [];
    function mytraverse1(node: any) {
      // if (node.name === 'Generated_Box_Image') {
      //   findNodes.push(node);
      // }
      if ("children" in node) {
        for (const child of node.children) {
          if (child.name === 'Generated_Box_Image_Three') {
            findNodes.push(child)
          }
          mytraverse1(child)
        }
      }
    }
    mytraverse1(figma.currentPage)
    console.log(222, findNodes)

    if (!findNodes || findNodes.length === 0) {
      figma.ui.postMessage({ type: 'sayMessage', msg: "背景文件命名有误，找不到该Sides,请命名为Generated_Box_Image！" })
      return;
    }

    // 放置位置。。。。
    // const { x, y, width, height, } = backgroundImg[0]
    // frame.x = x + width / 2
    // frame.y = y + height / 2
    // frame.resize(width * 3, height * 3)
    findNodes[0].fills = [{
      imageHash: image1.hash,
      scaleMode: "FILL",
      scalingFactor: 1,
      type: "IMAGE",
    }]
  }

  if (msg.type === 'exportAsync') {
    let list: string[] = []
    for (const node of figma.currentPage.selection) {
      // Error! Type SceneNode is not assignable to type 'string'
      // list.push(node)
      console.log(node);
      node.exportAsync({
        format: 'PNG',
        constraint: { type: 'SCALE', value: 1 },
      }).then((bytes) => {

        figma.ui.postMessage({ type: 'downImage', bytes })
        const image = figma.createImage(bytes)

        console.log(bytes, image, image.hash);
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
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.

  // figma.closePlugin();
};
