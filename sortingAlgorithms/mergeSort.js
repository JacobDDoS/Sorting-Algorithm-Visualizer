export const mergeSort = (array, animations) => {
    if (array.length === 1) return array;
    const middleIndex = Math.floor(array.length/2)
    const firstHalf = mergeSort(array.slice(0, middleIndex), animations)
    const secondHalf = mergeSort(array.slice(middleIndex), animations)
    const sortedArray = [];
    let i=0,j=0;
    let lowestIndex = 99999;
    
    for (let it = 0;it<array.length;it++) {
        lowestIndex = Math.min(lowestIndex, array[it][1])
    }
    while (i < firstHalf.length && j < secondHalf.length) {
        
        animations.push([lowestIndex+i, lowestIndex+middleIndex+j, "primary"]) 
        animations.push([lowestIndex+i, lowestIndex+middleIndex+j, "secondary"]) 
        if (firstHalf[i][0] < secondHalf[j][0]) {
            sortedArray.push(firstHalf[i++]);
        } else {
            sortedArray.push(secondHalf[j++]) 
        }
    }

    while (i < firstHalf.length) {
        
        animations.push([lowestIndex+i,lowestIndex+i, "primary"]) 
        animations.push([lowestIndex+i, lowestIndex+i, "secondary"])
        sortedArray.push(firstHalf[i++])
        
    }
    while (j < secondHalf.length) {
        
        animations.push([lowestIndex+middleIndex+j,lowestIndex+middleIndex+j, "primary"]) 
        animations.push([lowestIndex+middleIndex+j, lowestIndex+middleIndex+j, "secondary"])
        sortedArray.push(secondHalf[j++])
        
    }

    for (let i=0;i<sortedArray.length;i++) {
        animations.push([lowestIndex+i, sortedArray[i][0], "height"])
    }
    return sortedArray
}