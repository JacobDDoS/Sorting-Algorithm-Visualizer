const swap = (array, index1, index2, animations, curPos) => {
    animations.push([index1+curPos, array[index2][0], "height"])
    animations.push([index2+curPos, array[index1][0], "height"])
    const copy = array[index1][0];
    array[index1][0] = array[index2][0];
    array[index2][0] = copy;
}



export const bubbleSort = (array, animations) => {
    if (array.length === 1) return array;
    for (let i=0;i<array.length;i++) {
        for (let j=0;j<array.length-1-i;j++) {
        animations.push([j, 1+j, "primary"]) 
        animations.push([j, 1+j, "secondary"]) 
            if (array[j][0] > array[j+1][0]) {
                swap(array, j, j+1, animations, 0)
            }
        }
    }
    return array
}