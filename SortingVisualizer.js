import React, {useState, useEffect} from "react";
import { mergeSort } from "../../sortingAlgorithms/mergeSort";
import { quickSort } from "../../sortingAlgorithms/quickSort"
import { bubbleSort } from "../../sortingAlgorithms/bubbleSort"
import {RangeStepInput} from 'react-range-step-input';

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

const fixArray = (array) => {
  for (let i=0;i<array.length;i++) {
    array[i][1] = i;
  }
  return array;
}

const resetArray = (NUMBER_OF_ARRAY_BARS, setMaxArrayBarHeight) => {
    const newArray = [];
    let max = 0;
    for (let i=0;i<NUMBER_OF_ARRAY_BARS;i++) {
        newArray.push([Math.floor(Math.random() * 600)+5, i]);
        max = Math.max(max, newArray[i][0])
        // newArray.push([(i+1)*4, i])
    }
    setMaxArrayBarHeight(max)
    return newArray
}

const SortingVisualizer = () => {
    
    const [ANIMATION_SPEED_MS, setANIMATION_SPEED_MS] = useState(1)
    const [NUMBER_OF_ARRAY_BARS, setNUMBER_OF_ARRAY_BARS] = useState(310);
    const [randomAndRunning, setRandomAndRunning] = useState(false)
    const [maxArrayBarHeight, setMaxArrayBarHeight] = useState(0);
    const [array, setArray] = useState(()=>resetArray(NUMBER_OF_ARRAY_BARS, setMaxArrayBarHeight))
    const [isAlgorithmRunning, setIsAlgorithmRunning] = useState(false)

    const animationSpeedChange = (e) => {
      if (!isAlgorithmRunning&& !randomAndRunning) {
      setANIMATION_SPEED_MS(e.target.value/10);
      }
    }

    const arrayBarChange = (e) => {
      if (!isAlgorithmRunning&& !randomAndRunning) {
        setNUMBER_OF_ARRAY_BARS(e.target.value);
        setArray(()=>resetArray(e.target.value, setMaxArrayBarHeight))
      }
    }


    const mergeSortVisualizer = (array) => {
        setIsAlgorithmRunning(true)
        const animations = []
       
        const sortedArr = mergeSort(array, animations);
        
        setTimeout(()=>{
            setIsAlgorithmRunning(false);
            fixArray(sortedArr);
            setArray([...sortedArr])
        }, animations.length*ANIMATION_SPEED_MS)
        for (let i = 0; i < animations.length; i++) {

            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][2] === "primary" || animations[i][2] === "secondary" ? true : false;

            if (isColorChange) {
              const [barOneIdx, barTwoIdx, random] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              let color = ""
              if (animations[i][2] === "primary" ) {
                  color = SECONDARY_COLOR
              } else if (animations[i][2] === "secondary") {
                  color = PRIMARY_COLOR
              }
            //   console.log(barOneStyle.backgroundColor + " color: " + color)
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * ANIMATION_SPEED_MS);
            } else {
              const [barOneIdx, newHeight, random] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
              setTimeout(() => {
                barOneStyle.height = `${newHeight}px`;
              }, i * ANIMATION_SPEED_MS);
              
            }
          }
          
    }


    const quickSortVisualizer = (array) => {
      setIsAlgorithmRunning(true)
        const animations = []
        const copy = [...array];
        // console.log("ARRAY BEFORE QUICKSORT: " + array)
        const sortedArr = quickSort(array, animations, 0);
        // console.log("Nums after quicksort: " + array)
        // console.log("Sorted Nums: " + sortedArr)

      setArray(copy)

        setTimeout(()=>{
          setIsAlgorithmRunning(false);
          fixArray(sortedArr);
          setArray([...sortedArr])

        }, animations.length*ANIMATION_SPEED_MS)
        for (let i = 0; i < animations.length; i++) {
            
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][2] === "primary" || animations[i][2] === "secondary" || animations[i][2] === "pivot" ? true : false;

            if (isColorChange) {
              const [barOneIdx, barTwoIdx, whichColor] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              let color = ""
              if (whichColor === "primary" ) {
                  color = SECONDARY_COLOR
              } else if (whichColor === "secondary") {
                  color = PRIMARY_COLOR
              } else if (whichColor === "pivot") {
                color = "black"
              }
            //   console.log(barOneStyle.backgroundColor + " color: " + color)
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * ANIMATION_SPEED_MS);
            } else {
              
              setTimeout(() => {
                const [barOneIdx, newHeight, random] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * ANIMATION_SPEED_MS);
              
            }
          }
    }



    const bubbleSortVisualizer = (array) => {
      setIsAlgorithmRunning(true)
        const animations = []
        const copy = JSON.parse(JSON.stringify(array))
        // console.log("ARRAY BEFORE QUICKSORT: " + array)
        const sortedArr = bubbleSort(array, animations, 0);
        // console.log(animations)
        // console.log("Nums after quicksort: " + array)
        // console.log("Sorted Nums: " + sortedArr)

        setTimeout(()=>{
          setIsAlgorithmRunning(false);
          fixArray(sortedArr);
          setArray([...sortedArr])

        }, animations.length*ANIMATION_SPEED_MS + ANIMATION_SPEED_MS)
        // console.log(copy)
        setArray(copy)
        for (let i = 0; i < animations.length; i++) {
            
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = animations[i][2] === "primary" || animations[i][2] === "secondary" ? true : false;

            if (isColorChange) {
              const [barOneIdx, barTwoIdx, whichColor] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              let color = ""
              if (whichColor === "primary" ) {
                  color = SECONDARY_COLOR
              } else if (whichColor === "secondary") {
                  color = PRIMARY_COLOR
              }
            //   console.log(barOneStyle.backgroundColor + " color: " + color)
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * ANIMATION_SPEED_MS + ANIMATION_SPEED_MS);
            } else {
              
              setTimeout(() => {
                const [barOneIdx, newHeight, random] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * ANIMATION_SPEED_MS + ANIMATION_SPEED_MS);
              
            }
          }
    }

