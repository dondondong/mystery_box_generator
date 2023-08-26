/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/rectangle-module.ts":
/*!*********************************!*\
  !*** ./src/rectangle-module.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createRectangles: () => (/* binding */ createRectangles)
/* harmony export */ });
function createRectangles(i, nodes) {
    const rect = figma.createRectangle();
    rect.x = i * 150;
    rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
    figma.currentPage.appendChild(rect);
    nodes.push(rect);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rectangle_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangle-module */ "./src/rectangle-module.ts");
// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// const fs = require('@types/node/fs');
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// 插件外壳的大小
figma.ui.resize(415, 530);
// let _bytes:any = null;
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    if (msg.type === 'create-rectangles') {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            // const rect = figma.createRectangle();
            // rect.x = i * 150;
            // rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
            // figma.currentPage.appendChild(rect);
            // nodes.push(rect);
            (0,_rectangle_module__WEBPACK_IMPORTED_MODULE_0__.createRectangles)(i, nodes);
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
        let mainBox = getItem(mainBox4UI);
        let coverBox = getItem(coverBox4UI);
        let backgroundBox = getItem(backgroundBox4UI);
        if (!mainBox || mainBox.length === 0) {
            figma.ui.postMessage({ type: 'sayMessage', msg: `主体盒子命名有误，找不到该Slice,请命名为${mainBox4UI}！` });
            return;
        }
        if (!coverBox || coverBox.length === 0) {
            figma.ui.postMessage({ type: 'sayMessage', msg: `盒子底部文件命名有误，找不到该Slice,请命名为${coverBox4UI}！` });
            return;
        }
        if (!backgroundBox || backgroundBox.length === 0) {
            figma.ui.postMessage({ type: 'sayMessage', msg: `背景文件命名有误，找不到该Slice,请命名为${backgroundBox4UI}！` });
            return;
        }
        let promise1 = mainBox === null || mainBox === void 0 ? void 0 : mainBox.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: 3 }, // 导出图片分辨率
        });
        let promise2 = coverBox === null || coverBox === void 0 ? void 0 : coverBox.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: 3 },
        });
        let promise3 = backgroundBox === null || backgroundBox === void 0 ? void 0 : backgroundBox.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: 3 },
        });
        Promise.all([promise1, promise2, promise3]).then((bytes) => {
            figma.ui.postMessage({ type: 'redererBox', bytes });
            figma.notify('已生成');
            // const frame = figma.createFrame()
            // frame.x = 200
            // frame.resize(200, 230)
            // frame.fills = [{
            //   imageHash: image.hash,
            //   scaleMode: "FILL",
            //   scalingFactor: 1,
            //   type: "IMAGE",
            // }]
        });
    }
    function getItem(name) {
        let mainBox = [];
        mytraverse([figma.currentPage], (item) => {
            return item.name === name; //查找的字段
        }, mainBox);
        return mainBox[0];
    }
    // 递归取节点
    function mytraverse(arr, fn, result) {
        arr.forEach(item2 => {
            if (fn(item2)) {
                result.push(item2);
            }
            if ("children" in item2) {
                mytraverse(item2["children"], fn, result);
            }
        });
    }
    if (msg.type === 'generatorBlindBox') {
        const image1 = figma.createImage(msg.data);
        // console.log(image1)
        let findNodes = [];
        function mytraverse1(node) {
            // if (node.name === 'Generated_Box_Image') {
            //   findNodes.push(node);
            // }
            if ("children" in node) {
                for (const child of node.children) {
                    if (child.name === reciveRendererBoxName) {
                        findNodes.push(child);
                    }
                    mytraverse1(child);
                }
            }
        }
        mytraverse1(figma.currentPage);
        if (!findNodes || findNodes.length === 0) {
            figma.ui.postMessage({ type: 'sayMessage', msg: "背景文件命名有误，找不到该Sides,请命名为Generated_Box_Image！" });
            return;
        }
        for (let i = 0; i < findNodes.length; i++) {
            if (findNodes[i].type !== 'SLICE') {
                findNodes[i].fills = [{
                        imageHash: image1.hash,
                        scaleMode: "FILL",
                        scalingFactor: 1,
                        type: "IMAGE",
                    }];
            }
        }
        // figma.notify('已生成')
    }
    if (msg.type === 'exportAllImg') {
        let list = [];
        let singleBox = getItem(mainBox4Img);
        let backgroundBox = getItem(backgroundBox4Img);
        let allBox = getItem(allBox4Img);
        const singleBoxPromise = singleBox.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: scaleValue },
        });
        const backgroundBoxPromise = backgroundBox.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: scaleValue },
        });
        const allBoxPromise = allBox.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: scaleValue },
        });
        // Error! Type SceneNode is not assignable to type 'string'
        Promise.all([singleBoxPromise, backgroundBoxPromise, allBoxPromise]).then((bytes) => {
            figma.ui.postMessage({ type: 'downloadAllImgZip', bytes });
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
        });
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    // figma.closePlugin();
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQix3QkFBd0Isc0JBQXNCO0FBQ2xFO0FBQ0E7QUFDQTs7Ozs7OztVQ05BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQSw4QkFBOEIsdUJBQXVCLG9CQUFvQjtBQUN6RTtBQUNBO0FBQ0EsWUFBWSxtRUFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtREFBbUQsV0FBVyxJQUFJO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxxREFBcUQsWUFBWSxJQUFJO0FBQ3hHO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxtREFBbUQsaUJBQWlCLElBQUk7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIseUJBQXlCO0FBQ25ELFNBQVM7QUFDVDtBQUNBO0FBQ0EsMEJBQTBCLHlCQUF5QjtBQUNuRCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDBCQUEwQix5QkFBeUI7QUFDbkQsU0FBUztBQUNUO0FBQ0EsbUNBQW1DLDJCQUEyQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsd0VBQXdFO0FBQzNHO0FBQ0E7QUFDQSx3QkFBd0Isc0JBQXNCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGtDQUFrQztBQUM1RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDBCQUEwQixrQ0FBa0M7QUFDNUQsU0FBUztBQUNUO0FBQ0E7QUFDQSwwQkFBMEIsa0NBQWtDO0FBQzVELFNBQVM7QUFDVDtBQUNBO0FBQ0EsbUNBQW1DLGtDQUFrQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0JsaW5kLUJveC1HZW5lcmF0b3IvLi9zcmMvcmVjdGFuZ2xlLW1vZHVsZS50cyIsIndlYnBhY2s6Ly9CbGluZC1Cb3gtR2VuZXJhdG9yL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0JsaW5kLUJveC1HZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0JsaW5kLUJveC1HZW5lcmF0b3Ivd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9CbGluZC1Cb3gtR2VuZXJhdG9yL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vQmxpbmQtQm94LUdlbmVyYXRvci8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWN0YW5nbGVzKGksIG5vZGVzKSB7XG4gICAgY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgIHJlY3QueCA9IGkgKiAxNTA7XG4gICAgcmVjdC5maWxscyA9IFt7IHR5cGU6IFwiU09MSURcIiwgY29sb3I6IHsgcjogMSwgZzogMC41LCBiOiAwIH0gfV07XG4gICAgZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgbm9kZXMucHVzaChyZWN0KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gVGhpcyBwbHVnaW4gd2lsbCBvcGVuIGEgd2luZG93IHRvIHByb21wdCB0aGUgdXNlciB0byBlbnRlciBhIG51bWJlciwgYW5kXG4vLyBpdCB3aWxsIHRoZW4gY3JlYXRlIHRoYXQgbWFueSByZWN0YW5nbGVzIG9uIHRoZSBzY3JlZW4uXG4vLyBUaGlzIGZpbGUgaG9sZHMgdGhlIG1haW4gY29kZSBmb3IgcGx1Z2lucy4gQ29kZSBpbiB0aGlzIGZpbGUgaGFzIGFjY2VzcyB0b1xuLy8gdGhlICpmaWdtYSBkb2N1bWVudCogdmlhIHRoZSBmaWdtYSBnbG9iYWwgb2JqZWN0LlxuLy8gWW91IGNhbiBhY2Nlc3MgYnJvd3NlciBBUElzIGluIHRoZSA8c2NyaXB0PiB0YWcgaW5zaWRlIFwidWkuaHRtbFwiIHdoaWNoIGhhcyBhXG4vLyBmdWxsIGJyb3dzZXIgZW52aXJvbm1lbnQgKFNlZSBodHRwczovL3d3dy5maWdtYS5jb20vcGx1Z2luLWRvY3MvaG93LXBsdWdpbnMtcnVuKS5cbmltcG9ydCB7IGNyZWF0ZVJlY3RhbmdsZXMgfSBmcm9tIFwiLi9yZWN0YW5nbGUtbW9kdWxlXCI7XG4vLyBjb25zdCBmcyA9IHJlcXVpcmUoJ0B0eXBlcy9ub2RlL2ZzJyk7XG4vLyBUaGlzIHNob3dzIHRoZSBIVE1MIHBhZ2UgaW4gXCJ1aS5odG1sXCIuXG5maWdtYS5zaG93VUkoX19odG1sX18pO1xuLy8g5o+S5Lu25aSW5aOz55qE5aSn5bCPXG5maWdtYS51aS5yZXNpemUoNDE1LCA1MzApO1xuLy8gbGV0IF9ieXRlczphbnkgPSBudWxsO1xuLy8gQ2FsbHMgdG8gXCJwYXJlbnQucG9zdE1lc3NhZ2VcIiBmcm9tIHdpdGhpbiB0aGUgSFRNTCBwYWdlIHdpbGwgdHJpZ2dlciB0aGlzXG4vLyBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdpbGwgYmUgcGFzc2VkIHRoZSBcInBsdWdpbk1lc3NhZ2VcIiBwcm9wZXJ0eSBvZiB0aGVcbi8vIHBvc3RlZCBtZXNzYWdlLlxuZmlnbWEudWkub25tZXNzYWdlID0gbXNnID0+IHtcbiAgICAvLyBPbmUgd2F5IG9mIGRpc3Rpbmd1aXNoaW5nIGJldHdlZW4gZGlmZmVyZW50IHR5cGVzIG9mIG1lc3NhZ2VzIHNlbnQgZnJvbVxuICAgIC8vIHlvdXIgSFRNTCBwYWdlIGlzIHRvIHVzZSBhbiBvYmplY3Qgd2l0aCBhIFwidHlwZVwiIHByb3BlcnR5IGxpa2UgdGhpcy5cbiAgICBpZiAobXNnLnR5cGUgPT09ICdjcmVhdGUtcmVjdGFuZ2xlcycpIHtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtc2cuY291bnQ7IGkrKykge1xuICAgICAgICAgICAgLy8gY29uc3QgcmVjdCA9IGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgICAgICAgICAgLy8gcmVjdC54ID0gaSAqIDE1MDtcbiAgICAgICAgICAgIC8vIHJlY3QuZmlsbHMgPSBbe3R5cGU6ICdTT0xJRCcsIGNvbG9yOiB7cjogMSwgZzogMC41LCBiOiAwfX1dO1xuICAgICAgICAgICAgLy8gZmlnbWEuY3VycmVudFBhZ2UuYXBwZW5kQ2hpbGQocmVjdCk7XG4gICAgICAgICAgICAvLyBub2Rlcy5wdXNoKHJlY3QpO1xuICAgICAgICAgICAgY3JlYXRlUmVjdGFuZ2xlcyhpLCBub2Rlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uID0gbm9kZXM7XG4gICAgICAgIGZpZ21hLnZpZXdwb3J0LnNjcm9sbEFuZFpvb21JbnRvVmlldyhub2Rlcyk7XG4gICAgfVxuICAgIC8vIOWFqOWxgOWPmOmHj1xuICAgIGNvbnN0IG1haW5Cb3g0VUkgPSBgR2VuZXJhdGVfTXlzdGVyeUJveF9TaWRlc19NZXJnZWA7XG4gICAgY29uc3QgY292ZXJCb3g0VUkgPSBgR2VuZXJhdGVfTXlzdGVyeUJveF9TaWRlc19Cb3R0b21fTWVyZ2VgO1xuICAgIGNvbnN0IGJhY2tncm91bmRCb3g0VUkgPSBgR2VuZXJhdGVfTXlzdGVyeUJveF9CYWNrZ3JvdW5kYDtcbiAgICBjb25zdCByZWNpdmVSZW5kZXJlckJveE5hbWUgPSAnR2VuZXJhdGVkX015c3RlcnlCb3gnO1xuICAgIGNvbnN0IG1haW5Cb3g0SW1nID0gYOebsuebkl/opKrlupXlm75fMToxYDtcbiAgICBjb25zdCBhbGxCb3g0SW1nID0gYOebsuebkl/lsIHpnaLlm75fMToxYDtcbiAgICBjb25zdCBiYWNrZ3JvdW5kQm94NEltZyA9ICfnm7Lnm5Jf6IOM5pmv5Zu+XzE6MSc7XG4gICAgY29uc3Qgc2NhbGVWYWx1ZSA9IDM7IC8vIOWvvOWHuuWbvueJh+WOn+Wni+WwuuWvuOeahOWAjeaVsFxuICAgIC8vIOiOt+WPluW5tuWcqHVp5Lit5riy5p+T5Ye655uS5a2QXG4gICAgaWYgKG1zZy50eXBlID09PSAncmVuZGVyZXInKSB7XG4gICAgICAgIGxldCBtYWluQm94ID0gZ2V0SXRlbShtYWluQm94NFVJKTtcbiAgICAgICAgbGV0IGNvdmVyQm94ID0gZ2V0SXRlbShjb3ZlckJveDRVSSk7XG4gICAgICAgIGxldCBiYWNrZ3JvdW5kQm94ID0gZ2V0SXRlbShiYWNrZ3JvdW5kQm94NFVJKTtcbiAgICAgICAgaWYgKCFtYWluQm94IHx8IG1haW5Cb3gubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdzYXlNZXNzYWdlJywgbXNnOiBg5Li75L2T55uS5a2Q5ZG95ZCN5pyJ6K+v77yM5om+5LiN5Yiw6K+lU2xpY2Us6K+35ZG95ZCN5Li6JHttYWluQm94NFVJfe+8gWAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjb3ZlckJveCB8fCBjb3ZlckJveC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ3NheU1lc3NhZ2UnLCBtc2c6IGDnm5LlrZDlupXpg6jmlofku7blkb3lkI3mnInor6/vvIzmib7kuI3liLDor6VTbGljZSzor7flkb3lkI3kuLoke2NvdmVyQm94NFVJfe+8gWAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFiYWNrZ3JvdW5kQm94IHx8IGJhY2tncm91bmRCb3gubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBmaWdtYS51aS5wb3N0TWVzc2FnZSh7IHR5cGU6ICdzYXlNZXNzYWdlJywgbXNnOiBg6IOM5pmv5paH5Lu25ZG95ZCN5pyJ6K+v77yM5om+5LiN5Yiw6K+lU2xpY2Us6K+35ZG95ZCN5Li6JHtiYWNrZ3JvdW5kQm94NFVJfe+8gWAgfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb21pc2UxID0gbWFpbkJveCA9PT0gbnVsbCB8fCBtYWluQm94ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBtYWluQm94LmV4cG9ydEFzeW5jKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ1BORycsXG4gICAgICAgICAgICBjb25zdHJhaW50OiB7IHR5cGU6ICdTQ0FMRScsIHZhbHVlOiAzIH0sIC8vIOWvvOWHuuWbvueJh+WIhui+qOeOh1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHByb21pc2UyID0gY292ZXJCb3ggPT09IG51bGwgfHwgY292ZXJCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvdmVyQm94LmV4cG9ydEFzeW5jKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ1BORycsXG4gICAgICAgICAgICBjb25zdHJhaW50OiB7IHR5cGU6ICdTQ0FMRScsIHZhbHVlOiAzIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcHJvbWlzZTMgPSBiYWNrZ3JvdW5kQm94ID09PSBudWxsIHx8IGJhY2tncm91bmRCb3ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IGJhY2tncm91bmRCb3guZXhwb3J0QXN5bmMoe1xuICAgICAgICAgICAgZm9ybWF0OiAnUE5HJyxcbiAgICAgICAgICAgIGNvbnN0cmFpbnQ6IHsgdHlwZTogJ1NDQUxFJywgdmFsdWU6IDMgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIFByb21pc2UuYWxsKFtwcm9taXNlMSwgcHJvbWlzZTIsIHByb21pc2UzXSkudGhlbigoYnl0ZXMpID0+IHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ3JlZGVyZXJCb3gnLCBieXRlcyB9KTtcbiAgICAgICAgICAgIGZpZ21hLm5vdGlmeSgn5bey55Sf5oiQJyk7XG4gICAgICAgICAgICAvLyBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKClcbiAgICAgICAgICAgIC8vIGZyYW1lLnggPSAyMDBcbiAgICAgICAgICAgIC8vIGZyYW1lLnJlc2l6ZSgyMDAsIDIzMClcbiAgICAgICAgICAgIC8vIGZyYW1lLmZpbGxzID0gW3tcbiAgICAgICAgICAgIC8vICAgaW1hZ2VIYXNoOiBpbWFnZS5oYXNoLFxuICAgICAgICAgICAgLy8gICBzY2FsZU1vZGU6IFwiRklMTFwiLFxuICAgICAgICAgICAgLy8gICBzY2FsaW5nRmFjdG9yOiAxLFxuICAgICAgICAgICAgLy8gICB0eXBlOiBcIklNQUdFXCIsXG4gICAgICAgICAgICAvLyB9XVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0SXRlbShuYW1lKSB7XG4gICAgICAgIGxldCBtYWluQm94ID0gW107XG4gICAgICAgIG15dHJhdmVyc2UoW2ZpZ21hLmN1cnJlbnRQYWdlXSwgKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUgPT09IG5hbWU7IC8v5p+l5om+55qE5a2X5q61XG4gICAgICAgIH0sIG1haW5Cb3gpO1xuICAgICAgICByZXR1cm4gbWFpbkJveFswXTtcbiAgICB9XG4gICAgLy8g6YCS5b2S5Y+W6IqC54K5XG4gICAgZnVuY3Rpb24gbXl0cmF2ZXJzZShhcnIsIGZuLCByZXN1bHQpIHtcbiAgICAgICAgYXJyLmZvckVhY2goaXRlbTIgPT4ge1xuICAgICAgICAgICAgaWYgKGZuKGl0ZW0yKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChcImNoaWxkcmVuXCIgaW4gaXRlbTIpIHtcbiAgICAgICAgICAgICAgICBteXRyYXZlcnNlKGl0ZW0yW1wiY2hpbGRyZW5cIl0sIGZuLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG1zZy50eXBlID09PSAnZ2VuZXJhdG9yQmxpbmRCb3gnKSB7XG4gICAgICAgIGNvbnN0IGltYWdlMSA9IGZpZ21hLmNyZWF0ZUltYWdlKG1zZy5kYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coaW1hZ2UxKVxuICAgICAgICBsZXQgZmluZE5vZGVzID0gW107XG4gICAgICAgIGZ1bmN0aW9uIG15dHJhdmVyc2UxKG5vZGUpIHtcbiAgICAgICAgICAgIC8vIGlmIChub2RlLm5hbWUgPT09ICdHZW5lcmF0ZWRfQm94X0ltYWdlJykge1xuICAgICAgICAgICAgLy8gICBmaW5kTm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIGlmIChcImNoaWxkcmVuXCIgaW4gbm9kZSkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQubmFtZSA9PT0gcmVjaXZlUmVuZGVyZXJCb3hOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaW5kTm9kZXMucHVzaChjaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbXl0cmF2ZXJzZTEoY2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBteXRyYXZlcnNlMShmaWdtYS5jdXJyZW50UGFnZSk7XG4gICAgICAgIGlmICghZmluZE5vZGVzIHx8IGZpbmROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZpZ21hLnVpLnBvc3RNZXNzYWdlKHsgdHlwZTogJ3NheU1lc3NhZ2UnLCBtc2c6IFwi6IOM5pmv5paH5Lu25ZG95ZCN5pyJ6K+v77yM5om+5LiN5Yiw6K+lU2lkZXMs6K+35ZG95ZCN5Li6R2VuZXJhdGVkX0JveF9JbWFnZe+8gVwiIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmluZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZmluZE5vZGVzW2ldLnR5cGUgIT09ICdTTElDRScpIHtcbiAgICAgICAgICAgICAgICBmaW5kTm9kZXNbaV0uZmlsbHMgPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VIYXNoOiBpbWFnZTEuaGFzaCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlTW9kZTogXCJGSUxMXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsaW5nRmFjdG9yOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJJTUFHRVwiLFxuICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBmaWdtYS5ub3RpZnkoJ+W3sueUn+aIkCcpXG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gJ2V4cG9ydEFsbEltZycpIHtcbiAgICAgICAgbGV0IGxpc3QgPSBbXTtcbiAgICAgICAgbGV0IHNpbmdsZUJveCA9IGdldEl0ZW0obWFpbkJveDRJbWcpO1xuICAgICAgICBsZXQgYmFja2dyb3VuZEJveCA9IGdldEl0ZW0oYmFja2dyb3VuZEJveDRJbWcpO1xuICAgICAgICBsZXQgYWxsQm94ID0gZ2V0SXRlbShhbGxCb3g0SW1nKTtcbiAgICAgICAgY29uc3Qgc2luZ2xlQm94UHJvbWlzZSA9IHNpbmdsZUJveC5leHBvcnRBc3luYyh7XG4gICAgICAgICAgICBmb3JtYXQ6ICdQTkcnLFxuICAgICAgICAgICAgY29uc3RyYWludDogeyB0eXBlOiAnU0NBTEUnLCB2YWx1ZTogc2NhbGVWYWx1ZSB9LFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYmFja2dyb3VuZEJveFByb21pc2UgPSBiYWNrZ3JvdW5kQm94LmV4cG9ydEFzeW5jKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ1BORycsXG4gICAgICAgICAgICBjb25zdHJhaW50OiB7IHR5cGU6ICdTQ0FMRScsIHZhbHVlOiBzY2FsZVZhbHVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhbGxCb3hQcm9taXNlID0gYWxsQm94LmV4cG9ydEFzeW5jKHtcbiAgICAgICAgICAgIGZvcm1hdDogJ1BORycsXG4gICAgICAgICAgICBjb25zdHJhaW50OiB7IHR5cGU6ICdTQ0FMRScsIHZhbHVlOiBzY2FsZVZhbHVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBFcnJvciEgVHlwZSBTY2VuZU5vZGUgaXMgbm90IGFzc2lnbmFibGUgdG8gdHlwZSAnc3RyaW5nJ1xuICAgICAgICBQcm9taXNlLmFsbChbc2luZ2xlQm94UHJvbWlzZSwgYmFja2dyb3VuZEJveFByb21pc2UsIGFsbEJveFByb21pc2VdKS50aGVuKChieXRlcykgPT4ge1xuICAgICAgICAgICAgZmlnbWEudWkucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZG93bmxvYWRBbGxJbWdaaXAnLCBieXRlcyB9KTtcbiAgICAgICAgICAgIC8vIGZpZ21hLm5vdGlmeSgn5bey5LiL6L29JylcbiAgICAgICAgICAgIC8vIGNvbnN0IGltYWdlID0gZmlnbWEuY3JlYXRlSW1hZ2UoYnl0ZXMpXG4gICAgICAgICAgICAvLyBjb25zdCBmcmFtZSA9IGZpZ21hLmNyZWF0ZUZyYW1lKClcbiAgICAgICAgICAgIC8vIGZyYW1lLnggPSAyMDBcbiAgICAgICAgICAgIC8vIGZyYW1lLnJlc2l6ZSgyMDAsIDIzMClcbiAgICAgICAgICAgIC8vIGZyYW1lLmZpbGxzID0gW3tcbiAgICAgICAgICAgIC8vICAgaW1hZ2VIYXNoOiBpbWFnZS5oYXNoLFxuICAgICAgICAgICAgLy8gICBzY2FsZU1vZGU6IFwiRklMTFwiLFxuICAgICAgICAgICAgLy8gICBzY2FsaW5nRmFjdG9yOiAxLFxuICAgICAgICAgICAgLy8gICB0eXBlOiBcIklNQUdFXCIsXG4gICAgICAgICAgICAvLyB9XVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gTWFrZSBzdXJlIHRvIGNsb3NlIHRoZSBwbHVnaW4gd2hlbiB5b3UncmUgZG9uZS4gT3RoZXJ3aXNlIHRoZSBwbHVnaW4gd2lsbFxuICAgIC8vIGtlZXAgcnVubmluZywgd2hpY2ggc2hvd3MgdGhlIGNhbmNlbCBidXR0b24gYXQgdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuLlxuICAgIC8vIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9