import React, { useEffect } from 'react';
import SystemEntry from './system/contents/entry/systemEntry';

function App() {

  useEffect(() => {
    // 右クリック無効
    document.oncontextmenu = function () { return false; }

    // window.addEventListener("keydown", function (e) {
    //   // space and arrow keys
    //   if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    //     e.preventDefault();
    //   }
    // }, false);

    document.onkeydown = (e) => {
      // if (!['F5'].includes(e.key)) {
      //   return false;
      // }
      if (e.ctrlKey && ['f', 's'].includes(e.key)) {
        return false;
      }
    }

  }, []);
  return (
    <SystemEntry />
  );
}

export default App;
