import { useEffect, useState, useRef } from "react";
import b1 from './b1.mp3';
import b2 from './b2.mp3';
import b3 from './b3.mp3';
import b4 from './b4.mp3';

const MIN = 1;
const MAX = 500;

const randomIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490 350"><path d="m399 50-1.82-35C396.71 8.27 400.31-2.22 409 .73c4.06 1.37 17.96 13.54 22 17l44 39.24c8.16 7.71 15.51 11.41 14.96 24.03-.44 10.05-8.23 15.53-14.96 21.96l-48 42.45c-5.16 4.3-17.83 17.48-24.79 13.41-3.6-2.1-5.11-7.91-5.13-11.82l.83-8 1.09-25h-70c-11.22.02-13.28 5.28-21 13l-32 30-31-31c-2.37-2.37-10.99-10.33-11.66-13-.88-3.5 4.43-7.76 6.66-10l22-22 18-18c9.03-9.03 10-12.98 23-13h96Zm0 251h-94c-16.9-.03-19.2-8.07-30-19l-49-49-93-93-20-20c-7.38-7.38-8.34-10.98-19-11H36c-9.82-.02-19.55-2.03-26.83-9.18C-4.72 86.18-2.8 61.96 13 50.63c6.53-4.68 12.23-5.62 20-5.63h87c2.53 0 5.59-.11 8 .65 5.86 1.84 17.18 14.53 22 19.35l56 56 21.96 22 9.05 10L292 208l18 18c7.38 7.38 8.34 10.98 19 11h70l-1.42-29c-.7-5.29-1.01-12.59 3.76-16.26 7.33-5.65 20.21 7.92 25.66 12.53l48 42.69c8.36 7.98 15.53 11.09 14.96 24.04-.46 10.58-10.59 17.79-17.96 24.28l-42 37.45c-3.88 3.31-17.12 14.62-21 16.17-7.38 2.94-11.29-4.74-11.81-10.9l1.81-37ZM149 195.34c5.12.22 8.52 5.18 12 8.66l24 24c2.48 2.48 9.6 8.26 8.66 12-.48 1.94-3.26 4.57-4.66 6l-12 12-33 33c-9.11 9.11-11.62 14.98-25 15H35c-6.54-.01-12.18-.6-18-3.95C4.3 294.72 1.84 284.53 2 271c.08-6.39 1.59-11.85 5.53-17C14.48 244.92 23 242.02 34 242h60c10.97-.02 12.45-4.45 20-12l18.83-19c4.79-5.3 9.89-12.24 16.17-15.66Z"/></svg>;
const startIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.158 35.814"><path d="M2.454 35.117A5 5 0 0 1 0 30.817V5A5 5 0 0 1 2.647.588a5 5 0 0 1 5.138.259l21.159 14.19a5 5 0 0 1 2.21 4.373 5 5 0 0 1-2.588 4.162L7.408 35.2A5 5 0 0 1 5 35.818a5 5 0 0 1-2.546-.701Z"/></svg>;
const arrowIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.558 16.279"><path d="M13.78 16.279a2.5 2.5 0 0 1-1.768-.732L.733 4.268A2.5 2.5 0 0 1 4.268.732l9.512 9.511L23.291.732a2.5 2.5 0 1 1 3.535 3.536L15.548 15.547a2.5 2.5 0 0 1-1.768.732Z"/></svg>;
const reverseIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 24"><path d="M24 24v-4.8h5V24Zm-6 0v-9.6h5V24Zm-6 0V9.6h5V24Zm-6 0V4.8h5V24Zm-6 0V0h5v24Z"/></svg>;
const pyramidIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 24"><path d="M24 24v-8h5v8Zm-6 0V8h5v16Zm-6 0V0h5v24Zm-6 0V8h5v16Zm-6 0v-8h5v8Z"/></svg>;


const MIN_ELEMENTS = 5;
const MAX_ELEMENTS = 200;

var audioIndex = 0;

