

//----------------------------------------------------- Merge Sort-------------------------------------------------------------------------------
export function mergeSortAnimations(array) {
    const animations = [];
    if(array.length<=1)
        return array;
    mergeSortHelper(array,0,array.length-1,animations);
    return animations;
}

function mergeSortHelper(
    array, start, end,animations
) {
    if(start===end) return;
    if(start<end){
        let mid = start + Math.floor((end-start)/2);
        mergeSortHelper(array,start, mid, animations);
        mergeSortHelper(array,mid+1,end, animations);
        merge(array,start, mid, end, animations);
    }
}

function merge(array,start, mid, end,animations)
{
    let i = 0;
    let j = 0;
    let k = start;
    const left = array.slice(start,mid+1);
    const right = array.slice(mid+1, end+1);
    const LSIZE = left.length;
    const RSIZE = right.length;
    while(i<LSIZE && j<RSIZE)
    {   
        let iequiv = i+start;
        let jequiv = mid+1+j;
        animations.push([iequiv, jequiv]);
        animations.push([iequiv, jequiv]);
        if(left[i]<=right[j])
        {
            animations.push([k, left[i]]);
            array[k] = left[i];
            i = i + 1;
        } else {
            animations.push([k, right[j]]);
            array[k] = right[j];
            j = j+1;
        }
        k = k+1;
    }

    while(i<LSIZE){
        let iequiv = start+i;
        animations.push([iequiv, iequiv]);
        animations.push([iequiv, iequiv]);
        animations.push([k, left[i]]);
        array[k] = left[i];
        i = i+1;
        k = k+1;
    }

    while(j<RSIZE)
    {
        let jequiv = mid+1+j;
        animations.push([jequiv, jequiv]);
        animations.push([jequiv, jequiv]);
        animations.push([k, right[j]]);
        array[k] = right[j];
        j = j+1;
        k = k+1;
    }
}

//--------------------------------------------------------- QUICK SORT --------------------------------------------------------------------------


export function quickSortAnimations(array) {
    const animations=[];
    if(array.length<=1) return array;
    quickSortHelper(array,0, array.length-1, animations);
    console.log(animations)
    return animations;
}

//first element of animations is the key element 
//0 -> first selection change to comparision color
//1 -> means second selection change to original color
//2 -> means actual swap so 2nd element is index and 3rd element is height
function quickSortHelper(array,start, end, animations) {
    if(start<end)
    {
        let pivot = randomizedPartition(array,start,end, animations)
        quickSortHelper(array, start, pivot - 1, animations);
        quickSortHelper(array, pivot+1, end, animations);
    }
}

function randomizedPartition(array, start, end, animations){
    let pivot = Math.floor(Math.random()*(end - start + 1))+start;
    //select pivot and end to swap
    animations.push([0, pivot, end]);
    //swap values of pivot and end
    animations.push([2,pivot,array[end]]);
    animations.push([2,end, array[pivot]]);
    //revert color of pivot and end
    animations.push([1, pivot, end]);

    [array[pivot], array[end]] = [array[end], array[pivot]];
    return partition(array, start, end, animations);
}

function partition(array, start, end, animations){
    let pivot = array[end];
    let i = start - 1
    for(let j = start; j<end; ++j)
    {
        if(array[j] <= pivot)
        {
            i+=1;
            //select i and j to compare
            animations.push([0, i, j]);
            //swap i and j
            animations.push([2,i,array[j]]);
            animations.push([2, j, array[i]]);
            //deselect i and j
            animations.push([2, i, j]);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    i+=1;
    //select i and end
    animations.push([0, i, end]);
    //swap i and end
    animations.push([2, i, array[end]]);
    animations.push([2, end, array[i]]);
    //deselect i and end
    [array[i] , array[end]] = [array[end], array[i]];
    return i;
}

//first element of animations is the key element 
//0 -> first selection change to comparision color
//1 -> means second selection change to original color
//2 -> means actual swap so 2nd element is first index and 3rd element is other index

// function quickSortHelper(array,start, end, animations) {
//     if(start<end)
//     {
//         const pivot = randomizedPartition(array,start,end, animations)
//         quickSortHelper(array, start, pivot - 1, animations);
//         quickSortHelper(array, pivot+1, end, animations);
//     }
//     return animations
// }

// function randomizedPartition(array, start, end, animations){
//     const pivot = Math.floor(Math.random()*(end - start + 1))+start;
//     //select pivot and end to swap
//     animations.push([0, pivot, end]);
//     //swap values of pivot and end
//     animations.push([2,pivot,end]);
//     //revert color of pivot and end
//     animations.push([1, pivot, end]);

//     [array[pivot], array[end]] = [array[end], array[pivot]];
//     return partition(array, start, end, animations);
// }

// function partition(array, start, end, animations) {
//     const pivot = array[end];
//     let i = start - 1
//     for(let j = start; j<end; ++j)
//     {
//         if(array[j] <= pivot)
//         {
//             i+=1;
//             //select i and j to compare
//             animations.push([0, i, j]);
//             //swap i and j
//             animations.push([2,i,j]);
//             //deselect i and j
//             animations.push([2, i, j]);
//             [array[i], array[j]] = [array[j], array[i]];
//         }
//     }
//     i+=1;
//     //select i and end
//     animations.push([0, i, end]);
//     //swap i and end
//     animations.push([2, i, end]);
//     //deselect i and end
//     [array[i] , array[end]] =[ array[end], array[i]];
//     return i;
// }

