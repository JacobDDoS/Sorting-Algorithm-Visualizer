const swap = (array, index1, index2, animations, curPos) => {
    animations.push([index1+curPos, array[index2][0], "height"])
    animations.push([index2+curPos, array[index1][0], "height"])
    const copy = array[index1];
    array[index1] = array[index2];
    array[index2] = copy;
}

export const quickSort = (array, animations, curPos) => {
    if (array.length === 1 || array.length === 0) return array;
    if (array.length === 2) {
        if (array[0][0] > array[1][0]) {
            swap(array, 0, 1, animations, curPos) 
        }
        return array;
    }
    const midIndex = Math.floor(array.length/2)
    if (array[midIndex][0] > array[0][0] && array[midIndex][0] < array[array.length-1][0]) {
        swap(array, midIndex, array.length-1, animations, curPos)
    } else if (array[midIndex][0] > array[0][0] && array[midIndex][0] > array[array.length-1][0]) {
        if (array[array.length-1][0] < array[0][0]) {
            swap(array, midIndex, 0, animations, curPos)
            swap(array, midIndex, array.length-1, animations, curPos)
        } else {
            swap(array, midIndex, array.length-1, animations, curPos)
            swap(array, midIndex, array.length-1, animations, curPos)
        }
    } else if (array[midIndex][0] < array[0][0] && array[midIndex][0] < array[array.length-1][0]) {
        if (array[array.length-1][0] < array[0][0]) {
            swap(array, midIndex, array.length-1, animations, curPos)
            swap(array, midIndex, array.length-1, animations, curPos)
        } else {
            swap(array, midIndex, 0, animations, curPos) 
            swap(array, midIndex, array.length-1, animations, curPos)
        }
    }
    animations.push([curPos+array.length-1, curPos+ array.length-1, "pivot"])  
    let leftPtr = -1;
    let rightPtr = -1;

    let lastLeftPtr = 0;
    let lastRightPtr = array.length-2;
     
    do {
        leftPtr = -1;
        rightPtr = -1;
        if (lastLeftPtr !== array.length) {
        for (let i=lastLeftPtr;i<array.length-1;i++) {
            animations.push([curPos+i, curPos+i, "primary"]) 
        animations.push([curPos+i, curPos+i, "secondary"]) 
            if (array[i][0] > array[array.length-1][0]) {
                leftPtr = i;
                lastLeftPtr = i;
                
                break;
            } 
        }
    } 
    if (lastRightPtr > 0) {
        for (let j=lastRightPtr;j>=0;j--) {
            animations.push([curPos+j, curPos+j, "primary"]) 
        animations.push([curPos+j, curPos+j, "secondary"]) 
            if (array[j][0] < array[array.length-1][0]) {
                
                rightPtr = j;
                lastRightPtr = j;
                break;
            }
        }
    }
        if (rightPtr > leftPtr && leftPtr !== -1) {
            swap(array, leftPtr, rightPtr, animations, curPos)
        }
        
    } while (rightPtr > leftPtr && rightPtr !== -1 && leftPtr !== -1)
    animations.push([curPos+array.length-1, curPos+ array.length-1, "secondary"]) 


let copyLast = array[array.length-1]
array.splice(array.length-1, 1)

if (leftPtr === -1 || rightPtr === -1) {
    if (leftPtr === -1 && rightPtr === -1) {
        return [...array, copyLast]
    }
    if (leftPtr === -1) {
        let arrayLeft = quickSort(array, animations, curPos)
        array = [...arrayLeft, copyLast]
    } else if (rightPtr === -1) {
        let arrayLeft = quickSort(array, animations, curPos)
        array = [copyLast, ...arrayLeft]
        animations.push([curPos, copyLast[0], "height"])
        for (let i=1;i<array.length;i++) {
            animations.push([curPos+i, array[i][0], "height" ])
        }
    }
} else {

    let arrayLeft = quickSort(array.slice(0, leftPtr), animations, curPos);
    let arrayRight = quickSort(array.slice(leftPtr), animations, curPos+leftPtr);
    animations.push([arrayLeft.length+curPos, copyLast[0], "height"])
    for (let i=0;i<arrayRight.length;i++) {
        animations.push([arrayLeft.length+curPos+i+1, arrayRight[i][0], "height"])
    }
    array = [...arrayLeft, copyLast, ...arrayRight]
    
}




    return array
}