useEffect(()=>{
  if (randomAndRunning) {
    if (!isAlgorithmRunning) {
        const newArr = resetArray(NUMBER_OF_ARRAY_BARS, setMaxArrayBarHeight);
        setIsAlgorithmRunning(true)
        setTimeout(()=>{
            setArray(newArr)
            let rando = Math.random()
            if (rando < 0.3333) {
              quickSortVisualizer(newArr) 
            } else if (rando >= 0.3333 && rando < 0.6666) {
              mergeSortVisualizer(newArr)
            } else {
              bubbleSortVisualizer(newArr)
            }
        }, 500)
        setIsAlgorithmRunning(false)
        
    }
  }
  
}, [isAlgorithmRunning, randomAndRunning])

useEffect(()=> {
  return () => {
    setRandomAndRunning(false);
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
        clearTimeout(i); 
    }
  }
}, [])

  return <> 
  <div style={{marginTop: "65px", padding: "5px", overflowY: "hidden"}} className="array-container">
    <div style={{marginTop: `${605-maxArrayBarHeight}px` }}>
    {
        array.map((value, index) => {
            return <div className="array-bar" key={index} style={{height: `${value[0]}px`, backgroundColor: PRIMARY_COLOR}}>
            </div>
        })
    }
    </div>
  </div>

<div className="sort-bottom-group">
    <div className="sort-bottom-item">
        <button onClick={()=>{
            if (!isAlgorithmRunning && !randomAndRunning) {
              setIsAlgorithmRunning(true)
            mergeSortVisualizer(array)
            }
        }
            } className="btn" style={{marginTop: "5px"}}>Merge Sort</button>
            <button onClick={()=>{
            if (!isAlgorithmRunning&& !randomAndRunning) {
              setIsAlgorithmRunning(true)
            quickSortVisualizer(array)
            }
        }
            } className="btn" style={{marginTop: "5px"}}>Quick Sort</button>
            <button onClick={()=>{
            if (!isAlgorithmRunning&& !randomAndRunning) {
              setIsAlgorithmRunning(true)
            bubbleSortVisualizer(array)
            }
        }
            } className="btn" style={{marginTop: "5px"}}>Bubble Sort</button>
    </div>
    <div className="sort-bottom-item">
  <button onClick={()=>{
      if (!isAlgorithmRunning&& !randomAndRunning) {
      setArray(()=>resetArray(NUMBER_OF_ARRAY_BARS, setMaxArrayBarHeight))
      }
      }} style={{marginTop: "30px"}}className="btn">Generate New Array</button>


      <button onClick={()=>{
      if (!isAlgorithmRunning) {
      setRandomAndRunning(true)
      }
      }} style={{marginTop: "10px"}}className="btn">Run Randomly Forever</button>
  </div>
  <div className="sort-bottom-item">
    <div style={{margin: "0 auto", width: "200px"}}>
    <p className="slider-input-text">Adjust the Animation Speed</p>
    <p className="slider-input-text" style={{marginBottom:"5px"}}>Current: {ANIMATION_SPEED_MS}ms</p>
            <RangeStepInput
                min={1} max={100}
                value={ANIMATION_SPEED_MS*10} step={1}
                onChange={animationSpeedChange}
            />

<p className="slider-input-text">Adjust the Number of Bars</p>
<p className="slider-input-text" style={{marginBottom:"5px"}}>Current: {NUMBER_OF_ARRAY_BARS} bars</p>
            <RangeStepInput
                min={10} max={310}
                value={NUMBER_OF_ARRAY_BARS} step={1}
                onChange={arrayBarChange}
            />
            </div>
  </div>
  </div>
  </>
};

export default SortingVisualizer;
