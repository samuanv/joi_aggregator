import React, {  useState, useEffect, useRef } from 'react';
import './App.scss';
import {FlexibleWidthXYPlot, LineSeries,LineMarkSeries, AreaSeries, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries} from 'react-vis';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
function App() {
  let [data, setData] = useState([
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
  ]);

  useInterval(() => {
    // Your custom logic here
    setData([...data, {x:data[data.length - 1].x + 1, y:Math.floor(Math.random() * 10)}]);
  }, 1000);
  return (
    <div className="App">
      <header className="App-header">
      <FlexibleWidthXYPlot height={300} >
        <VerticalGridLines />
        {/* <HorizontalGridLines /> */}
        <XAxis />
        <YAxis />
        <LineSeries animation={{damping: 20, stiffness: 40}} data={data} />
      </FlexibleWidthXYPlot>
      <FlexibleWidthXYPlot height={300} >
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <AreaSeries animation data={data} />
      </FlexibleWidthXYPlot>
      <FlexibleWidthXYPlot height={300} >
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineMarkSeries curve={'curveMonotoneX'} animation data={data} />
      </FlexibleWidthXYPlot>
      <FlexibleWidthXYPlot height={300} >
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries animation data={data} />
      </FlexibleWidthXYPlot>
      </header>
    </div>
  );
}

export default App;
