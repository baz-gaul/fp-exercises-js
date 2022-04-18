// nodes aren't functional, have mutable left and right
function nodeFactory(val, left = undefined, right = undefined){
    let left = left;
    let right = right;
    const getLeft = () => left;
    const getRight = () => right;
    const addLeft = (l) => left = l;
    const addRight = (r) => right = r;
    const getVal = () => val;
    const removeRight = () => {
        const temp = right;
        right = undefined;
        return temp;
    };
    const removeLeft = () => {
        const temp = left;
        left = undefined;
        return temp;
    };
    return {getLeft, getRight, addLeft, addRight, getVal, removeRight, removeLeft};
}

// calculate the sum of all the numbers in a tree,
const sumNodes = (root) => {
    return !root ? 0 :
            root.getVal() + sumNodes(root.getLeft()) + sumNodes(root.getRight());
}

// find the largest value in a tree
const largestNode = (root) => {
    if(!root) return -Infinity;
    const res = root.getVal();
    const leftRes = largestNode(root.getLeft());
    const rightRes = largestNode(root.getRight());
    if(res > leftRes && res > rightRes) return res;
    if(leftRes > rightRes) return leftRes;
    return rightRes;
}

// js array.prototype.find for a tree
const find = (root, val) => {
    if(!root) return undefined;
    if(root.getVal() === val) return root;
    return find(root.getLeft(), val) || find(root.getRight(), val);
}

// js array.prototype.every for a tree
const every = (root, callback) => {
    if(!root) return true;
    if(!callback(root.getVal())) return false;
    return every(root.getLeft(), callback) && every(root.getRight(), callback);
}

// js array.prototype.some for a tree
const some = (root, callback) => {
    if(!root) return false;
    if(callback(root.getVal())) return true;
    return some(root.getLeft(), callback) || some(root.getRight(), callback);
}

// js array.prototype.forEach for a tree
const forEach = (root, callback) => {
    if(!root) return;
    callback(root);
    forEach(root.getLeft(), callback) && forEach(root.getRight(), callback);
}

// clone a binary tree
const clone = (root) => {
    if(!root) return undefined;
    const newNode = nodeFactory(root.getVal());
    const leftNode = clone(root.getLeft());
    const rightNode = clone(root.getRight());
    newNode.addLeft(leftNode);
    newNode.addRight(rightNode);
    return newNode;
}

// testing
const root = nodeFactory(5);
const left = nodeFactory(4);
root.addLeft(left);
const right = nodeFactory(3);
root.addRight(right);