function App() {

  const [length, setLength] = useState(50);
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState();
  const [sorting, setSorting] = useState(false);
  const sortingRef = useRef(sorting);
  const [algorithm, setAlgorithm] = useState("Bubble");
  const [openMenu, toggleMenu] = useState(false);
  const [compType, setCompType] = useState("<");

  const audio1 = useRef();
  const audio2 = useRef();
  const audio3 = useRef();
  const audio4 = useRef();
  const audio5 = useRef();
  const audio6 = useRef();
  const audio7 = useRef();
  const audio8 = useRef();
  const lengthInput = useRef();

  const startSort = () => {

    if (algorithm === "Bubble") bubbleSort();
    else if (algorithm === "Insertion") insertionSort();
    else if (algorithm === "Selection") selectionSort();
    else if (algorithm === "Merge") {setSorting(false); sortingRef.current = false; mergeSort([...array], 0, array.length);}

  }

  const playSound = () => {

    if (audioIndex === 0 && audio1.current.paused) {audio1.current.currentTime = 0; audio1.current.play(); audioIndex = (audioIndex + 1) % 8;}
    else if (audioIndex === 1 && audio2.current.paused) {audio2.current.currentTime = 0; audio2.current.play(); audioIndex = (audioIndex + 1) % 8;}
    else if (audioIndex === 2 && audio3.current.paused) {audio3.current.currentTime = 0; audio3.current.play(); audioIndex = (audioIndex + 1) % 8;}
    else if (audioIndex === 3 && audio4.current.paused) {audio4.current.currentTime = 0; audio4.current.play(); audioIndex = (audioIndex + 1) % 8;}
    else if (audioIndex === 4 && audio5.current.paused) {audio5.current.currentTime = 0; audio5.current.play(); audioIndex = (audioIndex + 1) % 8;}
    else if (audioIndex === 5 && audio6.current.paused) {audio6.current.currentTime = 0; audio6.current.play(); audioIndex = (audioIndex + 1) % 8;}
    else if (audioIndex === 6 && audio7.current.paused) {audio7.current.currentTime = 0; audio7.current.play(); audioIndex = (audioIndex + 1) % 8;}
    else if (audioIndex === 7 && audio8.current.paused) {audio8.current.currentTime = 0; audio8.current.play(); audioIndex = (audioIndex + 1) % 8;}

  }

  const resetGraph = () => {

    setSorting(false); setComparing(length); setCompType("<");
    
  }

  const handleInput = e => {

    if (e.target.value > MAX_ELEMENTS) e.target.value = MAX_ELEMENTS;
    else if (e.target.value < MIN_ELEMENTS) e.target.value = MIN_ELEMENTS;

    playSound();
    setLength(e.target.value);
    resetGraph();

  }

  useEffect(() => {
    sortingRef.current = sorting; // Sync ref with state
  }, [sorting]);

  const selectionSort = async () => {

    if (sortingRef.current === true) return;

    setSorting(true);
    sortingRef.current = true; 
    setCompType(">");

    let arr = [...array];

    var min = 0;
    var temp = 0;

    for (var i = 0; i < arr.length; i++){

      min = i;

      if (!sortingRef.current) return;

      for (var j = i; j < length; j++){
        if (arr[j] < arr[min])
          min = j;
        if (!sortingRef.current) return;
      }
        
      temp = arr[i];
      arr[i] = arr[min];
      arr[min] = temp;

      playSound();
      setArray([...arr]);
      setComparing(i + 1);
      await new Promise((resolve) => setTimeout(resolve, 0));
     

    }

  }

  const insertionSort = async () => {

    if (sortingRef.current === true) return;

    setSorting(true);
    sortingRef.current = true; 
    setCompType(">");

    let arr = [...array];

    for (var i = 1; i < arr.length; i++){

      var temp = arr[i];
      var prev = i - 1;
      if (!sortingRef.current) return;

      setComparing(i + 1);

      while (prev >= 0 && arr[prev] > temp){

        if (!sortingRef.current) return;

        arr[prev + 1] = arr[prev]; 
        prev--;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, 0));

      }

      playSound();
      arr[prev + 1] = temp;

    }

  }

  const pyramid = async () => {

    var arr = [...array];
        
    for (var index = 0; index < length; index++){

      arr[index] = index <= (length - 1) / 2 ? (index + 1) * (MAX / ((length - 1) / 2 + 1)) : ((length - index) * (MAX / ((length - 1) / 2 + 1)))
      playSound();
      setArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, 0));

    }

  }

  const merge = async (left, right, leftStart, rightEnd, state) => {

    var length = left.length + right.length;
    var newArray = new Array(length);

    var leftIndex = 0, rightIndex = 0, cIndex = 0;

    if (sortingRef.current !== state) return;

    while (leftIndex < left.length && rightIndex < right.length){


      if (sortingRef.current) return;
      if (left[leftIndex] <= right[rightIndex]) newArray[cIndex] = left[leftIndex++];
      else newArray[cIndex] = right[rightIndex++];
      cIndex++;
      setArray(prevArray => [...prevArray.slice(0, leftStart), ...newArray.slice(0, cIndex), ...left.slice(leftIndex), ...right.slice(rightIndex), ...prevArray.slice(rightEnd, array.length)]);
      await new Promise((resolve) => setTimeout(resolve, 0));

    }

    playSound();

    while (leftIndex < left.length) newArray[cIndex++] = left[leftIndex++];
    while (rightIndex < right.length) newArray[cIndex++] = right[rightIndex++];
    setComparing(cIndex + leftStart);

    if (sortingRef.current !== state) return;

    setArray(prevArray => [...prevArray.slice(0, leftStart), ...newArray.slice(0, cIndex), ...left.slice(leftIndex), ...right.slice(rightIndex), ...prevArray.slice(rightEnd, array.length)]);
    await new Promise((resolve) => setTimeout(resolve, 0));

    return newArray;

  }

  const mergeSort = async (temp, start, end, state) => {

    setSorting(true);
    sortingRef.current = true; 
    setCompType(">");

    if (sortingRef.current !== state) return; 
    if (temp.length <= 1) return temp;
    
    const mid = Math.floor(temp.length / 2);
    const left = temp.slice(0, mid);
    const right = temp.slice(mid, temp.length);

    const leftStart = start;
    const leftEnd = start + mid;
    const rightStart = start + mid;
    const rightEnd  = start + mid + right.length;
    
    
    const tempLeft = await mergeSort(left, leftStart, leftEnd, state);
    if (sortingRef.current !== state) return;
    const tempRight = await mergeSort(right, rightStart, rightEnd, state);
    if (sortingRef.current !== state) return;

    return await merge(tempLeft, tempRight, leftStart, rightEnd, state);

  }

  const randomize = async () => {

    var arr = [...array];
        
    for (var index = 0; index < length; index++){

      arr[index] = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
      playSound();
      setArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, 0));

    }

  }

  const reverse = async () => {

    var arr = [...array];
        
    for (var index = 0; index < length; index++){

      arr[index] = MAX - (index * (MAX / length));
      playSound();
      setArray([...arr]);

      await new Promise((resolve) => setTimeout(resolve, 0));

    }

  }

  const bubbleSort = async () => {

    if (sortingRef.current === true) return;

    setSorting(true);
    sortingRef.current = true; 
    setCompType(">");

    let arr = [...array];
    var swapped = false;

    for (var i = 0; i < arr.length - 1; i++){

      if (!sortingRef.current) return;

      for (var j = 0; j < arr.length - 1 - i; j++){

        if (!sortingRef.current) return;

        setCompType("<");
        setComparing(arr.length - 1 - i);

        if (arr[j] > arr[j + 1]){

          var temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
          setArray([...arr]);
          swapped = true;

          await new Promise((resolve) => setTimeout(resolve, 0));

        }
        
      }
      
      playSound();
      if (swapped === false) break;

    }

    setComparing(-1);
    setSorting(false);
    sortingRef.current = false;

  }

  

  useEffect(() => {
    
    lengthInput.current.value = length;
    setComparing(length);
    setArray(Array.from({length: length}, () => Math.floor(Math.random() * (MAX - MIN + 1)) + MIN));

  }, [length]);

  return (
    <>

    <audio src={b1} ref={audio1}/>
    <audio src={b2} ref={audio2}/>
    <audio src={b3} ref={audio3}/>
    <audio src={b4} ref={audio4}/>
    <audio src={b1} ref={audio5}/>
    <audio src={b2} ref={audio6}/>
    <audio src={b3} ref={audio7}/>
    <audio src={b4} ref={audio8}/>

      <div className="stats">

        <div className="cell">

          <div className="cell-title">ALGORITHM</div>
          <div className="cell-value">
            <div className="cell-bubble" onClick={() => {toggleMenu(!openMenu)}}>
              <div>{algorithm} Sort</div>{arrowIcon}
            </div>

            {openMenu ?
            <div className="table">
              <div className="table-button" onClick={() => {setAlgorithm("Bubble"); toggleMenu(false);}}>Bubble Sort</div>
              <div className="table-button" onClick={() => {setAlgorithm("Insertion"); toggleMenu(false);}}>Insertion Sort</div>
              <div className="table-button" onClick={() => {setAlgorithm("Selection"); toggleMenu(false);}}>Selection Sort</div>
              {/* <div className="table-button" onClick={() => {setAlgorithm("Merge"); toggleMenu(false);}}>Merge Sort</div> */}
            </div> : <></>}
          </div>

        </div>

        <div className="cell centered">

          <div className="cell-title">LENGTH</div>
          <input ref={lengthInput} className="cell-value" type="number" defaultValue={length} min={MIN_ELEMENTS} max={MAX_ELEMENTS} onInput={(e) => {handleInput(e)}}/>
        
        </div>

      </div>



      <div className="controls">

      <div className="button" onClick={() => {resetGraph(); playSound(); pyramid();

      }}>{pyramidIcon}</div>

        <div className="button" onClick={() => {resetGraph(); playSound(); reverse();}}>{reverseIcon}</div>

        <div className="button" onClick={() => {resetGraph(); playSound(); randomize();}}>{randomIcon}</div>

        <div className="button" onClick={() => {resetGraph(); startSort();}}>{startIcon}</div>

      </div>
      



      <div className="holder" onClick={() => {toggleMenu(false);}}>

        <div className="grid">

          {array.map((e, index) => {
            return (
              <div key={index} className="rect" style={{
                "height": e/MAX * 100 + "%",
                "backgroundColor": 

                  compType === ">" ? (comparing > index ? "#3183ff" : "") : compType === "<" ? (comparing < index ? "#3183ff" : "") : "",
                  
              }}></div>
            )
          })}

        </div>

      </div>

    </>
  );
}

export default App;
