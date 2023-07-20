class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

const a = new Node('A');
const b = new Node('B');
const c = new Node('C');
const d = new Node('D');
const e = new Node('E');
const f = new Node('F');

a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.right = f;

//     a
//    / \
//   b   c
//  / \   \
// d   e   f

// PROBLEMS

// "depth first values" problem (see structy.net/problems/depth-first-values)
//
// Write a function, depthFirstValues, that takes in the root of a binary tree.
// The function should return an array containing all values of the tree in depth-first order.

// iterative approach
// const depthFirstValues = (node) => {
//     if (node === null) return [];
//
//     const stack = [node]; // push() and pop()
//
//     while (stack.length > 0) {
//         const current = stack.pop();
//         console.log(current.val);
//
//         if (current.right !== null) {
//             stack.push(current.right)
//         }
//         if (current.left !== null) {
//             stack.push(current.left);
//         }
//     }
// };

// recursive approach
const depthFirstValues = (root) => {
    if (root === null) return [];
    const leftValues = depthFirstValues(root.left);
    const rightValues = depthFirstValues(root.right);
    return [ root.val, ...leftValues, ...rightValues ];
};

// console.log(depthFirstValues(a));

// "breadth first values" problem (see structy.net/problems/breadth-first-values)

// Write a function, breadthFirstValues, that takes in the root of a binary tree.
// The function should return an array containing all values of the tree in breadth-first order.

const breadthFirstValues = (root) => {
    if (root === null) return [];
    const queue = [root]; // push() and shift()
    const values = [];

    while (queue.length > 0) {
        const current = queue.shift();
        values.push(current.val);

        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
    }

    return values;
};

// console.log(breadthFirstValues(a));

// "tree includes" problem (see structy.net/problems/tree-includes)
//
// Write a function, treeIncludes, that takes in the root of a binary tree and a target value.
// The function should return a boolean indicating whether or not the value is contained in the tree.

// iterative approach
// const treeIncludes = (root, target) => {
//     if (root === null) return false;
//     const queue = [root];
//
//     while (queue.length > 0) {
//         const current = queue.shift();
//         if (current.val === target) return true;
//         if (current.left) queue.push(current.left);
//         if (current.right) queue.push(current.right);
//     }
//
//     return false;
// };

// recursive
const treeIncludes = (root, target) => {
    if (root === null) return false;
    if (root.val === target) return true;

    return (treeIncludes(root.left, target)) || (treeIncludes(root.right, target));
};

// console.log(treeIncludes(a, 'F'));

// "tree sum" problem (see structy.net/problems/tree-sum)
//
// Write a function, treeSum, that takes in the root of a binary tree that contains number values.
// The function should return the total sum of all values in the tree.

// depth-first iterative approach
// const treeSum = (root) => {
//     if (root === null) return 0;
//
//     let sum = 0;
//     const stack = [root];
//
//     while (stack.length > 0) {
//         const current = stack.pop();
//         sum += current.val;
//         if (current.right) stack.push(current.right);
//         if (current.left) stack.push(current.left);
//     }
//
//     return sum;
// };

// depth-first recursive approach
const treeSum = (node) => {
    if (node === null) return 0;
    return node.val + treeSum(node.left) + treeSum(node.right);
};

// breadth-first iterative (only possible) approach
// const treeSum = (root) => {
//     if (root === null) return 0;
//     const queue = [root];
//     let sum = 0;
//
//     while (queue.length > 0) {
//         const current = queue.shift();
//         sum += current.val;
//         if (current.left) queue.push(current.left);
//         if (current.right) queue.push(current.right);
//     }
//
//     return sum;
// };

// "tree min value" problem (see structy.net/problems/tree-min-value)
//
// Write a function, treeMinValue, that takes in the root of a binary tree that contains number values.
// The function should return the minimum value within the tree.
//
// You may assume that the input tree is non-empty.

// const treeMinValue = (root) => {
//     const stack = [root];
//     let min = root.val;
//
//     while (stack.length > 0) {
//         const current = stack.pop();
//         if (current.val < min) min = current.val;
//         if (current.right) stack.push(current.right);
//         if (current.left) stack.push(current.left);
//     }
//
//     return min;
// };

// const treeMinValue = (root) => {
//     if (root !== null) {
//         let min = root.val;
//         if (treeMinValue(root.left) < min) min = treeMinValue(root.left);
//         if (treeMinValue(root.right) < min) min = treeMinValue(root.right);
//         return min;
//     }
//     return Infinity;
// };

// or

const treeMinValue = (root) => {
    if (root === null) return Infinity;
    const leftMin = treeMinValue(root.left);
    const rightMin = treeMinValue(root.right);
    return Math.min(root.val, leftMin, rightMin);
};

// "max root to leaf path sum" problem (see structy.net/problems/max-root-to-leaf-path-sum)
//
// Write a function, maxPathSum, that takes in the root of a binary tree that contains number values.
// The function should return the maximum sum of any root to leaf path within the tree.
//
// You may assume that the input tree is non-empty.

// const maxPathSum = (root) => {
//     if (root === null) return -Infinity;
//     if (root.left === null && root.right === null) return root.val;
//     let maxSum = 0;
//     maxSum += root.val;
//     const leftMaxSum = maxPathSum(root.left);
//     const rightMaxSum = maxPathSum(root.right);
//     if (leftMaxSum > rightMaxSum) maxSum += leftMaxSum;
//     else maxSum += rightMaxSum;
//
//     return maxSum;
// };

// or

const maxPathSum = (root) => {
    if (root === null) return -Infinity;
    if (root.left === null && root.right === null) return root.val;
    const childMaxPathSum = Math.max(maxPathSum(root.left), maxPathSum(root.right));
    return root.val + childMaxPathSum;
};