import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.call = async function (name: string, ...args: any[]) {
  var r = ((window as any).electron as any).call(name, ...args);
  if (r instanceof Promise) {
    var result = await r.catch(console.error);

    if (typeof result == 'object' && !Array.isArray(result)) {
      var newResult = { ...result };
      console.log("Result",newResult);
      for (var k in newResult) {
        var v = result[k];
        if (v && v['$$typeof'] == 'function') {
          newResult[k] = (async (functionName: string, ...args) => {
            return window.call(functionName, ...args);
          }).bind(newResult, name + "." + k);
        }
      }
      return newResult;
    }
  }
  return r;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
